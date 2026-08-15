(() => {
  const publicBase = "https://wenronghan.github.io/Easy-Network/";
  const shareService = "https://easy-network-share.wenronghan7.chatgpt.site";
  const editableAccess = "editable";
  const readOnlyAccess = "read-only";

  const cloudManifestUrl = (slug) => `${shareService}/shared-projects/${encodeURIComponent(slug)}/project.json`;
  const cloudProjectBaseUrl = (slug) => `${shareService}/shared-projects/${encodeURIComponent(slug)}/`;

  const currentAccessMode = () => {
    try {
      return state?.publishedManifest?.accessMode === editableAccess || state?.publishedManifest?.project?.accessMode === editableAccess
        ? editableAccess
        : readOnlyAccess;
    } catch (error) {
      return readOnlyAccess;
    }
  };

  const repairCloudImageUrls = () => {
    try {
      if (!state || state.projectMode !== "cloud" || !state.publishedSlug) return;
      const projectBase = cloudProjectBaseUrl(state.publishedSlug);
      const publicSharedBase = `${publicBase}shared-projects/${encodeURIComponent(state.publishedSlug)}/`;
      const fixImage = (image) => {
        const raw = image.path || image.url || "";
        if (!raw) return image;
        let url = image.url || raw;
        if (!/^https?:|^blob:|^data:/i.test(raw)) url = new URL(raw, projectBase).href;
        else if (url.startsWith(publicSharedBase)) url = url.replace(publicSharedBase, projectBase);
        else if (url.startsWith(`${location.origin}/shared-projects/`)) url = url.replace(`${location.origin}/shared-projects/${encodeURIComponent(state.publishedSlug)}/`, projectBase);
        return { ...image, url };
      };
      state.images = (state.images || []).map(fixImage);
      if (state.publishedManifest) {
        state.publishedManifest.images = (state.publishedManifest.images || []).map(fixImage);
        state.publishedManifest.basePath = projectBase;
      }
      state.publishedBasePath = projectBase;
    } catch (error) {
      console.warn("Could not repair cloud image URLs", error);
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

  repairCloudImageUrls();
  if (typeof render === "function") render();
})();
