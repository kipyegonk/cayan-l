const API_BASE = 'https://cayan-api.onrender.com/api';

const OFFLINE = (() => {
  try { return window.location.protocol === 'file:' || !window.location.hostname; } catch(e) { return true; }
})();
