#!/bin/bash
# Build the extension as two zips — one per store. The shared manifest
# carries enough cross-browser scaffolding (service_worker + scripts
# fallback, browser_specific_settings.gecko.id) that we don't need
# distinct manifests; both stores ignore the keys they don't recognise.
#
# Output:
#   dist/blenduz-token-helper-chrome-X.Y.Z.zip   Chrome Web Store
#   dist/blenduz-token-helper-firefox-X.Y.Z.zip  Firefox AMO
#
# Upload manually:
#   Chrome  - https://chrome.google.com/webstore/devconsole
#   Firefox - https://addons.mozilla.org/developers/

set -euo pipefail

cd "$(dirname "$0")"

VERSION=$(node -p "require('./manifest.json').version")
DIST=dist
SOURCES=(
  manifest.json
  background.js
  popup.html
  popup.js
  popup.css
  icon16.png
  icon48.png
  icon128.png
  LICENSE
  PRIVACY.md
)

mkdir -p "$DIST"
rm -f "$DIST"/*.zip

CHROME_ZIP="$DIST/blenduz-token-helper-chrome-$VERSION.zip"
zip -q -j "$CHROME_ZIP" "${SOURCES[@]}"
echo "  $CHROME_ZIP  ($(du -h "$CHROME_ZIP" | cut -f1))"

FIREFOX_ZIP="$DIST/blenduz-token-helper-firefox-$VERSION.zip"
zip -q -j "$FIREFOX_ZIP" "${SOURCES[@]}"
echo "  $FIREFOX_ZIP  ($(du -h "$FIREFOX_ZIP" | cut -f1))"

echo ""
echo "Done. Upload manually:"
echo "  Chrome  - https://chrome.google.com/webstore/devconsole"
echo "  Firefox - https://addons.mozilla.org/developers/"
