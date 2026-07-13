// Views: Users 

Object.assign(app, {
  renderUsers() {
    const users = this.state.users || [];
    const empty = '<p style="text-align:center;color:var(--gray);padding:24px;">No users yet.</p>';

    const desktopRows = users.map(u => `<tr>
      <td><strong>${u.name}</strong></td>
      <td>${u.email}</td>
      <td><span style="background:${u.role==='admin'?'#760014':'#374151'};color:#D0A95E;padding:2px 10px;border-radius:20px;font-size:11px;font-weight:700;">${u.role.toUpperCase()}</span></td>
      <td>${u.verified ? '✅ Verified' : '⏳ Pending'}</td>
      <td style="text-align:center;">
        <button class="button secondary" style="padding:4px 10px;font-size:11px;" data-change-pwd="${u.id}" data-user-name="${u.name}">🔑 Password</button>
      </td>
    </tr>`).join('');

    const mobileCards = users.map(u => `
      <div class="mobile-card-row">
        <div class="mcr-title">${u.name}</div>
        <div class="mcr-row"><span class="mcr-label">Email</span><span class="mcr-value">${u.email}</span></div>
        <div class="mcr-row"><span class="mcr-label">Role</span><span class="mcr-value">${u.role.toUpperCase()}</span></div>
        <div class="mcr-row"><span class="mcr-label">Status</span><span class="mcr-value">${u.verified ? '✅ Verified' : '⏳ Pending'}</span></div>
        <div class="mcr-actions">
          <button class="button secondary" data-change-pwd="${u.id}" data-user-name="${u.name}">🔑 Change Password</button>
        </div>
      </div>`).join('');

    return `<div class="page-wrap">
      <div class="page-header"><div><h2 class="page-title">Users</h2><p class="page-subtitle">${users.length} users</p></div>
        <button class="button" id="usr-add-btn">+ Add User</button>
      </div>
      <div class="card">
        <div class="desktop-table">
          ${users.length ? `<table>
            <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>${desktopRows}</tbody>
          </table>` : empty}
        </div>
        ${users.length ? mobileCards : `<div class="mobile-card-row"><p style="text-align:center;color:var(--gray);">No users yet.</p></div>`}
      </div>
    </div>`;
  }
});