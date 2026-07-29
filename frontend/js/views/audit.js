// Views: Audit Log

Object.assign(app, {
  renderAudit() {
    const logs = this.state.auditLogs || [];
    const users = this.state.users || [];

    const actionColor = {
      login:  '#059669', logout: '#6B7280',
      create: '#1D4ED8', update: '#D97706',
      delete: '#DC2626', view:   '#7C3AED',
    };
    const actionIcon = {
      login:  '', logout: '',
      create: '', update: '',
      delete: '', view:   '',
    };

    return `<div class="view-wrap">
      <div class="page-header">
        <div>
          <h2 class="page-title">Audit Log</h2>
          <p class="page-subtitle">Full activity trail — ${logs.length} entries</p>
        </div>
        <button class="button secondary" id="audit-refresh-btn">🔄 Refresh</button>
      </div>

      <!-- Filters -->
      <div class="card" style="border-top-color:#374151;margin-bottom:14px;">
        <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end;">
          <div style="flex:1;min-width:140px;">
            <label style="font-size:11px;font-weight:700;color:#6B7280;display:block;margin-bottom:4px;">USER</label>
            <select id="audit-filter-user" class="input-field" style="margin:0;">
              <option value="">All Users</option>
              ${users.map(u => `<option value="${u.id}">${u.name}</option>`).join('')}
            </select>
          </div>
          <div style="flex:1;min-width:120px;">
            <label style="font-size:11px;font-weight:700;color:#6B7280;display:block;margin-bottom:4px;">MODULE</label>
            <select id="audit-filter-module" class="input-field" style="margin:0;">
              <option value="">All Modules</option>
              ${['quotes','clients','catalog','users','settings'].map(m =>
                `<option value="${m}" style="text-transform:capitalize;">${m}</option>`
              ).join('')}
            </select>
          </div>
          <div style="flex:1;min-width:110px;">
            <label style="font-size:11px;font-weight:700;color:#6B7280;display:block;margin-bottom:4px;">ACTION</label>
            <select id="audit-filter-action" class="input-field" style="margin:0;">
              <option value="">All Actions</option>
              ${['login','logout','create','update','delete'].map(a =>
                `<option value="${a}">${actionIcon[a]} ${a}</option>`
              ).join('')}
            </select>
          </div>
          <div style="flex:1;min-width:130px;">
            <label style="font-size:11px;font-weight:700;color:#6B7280;display:block;margin-bottom:4px;">FROM DATE</label>
            <input type="date" id="audit-filter-from" class="input-field" style="margin:0;">
          </div>
          <div style="flex:1;min-width:130px;">
            <label style="font-size:11px;font-weight:700;color:#6B7280;display:block;margin-bottom:4px;">TO DATE</label>
            <input type="date" id="audit-filter-to" class="input-field" style="margin:0;">
          </div>
          <button class="button" id="audit-filter-btn" style="align-self:flex-end;">🔍 Filter</button>
          <button class="button secondary" id="audit-clear-btn" style="align-self:flex-end;">✕ Clear</button>
        </div>
      </div>

      <!-- Log table -->
      <div class="card" style="padding:0;border-top-color:#374151;">
        ${logs.length ? `
        <table style="font-size:12px;">
          <thead><tr>
            <th>Date & Time</th>
            <th>User</th>
            <th>Action</th>
            <th>Module</th>
            <th>Target</th>
            <th>Description</th>
            <th>IP Address</th>
          </tr></thead>
          <tbody>
            ${logs.map((log, i) => {
              const clr = actionColor[log.action] || '#6B7280';
              const icon = actionIcon[log.action] || '•';
              const dt = new Date(log.created_at);
              const dateStr = dt.toLocaleDateString('en-KE', { day:'2-digit', month:'short', year:'numeric' });
              const timeStr = dt.toLocaleTimeString('en-KE', { hour:'2-digit', minute:'2-digit', second:'2-digit' });
              return `<tr style="background:${i%2?'#fafafa':'#fff'}">
                <td style="white-space:nowrap;">
                  <div style="font-weight:600;">${dateStr}</div>
                  <div style="color:#6B7280;font-size:11px;">${timeStr}</div>
                </td>
                <td>
                  <div style="font-weight:600;">${log.user_name || '—'}</div>
                  <div style="color:#6B7280;font-size:10px;">${log.user_email || ''}</div>
                </td>
                <td>
                  <span style="background:${clr}22;color:${clr};padding:3px 8px;border-radius:20px;font-size:11px;font-weight:700;white-space:nowrap;">
                    ${icon} ${log.action.toUpperCase()}
                  </span>
                </td>
                <td style="text-transform:capitalize;font-weight:600;">${log.module || '—'}</td>
                <td style="max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${log.target||''}">${log.target || '—'}</td>
                <td style="color:#6B7280;">${log.description || '—'}</td>
                <td style="font-family:monospace;font-size:11px;color:#6B7280;">${log.ip_address || '—'}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>` : `
        <div style="text-align:center;padding:40px;color:#6B7280;">
          <div style="font-size:32px;margin-bottom:12px;">📋</div>
          <div style="font-weight:600;">No audit logs yet</div>
          <div style="font-size:12px;margin-top:4px;">Activity will appear here as users interact with the system</div>
        </div>`}
      </div>
    </div>`;
  },

  async loadAuditLogs(filters = {}) {
    const params = new URLSearchParams(filters).toString();
    const logs = await API.request(`audit${params ? '?' + params : ''}`);
    this.state.auditLogs = Array.isArray(logs) ? logs : [];
    this.state.view = 'audit';
    this.render();
  },
});
