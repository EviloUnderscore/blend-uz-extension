// BlendUz Token Helper — popup logic.

const STORAGE_TOKEN = 'qobuzToken';
// Hard-coded production URL — there is one BlendUz deployment, not
// many. The URL never changes for end-users; only the maintainer
// flips it to localhost during local dev (by editing this constant
// in their working copy).
const BLENDUZ_URL = 'https://blenduz.evilo.eu';

const $ = (id) => document.getElementById(id);

// === States ==================================================================

function showLoading() {
  $('loading').hidden = false;
  $('captured').hidden = true;
  $('empty').hidden = true;
}

function showCaptured(token, capturedAt) {
  $('loading').hidden = true;
  $('captured').hidden = false;
  $('empty').hidden = true;
  $('age').textContent = formatAge(Date.now() - capturedAt);

  const copyBtn = $('copy');
  const openBtn = $('open');

  copyBtn.onclick = async () => {
    try {
      await navigator.clipboard.writeText(token);
      copyBtn.querySelector('span:first-child').textContent = 'Copied';
      copyBtn.querySelector('span:last-child').textContent = '✓';
      setTimeout(() => {
        copyBtn.querySelector('span:first-child').textContent = 'Copy token';
        copyBtn.querySelector('span:last-child').textContent = '→';
      }, 1800);
    } catch (err) {
      console.error('clipboard write failed', err);
    }
  };

  openBtn.onclick = () => {
    chrome.tabs.create({ url: `${BLENDUZ_URL}/accounts` });
    window.close();
  };
}

function showEmpty() {
  $('loading').hidden = true;
  $('captured').hidden = true;
  $('empty').hidden = false;

  $('open-qobuz').onclick = () => {
    chrome.tabs.create({ url: 'https://play.qobuz.com' });
    window.close();
  };
}

// === Utils ===================================================================

function formatAge(ms) {
  const sec = Math.floor(ms / 1000);
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  return `${day}d ago`;
}

// === Init ====================================================================

async function init() {
  showLoading();
  const data = await chrome.storage.local.get(STORAGE_TOKEN);
  const entry = data[STORAGE_TOKEN];
  if (entry && entry.token) {
    showCaptured(entry.token, entry.capturedAt);
  } else {
    showEmpty();
  }
}

init();
