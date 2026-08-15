(() => {
  const publicBase = "https://wenronghan.github.io/Easy-Network/";
  const shareService = "https://easy-network-share.wenronghan7.chatgpt.site";
  const editableAccess = "editable";
  const readOnlyAccess = "read-only";

  const cloudManifestUrl = (slug) => `${shareService}/shared-projects/${encodeURIComponent(slug)}/project.json`;

  const currentAccessMode = () => {
    try {
      return state?.publishedManifest?.accessMode === editableAccess || state?.publishedManifest?.project?.accessMode === editableAccess
        ? editableAccess
        : readOnlyAccess;
    } catch (error) {
      return readOnlyAccess;
    }
  };

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

  if (typeof getPublishedAccessMode === "undefined") {
    getPublishedAccessMode = currentAccessMode;
  }

  if (typeof isReadOnlyMode === "function") {
    isReadOnlyMode = () => {
      try {
        if (state.projectMode === "cloud") return currentAccessMode() !== editableAccess;
        return state.projectMode === "published";
      } catch (error) {
        return true;
      }
    };
  }

  if (typeof createProjectPackage === "function") {
    const originalCreateProjectPackage = createProjectPackage;
    createProjectPackage = async (options = {}) => {
      const bundle = await originalCreateProjectPackage(options);
      const accessMode = options.accessMode || currentAccessMode();
      bundle.manifest.accessMode = accessMode;
      bundle.manifest.project = { ...(bundle.manifest.project || {}), accessMode };
      return bundle;
    };
  }

  if (typeof getPublishSlug === "function") {
    const originalGetPublishSlug = getPublishSlug;
    getPublishSlug = (scope, storageName) => {
      const baseSlug = originalGetPublishSlug(scope, storageName);
      const isCloudLink = window.location.hash.startsWith("#/cloud/");
      return isCloudLink && currentAccessMode() !== editableAccess
        ? slugify(`${baseSlug}-copy-${Date.now().toString(36)}`)
        : baseSlug;
    };
  }

  if (typeof publishProjectToLocalServer === "function") {
    const originalPublishProjectToLocalServer = publishProjectToLocalServer;
    publishProjectToLocalServer = async (options = {}) => {
      const accessMode = options.accessMode || currentAccessMode();
      return normalizeShareUrl(await originalPublishProjectToLocalServer({ ...options, accessMode }));
    };
  }

  if (typeof render === "function") render();
})();
