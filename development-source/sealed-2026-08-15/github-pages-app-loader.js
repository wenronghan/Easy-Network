(() => {
  const publicBase = "https://wenronghan.github.io/Easy-Network/";
  const shareService = "https://easy-network-share.wenronghan7.chatgpt.site";
  const bundleChunks = 8;
  const expectedLength = 62088;
  localStorage.setItem("easy-network-public-base-url", publicBase);
  localStorage.setItem("easy-network-share-service-url", shareService);

  const ensureLocalStyles = () => {
    const localHref = new URL("styles.css?v=20260815-selfhost", window.location.href).href;
    const existing = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    if (!existing.some((link) => new URL(link.href, window.location.href).href === localHref)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "styles.css?v=20260815-selfhost";
      document.head.append(link);
    }
  };

  const fail = (error) => {
    console.error("Could not load Easy Network app bundle", error);
    const box = document.createElement("div");
    box.style.cssText = "margin:24px;padding:16px;border:1px solid #c44;color:#f2f2f2;background:#271616;font:16px system-ui";
    box.textContent = "Easy Network could not load its local application bundle. Please refresh the page.";
    document.body.prepend(box);
  };

  const decodeBase64 = (value) => {
    const binary = atob(value.replace(/\s+/g, ""));
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
    return bytes;
  };

  const fetchText = async (path) => {
    const response = await fetch(`${path}?v=20260815-selfhost`, { cache: "no-cache" });
    if (!response.ok) throw new Error(`${path} request failed: ${response.status}`);
    return response.text();
  };

  const loadBundle = async () => {
    ensureLocalStyles();
    const paths = Array.from({ length: bundleChunks }, (_, index) => `app.bundle.js.gz.b64.${String(index).padStart(2, "0")}`);
    const packed = (await Promise.all(paths.map(fetchText))).join("").trim();
    if (packed.length !== expectedLength) throw new Error(`Bundle length mismatch: ${packed.length}`);
    const compressed = decodeBase64(packed);
    if (!("DecompressionStream" in window)) throw new Error("This browser cannot decompress the Easy Network bundle.");
    const stream = new Blob([compressed]).stream().pipeThrough(new DecompressionStream("gzip"));
    const source = await new Response(stream).text();
    const script = document.createElement("script");
    script.text = `${source}\n//# sourceURL=easy-network-app.bundle.js`;
    document.head.append(script);
  };

  loadBundle().catch(fail);
})();