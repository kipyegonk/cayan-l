// ── Views: Clients ──────────────────────────────────────────────

Object.assign(app, {
  renderClients() {
    const clients = this.state.clients || [];
    const empty = '<p style="text-align:center;color:var(--gray);padding:24px;">No clients yet. Click "+ Add Client" to start.</p>';

    const desktopRows = clients.map(c => `<tr>
      <td><strong>${c.name}</strong></td>
      <td>${c.email||'—'}</td>
      <td>${c.phone||'—'}</td>
      <td>${c.contact_person||'—'}</td>
      <td>${c.location||'—'}</td>
      <td style="text-align:center;white-space:nowrap;">
        <button class="button secondary" style="padding:4px 10px;font-size:11px;margin-right:4px;" data-edit-client="${c.id}">✏ Edit</button>
        <button class="button red" style="padding:4px 10px;font-size:11px;" data-del-client="${c.id}">🗑 Delete</button>
      </td>
    </tr>`).join('');

    const mobileCards = clients.map(c => `
      <div class="mobile-card-row">
        <div class="mcr-title">${c.name}</div>
        <div class="mcr-row"><span class="mcr-label">Email</span><span class="mcr-value">${c.email||'—'}</span></div>
        <div class="mcr-row"><span class="mcr-label">Phone</span><span class="mcr-value">${c.phone||'—'}</span></div>
        <div class="mcr-row"><span class="mcr-label">Contact</span><span class="mcr-value">${c.contact_person||'—'}</span></div>
        <div class="mcr-row"><span class="mcr-label">Location</span><span class="mcr-value">${c.location||'—'}</span></div>
        <div class="mcr-actions">
          <button class="button secondary" data-edit-client="${c.id}">✏ Edit</button>
          <button class="button red" data-del-client="${c.id}">🗑 Delete</button>
        </div>
      </div>`).join('');

    return `<div style="max-width:1000px;">
      <div class="page-header">
        <div><h2 class="page-title">Clients</h2><p class="page-subtitle">${clients.length} clients</p></div>
        <button class="button" id="cli-add-btn">+ Add Client</button>
      </div>
      <div class="card">
        <!-- Desktop table -->
        <div class="desktop-table">
          ${clients.length ? `<table>
            <thead><tr>
              <th>Name</th><th>Email</th><th>Phone</th>
              <th>Contact Person</th><th>Location</th><th>Actions</th>
            </tr></thead>
            <tbody>${desktopRows}</tbody>
          </table>` : empty}
        </div>
        <!-- Mobile cards -->
        ${clients.length ? mobileCards : `<div class="mobile-card-row"><p style="text-align:center;color:var(--gray);">No clients yet.</p></div>`}
      </div>
    </div>`;
  }
});
