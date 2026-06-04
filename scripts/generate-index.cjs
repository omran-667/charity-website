const fs = require('fs');
const path = require('path');

const clientAssetsDir = path.join(__dirname, '..', 'dist', 'client', 'assets');
const outDir = path.join(__dirname, '..', 'dist', 'client');

function findAsset(pattern) {
  const files = fs.readdirSync(clientAssetsDir);
  return files.find((f) => pattern.test(f));
}

try {
  if (!fs.existsSync(clientAssetsDir)) {
    console.error('Client assets folder not found:', clientAssetsDir);
    process.exit(0);
  }

  const jsFile = findAsset(/^index-.*\.js$/) || findAsset(/^index-.*\.js$/) || 'index.js';
  const cssFile = findAsset(/^styles-.*\.css$/) || '';

  const cssTag = cssFile ? `<link rel="stylesheet" href="./assets/${cssFile}">` : '';
  const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Site</title>
    ${cssTag}
  </head>
  <body>
    <div id="root"></div>
    <script>
      // Minimal bootstrap data for TanStack Router SSR hydration in SPA mode.
      // This prevents @tanstack/router-core from throwing when no server
      // hydration payload is present (static SPA deploys).
      window.$_TSR = window.$_TSR || {};
      window.$_TSR.buffer = window.$_TSR.buffer || [];
      window.$_TSR.t = window.$_TSR.t || new Map();
      window.$_TSR.initialized = window.$_TSR.initialized || false;
      window.$_TSR.router = window.$_TSR.router || { matches: [], lastMatchId: null, manifest: null, dehydratedData: null };
    </script>
    <script type="module" src="./assets/${jsFile}"></script>
  </body>
</html>`;

  fs.writeFileSync(path.join(outDir, 'index.html'), html);
  console.log('Generated', path.join(outDir, 'index.html'));
} catch (err) {
  console.error(err);
  process.exit(1);
}
