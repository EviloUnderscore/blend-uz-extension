// BlendUz Token Helper — background service worker (Manifest V3).
//
// Listens to outbound requests on the Qobuz API and captures the
// `x-user-auth-token` header. The token is persisted in chrome.storage.local
// so the popup can read it without needing to refire a request.

const STORAGE_KEY = 'qobuzToken';
const URL_FILTER = ['https://www.qobuz.com/api.json/*'];

// onSendHeaders fires for every outbound request matching the URL filter.
// requestHeaders contains the headers the user-agent is about to send.
chrome.webRequest.onSendHeaders.addListener(
  (details) => {
    if (!details.requestHeaders) return;
    const header = details.requestHeaders.find(
      (h) => h.name.toLowerCase() === 'x-user-auth-token'
    );
    if (!header || !header.value) return;
    chrome.storage.local.set({
      [STORAGE_KEY]: {
        token: header.value,
        capturedAt: Date.now(),
      },
    });
  },
  { urls: URL_FILTER },
  ['requestHeaders']
);

// Optional: clear the cached token on extension install/update so we don't
// surface a stale one from a previous Qobuz account.
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.remove(STORAGE_KEY);
});
