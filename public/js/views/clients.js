// Views: Clients 

Object.assign(app, {
renderClients() {
    const clients = this.state.clients || [];
    return `<div class="view-wrap">
      <div class="page-header">
        <div><h2 class="page-title">Clients</h2><p class="page-subtitle">${clients.length} clients</p></div>
        ${app.hasPermission('clients','add') ? '<button class="button" id="cli-add-btn">+ Add Client</button>' : ''}
      </div>
      <div class="card">
        <table>
          <thead><tr>
            <th>Name</th><th>Type</th><th>Contact Person</th>
            <th>Phone</th><th>WhatsApp</th><th>Email</th>
            <th>Location</th><th>KRA PIN</th>
            <th style="text-align:center;">Actions</th>
          </tr></thead>
          <tbody>${clients.length ? clients.map(c => {
            const typeColors = { individual:'#1D4ED8', corporate:'#059669', ngo:'#D97706', government:'#760014' };
            const typeClr = typeColors[c.type] || '#6B7280';
            return `<tr>
            <td><strong>${c.name}</strong>${c.notes ? '<br><span style="font-size:10px;color:#6B7280;">'+c.notes.substring(0,40)+(c.notes.length>40?'…':'')+'</span>' : ''}</td>
            <td>${c.type ? '<span style="background:'+typeClr+'22;color:'+typeClr+';padding:2px 8px;border-radius:20px;font-size:11px;font-weight:700;text-transform:capitalize;">'+c.type+'</span>' : '—'}</td>
            <td>${c.contact_person||'—'}</td>
            <td>${c.phone ? '<a href="tel:'+c.phone+'" style="color:inherit;">'+c.phone+'</a>' : '—'}</td>
            <td>${c.whatsapp ? '<a href="https://wa.me/254'+c.whatsapp.replace(/^0/,'')+'" target="_blank" style="color:#25D366;">'+c.whatsapp+'</a>' : '—'}</td>
            <td>${c.email ? '<a href="mailto:'+c.email+'" style="color:inherit;">'+c.email+'</a>' : '—'}</td>
            <td>${c.location||'—'}</td>
            <td><span style="font-size:11px;font-family:monospace;">${c.kra_pin||'—'}</span></td>
            <td style="text-align:center;white-space:nowrap;">
              <button class="button secondary" style="padding:4px 10px;font-size:11px;margin-right:4px;" data-edit-client="${c.id}"> Edit</button>
              <button class="button red" style="padding:4px 10px;font-size:11px;" data-del-client="${c.id}"> Delete</button>
            </td>
          </tr>`;}).join('') : '<tr><td colspan="9" style="text-align:center;color:var(--gray);padding:24px;">No clients yet. Click "+ Add Client" to start.</td></tr>'}</tbody>
        </table>
      </div>
    </div>`;
  }
});