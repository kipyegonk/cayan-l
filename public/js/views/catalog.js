// ── Views: Catalog 

const CATEGORIES = ['Tents & Structures','Flowers & Décor','Lighting','Furniture','Catering','Logistics','Audio Visual','Miscellaneous'];
const UNITS      = ['pcs','set','day','hr','table','chair','per person','lot','m²','kg'];

Object.assign(app, {
  renderCatalog() {
    const items = this.state.catalog || [];
    const fmt = n => Number(n||0).toLocaleString('en',{minimumFractionDigits:2,maximumFractionDigits:2});
    const empty = '<p style="text-align:center;color:var(--gray);padding:24px;">No catalog items yet.</p>';

    const desktopRows = items.map(i => `<tr>
      <td><strong>${i.name}</strong></td>
      <td>${i.category||'—'}</td>
      <td>${i.unit||'—'}</td>
      <td style="text-align:right;">KES ${fmt(i.cost_price)}</td>
      <td style="text-align:right;">${i.margin||0}%</td>
      <td style="text-align:right;font-weight:700;">KES ${fmt(i.unit_price)}</td>
      <td style="text-align:center;white-space:nowrap;">
        <button class="button secondary" style="padding:4px 10px;font-size:11px;margin-right:4px;" data-edit-catalog="${i.id}">✏ Edit</button>
        <button class="button red" style="padding:4px 10px;font-size:11px;" data-del-catalog="${i.id}">🗑 Delete</button>
      </td>
    </tr>`).join('');

    const mobileCards = items.map(i => `
      <div class="mobile-card-row">
        <div class="mcr-title">${i.name}</div>
        <div class="mcr-row"><span class="mcr-label">Category</span><span class="mcr-value">${i.category||'—'}</span></div>
        <div class="mcr-row"><span class="mcr-label">Unit</span><span class="mcr-value">${i.unit||'—'}</span></div>
        <div class="mcr-row"><span class="mcr-label">Cost</span><span class="mcr-value">KES ${fmt(i.cost_price)}</span></div>
        <div class="mcr-row"><span class="mcr-label">Margin</span><span class="mcr-value">${i.margin||0}%</span></div>
        <div class="mcr-row"><span class="mcr-label">Sell Price</span><span class="mcr-value" style="color:var(--maroon);font-weight:700;">KES ${fmt(i.unit_price)}</span></div>
        <div class="mcr-actions">
          <button class="button secondary" data-edit-catalog="${i.id}">✏ Edit</button>
          <button class="button red" data-del-catalog="${i.id}">🗑 Delete</button>
        </div>
      </div>`).join('');

    return `<div style="max-width:1000px;">
      <div class="page-header">
        <div><h2 class="page-title">Catalog</h2><p class="page-subtitle">${items.length} items</p></div>
        <button class="button" id="cat-add-btn">+ Add Item</button>
      </div>
      <div class="card">
        <div class="desktop-table">
          ${items.length ? `<table>
            <thead><tr>
              <th>Name</th><th>Category</th><th>Unit</th>
              <th style="text-align:right;">Cost</th>
              <th style="text-align:right;">Margin</th>
              <th style="text-align:right;">Sell Price</th>
              <th style="text-align:center;">Actions</th>
            </tr></thead>
            <tbody>${desktopRows}</tbody>
          </table>` : empty}
        </div>
        ${items.length ? mobileCards : `<div class="mobile-card-row"><p style="text-align:center;color:var(--gray);">No catalog items yet.</p></div>`}
      </div>
    </div>`;
  }
});
