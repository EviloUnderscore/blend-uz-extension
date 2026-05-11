# BlendUz Token Helper

Chrome / Firefox extension that captures the Qobuz `user_auth_token`
from `play.qobuz.com` so linking BlendUz becomes a one-click copy — no
DevTools acrobatics needed.

> **What is BlendUz?** A self-hosted playlist generator that combines your
> Last.fm history and Qobuz favorites to produce playlists Qobuz alone
> can't build. This extension is a small companion that solves the friction
> of grabbing your Qobuz session token.

## How it works

1. You sign in to `play.qobuz.com` and play any track
2. The extension reads the outgoing `x-user-auth-token` header on the
   resulting Qobuz API call (via `webRequest.onSendHeaders`)
3. The value is stored locally in `chrome.storage.local`
4. The popup gives you a one-click "Copy token" button to paste into BlendUz

The token never leaves your browser. The extension makes **zero network
requests of its own** — no telemetry, no analytics, no remote code.

## Permissions

| Permission | Why |
|-----------|-----|
| `webRequest` | Read outgoing request headers on Qobuz API calls (no blocking, no modification) |
| `storage` | Persist the captured token + your BlendUz instance URL |
| `host_permissions: https://*.qobuz.com/*` | Limit observation strictly to Qobuz endpoints |

See [PRIVACY.md](./PRIVACY.md) for the full data-handling policy.

## Install

### Option 1 — Chrome Web Store

→ **[Install from Chrome Web Store](https://chromewebstore.google.com/detail/blenduz-token-helper/gckgapodmcemipdhkikgflpgnchcjdpn)** (unlisted — link-only, you need this exact URL to find it)

### Option 2 — Firefox Add-ons (AMO)

→ Pending submission to [addons.mozilla.org](https://addons.mozilla.org/). Once published the link will appear here. In the meantime, use the manual install below.

### Option 3 — Manual (developer mode)

#### Chrome

1. Clone this repo and run `./build.sh` (or grab `dist/blenduz-token-helper-chrome-X.Y.Z.zip` from a release)
2. Open Chrome → `chrome://extensions`
3. Toggle **Developer mode** (top-right corner)
4. Click **Load unpacked** and select the folder containing `manifest.json`
5. Pin the extension (puzzle-piece icon → pin "BlendUz Token Helper")

#### Firefox

1. Run `./build.sh` to produce `dist/blenduz-token-helper-firefox-X.Y.Z.zip`
2. Open Firefox → `about:debugging#/runtime/this-firefox`
3. Click **Load Temporary Add-on…** and pick the unzipped `manifest.json` (or for permanent install, see AMO above)

> Cross-browser note: a single `manifest.json` works on both. The `background` block declares both `service_worker` (Chrome MV3) and `scripts` (Firefox MV3); each browser ignores the field it doesn't recognise. The `browser_specific_settings.gecko.id` is required by AMO and ignored by Chrome.

## Use

1. Open `play.qobuz.com` and sign in
2. Play any track to generate API traffic
3. Click the BlendUz extension icon → popup shows `[ CAPTURED ]` with age
4. Click **Copy token** → token is in your clipboard
5. Click **Open BlendUz / Accounts** → paste the token, click *Link Qobuz*

The **BlendUz URL** field at the bottom of the popup is editable — change
it if your BlendUz isn't on `http://localhost:8090` (e.g. behind a
Cloudflare tunnel or a custom domain).

## Build

```sh
./build.sh
```

Produces:
- `dist/blenduz-token-helper-chrome-<version>.zip` — Chrome Web Store
- `dist/blenduz-token-helper-firefox-<version>.zip` — Firefox AMO

The two zips are byte-identical content-wise (single shared codebase); separate artefacts only so each store gets its own upload cycle.

## Publish

Upload each zip on its store's developer console:
- Chrome — <https://chrome.google.com/webstore/devconsole>
- Firefox — <https://addons.mozilla.org/developers/>

Mozilla review on simple extensions is usually <24h.

## License

MIT — see [LICENSE](./LICENSE).
