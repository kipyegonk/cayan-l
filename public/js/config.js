// Config & Constants ─────────────────────────────────────────
const API_BASE = window.location.hostname === 'cayan-l.vercel.app'
  ? 'https://cayan-api.onrender.com/api'
  : '/api';

// ── Offline / Local Storage DB ─────────────────────────────────
const OFFLINE = (() => {
  try { return window.location.protocol === 'file:' || !window.location.hostname; } catch(e) { return true; }
})();
