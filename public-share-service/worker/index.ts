/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  PROJECT_FILES: R2Bucket;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};
const publicAppUrl = "https://wenronghan.github.io/Easy-Network/";

function jsonResponse(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json;charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function cleanSlug(value: unknown): string {
  const slug = String(value || "easy-network-project")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
  return slug || `project-${Date.now().toString(36)}`;
}

function cleanRelativePath(value: unknown): string {
  return String(value || "")
    .replace(/\\/g, "/")
    .split("/")
    .filter((part) => part && part !== "." && part !== "..")
    .join("/");
}

function contentTypeForPath(path: string): string {
  const lower = path.toLowerCase();
  if (lower.endsWith(".json")) return "application/json;charset=utf-8";
  if (lower.endsWith(".csv")) return "text/csv;charset=utf-8";
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".gif")) return "image/gif";
  return "application/octet-stream";
}

function publicAppRedirectPage(): Response {
  return new Response(`<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Easy Network</title>
  <script>
    const target = ${JSON.stringify(publicAppUrl)};
    window.location.replace(target + window.location.hash);
  </script>
</head>
<body>
  <a href="${publicAppUrl}">Open Easy Network</a>
</body>
</html>`, {
    headers: {
      "Content-Type": "text/html;charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function dataUrlToBytes(value: string): Uint8Array {
  const match = value.match(/^data:([^;,]+)?(?:;charset=[^;,]+)?;base64,(.+)$/);
  if (!match) throw new Error("Invalid file data.");
  const binary = atob(match[2]);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

async function storeProjectFile(
  env: Env,
  slug: string,
  file: { path?: string; text?: string; dataUrl?: string; contentType?: string; ownerToken?: string; accessMode?: string },
): Promise<string> {
  const relativePath = cleanRelativePath(file.path);
  if (!relativePath) return "";
  const key = `projects/${slug}/${relativePath}`;
  const contentType = file.contentType || contentTypeForPath(relativePath);
  const body = typeof file.dataUrl === "string"
    ? dataUrlToBytes(file.dataUrl)
    : String(file.text || "");
  const customMetadata: Record<string, string> = { slug };
  if (relativePath === "project.json") {
    if (file.ownerToken) customMetadata.ownerToken = String(file.ownerToken);
    if (file.accessMode) customMetadata.accessMode = String(file.accessMode);
  }
  await env.PROJECT_FILES.put(key, body, {
    httpMetadata: { contentType },
    customMetadata,
  });
  return relativePath;
}

async function projectManifestExists(env: Env, slug: string): Promise<boolean> {
  return Boolean(await env.PROJECT_FILES.head(`projects/${slug}/project.json`));
}

async function readExistingProject(env: Env, slug: string): Promise<{
  exists: boolean;
  manifest?: { accessMode?: string; project?: { accessMode?: string } };
  ownerToken?: string;
}> {
  const object = await env.PROJECT_FILES.get(`projects/${slug}/project.json`);
  if (!object) return { exists: false };
  let manifest = {};
  try {
    manifest = await object.json();
  } catch (error) {
    manifest = {};
  }
  return {
    exists: true,
    manifest,
    ownerToken: object.customMetadata?.ownerToken,
  };
}

async function canOverwriteProject(env: Env, slug: string, payload: {
  overwrite?: boolean;
  ownerToken?: string;
}): Promise<boolean> {
  if (!payload.overwrite) return false;
  const existing = await readExistingProject(env, slug);
  if (!existing.exists) return true;
  const ownerToken = String(payload.ownerToken || "").trim();
  if (ownerToken && existing.ownerToken === ownerToken) return true;
  return existing.manifest?.accessMode === "editable" || existing.manifest?.project?.accessMode === "editable";
}

async function prepareProjectUpload(env: Env, slug: string, payload: {
  overwrite?: boolean;
  ownerToken?: string;
}): Promise<boolean> {
  if (!await projectManifestExists(env, slug)) return true;
  if (!await canOverwriteProject(env, slug, payload)) return false;
  return true;
}

function slugConflictResponse(slug: string): Response {
  return jsonResponse({
    ok: false,
    error: `The link "${slug}" already exists. Change the Link slug and try again.`,
  }, 409);
}

function publishResult(request: Request, payload: { accessMode?: string; publicBaseUrl?: string }, slug: string): Response {
  const origin = new URL(request.url).origin;
  const manifestUrl = `${origin}/shared-projects/${encodeURIComponent(slug)}/project.json`;
  const publicBaseUrl = String(payload.publicBaseUrl || "").replace(/\/?$/, "/");
  const shareBase = publicBaseUrl || `${origin}/index.html`;
  const shareUrl = `${shareBase}#/cloud/${encodeURIComponent(slug)}`;
  return jsonResponse({ ok: true, slug, shareUrl, manifestUrl, accessMode: payload.accessMode || "read-only" });
}

async function startPublishProject(request: Request, env: Env): Promise<Response> {
  const payload = await request.json() as { slug?: string; overwrite?: boolean; ownerToken?: string };
  const slug = cleanSlug(payload.slug);
  if (!await prepareProjectUpload(env, slug, payload)) {
    return slugConflictResponse(slug);
  }
  return jsonResponse({ ok: true, slug });
}

async function uploadProjectFile(request: Request, env: Env): Promise<Response> {
  const payload = await request.json() as { slug?: string; path?: string; text?: string; dataUrl?: string; contentType?: string };
  const slug = cleanSlug(payload.slug);
  const path = await storeProjectFile(env, slug, payload);
  return jsonResponse({ ok: true, slug, path });
}

async function finishPublishProject(request: Request, env: Env): Promise<Response> {
  const payload = await request.json() as {
    action?: string;
    slug?: string;
    accessMode?: string;
    publicBaseUrl?: string;
    ownerToken?: string;
    overwrite?: boolean;
    manifest?: { slug?: string; [key: string]: unknown };
  };
  const slug = cleanSlug(payload.slug || payload.manifest?.slug);
  if (!await prepareProjectUpload(env, slug, payload)) {
    return slugConflictResponse(slug);
  }
  await storeProjectFile(env, slug, {
    path: "project.json",
    text: JSON.stringify({ ...(payload.manifest || {}), slug }, null, 2),
    contentType: "application/json;charset=utf-8",
    ownerToken: payload.ownerToken,
    accessMode: payload.accessMode,
  });
  return publishResult(request, payload, slug);
}

async function publishProject(request: Request, env: Env): Promise<Response> {
  const payload = await request.json() as {
    action?: string;
    slug?: string;
    accessMode?: string;
    publicBaseUrl?: string;
    ownerToken?: string;
    overwrite?: boolean;
    manifest?: { slug?: string };
    files?: Array<{ path?: string; text?: string; dataUrl?: string; contentType?: string }>;
  };
  const slug = cleanSlug(payload.slug || payload.manifest?.slug);
  if (payload.action === "start") {
    if (!await prepareProjectUpload(env, slug, payload)) {
      return slugConflictResponse(slug);
    }
    return jsonResponse({ ok: true, slug });
  }
  if (payload.action === "file") {
    const path = await storeProjectFile(env, slug, payload);
    return jsonResponse({ ok: true, slug, path });
  }
  if (payload.action === "finish") {
    if (!await prepareProjectUpload(env, slug, payload)) {
      return slugConflictResponse(slug);
    }
    await storeProjectFile(env, slug, {
      path: "project.json",
      text: JSON.stringify({ ...(payload.manifest || {}), slug }, null, 2),
      contentType: "application/json;charset=utf-8",
      ownerToken: payload.ownerToken,
      accessMode: payload.accessMode,
    });
    return publishResult(request, payload, slug);
  }

  const files = Array.isArray(payload.files) ? payload.files : [];
  if (!await prepareProjectUpload(env, slug, payload)) {
    return slugConflictResponse(slug);
  }
  if (!files.some((file) => cleanRelativePath(file.path) === "project.json")) {
    return jsonResponse({ ok: false, error: "project.json is required." }, 400);
  }

  for (const file of files) {
    const relativePath = cleanRelativePath(file.path);
    await storeProjectFile(env, slug, {
      ...file,
      ownerToken: relativePath === "project.json" ? payload.ownerToken : undefined,
      accessMode: relativePath === "project.json" ? payload.accessMode : undefined,
    });
  }

  return publishResult(request, payload, slug);
}

async function getSharedProjectFile(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const prefix = "/shared-projects/";
  const relative = cleanRelativePath(decodeURIComponent(url.pathname.slice(prefix.length)));
  if (!relative) return new Response("Not found", { status: 404, headers: corsHeaders });
  const parts = relative.split("/");
  const slug = cleanSlug(parts.shift());
  const filePath = cleanRelativePath(parts.join("/"));
  if (!slug || !filePath) return new Response("Not found", { status: 404, headers: corsHeaders });
  const object = await env.PROJECT_FILES.get(`projects/${slug}/${filePath}`);
  if (!object) return new Response("Not found", { status: 404, headers: corsHeaders });
  return new Response(object.body, {
    headers: {
      ...corsHeaders,
      "Content-Type": object.httpMetadata?.contentType || contentTypeForPath(filePath),
      "Cache-Control": "public, max-age=60",
    },
  });
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders });
    if (request.method === "POST" && url.pathname === "/api/publish-project/start") return startPublishProject(request, env);
    if (request.method === "POST" && url.pathname === "/api/publish-project/file") return uploadProjectFile(request, env);
    if (request.method === "POST" && url.pathname === "/api/publish-project/finish") return finishPublishProject(request, env);
    if (request.method === "POST" && url.pathname === "/api/publish-project") return publishProject(request, env);
    if (request.method === "GET" && url.pathname.startsWith("/shared-projects/")) return getSharedProjectFile(request, env);
    if (request.method === "GET" && (url.pathname === "/" || url.pathname === "/index.html")) return publicAppRedirectPage();

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
