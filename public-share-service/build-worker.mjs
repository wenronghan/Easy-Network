import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const publicDir = path.join(root, "public");
const distServer = path.join(root, "dist", "server");
const files = [
  "index.html",
  "app.js",
  "styles.css",
  "network.html",
  "network.js",
  "network.css",
  "favicon.svg",
  "file.svg",
  "globe.svg",
  "window.svg",
];

const contentTypes = {
  ".html": "text/html;charset=utf-8",
  ".css": "text/css;charset=utf-8",
  ".js": "application/javascript;charset=utf-8",
  ".svg": "image/svg+xml",
  ".json": "application/json;charset=utf-8",
  ".csv": "text/csv;charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
};

const assets = {};
for (const file of files) {
  const filePath = path.join(publicDir, file);
  if (fs.existsSync(filePath)) {
    assets[`/${file}`] = {
      contentType: contentTypes[path.extname(file).toLowerCase()] || "application/octet-stream",
      base64: fs.readFileSync(filePath).toString("base64"),
    };
  }
}

fs.mkdirSync(distServer, { recursive: true });
fs.writeFileSync(path.join(distServer, "index.js"), `const ASSETS = ${JSON.stringify(assets)};\n\n` + String.raw`
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};
const publicAppUrl = "https://wenronghan.github.io/Easy-Network/";

function bytesFromBase64(value) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes;
}

function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json;charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function cleanSlug(value) {
  const slug = String(value || "easy-network-project")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
  return slug || "project-" + Date.now().toString(36);
}

function cleanRelativePath(value) {
  return String(value || "")
    .replace(/\\/g, "/")
    .split("/")
    .filter((part) => part && part !== "." && part !== "..")
    .join("/");
}

function contentTypeForPath(path) {
  const lower = path.toLowerCase();
  if (lower.endsWith(".json")) return "application/json;charset=utf-8";
  if (lower.endsWith(".csv")) return "text/csv;charset=utf-8";
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".gif")) return "image/gif";
  if (lower.endsWith(".svg")) return "image/svg+xml";
  if (lower.endsWith(".html")) return "text/html;charset=utf-8";
  if (lower.endsWith(".css")) return "text/css;charset=utf-8";
  if (lower.endsWith(".js")) return "application/javascript;charset=utf-8";
  return "application/octet-stream";
}

function dataUrlToBytes(value) {
  const match = String(value || "").match(/^data:([^;,]+)?(?:;charset=[^;,]+)?;base64,(.+)$/);
  if (!match) throw new Error("Invalid file data.");
  return bytesFromBase64(match[2]);
}

function publicAppRedirectPage() {
  return new Response([
    "<!doctype html>",
    "<html>",
    "<head>",
    "  <meta charset=\"utf-8\">",
    "  <title>Easy Network</title>",
    "  <script>",
    "    const target = " + JSON.stringify(publicAppUrl) + ";",
    "    window.location.replace(target + window.location.hash);",
    "  </script>",
    "</head>",
    "<body>",
    "  <a href=\"" + publicAppUrl + "\">Open Easy Network</a>",
    "</body>",
    "</html>"
  ].join("\n"), {
    headers: {
      "Content-Type": "text/html;charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

async function storeProjectFile(env, slug, file) {
    const relativePath = cleanRelativePath(file.path);
    if (!relativePath) return "";
    const key = "projects/" + slug + "/" + relativePath;
    const contentType = file.contentType || contentTypeForPath(relativePath);
    const body = typeof file.dataUrl === "string" ? dataUrlToBytes(file.dataUrl) : String(file.text || "");
    await env.PROJECT_FILES.put(key, body, {
      httpMetadata: { contentType },
      customMetadata: { slug },
    });
    return relativePath;
}

async function projectManifestExists(env, slug) {
  return Boolean(await env.PROJECT_FILES.head("projects/" + slug + "/project.json"));
}

function slugConflictResponse(slug) {
  return jsonResponse({
    ok: false,
    error: "The link \"" + slug + "\" already exists. Change the Link slug and try again.",
  }, 409);
}

function publishResult(request, payload, slug) {
  const origin = new URL(request.url).origin;
  const manifestUrl = origin + "/shared-projects/" + encodeURIComponent(slug) + "/project.json";
  const publicBaseUrl = String(payload.publicBaseUrl || "").replace(/\/?$/, "/");
  const shareBase = publicBaseUrl || origin + "/index.html";
  const shareUrl = shareBase + "#/cloud/" + encodeURIComponent(slug);
  return jsonResponse({ ok: true, slug, shareUrl, manifestUrl, accessMode: payload.accessMode || "read-only" });
}

async function publishProject(request, env) {
  const payload = await request.json();
  const slug = cleanSlug(payload.slug || payload.manifest?.slug);
  if (payload.action === "start") {
    if (await projectManifestExists(env, slug)) return slugConflictResponse(slug);
    return jsonResponse({ ok: true, slug });
  }
  if (payload.action === "file") {
    const path = await storeProjectFile(env, slug, payload);
    return jsonResponse({ ok: true, slug, path });
  }
  if (payload.action === "finish") {
    if (await projectManifestExists(env, slug)) return slugConflictResponse(slug);
    await storeProjectFile(env, slug, {
      path: "project.json",
      text: JSON.stringify({ ...(payload.manifest || {}), slug }, null, 2),
      contentType: "application/json;charset=utf-8",
    });
    return publishResult(request, payload, slug);
  }

  const files = Array.isArray(payload.files) ? payload.files : [];
  if (await projectManifestExists(env, slug)) return slugConflictResponse(slug);
  if (!files.some((file) => cleanRelativePath(file.path) === "project.json")) {
    return jsonResponse({ ok: false, error: "project.json is required." }, 400);
  }

  for (const file of files) {
    await storeProjectFile(env, slug, file);
  }

  return publishResult(request, payload, slug);
}

async function getSharedProjectFile(request, env) {
  const url = new URL(request.url);
  const relative = cleanRelativePath(decodeURIComponent(url.pathname.slice("/shared-projects/".length)));
  const parts = relative.split("/");
  const slug = cleanSlug(parts.shift());
  const filePath = cleanRelativePath(parts.join("/"));
  if (!slug || !filePath) return new Response("Not found", { status: 404, headers: corsHeaders });
  const object = await env.PROJECT_FILES.get("projects/" + slug + "/" + filePath);
  if (!object) return new Response("Not found", { status: 404, headers: corsHeaders });
  return new Response(object.body, {
    headers: {
      ...corsHeaders,
      "Content-Type": object.httpMetadata?.contentType || contentTypeForPath(filePath),
      "Cache-Control": "public, max-age=60",
    },
  });
}

function serveAsset(pathname) {
  const assetPath = pathname === "/" ? "/index.html" : pathname;
  const asset = ASSETS[assetPath];
  if (!asset) return null;
  return new Response(bytesFromBase64(asset.base64), {
    headers: {
      "Content-Type": asset.contentType,
      "Cache-Control": assetPath.endsWith(".html") ? "no-store" : "public, max-age=300",
    },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders });
    if (request.method === "POST" && url.pathname === "/api/publish-project") return publishProject(request, env);
    if (request.method === "GET" && url.pathname.startsWith("/shared-projects/")) return getSharedProjectFile(request, env);
    if (request.method === "GET" && (url.pathname === "/" || url.pathname === "/index.html")) return publicAppRedirectPage();
    if (request.method === "GET") {
      const asset = serveAsset(url.pathname);
      if (asset) return asset;
    }
    return new Response("Not found", { status: 404 });
  },
};
`, "utf8");
