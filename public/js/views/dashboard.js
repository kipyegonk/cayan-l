// Views: Auth, Dashboard, Quotes List 

Object.assign(app, {
renderAuth() {
    const storedCompany = (function(){ try { return JSON.parse(localStorage.getItem('cayan_company') || 'null'); } catch(e){ return null; } })();
    const logo = this.state.company?.logo || storedCompany?.logo || (typeof CAYAN_LOGO_B64 !== 'undefined' ? CAYAN_LOGO_B64 : '');
    return `<div class="auth-screen clean" style="background: linear-gradient(145deg, #760014 0%, #4a000d 100%); min-height: 100vh;">
      <div class="login-box" style="background: #fff;">
        <div style="display:flex;justify-content:center;margin-bottom:16px;">
          ${logo
            ? `<img src="${logo}" alt="Cayan logo" style="max-width:140px;max-height:72px;object-fit:contain;">`
            : `<svg width="140" height="72" viewBox="0 0 240 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="10" width="60" height="60" rx="16" fill="#760014"/>
                <path d="M38 26C38 24.3431 39.3431 23 41 23H50C51.6569 23 53 24.3431 53 26V54C53 55.6569 51.6569 57 50 57H41C39.3431 57 38 55.6569 38 54V26Z" fill="#D0A95E"/>
                <path d="M42 31V50" stroke="#760014" stroke-width="4" stroke-linecap="round"/>
                <path d="M45 31H51" stroke="#760014" stroke-width="4" stroke-linecap="round"/>
                <path d="M84 26H122" stroke="#760014" stroke-width="8" stroke-linecap="round"/>
                <path d="M84 42H116" stroke="#760014" stroke-width="8" stroke-linecap="round"/>
                <path d="M84 58H108" stroke="#760014" stroke-width="8" stroke-linecap="round"/>
              </svg>`}
        </div>
        <h2 class="auth-title">Sign In</h2>

        <div class="auth-fields">
          <div class="auth-field-group">
            <label class="auth-label">Email Address</label>
            <div class="auth-input-wrap">
              <span class="auth-input-icon">✉️</span>
              <input type="email" id="auth-email" class="auth-input" placeholder="your@email.com" autocomplete="email">
            </div>
          </div>

          <div class="auth-field-group">
            <label class="auth-label">Password</label>
            <div class="auth-input-wrap">
              <span class="auth-input-icon">🔒</span>
              <input type="password" id="auth-password" class="auth-input" placeholder="Enter your password" autocomplete="current-password">
              <button type="button" class="auth-eye-btn" onclick="
                const inp = document.getElementById('auth-password');
                inp.type = inp.type==='password' ? 'text' : 'password';
                this.textContent = inp.type==='password' ? '👁' : '🙈';
              ">👁</button>
            </div>
          </div>
        </div>

        <button id="auth-submit" class="auth-submit-btn">
          Sign In
        </button>
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
    return `<button class="mobile-menu-btn" id="mobile-menu-btn">☰</button>
      <div class="sidebar-backdrop" id="sidebar-backdrop"></div>
      <div class="container">
      <aside class="sidebar">
        <div class="sidebar-header">
          ${this.state.company.logo
            ? '<img src="' + this.state.company.logo + '" alt="Logo" style="width:48px;height:auto;object-fit:contain;display:block;margin-bottom:6px;border-radius:4px;">'
            : '<div class="logo">📋</div>'
          }
          <div class="company-name">${this.state.company.name || 'QuoteSystem'}</div>
          <div class="user-name">${this.state.user?.name || ''}</div>
          <div class="role-badge">${(this.state.user?.role || '').toUpperCase()}</div>
          ${OFFLINE ? '<div style="background:#D97706;color:#fff;font-size:9px;font-weight:700;padding:2px 8px;border-radius:10px;margin-top:6px;text-align:center;">⚡ OFFLINE MODE</div>' : ''}
        </div>
        <nav>${navItems.map(i => `<button class="nav-item ${this.state.view === i.id ? 'active' : ''}" data-view="${i.id}" title="${i.label}"><span>${i.emoji}</span><span class="nav-label">${i.label}</span></button>`).join('')}</nav>
        <div class="sidebar-footer"><button id="logout-btn" class="logout-btn" title="Sign Out">🚪 <span class="nav-label">Sign Out</span></button></div>
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
    return `<div class="view-wrap">
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
    return `<div class="view-wrap">
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
    const statusLabel = { draft: ' Draft', pending: ' Pending', accepted: ' Accepted', declined: ' Declined' };
    return `<table>
      <thead><tr>
        <th>Quote #</th><th>Client</th><th>Date</th><th>Total</th><th>Status</th><th>Actions</th>
      </tr></thead>
      <tbody>${quotes.map(q => {
        const st = q.status || 'draft';
        const clr = statusColor[st] || '#6B7280';
        return `<tr>
          <td><strong>${q.number || ''}</strong></td>
          <td>${q.client_name || ''}</td>
          <td>${helpers.formatDate(q.quote_date)}</td>
          <td><strong>${helpers.formatMoney(q.total, this.state.company.currency || 'KES')}</strong></td>
          <td>
            <select data-status-quote="${q.id}" style="background:${clr}22;color:${clr};border:1px solid ${clr}55;padding:3px 8px;border-radius:20px;font-size:11px;font-weight:700;text-transform:uppercase;cursor:pointer;outline:none;">
              ${['draft','pending','accepted','declined'].map(s =>
                `<option value="${s}" ${st===s?'selected':''}>${statusLabel[s]}</option>`
              ).join('')}
            </select>
          </td>
          <td style="white-space:nowrap;">
            <button class="button secondary" style="padding:5px 10px;font-size:12px;margin-right:4px;" data-preview-quote="${q.id}"> Preview</button>
            <button class="button secondary" style="padding:5px 10px;font-size:12px;" data-edit-quote="${q.id}"> Edit</button>
          </td>
        </tr>`;
      }).join('')}
      </tbody>
    </table>`;
  },

  //  NEW QUOTE FORM 
});