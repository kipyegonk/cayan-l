// Boot — initialize app on page load ─────────────────────────
// Boot
window.addEventListener('load', async () => {
  const token = localStorage.getItem('auth_token');
  const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
  if (token && storedUser) {
    try {
      const verified = await API.auth.verify();
      if (verified.valid) {
        app.state.user = verified.user;
        app.state.page = 'app';
        app.loadAppData();
        return;
      }
    } catch(e) {}
    // If PHP verify fails but we have a stored user (offline/local session), trust it
    if (token === 'offline_token' || OFFLINE) {
      app.state.user = storedUser;
      app.state.page = 'app';
      app.loadAppData();
      return;
    }
    // Real server rejected token — clear and show login
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    app.state.loading = false;
    app.render();
  } else {
    app.state.loading = false;
    app.render();
  }
});