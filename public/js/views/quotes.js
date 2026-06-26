// ── Views: Quotes 

Object.assign(app, {
  renderQuotesList() {
    const quotes = this.state.quotes || [];
    const fmt = n => 'KES ' + Number(n||0).toLocaleString('en',{minimumFractionDigits:2,maximumFractionDigits:2});
    const statusColor = {draft:'#6B7280',pending:'#D97706',accepted:'#059669',declined:'#DC2626'};
    const badge = q => `<span style="background:${statusColor[q.status]||'#6B7280'}22;color:${statusColor[q.status]||'#6B7280'};padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;text-transform:uppercase;">${q.status||'draft'}</span>`;
    const empty = '<p style="text-align:center;color:var(--gray);padding:24px;">No quotes yet. Click "+ New Quote" to start.</p>';

    const desktopRows = quotes.map(q => `<tr>
      <td><strong>${q.number||''}</strong></td>
      <td>${q.client_name||''}</td>
      <td>${q.venue||'—'}</td>
      <td>${q.quote_date||''}</td>
      <td><strong>${fmt(q.total)}</strong></td>
      <td>${badge(q)}</td>
      <td style="text-align:center;">
        <button class="button secondary" style="padding:5px 10px;font-size:12px;" data-preview-quote="${q.id}">👁 Preview</button>
      </td>
    </tr>`).join('');

    const mobileCards = quotes.map(q => `
      <div class="mobile-card-row">
        <div class="mcr-title">${q.number||''} — ${q.client_name||''}</div>
        <div class="mcr-row"><span class="mcr-label">Venue</span><span class="mcr-value">${q.venue||'—'}</span></div>
        <div class="mcr-row"><span class="mcr-label">Date</span><span class="mcr-value">${q.quote_date||'—'}</span></div>
        <div class="mcr-row"><span class="mcr-label">Total</span><span class="mcr-value" style="color:var(--maroon);font-weight:700;">${fmt(q.total)}</span></div>
        <div class="mcr-row"><span class="mcr-label">Status</span><span class="mcr-value">${badge(q)}</span></div>
        <div class="mcr-actions">
          <button class="button" style="flex:1;justify-content:center;" data-preview-quote="${q.id}">👁 Preview</button>
        </div>
      </div>`).join('');

    return `<div style="max-width:1100px;">
      <div class="page-header">
        <div><h2 class="page-title">All Quotes</h2><p class="page-subtitle">${quotes.length} total</p></div>
        <button class="button" onclick="app.setView('newquote')">+ New Quote</button>
      </div>
      <div class="card">
        <div class="desktop-table">
          ${quotes.length ? `<table>
            <thead><tr>
              <th>Quote #</th><th>Client</th><th>Venue</th>
              <th>Date</th><th>Total</th><th>Status</th><th>Actions</th>
            </tr></thead>
            <tbody>${desktopRows}</tbody>
          </table>` : empty}
        </div>
        ${quotes.length ? mobileCards : `<div class="mobile-card-row"><p style="text-align:center;color:var(--gray);">No quotes yet.</p></div>`}
      </div>
    </div>`;
  },

  renderQuotesTable(quotes) {
    const fmt = n => 'KES ' + Number(n||0).toLocaleString('en',{minimumFractionDigits:2});
    const statusColor = {draft:'#6B7280',pending:'#D97706',accepted:'#059669',declined:'#DC2626'};
    if (!quotes || !quotes.length) return '<p style="text-align:center;color:var(--gray);padding:20px;">No quotes yet.</p>';
    const desktopRows = quotes.map(q => `<tr>
      <td><strong>${q.number||''}</strong></td>
      <td>${q.client_name||''}</td>
      <td>${q.quote_date||''}</td>
      <td><strong>${fmt(q.total)}</strong></td>
      <td><span style="background:${statusColor[q.status]||'#6B7280'}22;color:${statusColor[q.status]||'#6B7280'};padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;">${q.status||'draft'}</span></td>
      <td><button class="button secondary" style="padding:5px 10px;font-size:12px;" data-preview-quote="${q.id}">👁 Preview</button></td>
    </tr>`).join('');
    const mobileCards = quotes.map(q => `
      <div class="mobile-card-row">
        <div class="mcr-title">${q.number} — ${q.client_name||''}</div>
        <div class="mcr-row"><span class="mcr-label">Total</span><span class="mcr-value">${fmt(q.total)}</span></div>
        <div class="mcr-actions">
          <button class="button" style="flex:1;justify-content:center;" data-preview-quote="${q.id}">👁 Preview</button>
        </div>
      </div>`).join('');
    return `
      <div class="desktop-table">
        <table><thead><tr><th>Quote#</th><th>Client</th><th>Date</th><th>Total</th><th>Status</th><th></th></tr></thead>
        <tbody>${desktopRows}</tbody></table>
      </div>
      ${mobileCards}`;
  }
});
