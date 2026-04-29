# BlendUz Token Helper — Privacy Policy

_Last updated: 2026-04-29_

## What this extension does

BlendUz Token Helper observes outbound HTTP requests on
`https://*.qobuz.com/*` to capture the value of the `x-user-auth-token`
HTTP header. The captured value is stored locally inside the extension's
isolated `chrome.storage.local` partition so it can be quickly copied
into the BlendUz web application.

## Data we collect

- **The Qobuz user authentication token (`x-user-auth-token`)** —
  captured from your own browser's outbound requests to Qobuz when you
  are signed in to `play.qobuz.com`.
- **The BlendUz instance URL you configure** in the popup (default:
  `http://localhost:8090`), used only to open the BlendUz Accounts page
  on click.

## Where the data goes

**Nowhere.** All captured data stays inside the extension's local
storage on your own device. The extension makes no network requests to
any server — it only reads request headers as they pass through your
own browser. We do not run any analytics, telemetry, error reporting or
remote logging.

The token is only ever copied to your clipboard when you explicitly
click the "Copy token" button.

## Permissions justification

| Permission | Why |
|------------|-----|
| `webRequest` | Read the `x-user-auth-token` header from your own outgoing requests to Qobuz. |
| `storage`    | Persist the captured token + your BlendUz URL between popup sessions. |
| `host_permissions: https://*.qobuz.com/*` | Limit the request observation to Qobuz only — no other site is monitored. |

The extension does NOT use `tabs.executeScript`, content scripts, the
remote code execution permissions, or any analytics/tracking SDK.

## Retention & deletion

The token is stored only on your device. It is automatically cleared
when you uninstall the extension or when you reset Chrome's local
storage. You may also clear it manually by going to
`chrome://extensions` → BlendUz Token Helper → "Storage usage" → Reset.

## Source code

The extension is open source. You can audit the full source at
[github.com/EviloUnderscore/blenduz-extension](https://github.com/EviloUnderscore/blenduz-extension).

## Contact

For questions about this extension or its data handling, please open an
issue on the project repository.
