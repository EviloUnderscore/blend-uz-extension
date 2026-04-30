# BlendUz Token Helper

Chrome extension that captures the Qobuz `user_auth_token` from
`play.qobuz.com` so linking BlendUz becomes a one-click copy — no DevTools
acrobatics needed.

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

### Option 1 — Chrome Web Store (recommended)

→ **[Install from Chrome Web Store](https://chromewebstore.google.com/detail/blenduz-token-helper/gckgapodmcemipdhkikgflpgnchcjdpn)** (unlisted — link-only, you need this exact URL to find it)

### Option 2 — Manual (developer mode)

1. Clone this repo or download the latest [release ZIP](./blend-uz-extension.zip)
2. Open Chrome → `chrome://extensions`
3. Toggle **Developer mode** (top-right corner)
4. Click **Load unpacked** and select the folder containing `manifest.json`
5. Pin the extension (puzzle-piece icon → pin "BlendUz Token Helper")

## Use

1. Open `play.qobuz.com` and sign in
2. Play any track to generate API traffic
3. Click the BlendUz extension icon → popup shows `[ CAPTURED ]` with age
4. Click **Copy token** → token is in your clipboard
5. Click **Open BlendUz / Accounts** → paste the token, click *Link Qobuz*

The **BlendUz URL** field at the bottom of the popup is editable — change
it if your BlendUz isn't on `http://localhost:8090` (e.g. behind a
Cloudflare tunnel or a custom domain).

## Repackaging the ZIP

```sh
zip -r blend-uz-extension.zip \
  manifest.json background.js \
  popup.html popup.css popup.js \
  icon16.png icon48.png icon128.png \
  -x "*.DS_Store"
```

## License

MIT — see [LICENSE](./LICENSE).
