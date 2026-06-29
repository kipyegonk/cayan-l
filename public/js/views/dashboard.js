// Views: Auth, Dashboard, Quotes List 
const CAYAN_LOGO = 'https://i.imgur.com/placeholder.png'; // replaced below

Object.assign(app, {
  renderAuth() {
    const logo = this.state.company?.logo || '';
    const name = this.state.company?.name || 'Cayan Events Ke.';
    return `<div class="auth-screen">
      <div class="auth-center-wrap">
        <div class="auth-logo-top">
          ${logo
            ? `<img src="${logo}" class="auth-logo-img" alt="${name}">`
            : `<div style="font-size:80px;">🏕</div>`
          }
          <div class="auth-company-name">${name}</div>
        </div>
        <div class="auth-card">
          <h2 class="auth-card-title">Welcome Back</h2>
          <p class="auth-card-sub">Sign in to continue</p>
          <div class="auth-field-group">
            <label class="auth-label">Email Address</label>
            <input type="email" id="auth-email" class="input-field"
              placeholder="your@email.com" autocomplete="email">
          </div>
          <div class="auth-field-group">
            <label class="auth-label">Password</label>
            <div style="position:relative;">
              <input type="password" id="auth-password" class="input-field"
                placeholder="Enter your password" style="padding-right:44px;"
                autocomplete="current-password">
              <button type="button"
                style="position:absolute;right:12px;top:50%;transform:translateY(-50%);
                background:none;border:none;cursor:pointer;font-size:16px;"
                onclick="const i=document.getElementById('auth-password');
                i.type=i.type==='password'?'text':'password';
                this.textContent=i.type==='password'?'👁':'🙈';">👁</button>
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
    const logo = this.state.company?.logo || '';
    return `<div class="container">
      <button class="mobile-menu-btn" id="mobile-menu-btn">☰</button>
      <div class="sidebar-backdrop" id="sidebar-backdrop"></div>
      <aside class="sidebar" id="app-sidebar">
        <div class="sidebar-header">
          ${logo ? `<img src="${logo}" alt="Logo" style="width:80px;height:auto;object-fit:contain;display:block;margin-bottom:6px;">` : '<div class="logo">🏕</div>'}
          <div class="company-name">${this.state.company?.name || 'Cayan Events Ke.'}</div>
          <div class="user-name">${this.state.user?.name || ''}</div>
          <div class="role-badge">${(this.state.user?.role || '').toUpperCase()}</div>
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
        <div><h2 class="page-title">Dashboard</h2>
        <p class="page-subtitle">Overview of your quotation activity</p></div>
        <button class="button" onclick="app.setView('newquote')">+ New Quote</button>
      </div>
      <div class="stats-grid">
        <div class="stat-card"><div class="stat-icon">📄</div><div class="stat-label">Total Quotes</div><div class="stat-value">${s.total_quotes||0}</div></div>
        <div class="stat-card"><div class="stat-icon">💰</div><div class="stat-label">Total Value</div><div class="stat-value" style="font-size:13px;">KES ${Number(s.total_value||0).toLocaleString()}</div></div>
        <div class="stat-card"><div class="stat-icon">⏳</div><div class="stat-label">Pending</div><div class="stat-value">${s.pending||0}</div></div>
        <div class="stat-card"><div class="stat-icon">✅</div><div class="stat-label">Accepted</div><div class="stat-value">${s.accepted||0}</div></div>
        <div class="stat-card"><div class="stat-icon">👥</div><div class="stat-label">Clients</div><div class="stat-value">${s.clients||0}</div></div>
      </div>
      <div class="card">
        <h3 style="margin-bottom:14px;font-size:15px;font-weight:800;">Recent Quotes</h3>
        ${this.renderQuotesTable((this.state.quotes||[]).slice(0,5))}
      </div>
    </div>`;
  },

  renderQuotesList() {
    const quotes = this.state.quotes || [];
    const fmt = n => 'KES ' + Number(n||0).toLocaleString('en',{minimumFractionDigits:2});
    const statusColor = {draft:'#6B7280',pending:'#D97706',accepted:'#059669',declined:'#DC2626'};
    const badge = q => `<span style="background:${statusColor[q.status]||'#6B7280'}22;color:${statusColor[q.status]||'#6B7280'};padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;">${q.status||'draft'}</span>`;
    const desktopRows = quotes.map(q => `<tr>
      <td><strong>${q.number||''}</strong></td>
      <td>${q.client_name||''}</td><td>${q.venue||'—'}</td>
      <td>${q.quote_date||''}</td>
      <td><strong>${fmt(q.total)}</strong></td>
      <td>${badge(q)}</td>
      <td><button class="button secondary" style="padding:5px 10px;font-size:12px;" data-preview-quote="${q.id}">👁 Preview</button></td>
    </tr>`).join('');
    const mobileCards = quotes.map(q => `
      <div class="mobile-card-row">
        <div class="mcr-title">${q.number} — ${q.client_name||''}</div>
        <div class="mcr-row"><span class="mcr-label">Venue</span><span class="mcr-value">${q.venue||'—'}</span></div>
        <div class="mcr-row"><span class="mcr-label">Date</span><span class="mcr-value">${q.quote_date||''}</span></div>
        <div class="mcr-row"><span class="mcr-label">Total</span><span class="mcr-value">${fmt(q.total)}</span></div>
        <div class="mcr-row"><span class="mcr-label">Status</span><span class="mcr-value">${badge(q)}</span></div>
        <div class="mcr-actions"><button class="button" style="flex:1;justify-content:center;" data-preview-quote="${q.id}">👁 Preview</button></div>
      </div>`).join('');
    return `<div style="max-width:1100px;">
      <div class="page-header">
        <div><h2 class="page-title">All Quotes</h2><p class="page-subtitle">${quotes.length} total</p></div>
        <button class="button" onclick="app.setView('newquote')">+ New Quote</button>
      </div>
      <div class="card">
        <div class="desktop-table">
          ${quotes.length ? `<table><thead><tr><th>Quote#</th><th>Client</th><th>Venue</th><th>Date</th><th>Total</th><th>Status</th><th></th></tr></thead><tbody>${desktopRows}</tbody></table>` : '<p style="text-align:center;color:var(--gray);padding:24px;">No quotes yet.</p>'}
        </div>
        ${mobileCards}
      </div>
    </div>`;
  },

  renderQuotesTable(quotes) {
    if (!quotes||!quotes.length) return '<p style="text-align:center;color:var(--gray);padding:20px;">No quotes yet.</p>';
    const fmt = n => 'KES '+Number(n||0).toLocaleString('en',{minimumFractionDigits:2});
    const statusColor = {draft:'#6B7280',pending:'#D97706',accepted:'#059669',declined:'#DC2626'};
    const rows = quotes.map(q=>`<tr>
      <td><strong>${q.number||''}</strong></td><td>${q.client_name||''}</td>
      <td>${q.quote_date||''}</td><td><strong>${fmt(q.total)}</strong></td>
      <td><span style="background:${statusColor[q.status]||'#6B7280'}22;color:${statusColor[q.status]||'#6B7280'};padding:3px 8px;border-radius:20px;font-size:11px;font-weight:700;">${q.status||'draft'}</span></td>
      <td><button class="button secondary" style="padding:4px 8px;font-size:11px;" data-preview-quote="${q.id}">👁</button></td>
    </tr>`).join('');
    const mobileCards = quotes.map(q=>`
      <div class="mobile-card-row">
        <div class="mcr-title">${q.number} — ${q.client_name||''}</div>
        <div class="mcr-row"><span class="mcr-label">Total</span><span class="mcr-value">${fmt(q.total)}</span></div>
        <div class="mcr-actions"><button class="button" style="flex:1;justify-content:center;" data-preview-quote="${q.id}">👁 Preview</button></div>
      </div>`).join('');
    return `
      <div class="desktop-table"><table><thead><tr><th>Quote#</th><th>Client</th><th>Date</th><th>Total</th><th>Status</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>
      ${mobileCards}`;
  }
});
