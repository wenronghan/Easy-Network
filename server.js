const http = require("http");
const fs = require("fs");
const os = require("os");
const path = require("path");

const root = path.resolve(__dirname);
const port = Number(process.env.PORT || process.argv[2] || 4173);
const ownerRoot = path.join(root, ".easy-network-share-owners");
const types = {
  ".html": "text/html;charset=utf-8",
  ".css": "text/css;charset=utf-8",
  ".js": "application/javascript;charset=utf-8",
  ".json": "application/json;charset=utf-8",
  ".csv": "text/csv;charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp"
};

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json;charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(payload));
}

function safeFileName(name) {
  return String(name || "easy-network-screenshot.png")
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "-")
    .replace(/\.+$/g, "")
    .slice(0, 120) || "easy-network-screenshot.png";
}

function safeSlug(value) {
  return String(value || "easy-network-project")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120) || `project-${Date.now().toString(36)}`;
}

function safeRelativePath(value) {
  return String(value || "")
    .replace(/\\/g, "/")
    .split("/")
    .filter((part) => part && part !== "." && part !== "..")
    .join("/");
}

function getLanAddress() {
  const networks = os.networkInterfaces();
  for (const entries of Object.values(networks)) {
    for (const entry of entries || []) {
      if (entry.family === "IPv4" && !entry.internal) return entry.address;
    }
  }
  return "127.0.0.1";
}

function getShareOrigin(req) {
  const host = String(req.headers.host || `127.0.0.1:${port}`);
  if (!/^localhost(?::|$)|^127\./.test(host)) return `http://${host}`;
  return `http://${getLanAddress()}:${port}`;
}

function readBody(req, limitBytes, callback) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
    if (body.length > limitBytes) req.destroy();
  });
  req.on("end", () => callback(body));
}

function writeProjectFile(projectRoot, file) {
  const relativePath = safeRelativePath(file.path);
  if (!relativePath) return;
  const filePath = path.resolve(projectRoot, relativePath);
  if (!filePath.startsWith(projectRoot + path.sep) && filePath !== projectRoot) return;
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  if (typeof file.dataUrl === "string") {
    const match = file.dataUrl.match(/^data:([^;,]+)?(?:;charset=[^;,]+)?;base64,(.+)$/);
    if (!match) throw new Error(`Invalid file data for ${relativePath}.`);
    fs.writeFileSync(filePath, Buffer.from(match[2], "base64"));
  } else {
    fs.writeFileSync(filePath, String(file.text || ""), "utf8");
  }
}

function projectManifestExists(slug) {
  return fs.existsSync(path.join(root, "shared-projects", slug, "project.json"));
}

function getProjectRoot(slug) {
  return path.join(root, "shared-projects", slug);
}

function getOwnerFilePath(slug) {
  return path.join(ownerRoot, `${slug}.json`);
}

function readProjectManifest(slug) {
  try {
    return JSON.parse(fs.readFileSync(path.join(getProjectRoot(slug), "project.json"), "utf8"));
  } catch (error) {
    return null;
  }
}

function readOwnerRecord(slug) {
  try {
    return JSON.parse(fs.readFileSync(getOwnerFilePath(slug), "utf8"));
  } catch (error) {
    return null;
  }
}

function writeOwnerRecord(slug, payload) {
  const ownerToken = String(payload.ownerToken || "").trim();
  if (!ownerToken) return;
  fs.mkdirSync(ownerRoot, { recursive: true });
  fs.writeFileSync(getOwnerFilePath(slug), JSON.stringify({
    ownerToken,
    accessMode: payload.accessMode || "read-only",
    updatedAt: new Date().toISOString()
  }, null, 2), "utf8");
}

function canOverwriteProject(slug, payload) {
  if (!payload.overwrite || !projectManifestExists(slug)) return false;
  const ownerToken = String(payload.ownerToken || "").trim();
  const ownerRecord = readOwnerRecord(slug);
  if (ownerToken && ownerRecord?.ownerToken === ownerToken) return true;
  const manifest = readProjectManifest(slug);
  return manifest?.accessMode === "editable" || manifest?.project?.accessMode === "editable";
}

function prepareProjectRoot(slug, payload) {
  const projectRoot = getProjectRoot(slug);
  if (projectManifestExists(slug)) {
    if (!canOverwriteProject(slug, payload)) return { ok: false, projectRoot };
  }
  fs.mkdirSync(projectRoot, { recursive: true });
  return { ok: true, projectRoot };
}

function sendSlugConflict(res, slug) {
  sendJson(res, 409, {
    ok: false,
    error: `The link "${slug}" already exists. Change the Link slug and try again.`
  });
}

function sendPublishResult(req, res, payload, slug) {
  writeOwnerRecord(slug, payload);
  const origin = getShareOrigin(req);
  const manifestUrl = `${origin}/shared-projects/${encodeURIComponent(slug)}/project.json`;
  const publicBaseUrl = String(payload.publicBaseUrl || "").replace(/\/?$/, "/");
  const shareBase = publicBaseUrl || `${origin}/index.html`;
  const shareUrl = `${shareBase}#/cloud/${encodeURIComponent(slug)}`;
  sendJson(res, 200, { ok: true, slug, shareUrl, manifestUrl, accessMode: payload.accessMode || "read-only" });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${port}`);

  if (req.method === "POST" && url.pathname === "/api/save-screenshot") {
    readBody(req, 80 * 1024 * 1024, (body) => {
      try {
        const payload = JSON.parse(body || "{}");
        const dataUrl = String(payload.dataUrl || "");
        const match = dataUrl.match(/^data:image\/png;base64,(.+)$/);
        if (!match) {
          sendJson(res, 400, { ok: false, error: "Expected a PNG data URL." });
          return;
        }
        const buffer = Buffer.from(match[1], "base64");
        const downloads = path.join(process.env.USERPROFILE || process.env.HOME || root, "Downloads");
        const dir = path.join(downloads, "Easy Network Screenshots");
        fs.mkdirSync(dir, { recursive: true });
        const filePath = path.join(dir, safeFileName(payload.fileName));
        fs.writeFileSync(filePath, buffer);
        sendJson(res, 200, { ok: true, path: filePath });
      } catch (error) {
        sendJson(res, 500, { ok: false, error: error.message || "Could not save screenshot." });
      }
    });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/publish-project/start") {
    readBody(req, 2 * 1024 * 1024, (body) => {
      try {
        const payload = JSON.parse(body || "{}");
        const slug = safeSlug(payload.slug);
        const prepared = prepareProjectRoot(slug, payload);
        if (!prepared.ok) {
          sendSlugConflict(res, slug);
          return;
        }
        sendJson(res, 200, { ok: true, slug });
      } catch (error) {
        sendJson(res, 500, { ok: false, error: error.message || "Could not start upload." });
      }
    });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/publish-project/file") {
    readBody(req, 80 * 1024 * 1024, (body) => {
      try {
        const payload = JSON.parse(body || "{}");
        const slug = safeSlug(payload.slug);
        const projectRoot = path.join(root, "shared-projects", slug);
        fs.mkdirSync(projectRoot, { recursive: true });
        writeProjectFile(projectRoot, payload);
        sendJson(res, 200, { ok: true, slug, path: safeRelativePath(payload.path) });
      } catch (error) {
        sendJson(res, 500, { ok: false, error: error.message || "Could not upload file." });
      }
    });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/publish-project/finish") {
    readBody(req, 80 * 1024 * 1024, (body) => {
      try {
        const payload = JSON.parse(body || "{}");
        const slug = safeSlug(payload.slug || payload.manifest?.slug);
        const prepared = prepareProjectRoot(slug, payload);
        if (!prepared.ok) {
          sendSlugConflict(res, slug);
          return;
        }
        const projectRoot = prepared.projectRoot;
        writeProjectFile(projectRoot, {
          path: "project.json",
          text: JSON.stringify({ ...(payload.manifest || {}), slug }, null, 2),
          contentType: "application/json;charset=utf-8"
        });
        sendPublishResult(req, res, payload, slug);
      } catch (error) {
        sendJson(res, 500, { ok: false, error: error.message || "Could not finish upload." });
      }
    });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/publish-project") {
    readBody(req, 500 * 1024 * 1024, (body) => {
      try {
        const payload = JSON.parse(body || "{}");
        const slug = safeSlug(payload.slug || payload.manifest?.slug);
        const projectRoot = getProjectRoot(slug);

        if (payload.action === "start") {
          const prepared = prepareProjectRoot(slug, payload);
          if (!prepared.ok) {
            sendSlugConflict(res, slug);
            return;
          }
          sendJson(res, 200, { ok: true, slug });
          return;
        }
        fs.mkdirSync(projectRoot, { recursive: true });
        if (payload.action === "file") {
          writeProjectFile(projectRoot, payload);
          sendJson(res, 200, { ok: true, slug, path: safeRelativePath(payload.path) });
          return;
        }
        if (payload.action === "finish") {
          const prepared = prepareProjectRoot(slug, payload);
          if (!prepared.ok) {
            sendSlugConflict(res, slug);
            return;
          }
          writeProjectFile(projectRoot, {
            path: "project.json",
            text: JSON.stringify({ ...(payload.manifest || {}), slug }, null, 2),
            contentType: "application/json;charset=utf-8"
          });
          sendPublishResult(req, res, payload, slug);
          return;
        }

        const files = Array.isArray(payload.files) ? payload.files : [];
        const prepared = prepareProjectRoot(slug, payload);
        if (!prepared.ok) {
          sendSlugConflict(res, slug);
          return;
        }
        files.forEach((file) => writeProjectFile(projectRoot, file));
        sendPublishResult(req, res, payload, slug);
      } catch (error) {
        sendJson(res, 500, { ok: false, error: error.message || "Could not create share link." });
      }
    });
    return;
  }

  const relativePath = url.pathname === "/" ? "index.html" : decodeURIComponent(url.pathname.slice(1));
  const filePath = path.resolve(root, relativePath);

  if (relativePath.startsWith(".easy-network-share-owners/")) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  if (!filePath.startsWith(root + path.sep) && filePath !== root) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": types[path.extname(filePath)] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    res.end(data);
  });
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.log(`Easy Network is already running at http://127.0.0.1:${port}/`);
    process.exit(0);
    return;
  }
  throw error;
});

server.listen(port, "0.0.0.0", () => {
  console.log(`ArchaeoDesk running at http://127.0.0.1:${port}/`);
  console.log(`Share links use http://${getLanAddress()}:${port}/ when opened from another device on this network.`);
});
