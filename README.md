# Cayan Events Ke. — Quote Management System

A full-stack web application for managing event quotes, clients, and catalog items for Cayan Events Ke. Built with Laravel (API backend) and a vanilla JavaScript SPA (frontend), deployed on Render and Vercel.

---

## Live URLs

| Service | URL |
|---|---|
| Frontend (Vercel) | https://cayan-l.vercel.app |
| Backend API (Render) | https://cayan-api.onrender.com |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | PHP 8.2, Laravel 11, Laravel Sanctum |
| Frontend | Vanilla JavaScript SPA (no framework) |
| Database | PostgreSQL (Render managed) |
| Backend Hosting | Render (Docker, free tier) |
| Frontend Hosting | Vercel |
| Authentication | Laravel Sanctum (token-based) |
| Containerization | Docker |

---

## Features

### Quotes
- Create, edit, preview and manage event quotes
- Line items with quantities, unit prices and auto-calculated totals
- Section headers for organized quote layout
- VAT configuration per quote
- Status tracking: Draft → Pending → Accepted → Declined
- PDF-ready print preview with company branding
- Export catalog to Excel/CSV
- Import catalog items from Excel/CSV

### Clients
- Full client profiles: name, type, contact person, phone, WhatsApp, email, KRA PIN, location, notes
- Client types: Individual, Corporate, NGO/Church, Government
- Direct WhatsApp and email links from the client list

### Catalog
- Product and service catalog with cost price, margin percentage and sell price
- Categories and units
- Bulk import via Excel/CSV
- Export to Excel

### Users & Permissions
- Admin and staff roles
- Granular per-module permissions: View, Add, Edit, Delete
- Modules: Catalog, Clients, Quotes, Stats, Settings
- Auto-generated passwords on user creation shown in a secure popup
- Welcome email sent to new users with login credentials

### Company Settings
- Company name, logo, address, contact details
- Currency and VAT defaults
- Signature pad for quote sign-off

---

## Project Structure

```
cayan-l/
├── app/
│   ├── Console/Commands/
│   │   └── SendWelcomeEmail.php
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php
│   │   │   ├── CatalogController.php
│   │   │   ├── ClientController.php
│   │   │   ├── CompanyController.php
│   │   │   ├── QuoteController.php
│   │   │   ├── StatsController.php
│   │   │   └── UserController.php
│   │   └── Middleware/
│   │       └── AdminMiddleware.php
│   └── Models/
│       └── User.php
├── database/migrations/
├── frontend/                  ← Served by Vercel
│   ├── css/app.css
│   └── js/
│       ├── api.js
│       ├── app-core.js
│       ├── boot.js
│       ├── config.js
│       ├── offline.js
│       ├── quote-preview.js
│       ├── events/events.js
│       └── views/
│           ├── catalog.js
│           ├── clients.js
│           ├── dashboard.js
│           ├── quotes.js
│           ├── settings.js
│           └── users.js
├── public/                    ← Served by Laravel locally
│   ├── css/app.css
│   └── js/                    ← Mirror of frontend/js/
├── routes/api.php
├── Dockerfile
└── vercel.json
```

> **Important:** The `frontend/` folder is what Vercel serves. The `public/js/` folder is what Laravel serves locally. Both must be kept in sync — always copy changes to both.

---

## API Endpoints

All authenticated endpoints require `Authorization: Bearer {token}` header.

### Auth
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/login` | No | Login with email and password |
| POST | `/api/auth/register` | No | Register new account |
| GET | `/api/auth/verify` | Yes | Verify token and get user |
| POST | `/api/auth/change-password` | Yes | Change own password |

### Resources
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/company` | Yes | Get company settings |
| POST | `/api/company` | Yes | Save company settings |
| GET/POST | `/api/catalog` | Yes | List / create catalog items |
| GET/PUT/DELETE | `/api/catalog/{id}` | Yes | Get / update / delete item |
| GET/POST | `/api/clients` | Yes | List / create clients |
| GET/PUT/DELETE | `/api/clients/{id}` | Yes | Get / update / delete client |
| GET/POST | `/api/quotes` | Yes | List / create quotes |
| GET/PUT/DELETE | `/api/quotes/{id}` | Yes | Get / update / delete quote |
| GET | `/api/stats` | Yes | Dashboard statistics |

### Users (Admin only)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users` | List all users |
| POST | `/api/users` | Create user (sends credentials email) |
| PUT | `/api/users/{id}` | Update user or permissions |
| DELETE | `/api/users/{id}` | Delete user |

---

## Local Development

### Requirements
- PHP 8.2+
- Composer
- SQLite (for local dev)

### Setup

```bash
# Clone the repo
git clone https://github.com/kipyegonk/cayan-l.git
cd cayan-l

# Install dependencies
composer install

# Create local environment file
cp .env.example .env

# Edit .env — use SQLite locally
DB_CONNECTION=sqlite
# Remove all DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD lines

# Create SQLite database
touch database/database.sqlite

# Generate app key
php artisan key:generate

# Run migrations and seed
php artisan migrate --force
php artisan db:seed --force

# Start server
php artisan serve
```

Open http://127.0.0.1:8000

---

## Deployment

### Backend (Render)

The app is containerized with Docker. Render automatically builds and deploys on every push to `main`.

On startup the container runs:
```
php artisan migrate --force
php artisan db:seed --force
php artisan serve --host=0.0.0.0 --port=8080
```

#### Required Render Environment Variables

| Key | Value |
|---|---|
| `APP_NAME` | `Cayan Events Ke.` |
| `APP_ENV` | `production` |
| `APP_DEBUG` | `false` |
| `APP_KEY` | `base64:...` |
| `DB_CONNECTION` | `pgsql` |
| `DB_HOST` | `dpg-xxxx.oregon-postgres.render.com` |
| `DB_PORT` | `5432` |
| `DB_DATABASE` | `cayan_db` |
| `DB_USERNAME` | `cayan_db_user` |
| `DB_PASSWORD` | `...` |
| `PGSSLMODE` | `require` |
| `MAIL_MAILER` | `smtp` |
| `MAIL_HOST` | `smtp.gmail.com` |
| `MAIL_PORT` | `587` |
| `MAIL_ENCRYPTION` | `tls` |
| `MAIL_USERNAME` | `your@gmail.com` |
| `MAIL_PASSWORD` | `your-app-password` |
| `MAIL_FROM_ADDRESS` | `your@gmail.com` |
| `MAIL_FROM_NAME` | `Cayan Events Ke.` |

### Frontend (Vercel)

Vercel serves the static files from the `frontend/` folder. No build step required.

When making JS/CSS changes always update **both** folders:

```bash
# After editing public/js/views/someview.js
cp public/js/views/someview.js frontend/js/views/someview.js

# After editing public/css/app.css
cp public/css/app.css frontend/css/app.css

git add -A
git commit -m "your message"
git push
```

---

## User Roles & Permissions

| Permission | Admin | Staff (configurable) |
|---|---|---|
| View all modules | ✅ | Configured per user |
| Add records | ✅ | Configured per user |
| Edit records | ✅ | Configured per user |
| Delete records | ✅ | Configured per user |
| Manage users | ✅ | ❌ Never |
| Change settings | ✅ | Configured per user |

Permissions are set per user in the **Users** tab (admin only). Each module — Catalog, Clients, Quotes, Stats, Settings — has independent View / Add / Edit / Delete toggles.

---

## Database Schema

| Table | Key Columns |
|---|---|
| `users` | id, name, email, password, role, phone, job_title, department, permissions (JSON), verified |
| `company` | id, name, logo, address, phone, email, kra_pin, currency, vat_rate, signature |
| `catalog` | id, name, description, category, unit, cost_price, margin, unit_price |
| `clients` | id, name, type, email, phone, whatsapp, contact_person, location, kra_pin, address, notes |
| `quotes` | id, number, client_id, quote_date, venue, guests, subtotal, vat_rate, vat_amount, total, status, notes |
| `quote_items` | id, quote_id, type, section, name, qty, unit_price, amount, sort_order |

---

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: description"`
4. Push and open a Pull Request

---

## License

Private — Cayan Events Ke. All rights reserved.