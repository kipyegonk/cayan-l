// Views: Catalog

Object.assign(app, {
renderCatalog() {
    const items = this.state.catalog || [];
    const CATEGORIES = ['Tents & Structures','Flowers & Décor','Lighting','Furniture','Catering','Logistics','Audio Visual','Miscellaneous'];
    const UNITS = ['pcs','set','day','hr','table','chair','per person','lot','m²','kg'];
    return `<div class="view-wrap">
      <div class="page-header">
        <div><h2 class="page-title">Catalog</h2><p class="page-subtitle">${items.length} items</p></div>
        <div class="btn-group">
          <button class="button secondary" id="cat-export-btn">⬇ Export Excel</button>
          <button class="button secondary" id="cat-import-btn">⬆ Import Excel</button>
          <input type="file" id="cat-import-file" accept=".xlsx,.xls,.csv" style="display:none;">
          <button class="button" id="cat-add-btn">+ Add Item</button>
        </div>
      </div>
      <div class="card">
        <table>
          <thead><tr>
            <th>Name</th><th>Category</th><th>Unit</th>
            <th style="text-align:right;">Cost Price</th>
            <th style="text-align:right;">Margin %</th>
            <th style="text-align:right;">Sell Price</th>
            <th style="text-align:center;">Actions</th>
          </tr></thead>
          <tbody>${items.length ? items.map(i => {
            const cost = parseFloat(i.cost_price||i.amount||0);
            const margin = parseFloat(i.margin||0);
            const sell = cost > 0 ? (cost * (1 + margin/100)) : parseFloat(i.unit_price||0);
            return `<tr>
              <td><strong>${i.name}</strong>${i.description ? '<br><span style="font-size:11px;color:#6B7280;">'+i.description+'</span>' : ''}</td>
              <td><span style="background:#EFF6FF;color:#1D4ED8;padding:2px 8px;border-radius:20px;font-size:11px;font-weight:600;">${i.category||'—'}</span></td>
              <td>${i.unit||'—'}</td>
              <td style="text-align:right;">${cost>0 ? helpers.fmt(cost) : '—'}</td>
              <td style="text-align:right;">${margin>0 ? margin+'%' : '—'}</td>
              <td style="text-align:right;font-weight:700;">${sell>0 ? helpers.fmt(sell) : '—'}</td>
              <td style="text-align:center;white-space:nowrap;">
                <button class="button secondary" style="padding:4px 10px;font-size:11px;margin-right:4px;" data-edit-catalog="${i.id}">✏ Edit</button>
                <button class="button red" style="padding:4px 10px;font-size:11px;" data-del-catalog="${i.id}"> Delete</button>
              </td>
            </tr>`;
          }).join('') : '<tr><td colspan="7" style="text-align:center;color:var(--gray);padding:24px;">No catalog items yet. Click "+ Add Item" to start.</td></tr>'}</tbody>
        </table>
      </div>

      <!-- Import preview modal placeholder -->
      <div id="cat-import-preview"></div>
    </div>`;
  },

  // Export catalog to Excel 
  exportCatalogToExcel() {
    const items = this.state.catalog || [];
    if (!items.length) { this.notify('No items to export', 'error'); return; }

    // Build CSV (opens fine in Excel)
    const headers = ['Name','Description','Category','Unit','Cost Price','Margin %','Sell Price'];
    const rows = items.map(i => {
      const cost   = parseFloat(i.cost_price||i.amount||0);
      const margin = parseFloat(i.margin||0);
      const sell   = cost > 0 ? (cost*(1+margin/100)) : parseFloat(i.unit_price||0);
      return [
        `"${(i.name||'').replace(/"/g,'""')}"`,
        `"${(i.description||'').replace(/"/g,'""')}"`,
        `"${(i.category||'').replace(/"/g,'""')}"`,
        `"${(i.unit||'').replace(/"/g,'""')}"`,
        cost.toFixed(2),
        margin.toFixed(2),
        sell.toFixed(2),
      ].join(',');
    });

    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob(['\uFEFF'+csv], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `cayan-catalog-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    this.notify('Catalog exported successfully');
  },

  // Import catalog from Excel/CSV 
  async importCatalogFromFile(file) {
    const ext = file.name.split('.').pop().toLowerCase();

    if (ext === 'csv') {
      const text = await file.text();
      this.processCatalogCSV(text);
    } else if (ext === 'xlsx' || ext === 'xls') {
      // Use SheetJS from CDN
      if (!window.XLSX) {
        this.notify('Loading Excel reader...', 'success');
        await new Promise((resolve, reject) => {
          const s = document.createElement('script');
          s.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
          s.onload = resolve; s.onerror = reject;
          document.head.appendChild(s);
        });
      }
      const buf  = await file.arrayBuffer();
      const wb   = XLSX.read(buf, { type: 'array' });
      const ws   = wb.Sheets[wb.SheetNames[0]];
      const csv  = XLSX.utils.sheet_to_csv(ws);
      this.processCatalogCSV(csv);
    } else {
      this.notify('Please upload a .xlsx, .xls or .csv file', 'error');
    }
  },

  processCatalogCSV(text) {
    const lines  = text.trim().split('\n').filter(l => l.trim());
    if (lines.length < 2) { this.notify('File is empty or has no data rows', 'error'); return; }

    // Parse header row to find column positions
    const parseCSVRow = (line) => {
      const result = []; let cur = ''; let inQ = false;
      for (let i = 0; i < line.length; i++) {
        const c = line[i];
        if (c === '"' && !inQ) { inQ = true; }
        else if (c === '"' && inQ && line[i+1] === '"') { cur += '"'; i++; }
        else if (c === '"' && inQ) { inQ = false; }
        else if (c === ',' && !inQ) { result.push(cur.trim()); cur = ''; }
        else { cur += c; }
      }
      result.push(cur.trim());
      return result;
    };

    const headers = parseCSVRow(lines[0]).map(h => h.toLowerCase().replace(/[^a-z0-9]/g,''));
    const col = (names) => {
      for (const n of names) {
        const idx = headers.findIndex(h => h.includes(n));
        if (idx >= 0) return idx;
      }
      return -1;
    };

    const iName  = col(['name']);
    const iDesc  = col(['desc','description']);
    const iCat   = col(['cat','category']);
    const iUnit  = col(['unit']);
    const iCost  = col(['cost','costprice']);
    const iMargin= col(['margin']);

    if (iName < 0) { this.notify('Could not find a "Name" column in the file', 'error'); return; }

    const parsed = [];
    for (let i = 1; i < lines.length; i++) {
      const cols = parseCSVRow(lines[i]);
      const name = cols[iName]?.replace(/^"|"$/g,'').trim();
      if (!name) continue;
      parsed.push({
        name,
        description: iDesc  >= 0 ? (cols[iDesc]||'').replace(/^"|"$/g,'').trim() : '',
        category:    iCat   >= 0 ? (cols[iCat]||'').replace(/^"|"$/g,'').trim()  : '',
        unit:        iUnit  >= 0 ? (cols[iUnit]||'').replace(/^"|"$/g,'').trim() : 'pcs',
        cost_price:  iCost  >= 0 ? parseFloat(cols[iCost]||0)||0  : 0,
        margin:      iMargin>= 0 ? parseFloat(cols[iMargin]||0)||0 : 0,
      });
    }

    if (!parsed.length) { this.notify('No valid rows found in file', 'error'); return; }

    // Show preview modal before importing
    this.showImportPreview(parsed);
  },

  showImportPreview(rows) {
    const preview = rows.slice(0, 5);
    const moreCount = rows.length - preview.length;
    const body = `
      <p style="margin-bottom:12px;color:#6B7280;font-size:13px;">
        Found <strong>${rows.length} item${rows.length!==1?'s':''}</strong> to import. Preview:
      </p>
      <div class="table-scroll">
        <table style="font-size:12px;width:100%;border-collapse:collapse;">
          <thead><tr style="background:#760014;">
            <th style="color:#D0A95E;padding:6px 8px;text-align:left;">Name</th>
            <th style="color:#D0A95E;padding:6px 8px;text-align:left;">Category</th>
            <th style="color:#D0A95E;padding:6px 8px;text-align:left;">Unit</th>
            <th style="color:#D0A95E;padding:6px 8px;text-align:right;">Cost</th>
            <th style="color:#D0A95E;padding:6px 8px;text-align:right;">Margin</th>
          </tr></thead>
          <tbody>
            ${preview.map((r,i) => `<tr style="background:${i%2?'#fafafa':'#fff'}">
              <td style="padding:5px 8px;border-bottom:1px solid #eee;">${r.name}</td>
              <td style="padding:5px 8px;border-bottom:1px solid #eee;">${r.category||'—'}</td>
              <td style="padding:5px 8px;border-bottom:1px solid #eee;">${r.unit||'—'}</td>
              <td style="padding:5px 8px;border-bottom:1px solid #eee;text-align:right;">${r.cost_price||'—'}</td>
              <td style="padding:5px 8px;border-bottom:1px solid #eee;text-align:right;">${r.margin?r.margin+'%':'—'}</td>
            </tr>`).join('')}
            ${moreCount > 0 ? `<tr><td colspan="5" style="padding:6px 8px;color:#6B7280;font-style:italic;">...and ${moreCount} more</td></tr>` : ''}
          </tbody>
        </table>
      </div>
      <p style="margin-top:14px;font-size:12px;color:#D97706;">⚠ This will ADD these items to your existing catalog (no deletions).</p>
    `;

    this.showModal('Import Preview', body, async (modal, close) => {
      const btn = modal.querySelector('.button.navy, .button:not(.secondary):not(.red)');
      if (btn) { btn.textContent = 'Importing...'; btn.disabled = true; }
      let success = 0; let failed = 0;
      for (const row of rows) {
        try {
          const result = await API.catalog.create(row);
          if (result.id || result.success) success++;
          else failed++;
        } catch(e) { failed++; }
      }
      await this.loadAppData();
      this.state.view = 'catalog';
      this.render();
      close();
      this.notify(`Imported ${success} item${success!==1?'s':''}${failed?' ('+failed+' failed)':''}`);
    }, 'Import All');
  },
});