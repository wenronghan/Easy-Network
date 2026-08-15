(() => {
  const publicBase = "https://wenronghan.github.io/Easy-Network/";

  const githubShareUrl = (slug, manifestUrl, itemId = "") => {
    if (!manifestUrl) return "";
    const itemPath = itemId ? `/items/${encodeURIComponent(itemId)}` : "";
    return `${publicBase}#/cloud/${encodeURIComponent(slug)}${itemPath}?source=${encodeURIComponent(manifestUrl)}`;
  };

  const normalizeShareUrl = (url) => {
    const match = String(url || "").match(/#\/cloud\/([^/?#]+)(\/items\/([^?#]+))?\?source=([^#]+)/);
    if (!match) return url;
    return githubShareUrl(
      decodeURIComponent(match[1]),
      decodeURIComponent(match[4]),
      match[3] ? decodeURIComponent(match[3]) : ""
    );
  };

  if (typeof getCloudProjectShareLink === "function") {
    getCloudProjectShareLink = (slug, manifestUrl) => githubShareUrl(slug, manifestUrl);
  }

  if (typeof publishProjectToLocalServer === "function") {
    const originalPublishProjectToLocalServer = publishProjectToLocalServer;
    publishProjectToLocalServer = async (options) => normalizeShareUrl(await originalPublishProjectToLocalServer(options));
  }
})();
