(() => {
  const publicBase = "https://wenronghan.github.io/Easy-Network/";
  const shareService = "https://easy-network-share.wenronghan7.chatgpt.site";
  localStorage.setItem("easy-network-public-base-url", publicBase);
  localStorage.setItem("easy-network-share-service-url", shareService);

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
