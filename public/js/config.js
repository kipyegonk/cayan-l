// ── Config & Constants ─────────────────────────────────────────
const API_BASE = '/api';

// ── Offline / Local Storage DB (runs when no PHP server available) ─────────
const OFFLINE = (() => {
  try { return window.location.protocol === 'file:' || !window.location.hostname; } catch(e) { return true; }
})();