(() => {
  const publicBase = "https://wenronghan.github.io/Easy-Network/";
  const shareService = "https://easy-network-share.wenronghan7.chatgpt.site";
  const editableAccess = "editable";

  const cloudManifestUrl = (slug) => `${shareService}/shared-projects/${encodeURIComponent(slug)}/project.json`;

  const githubShareUrl = (slug, manifestUrl, itemId = "") => {
    if (!slug || !manifestUrl) return "";
    const itemPath = itemId ? `/items/${encodeURIComponent(itemId)}` : "";
    return `${publicBase}#/cloud/${encodeURIComponent(slug)}${itemPath}`;
  };

  const normalizeShareUrl = (url) => {
    const match = String(url || "").match(/#\/cloud\/([^/?#]+)(\/items\/([^?#]+))?(\?source=([^#]+))?/);
    if (!match) return url;
    const slug = decodeURIComponent(match[1]);
    const manifestUrl = match[5] ? decodeURIComponent(match[5]) : cloudManifestUrl(slug);
    return githubShareUrl(slug, manifestUrl, match[3] ? decodeURIComponent(match[3]) : "");
  };

  const slugify = (value) => String(value || "easy-network-project")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "") || `project-${Date.now().toString(36)}`;

  if (typeof getCloudManifestUrlFromConfig === "function") {
    getCloudManifestUrlFromConfig = cloudManifestUrl;
  }

  if (typeof getCloudProjectShareLink === "function") {
    getCloudProjectShareLink = (slug, manifestUrl) => githubShareUrl(slug, manifestUrl);
  }

  if (typeof getPublishSlug === "function") {
    const originalGetPublishSlug = getPublishSlug;
    getPublishSlug = (scope, storageName) => {
      const baseSlug = originalGetPublishSlug(scope, storageName);
      const isCloudLink = window.location.hash.startsWith("#/cloud/");
      const accessMode = typeof getPublishedAccessMode === "function" ? getPublishedAccessMode() : "read-only";
      return isCloudLink && accessMode !== editableAccess
        ? slugify(`${baseSlug}-copy-${Date.now().toString(36)}`)
        : baseSlug;
    };
  }

  if (typeof publishProjectToLocalServer === "function") {
    const originalPublishProjectToLocalServer = publishProjectToLocalServer;
    publishProjectToLocalServer = async (options) => normalizeShareUrl(await originalPublishProjectToLocalServer(options));
  }
})();
