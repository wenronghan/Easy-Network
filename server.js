const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname);
const port = Number(process.env.PORT || process.argv[2] || 4173);
const types = {
  ".html": "text/html;charset=utf-8",
  ".css": "text/css;charset=utf-8",
  ".js": "application/javascript;charset=utf-8",
  ".png": "image/png"
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

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${port}`);

  if (req.method === "POST" && url.pathname === "/api/save-screenshot") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 80 * 1024 * 1024) req.destroy();
    });
    req.on("end", () => {
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

  const relativePath = url.pathname === "/" ? "index.html" : decodeURIComponent(url.pathname.slice(1));
  const filePath = path.resolve(root, relativePath);

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

server.listen(port, "127.0.0.1", () => {
  console.log(`ArchaeoDesk running at http://127.0.0.1:${port}/`);
});
