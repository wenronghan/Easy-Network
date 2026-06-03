# Easy Network

Easy Network is a browser-based archaeological inventory and similarity network analysis tool. It supports artifact inventory management, custom metadata fields, CSV workflows, and artifact-level similarity network visualization.

## Live site

After GitHub Pages is enabled, the public site will be available at:

https://wenronghan.github.io/Easy-Network/

## Technology stack

- HTML
- CSS
- JavaScript
- Node.js local static server
- IndexedDB and localStorage for browser-side data persistence

## Local use

If Node.js is available, run:

```bash
node server.js
```

Then open:

```text
http://127.0.0.1:4173/index.html
```

The main inventory page is `index.html`. The network analysis workspace is embedded through `network.html`.

## GitHub Pages note

GitHub Pages hosts the static front-end version. The included `server.js` is for local use and for the local screenshot-saving endpoint. Browser-side features that rely on IndexedDB and localStorage remain available to each visitor in their own browser.

## Suggested citation

Ronghan, W. (2026). *Easy Network: Archaeological artifact inventory and similarity network analysis system* (Version 0.1) [Computer software]. GitHub. https://github.com/wenronghan/Easy-Network
