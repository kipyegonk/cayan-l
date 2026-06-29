// ── Views: Auth, Dashboard, Quotes List ────────────────────────
// These methods are mixed into the app object in app-core.js

Object.assign(app, {
renderAuth() {
    const logo = this.state.company?.logo || 'data:image/jpeg;base64,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';
    const companyName = this.state.company?.name || 'Cayan Events Ke.';
    return `<div class="auth-screen">
      <div class="auth-center-wrap">
        <!-- Logo -->
        <div class="auth-logo-top">
          <img src="${logo}" alt="${companyName}" class="auth-logo-img">
          <div class="auth-company-name">${companyName}</div>
        </div>
        <!-- Card -->
        <div class="auth-card">
          <h2 class="auth-card-title">Welcome Back</h2>
          <p class="auth-card-sub">Sign in to your account to continue</p>
          <div class="auth-field-group">
            <label class="auth-label">Email Address</label>
            <input type="email" id="auth-email" class="input-field" placeholder="your@email.com" autocomplete="email">
          </div>
          <div class="auth-field-group">
            <label class="auth-label">Password</label>
            <div style="position:relative;">
              <input type="password" id="auth-password" class="input-field" placeholder="Enter your password" autocomplete="current-password" style="padding-right:44px;">
              <button type="button" style="position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;font-size:16px;color:var(--gray);"
                onclick="const i=document.getElementById('auth-password');i.type=i.type==='password'?'text':'password';this.textContent=i.type==='password'?'👁':'🙈';">👁</button>
            </div>
          </div>
          <button id="auth-submit" class="auth-submit-btn">Sign In →</button>
        </div>
      </div>
    </div>`;
  },

  renderAppShell() {
    const navItems = [
      { id: 'dashboard', emoji: '⊞', label: 'Dashboard' },
      { id: 'newquote',  emoji: '📝', label: 'New Quote' },
      { id: 'quotes',    emoji: '📄', label: 'All Quotes' },
      { id: 'catalog',   emoji: '📦', label: 'Catalog' },
      { id: 'clients',   emoji: '👥', label: 'Clients' },
      ...(this.state.user?.role === 'admin' ? [{ id: 'users', emoji: '🔑', label: 'Users' }] : []),
      { id: 'settings',  emoji: '⚙️', label: 'Settings' },
    ];
    return `<div class="container">
      <aside class="sidebar">
        <div class="sidebar-header">
          ${this.state.company.logo
            ? '<img src="' + this.state.company.logo + '" alt="Logo" style="width:80px;height:auto;object-fit:contain;display:block;margin-bottom:6px;border-radius:4px;">'
            : '<div class="logo">📋</div>'
          }
          <div class="company-name">${this.state.company.name || 'QuoteSystem'}</div>
          <div class="user-name">${this.state.user?.name || ''}</div>
          <div class="role-badge">${(this.state.user?.role || '').toUpperCase()}</div>
          ${OFFLINE ? '<div style="background:#D97706;color:#fff;font-size:9px;font-weight:700;padding:2px 8px;border-radius:10px;margin-top:6px;text-align:center;">⚡ OFFLINE MODE</div>' : ''}
        </div>
        <nav>${navItems.map(i => `<button class="nav-item ${this.state.view === i.id ? 'active' : ''}" data-view="${i.id}"><span>${i.emoji}</span>${i.label}</button>`).join('')}</nav>
        <div class="sidebar-footer"><button id="logout-btn" class="logout-btn">🚪 Sign Out</button></div>
      </aside>
      <main class="main">${this.renderViewContent()}</main>
    </div>`;
  },

  renderViewContent() {
    switch (this.state.view) {
      case 'dashboard': return this.renderDashboard();
      case 'newquote':  return this.renderNewQuote();
      case 'quotes':    return this.renderQuotesList();
      case 'catalog':   return this.renderCatalog();
      case 'clients':   return this.renderClients();
      case 'users':     return this.renderUsers();
      case 'settings':  return this.renderSettings();
      default: return '';
    }
  },

  renderDashboard() {
    const s = this.state.stats || {};
    return `<div style="max-width:1100px;">
      <div class="page-header">
        <div><h2 class="page-title">Dashboard</h2><p class="page-subtitle">Overview of your quotation activity</p></div>
        <button class="button" onclick="app.setView('newquote')">+ New Quote</button>
      </div>
      <div class="stats-grid">
        <div class="stat-card"><div class="stat-icon">📄</div><div class="stat-label">Total Quotes</div><div class="stat-value">${s.total_quotes || 0}</div></div>
        <div class="stat-card" style="border-top-color:var(--green);"><div class="stat-icon">💰</div><div class="stat-label">Total Value</div><div class="stat-value" style="font-size:15px;">${helpers.formatMoney(s.total_value, this.state.company.currency)}</div></div>
        <div class="stat-card" style="border-top-color:var(--amber);"><div class="stat-icon">⏳</div><div class="stat-label">Pending</div><div class="stat-value">${s.pending || 0}</div></div>
        <div class="stat-card" style="border-top-color:var(--green);"><div class="stat-icon">✅</div><div class="stat-label">Accepted</div><div class="stat-value">${s.accepted || 0}</div></div>
        <div class="stat-card" style="border-top-color:#7C3AED;"><div class="stat-icon">👥</div><div class="stat-label">Clients</div><div class="stat-value">${s.clients || 0}</div></div>
      </div>
      <div class="card">
        <h3 style="margin-bottom:14px;font-size:15px;font-weight:800;">Recent Quotes</h3>
        ${this.renderQuotesTable(this.state.quotes.slice(0, 5))}
      </div>
    </div>`;
  },

  renderQuotesList() {
    return `<div style="max-width:1100px;">
      <div class="page-header">
        <div><h2 class="page-title">All Quotes</h2><p class="page-subtitle">${this.state.quotes.length} total quotes</p></div>
        <button class="button" onclick="app.setView('newquote')">+ New Quote</button>
      </div>
      <div class="card">${this.renderQuotesTable(this.state.quotes)}</div>
    </div>`;
  },

  renderQuotesTable(quotes) {
    if (!quotes || quotes.length === 0) {
      return `<p style="text-align:center;color:var(--gray);padding:30px;">No quotes yet. <a href="#" onclick="app.setView('newquote')" style="color:var(--blue);">Create your first quote</a>.</p>`;
    }
    const statusColor = { draft: '#6B7280', pending: '#D97706', accepted: '#059669', declined: '#DC2626' };
    return `<table>
      <thead><tr>
        <th>Quote #</th><th>Client</th><th>Date</th><th>Total</th><th>Status</th><th>Actions</th>
      </tr></thead>
      <tbody>${quotes.map(q => `
        <tr>
          <td><strong>${q.number || ''}</strong></td>
          <td>${q.client_name || ''}</td>
          <td>${helpers.formatDate(q.quote_date)}</td>
          <td><strong>${helpers.formatMoney(q.total, this.state.company.currency || 'KES')}</strong></td>
          <td><span style="background:${statusColor[q.status]||'#6B7280'}22;color:${statusColor[q.status]||'#6B7280'};padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;text-transform:uppercase;">${q.status || 'draft'}</span></td>
          <td>
            <button class="button secondary" style="padding:5px 10px;font-size:12px;" data-preview-quote="${q.id}">👁 Preview</button>
          </td>
        </tr>`).join('')}
      </tbody>
    </table>`;
  },

  // ── NEW QUOTE FORM ──────────────────────────────────────────────────────────
});
