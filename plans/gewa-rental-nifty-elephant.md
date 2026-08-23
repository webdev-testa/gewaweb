# Gewa Rental Platform — Implementation Plan

## Context

Gewa is a single-location kebaya/traditional costume rental business currently running on manual admin work. The goal is a web platform that automates quoting, booking, payment tracking, and WhatsApp reminders so the operation runs even without an admin online.

This plan covers the **frontend implementation** — a multi-page React app with realistic mock data, designed to be wired to a real backend (Supabase + WhatsApp API) in a subsequent phase.

---

## Aesthetic

**Stance: Swiss editorial with batik-warm accents.**
Clean grid, disciplined whitespace, real information hierarchy — contrasted with a warm terracotta/gold palette that references Indonesian craft culture without costuming itself as one.

- **Display font**: Fraunces (variable, Google Fonts) — expressive serif for headings and prices
- **Body font**: Outfit (Google Fonts) — legible, modern, friendly
- **Canvas**: true-white ground, `#F5F0EB` secondary panels, terracotta `#C9552A` as primary accent, deep `#1C1A17` as foreground

---

## Architecture

### Router

Install `react-router-dom` and create a top-level router in `src/App.tsx`.

**Public routes:**
- `/` — Landing page
- `/catalog` — Catalog browse/filter
- `/catalog/:slug` — Item detail + booking form
- `/booking/confirm` — Post-booking confirmation (shows wa.me deep link)
- `/shipping` — Shipping cost checker

**Admin routes (JWT-guarded):**
- `/admin/login` — Login form
- `/admin` — Dashboard (booking stats)
- `/admin/products` — Product list + CRUD
- `/admin/products/new` — New product form
- `/admin/products/:id/edit` — Edit product form
- `/admin/bookings` — Booking list
- `/admin/bookings/:id` — Booking detail + status transitions

### File structure

```
src/
  App.tsx                  — router + providers
  index.css                — Google Font @imports, Tailwind, CSS tokens
  data/
    mockProducts.ts        — mock catalog items (6-8 kebaya/costumes)
    mockBookings.ts        — mock bookings in various statuses
  lib/
    auth.ts                — JWT mock (localStorage token, useAuth hook)
    waLink.ts              — wa.me deep-link builder
    shipping.ts            — ongkir API stub (returns mock estimate)
  components/
    Layout.tsx             — public shell (header + footer)
    AdminLayout.tsx        — admin shell (sidebar nav)
    ProductCard.tsx        — catalog card
    BookingStatusBadge.tsx — colored pill per booking status
    DateRangePicker.tsx    — date range input with conflict detection
  pages/
    Landing.tsx
    Catalog.tsx
    ProductDetail.tsx      — item detail + embedded booking form
    BookingConfirm.tsx
    ShippingChecker.tsx
    admin/
      Login.tsx
      Dashboard.tsx
      Products.tsx
      ProductForm.tsx
      Bookings.tsx
      BookingDetail.tsx
```

---

## Key implementation details

### Landing page (`/`)

- Full-bleed hero with an Unsplash kebaya/batik photo, Fraunces display heading, wa.me CTA button
- "How it works" 3-step section (browse → book → return)
- Portfolio gallery grid (masonry or uniform grid, 6-9 photos)
- Footer with direct wa.me link and business details

### Catalog (`/catalog`)

- Filter by category (kebaya modern, kebaya kartini, adat, aksesori) and availability date
- Grid of `ProductCard` components — photo, name, price/day, availability pill
- Client-side filtering over mock data array

### Product detail + booking form (`/catalog/:slug`)

- Left: photo gallery (thumbnail strip + main view)
- Right: price, description, availability status
- Booking form: customer name, phone, date range picker
  - Date range picker highlights unavailable dates from mock bookings
  - On submit: creates a local booking object with status `pending`, then redirects to `/booking/confirm`

### Booking confirmation (`/booking/confirm`)

- Order summary card
- Large CTA button: "Konfirmasi via WhatsApp" → opens `wa.me/62XXXXX?text=...` with pre-filled message including item name, dates, total price, DP amount
- Also shows a plain wa.me link for customers who want to skip the form

### Shipping checker (`/shipping`)

- Destination city input + weight input
- "Cek Ongkir" button → calls `shipping.ts` stub → shows estimated cost range
- Note: real implementation hooks to Raja Ongkir / Ongkir API

### Admin: auth guard

`useAuth` hook reads a JWT token from `localStorage`. `AdminRoute` wrapper component redirects unauthenticated users to `/admin/login`. Mock login: any email + password `"gewa2024"` sets the token.

### Admin: products (`/admin/products`)

- Table: photo thumbnail, name, category, price, active/portfolio flags, Edit/Delete actions
- "Tambah Produk" button → `/admin/products/new`
- `ProductForm`: name, category (select), price/day, late fee/day, photo URL inputs, active checkbox, portfolio checkbox

### Admin: bookings (`/admin/bookings`)

- Table with columns: customer, item, dates, DP due, balance due, status, actions
- Filterable by status via tabs: All / Pending / DP Paid / Paid / Returned / Cancelled
- Click row → `/admin/bookings/:id`

### Admin: booking detail (`/admin/bookings/:id`)

- Full booking info + customer contact
- Status transition buttons (context-aware: only valid next states shown)
- "Mark DP Paid" / "Mark Balance Paid" buttons
- Late fee calculator (if return date passed): shows days overdue × fee/day
- "Hubungi via WhatsApp" link

---

## CSS tokens (src/index.css)

```css
/* Google Fonts first */
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;0,9..144,700;1,9..144,400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600&display=swap');
@import 'tailwindcss';

@theme {
  --color-background: #FDFAF7;
  --color-foreground: #1C1A17;
  --color-card: #FFFFFF;
  --color-muted: #F5F0EB;
  --color-primary: #C9552A;
  --color-primary-foreground: #FFFFFF;
  --color-accent: #D4A24C;
  --color-border: #E2DDD8;
  --font-display: 'Fraunces', Georgia, serif;
  --font-body: 'Outfit', system-ui, sans-serif;
}
```

---

## Dependencies to install

```
pnpm add react-router-dom
```

No other runtime dependencies needed. Shipping and WhatsApp integrations are stubbed; photo uploads in the admin are URL-input based (no R2 wiring in this phase).

---

## Mock data

`mockProducts.ts`: 6–8 products — kebaya modern, kebaya kartini, beskap, adat Jawa, plus 2-3 accessories. Each has: `id`, `slug`, `name`, `category`, `pricePerDay`, `lateFeePerDay`, `photos: string[]` (Unsplash URLs), `description`, `active`, `portfolio`.

`mockBookings.ts`: 8–10 bookings spread across all statuses, with realistic Indonesian customer names, phone numbers, and date ranges (some current, some past-due).

---

## Out of scope for this phase

- Real Supabase database and auth
- Cloudflare R2 photo uploads
- WhatsApp Cloud API / Meta Embedded Signup (reminder cron)
- Real Raja Ongkir API call
- Payment gateway

---

## Verification

1. Navigate `/` → catalog → product detail → fill booking form → confirm page shows wa.me link
2. Navigate `/shipping` → enter city + weight → see estimated cost
3. Navigate `/admin/login` → login with wrong password → denied; correct password → redirect to `/admin`
4. In admin: create/edit a product, view booking list, open a booking and transition its status
5. Check responsive layout at ~375px (mobile) and ~1024px (desktop) for all pages
