// ── REST API Client + Helpers ──────────────────────────────────
const API = {
  async request(endpoint, method = 'GET', body = null) {
    if (OFFLINE) return LocalDB.handle(endpoint, method, body);

    const options = {
      method,
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      cache: 'no-store',
    };
    const token = localStorage.getItem('auth_token');
    if (token) options.headers.Authorization = `Bearer ${token}`;
    if (body !== null && body !== undefined) options.body = JSON.stringify(body);

    try {
      const response = await fetch(`${API_BASE}/${endpoint}`, options);
      const contentType = response.headers.get('content-type') || '';
      let payload = null;

      if (contentType.includes('application/json')) {
        try { payload = await response.json(); } catch (e) { payload = null; }
      } else {
        try { payload = await response.text(); } catch (e) { payload = null; }
      }

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
          window.location.reload();
        }
        return {
          success: false,
          error: payload?.message || payload?.error || 'Request failed',
          status: response.status,
          data: payload,
        };
      }

      return payload ?? { success: true };
    } catch (error) {
      console.error('API request failed', error);
      return {
        success: false,
        error: 'Unable to reach the server. Please check your connection and try again.',
        details: error?.message || String(error),
      };
    }
  },
  auth: {
    login: (email, password) => API.request('auth/login', 'POST', { email, password }),
    register: (name, email, password) => API.request('auth/register', 'POST', { name, email, password }),
    verify: () => API.request('auth/verify'),
  },
  users: {
    getAll: () => API.request('users'),
    create: (user) => API.request('users', 'POST', user),
    update: (id, user) => API.request(`users/${id}`, 'PUT', user),
    delete: (id) => API.request(`users/${id}`, 'DELETE'),
  },
  company: {
    get: () => API.request('company'),
    save: (company) => API.request('company', 'POST', company),
  },
  catalog: {
    getAll: () => API.request('catalog'),
    get: (id) => API.request(`catalog/${id}`),
    create: (item) => API.request('catalog', 'POST', item),
    update: (id, item) => API.request(`catalog/${id}`, 'PUT', item),
    delete: (id) => API.request(`catalog/${id}`, 'DELETE'),
  },
  clients: {
    getAll: () => API.request('clients'),
    get: (id) => API.request(`clients/${id}`),
    create: (client) => API.request('clients', 'POST', client),
    update: (id, client) => API.request(`clients/${id}`, 'PUT', client),
    delete: (id) => API.request(`clients/${id}`, 'DELETE'),
  },
  quotes: {
    getAll: () => API.request('quotes'),
    get: (id) => API.request(`quotes/${id}`),
    create: (quote) => API.request('quotes', 'POST', quote),
    update: (id, quote) => API.request(`quotes/${id}`, 'PUT', quote),
    delete: (id) => API.request(`quotes/${id}`, 'DELETE'),
  },
  stats: { get: () => API.request('stats') }
};

const helpers = {
  formatDate: (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  },
  formatMoney: (amount, currency = 'KES') =>
    `${currency} ${Number(amount || 0).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  fmt: (n) => Number(n || 0).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  today: () => new Date().toISOString().slice(0, 10),
  addDays: (date, days) => { const r = new Date(date); r.setDate(r.getDate() + days); return r.toISOString().slice(0, 10); },
};

// ─── Quote preview renderer ───────────────────────────────────────────────────
// Renders a quote in the exact layout of the Cayan Events Ke. PDF template.
// The quote object shape mirrors what the API returns:
//   { number, quote_date, valid_until, client_name, client_company, venue,
//     no_of_guests, contact_person, subtotal, vat_rate, vat_amount, total,
//     notes, items: [{ section, subsection, name, qty, unit_price, price }] }
// Sections and subsections are colour-coded rows (maroon / dark).