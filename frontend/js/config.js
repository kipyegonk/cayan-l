// ── Config & Constants ─────────────────────────────────────────
const API_BASE = (() => {
  try {
    if (window.CAYAN_API_BASE) return window.CAYAN_API_BASE;
    return `${window.location.origin}/api`;
  } catch (e) {
    return '/api';
  }
})();

// ── Offline / Local Storage DB (runs when no PHP server available) ─────────
const OFFLINE = (() => {
  try { return window.location.protocol === 'file:' || !window.location.hostname; } catch(e) { return true; }
