# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Customers / Clients:** Individuals seeking bespoke painted artificial flower arrangements and floral rentals (Bouquets, Vases, Hand Bouquets with Buy/Rent options, Signature bloom boxes, and Event Table Decorations) for graduations, weddings, proposals, birthdays, and special milestones. They need a clear, interactive catalog to view styles, customize arrangements/rental dates, calculate transparent pricing/DP, and initiate order confirmation via WhatsApp.
- **Store Owner / Admin (CMS User):** By Gewa operations team needing a powerful, intuitive CMS to dynamically manage the flower catalog, update prices and product descriptions shown to customers, control availability and rental schedules, track Down Payments (DP) and balance payments, monitor returns/late fees for rented items, and manage customer communications.

## Product Purpose

Provide a unified, elegant web platform and Admin CMS for **By Gewa** that showcases handcrafted painted artificial flowers and floral rental items, enables seamless customer ordering and rental scheduling, and gives the admin complete real-time CMS control over catalog offerings, pricing, page content, and booking status pipelines.

## Positioning

By Gewa offers bespoke, artisan-painted artificial flowers (*"Paint Your Moment"*) tailored to exact client color concepts and occasions—combining keepsake durability with high-end aesthetic styling, flexible buy/rental models for event floristry, automated WhatsApp handshakes, and full admin CMS independence.

## Operating Context

- **Boutique Origin & Location:** Rooted in Malang Raya (Jl. Permata Jingga IV No. 12) with primary customer consultation via WhatsApp (+62858-2222-0904) and Instagram (@bygewa).
- **Customer Journey:** Accessed on mobile and desktop browsers to explore flower product lines, customize color palettes/sizes/rental terms, check delivery/shipping estimates, and generate structured WhatsApp booking orders.
- **Admin Workflow:** Desktop and tablet CMS dashboard used by the boutique owner to add/edit flower items, adjust prices and promotional content displayed to customers in real-time, triage incoming bookings, track payment milestones (DP & balance), and manage rental returns.
- **Fulfillment & Logistics:** Local Malang fulfillment (self pick-up / instant Grab/Gojek courier) alongside Luar Kota nationwide shipping with weight and location estimation.
- **Final Handshake:** Structured order confirmation seamlessly bridges into WhatsApp (`wa.me` deep link) with detailed item, date, and DP breakdown.

## Capabilities and Constraints

- **Core Product Lines:**
  - *Bouquet:* Petite to Human size painted artificial bouquets.
  - *Vase:* Petite to Gardenia arrangements with curated flower species selections.
  - *Signature:* Yoona, Marii, Bomi, and Bloom box creations.
  - *Hand Bouquet:* Petite to Largo sizes with **Buy** and **Rent** options.
  - *Decoration:* Event Table Decorations with venue and rental date tracking.
- **Admin CMS & Content Control:**
  - Real-time product CRUD (title, category, price, late fee/day for rentals, photos, description, active/featured status).
  - Dynamic pricing and content sync: changes made in CMS immediately reflect on customer-facing catalog and product detail pages.
  - Booking & order pipeline tracking (`Pending` → `DP Paid` → `Paid / In Production` → `Returned / Completed` → `Cancelled`).
  - Rental date conflict checking and overdue/late fee calculations for rented items.
- **Revision Policy & Production Rules:** Strict 1x color revision policy after order creation for bespoke painted items.
- **Authentication:** Guarded Admin CMS routes with session/token authentication.

## Brand Commitments

- **Name:** By Gewa / by Gewa Painted Artificial Flower
- **Tagline:** "Paint Your Moment"
- **Visual Identity:** Helvetica World & modern typography, soft pastel branding palette (Pink `#FFCCDF`, Tosca `#B4C8CB`, warm neutrals) with vibrant categorical floral accents.
- **Voice & Tone:** Friendly, warm, attentive Indonesian ("kamu", "ya!", emojis 🌸✨🎨, structured professional WhatsApp messages).

## Evidence on Hand

- Reference product truth at `D:\Coding Turu\gewaTes\PRODUCT.md`
- Active React 19 + TypeScript + Tailwind CSS v4 codebase and admin routing in `src/` (with mock datasets in `mockProducts.ts` / `mockBookings.ts` to be aligned with the flower catalog)
- Implementation blueprint in `plans/gewa-rental-nifty-elephant.md`

## Product Principles

1. **Artisan Warmth & Visual Delight:** Showcase the bespoke beauty and craftsmanship of painted artificial flowers with clean, modern, and inspiring presentation.
2. **Admin Autonomy (CMS First):** The admin must have full live control to update product pricing, photos, availability, and descriptions without requiring developer intervention.
3. **Transparent Rental & Purchase Flexibility:** Clearly distinguish between purchase items and rental floral arrangements (Hand Bouquets & Table Decor) with upfront rates, DP terms, and return guidelines.
4. **Frictionless WhatsApp Bridge:** Preserve personal customer connection by generating complete, structured order summaries directly into WhatsApp.
