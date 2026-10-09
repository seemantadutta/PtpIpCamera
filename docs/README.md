# Project website

The single-page site uses plain HTML, CSS, and JavaScript. No dependencies or build step are required. Assets use relative URLs so the site works under the GitHub Pages project path.

## Preview locally

From the repository root:

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory docs
```

Open http://127.0.0.1:8000. Stop the server with Ctrl+C.

## Publish with GitHub Pages

1. Commit and push `docs/` and `.github/workflows/pages.yml` to `main`.
2. In the repository's **Settings → Pages**, select **GitHub Actions** as the source.
3. Run **Deploy project site to GitHub Pages** from the Actions tab if the initial push ran before Pages was configured. Future changes to the site on `main` deploy automatically.

The expected project URL is https://seemantadutta.github.io/PtpIpCamera/. The deployment workflow reports the actual URL.

Alternatively, omit the workflow and select **Deploy from a branch → main → /docs** in Pages settings. Choose one publishing method.

See [GitHub's custom workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Content and maintenance

- `index.html`: copy, source links, diagram, and starter sketch.
- `style.css`: responsive layout and styles; system fonts, no remote assets.
- `script.js`: illustrative bracket ordering and copy buttons. The page remains readable without JavaScript.
- `favicon.svg`: project icon.

The bracket explorer is illustrative and doesn't connect to hardware. Project notes reflect the current source review; update them as implementation gaps are fixed. The site does not use analytics, trackers, third-party scripts, or external fonts.
