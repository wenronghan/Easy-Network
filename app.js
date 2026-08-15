(() => {
  const publicBase = "https://wenronghan.github.io/Easy-Network/";
  const shareService = "https://easy-network-share.wenronghan7.chatgpt.site";
  localStorage.setItem("easy-network-public-base-url", publicBase);
  localStorage.setItem("easy-network-share-service-url", shareService);

  const nativeFetch = window.fetch.bind(window);
  window.fetch = (input, init) => {
    const rawUrl = typeof input === "string" ? input : input?.url;
    if (rawUrl) {
      const url = new URL(rawUrl, window.location.href);
      const match = url.pathname.match(/^\/shared-projects\/([^/]+)\/project\.json$/);
      if (url.hostname === "wenronghan.github.io" && match) {
        return nativeFetch(`${shareService}/shared-projects/${encodeURIComponent(decodeURIComponent(match[1]))}/project.json`, init);
      }
    }
    return nativeFetch(input, init);
  };

  const loadScript = (src) => {
    const script = document.createElement("script");
    script.src = src;
    script.defer = false;
    document.body.append(script);
    return script;
  };

  const appScript = loadScript(`${shareService}/app.js?v=20260815-github-share`);
  appScript.addEventListener("load", () => {
    loadScript("github-pages-patch.js?v=20260815-clean-links");
  });
})();
