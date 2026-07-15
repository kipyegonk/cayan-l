// Offline LocalStorage DB (runs when no PHP server) ──────────
const LocalDB = {
  _get(k) { try { return JSON.parse(localStorage.getItem('cayan_' + k) || 'null'); } catch(e) { return null; } },
  _set(k, v) { localStorage.setItem('cayan_' + k, JSON.stringify(v)); },
  _nextId(table) {
    const seq = (this._get('seq') || {});
    seq[table] = (seq[table] || 0) + 1;
    this._set('seq', seq);
    return seq[table];
  },
  _nextQuoteNum() {
    const quotes = this._get('quotes') || [];
    const n = quotes.length + 1;
    return 'SN ' + String(n).padStart(3,'0');
  },
  init() {
    if (!this._get('users')) {
      this._set('users', [{id:1,name:'Admin',email:'admin@company.com',
        password:'admin123',role:'admin',verified:1}]);
      this._set('seq', {users:1});
    }
    if (!this._get('company')) {
      this._set('company', {id:1,name:'Cayan Events Ke.',phone:'0737 611 658',
        email:'cayaneventsanddecor@gmail.com',address:'Mokoyeti West Road, Karen',
        currency:'KES',terms:'',logo:''});
    }
    ['catalog','clients','quotes'].forEach(t => { if (!this._get(t)) this._set(t,[]); });
  },
  handle(endpoint, method, body) {
    this.init();
    const parts = endpoint.split('/');
    const res = parts[0], id = parts[1] ? parseInt(parts[1]) : null;

    // AUTH
    if (res === 'auth' && parts[1] === 'login' && method === 'POST') {
      const users = this._get('users') || [];
      const u = users.find(u => u.email === body.email && u.password === body.password);
      if (!u) return {error:'Invalid email or password'};
      const user = {...u}; delete user.password;
      localStorage.setItem('cayan_current_user', JSON.stringify(user));
      return {success:true, token:'offline_token', user};
    }
    if (res === 'auth' && parts[1] === 'register') {
      const users = this._get('users') || [];
      if (users.find(u => u.email === body.email)) return {error:'Email already registered'};
      const nu = {id:this._nextId('users'),...body,role:'user',verified:0};
      users.push(nu); this._set('users', users);
      return {success:true, message:'Registration submitted. An admin will verify your account.'};
    }
    if (res === 'auth' && parts[1] === 'verify') {
      const u = JSON.parse(localStorage.getItem('cayan_current_user')||'null');
      return u ? {valid:true, user:u} : {valid:false};
    }

    // COMPANY
    if (res === 'company' && method === 'GET') return this._get('company') || {};
    if (res === 'company' && method === 'POST') {
      this._set('company', {...(this._get('company')||{}), ...body});
      return {success:true};
    }

    // GENERIC CRUD for catalog, clients, quotes, users
    const table = res;
    const rows = () => this._get(table) || [];
    const save = (r) => this._set(table, r);

    if (method === 'GET' && !id) return rows();
    if (method === 'GET' && id)  return rows().find(r => r.id === id) || {error:'Not found'};
    if (method === 'DELETE' && id) { save(rows().filter(r => r.id !== id)); return {success:true}; }
    if (method === 'PUT' && id) {
      save(rows().map(r => r.id === id ? {...r,...body,id} : r));
      return {success:true};
    }
    if (method === 'POST') {
      if (table === 'quotes') {
        const newItem = {id:this._nextId(table), number:this._nextQuoteNum(), ...body,
          created_at: new Date().toISOString().slice(0,10)};
        const all = rows(); all.unshift(newItem); save(all);
        return {success:true, id:newItem.id, number:newItem.number};
      }
      const newItem = {id:this._nextId(table), ...body, created_at:new Date().toISOString().slice(0,10)};
      const all = rows(); all.push(newItem); save(all);
      return {success:true, id:newItem.id};
    }

    // STATS
    if (res === 'stats') {
      const quotes  = this._get('quotes')  || [];
      const clients = this._get('clients') || [];
      const catalog = this._get('catalog') || [];
      return {
        total_quotes:  quotes.length,
        total_value:   quotes.reduce((s,q) => s + (parseFloat(q.total)||0), 0),
        pending:       quotes.filter(q => q.status === 'pending').length,
        accepted:      quotes.filter(q => q.status === 'accepted').length,
        clients:       clients.length,
        catalog_items: catalog.length,
      };
    }
    return {error:'Not found'};
  }
};