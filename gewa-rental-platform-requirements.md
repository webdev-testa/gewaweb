# Gewa — rental platform requirements

Single-location kebaya/costume rental business. Public site for customers, admin CMS for the owner, backend automation for WhatsApp reminders. This document is the source of truth for an implementation agent — treat anything under "Open decisions" as needing a human answer before building that part.

## 1. Overview

**Problem:** Operations currently depend on a human admin for everything — quoting prices, tracking who owes a DP, who's overdue on payment, who's late returning an item, and calculating late fees. The goal is a system that keeps running correctly even when no admin is online, while still letting the admin chat normally on WhatsApp with customers who already know what they want.

**Primary users:**
- **Customer** — browses catalog/portfolio, checks a rough shipping cost, submits a booking, pays a DP then the balance, returns the item.
- **Admin (owner)** — edits prices/catalog without touching code, manages bookings, marks payments received, replies to WhatsApp manually for customers who skip the form.

## 2. Confirmed tech stack

| Layer | Choice | Notes |
|---|---|---|
| Frontend | React + Vite | Static SPA build |
| Frontend hosting | Cloudflare Pages | Free tier |
| Backend | Go, Fiber framework | REST API |
| Backend hosting | Small VPS (Contabo/Hostinger, 2 vCPU / 2–4GB RAM) | Docker Compose |
| Database | PostgreSQL | Self-hosted in Docker on the same VPS |
| Object storage | Cloudflare R2 | Product/portfolio photos |
| Reverse proxy / TLS | Caddy | Automatic HTTPS via Let's Encrypt |
| Scheduler | System cron → internal API endpoint | Runs once daily |
| WhatsApp | Meta WhatsApp Cloud API, **Coexistence mode** | Same number stays usable in the regular WhatsApp Business app for manual replies, while the backend sends automated reminders via API |
| Shipping cost | RajaOngkir / Komerce API | Starter (free) tier initially, JNE only |
| Auth (admin only) | JWT | No customer accounts in this build |
| Payments | Manual — admin marks paid after checking transfer | No payment gateway in this build (see §10) |

## 3. Functional requirements

### 3.1 Public site
- Landing page with business info and a portfolio gallery (photos can be marked portfolio-only, not necessarily rentable).
- Catalog: list of rentable items with name, category, price, photos, availability. Prices/photos editable only from the admin CMS — never hardcoded in the frontend.
- Booking form: customer picks an item + date range. The date range is checked against existing bookings for that item before it's accepted (see §4, exclusion constraint).
- On submit, the booking is created with status `pending`, and the page opens a `wa.me` deep link pre-filled with the order summary, so the customer lands in WhatsApp ready to confirm with the admin — no need to retype anything.
- Direct-to-WhatsApp path: a plain `wa.me` link (e.g. in the site header/footer and social bios) for customers who already know what they want and want to skip the form entirely.
- Shipping cost checker: customer enters destination + rough weight, site calls the ongkir API and shows an estimate. No order commitment required to use it.

### 3.2 Admin CMS (JWT-protected)
- CRUD on products: name, category, price, photos (upload to R2), active/portfolio flags.
- Booking list/calendar view; update status (`pending → dp_paid → paid → returned → cancelled`).
- Manually mark DP or balance as paid (since there's no payment gateway yet).
- Upload/manage portfolio photos independent of rentable products.

### 3.3 Automated reminders (daily cron)
Three checks, run once a day against the database:
1. **DP due today or overdue** → send DP reminder.
2. **Balance due today or overdue** → send payment reminder.
3. **Return date passed, item not yet returned** → calculate late fee (`late_fee_per_day × days_late`) and send a late-fee notice.

Each send is logged (see `reminders_log` in §4) so a reminder is never sent twice for the same booking on the same day, even if the cron job is re-run.

### 3.4 WhatsApp integration details
- Enable Coexistence on the business's existing WhatsApp number via Meta's Embedded Signup flow.
- Reminders are sent as **Utility-category templates** (transactional, not promotional) — required for messages the business initiates outside a customer-opened chat window.
- Templates need Meta approval before use — budget a few days of lead time before launch, not build time.

## 4. Data model

```sql
CREATE EXTENSION IF NOT EXISTS btree_gist;

CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,       -- E.164 format, used for WA sends
  address TEXT
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT,
  price NUMERIC NOT NULL,
  photo_url TEXT,
  is_portfolio BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true
);

CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id),
  product_id UUID REFERENCES products(id),
  date_range DATERANGE NOT NULL,          -- [start_date, return_date)
  status TEXT NOT NULL DEFAULT 'pending', -- pending, dp_paid, paid, returned, cancelled
  dp_amount NUMERIC,
  dp_due_at DATE,
  dp_paid_at TIMESTAMPTZ,
  balance_amount NUMERIC,
  balance_due_at DATE,
  balance_paid_at TIMESTAMPTZ,
  late_fee_per_day NUMERIC DEFAULT 0,
  actual_return_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),

  -- prevents double-booking the same item on overlapping dates, enforced by Postgres itself
  EXCLUDE USING gist (product_id WITH =, date_range WITH &&)
);

CREATE TABLE reminders_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id),
  type TEXT NOT NULL,        -- dp_due, balance_due, late_fee
  sent_at TIMESTAMPTZ DEFAULT now(),
  wa_message_id TEXT,
  UNIQUE (booking_id, type, (sent_at::date))
);
```

## 5. Suggested API surface

| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/products` | public | List active catalog items |
| GET | `/products/portfolio` | public | Portfolio-only items |
| POST | `/bookings` | public | Create a pending booking, return WA deep-link text |
| GET | `/bookings/availability?product_id=&range=` | public | Check open dates before submit |
| POST | `/ongkir/check` | public | Proxy to RajaOngkir/Komerce, returns shipping estimate |
| POST | `/auth/login` | public | Admin login, returns JWT |
| GET/POST/PUT | `/admin/products` | admin | Catalog CRUD |
| GET/PUT | `/admin/bookings` | admin | View bookings, update status/payment |
| POST | `/admin/portfolio` | admin | Upload portfolio photos to R2 |
| POST | `/internal/cron/reminders` | internal secret | Triggered daily by system cron; runs the three reminder checks |

## 6. Non-functional requirements

- **Hosting:** one VPS running Docker Compose with three services — `api` (Go), `db` (Postgres), `caddy` (reverse proxy/TLS). Frontend is deployed separately to Cloudflare Pages and calls the API cross-origin — API must set CORS to allow the Pages domain.
- **Backups:** nightly `pg_dump` from the `db` container to Cloudflare R2. Verify a restore periodically — an unverified backup isn't a backup.
- **Secrets:** DB credentials, JWT signing secret, Meta WA app credentials, R2 keys, RajaOngkir API key — all in a `.env` file on the VPS, never committed to the repo.
- **Scale target:** comfortably handles 10–100 bookings/day for a single location. Not designed for multi-branch or high concurrency — see §10 for the upgrade path if that changes.

## 7. Suggested repository structure

```
/api        - Go/Fiber backend, Dockerfile
/web        - React + Vite frontend
/docs       - this file, schema diagrams, deployment notes
docker-compose.yml
Caddyfile
```

## 8. Estimated monthly cost

| Item | Cost |
|---|---|
| VPS (2 vCPU / 2–4GB) | Rp70,000–120,000 |
| Domain (amortized) | ~Rp12,500 |
| Cloudflare Pages | Free |
| Cloudflare R2 | Free tier covers this scale |
| WhatsApp Cloud API (utility templates, ~300 msgs/mo at current volume) | ~Rp18,000 |
| RajaOngkir/Komerce Starter | Free (JNE only) |
| **Total** | **~Rp100,000–150,000/month** (~US$6–9) |

Upgrading ongkir to a paid tier (more couriers) adds roughly Rp60,000–100,000/month when needed — not required to launch.

## 9. Open decisions (need a human answer before building)

- **ORM / query layer:** GORM vs sqlc vs raw `database/sql`. Suggested default: **sqlc** — pairs well with the explicit schema above and avoids ORM magic, but swap freely if GORM's ergonomics are preferred.
- **Domain name:** not yet chosen.
- **VPS provider:** Contabo vs Hostinger vs other — either is fine, pick on price/region at signup time.
- **Business legal entity for Meta verification:** Coexistence + template approval requires a Facebook Business Manager with the business represented — confirm what documentation is available before starting that flow.

## 10. Out of scope for this build (future tiers, don't build now)

- Automatic payment reconciliation (Midtrans/Xendit webhook) — for now, admin marks payments manually.
- Customer accounts/login.
- Multi-admin roles or audit log.
- Managed/hosted Postgres, staging environment, CI/CD pipeline.
- Uptime monitoring — nice to add later (e.g. free Uptime Kuma), not a launch blocker.

## 11. Definition of done

- [ ] Admin can log in and create/edit/deactivate a product with a photo.
- [ ] Customer can browse the catalog and portfolio without logging in.
- [ ] Customer can submit a booking for an open date range; an overlapping date range is rejected.
- [ ] Booking submission opens a pre-filled WhatsApp chat to the admin's number.
- [ ] Ongkir checker returns a real shipping estimate for a given destination.
- [ ] Daily cron sends DP-due, balance-due, and late-fee reminders via WhatsApp Cloud API, without duplicating a reminder already sent that day.
- [ ] Admin can reply to customers from the regular WhatsApp Business app on the same number the reminders come from (Coexistence working).
- [ ] Site is served over HTTPS end to end.
