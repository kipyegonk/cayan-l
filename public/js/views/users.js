// Views: Users

Object.assign(app, {
renderUsers() {
    const users = this.state.users || [];
    const MODULES = ['catalog','clients','quotes','stats','settings'];
    const ACTIONS = ['view','add','edit','delete'];

    return `<div class="view-wrap">
      <div class="page-header">
        <div>
          <h2 class="page-title">Users & Permissions</h2>
          <p class="page-subtitle">${users.length} user${users.length!==1?'s':''}</p>
        </div>
        <button class="button" id="usr-add-btn">+ Add User</button>
      </div>

      <div class="card">
        <table>
          <thead><tr>
            <th>Name</th><th>Email</th><th>Phone</th>
            <th>Job Title</th><th>Department</th>
            <th>Role</th><th>Status</th><th>Actions</th>
          </tr></thead>
          <tbody>${users.length ? users.map(u => {
            const perms = u.permissions || {};
            return `<tr>
              <td><strong>${u.name}</strong></td>
              <td><a href="mailto:${u.email}" style="color:inherit;">${u.email}</a></td>
              <td>${u.phone ? '<a href="tel:'+u.phone+'" style="color:inherit;">'+u.phone+'</a>' : '—'}</td>
              <td>${u.job_title||'—'}</td>
              <td>${u.department||'—'}</td>
              <td><span style="background:${u.role==='admin'?'#760014':'#374151'};color:#D0A95E;padding:2px 10px;border-radius:20px;font-size:11px;font-weight:700;">${u.role.toUpperCase()}</span></td>
              <td>${u.verified?'✅ Active':'⏳ Pending'}</td>
              <td style="white-space:nowrap;">
                <button class="button secondary" style="padding:4px 8px;font-size:11px;margin-right:4px;" data-edit-user="${u.id}">✏ Edit</button>
                <button class="button secondary" style="padding:4px 8px;font-size:11px;margin-right:4px;" data-perms-user="${u.id}"> Perms</button>
                <button class="button red" style="padding:4px 8px;font-size:11px;" data-del-user="${u.id}">Delete</button>
              </td>
            </tr>`;
          }).join('') : '<tr><td colspan="8" style="text-align:center;color:var(--gray);padding:24px;">No users yet.</td></tr>'}</tbody>
        </table>
      </div>

      <!-- Permissions legend -->
      <div class="card" style="border-top-color:#374151;">
        <h3 style="font-size:13px;font-weight:700;color:#374151;margin-bottom:12px;"> Permissions Overview</h3>
        <div style="overflow-x:auto;">
          <table style="font-size:12px;">
            <thead><tr>
              <th>User</th>
              ${MODULES.map(m => `<th colspan="${m==='stats'||m==='settings'?2:4}" style="text-align:center;text-transform:capitalize;">${m}</th>`).join('')}
            </tr>
            <tr style="background:#f8f8f8;">
              <th></th>
              ${MODULES.map(m => {
                const acts = m==='stats'?['view']:m==='settings'?['view','edit']:ACTIONS;
                return acts.map(a => `<th style="font-size:10px;color:#6B7280;font-weight:600;">${a}</th>`).join('');
              }).join('')}
            </tr></thead>
            <tbody>${users.filter(u=>u.role!=='admin').map(u => {
              const p = u.permissions || {};
              return `<tr>
                <td><strong>${u.name}</strong></td>
                ${MODULES.map(m => {
                  const acts = m==='stats'?['view']:m==='settings'?['view','edit']:ACTIONS;
                  return acts.map(a => `<td style="text-align:center;">${(p[m]&&p[m][a])?'✅':'❌'}</td>`).join('');
                }).join('')}
              </tr>`;
            }).join('') || '<tr><td colspan="20" style="text-align:center;color:#6B7280;padding:12px;">No staff users. Admins have full access.</td></tr>'}</tbody>
          </table>
        </div>
      </div>
    </div>`;
  }
});