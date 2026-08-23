---
name: By-Gewa-Artisan-Floral-Atelier
description: Warm artisan boutique design system marrying Claude's editorial warmth, Clay's pastel categorical accents, and Airbnb/Shopify's booking and CMS precision for painted artificial florals.
colors:
  primary: "#c9552a"
  primary-hover: "#ad441e"
  primary-active: "#943715"
  primary-soft: "#faede8"
  ink: "#1a1715"
  ink-soft: "#4a4540"
  muted: "#7a7068"
  hairline: "#e8e2d9"
  hairline-soft: "#f2ece4"
  canvas: "#faf9f5"
  surface-soft: "#f5f0eb"
  surface-card: "#ffffff"
  surface-elevated: "#ffffff"
  pastel-rose: "#ffccdf"
  pastel-tosca: "#b4c8cb"
  pastel-peach: "#ffd8be"
  pastel-lavender: "#e2d5f8"
  pastel-ochre: "#fce3a7"
  status-pending-bg: "#fef3c7"
  status-pending-text: "#92400e"
  status-paid-bg: "#d1fae5"
  status-paid-text: "#065f46"
  status-returned-bg: "#f3f4f6"
  status-returned-text: "#374151"
  status-cancelled-bg: "#fee2e2"
  status-cancelled-text: "#991b1b"
typography:
  display-xl:
    fontFamily: "'Fraunces', 'Copernicus', Georgia, serif"
    fontSize: "clamp(2.5rem, 5vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  display-lg:
    fontFamily: "'Fraunces', 'Copernicus', Georgia, serif"
    fontSize: "clamp(2rem, 3.5vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  heading-md:
    fontFamily: "'Fraunces', 'Copernicus', Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  body-md:
    fontFamily: "'Outfit', 'Inter', system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0em"
  body-sm:
    fontFamily: "'Outfit', 'Inter', system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0em"
  label-caps:
    fontFamily: "'Outfit', 'Inter', system-ui, -apple-system, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.15em"
rounded:
  sm: "6px"
  md: "10px"
  lg: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
    padding: "12px 28px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  badge-category:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "6px 14px"
---

# Design System: By Gewa Artisan Floral Atelier

## Overview

**Creative North Star: "The Artisan Floral Atelier"**

The visual identity of By Gewa blends the quiet editorial warmth of a boutique monograph (*Claude*), the joyful pastel color-play of handcrafted art cards (*Clay*), and the clear, high-utility marketplace & merchant CMS mechanics (*Airbnb & Shopify*). 

The experience opens on a warm linen/cream ground (`#FAF9F5`), anchored by expressive serif display typography (*Fraunces*) for titles and artisan prices, paired with a friendly, highly legible modern grotesque (*Outfit*) for body copy and rental metadata.

The system celebrates By Gewa's *"Paint Your Moment"* philosophy: each of the five floral collections (Bouquets, Vases, Signatures, Hand Bouquets with Buy/Rent options, and Event Table Decor) is grounded in its own dedicated pastel surface wash (Rose Blush, Sage Tosca, Peach, Lavender, and Ochre). Clean photography with generous whitespace takes center stage, while full-pill buttons, conflict-free date pickers, transparent DP calculators, and streamlined Admin CMS controls give both customers and boutique staff an effortless, joyful experience.

**Key Characteristics:**
- **Warm Linen Canvas:** `#FAF9F5` base ground and `#F5F0EB` subtle panels replace cold stark whites.
- **Artisan Color Voltage:** Warm Terracotta Rose (`#C9552A`) carries primary CTAs and key brand moments.
- **Categorical Pastel Washes:** Dedicated pastel accents (Pink `#FFCCDF`, Tosca `#B4C8CB`, Peach `#FFD8BE`, Lavender `#E2D5F8`, Ochre `#FCE3A7`) tint category badges, filters, and cards.
- **Serif Display + Modern Sans Hierarchy:** Fraunces for expressive artisan headings; Outfit for clear, comfortable reading and admin data tables.
- **Full-Pill & Soft-Card Geometry:** 16px softly rounded cards with full-pill (`9999px`) badges and action buttons.
- **Commerce & CMS Clarity:** High-contrast booking statuses (`Pending`, `DP Paid`, `Paid`, `Returned`), inline live pricing controls, and dedicated WhatsApp handshakes.

## Colors

The palette is anchored in organic ceramics and warm paper tones, punctuated by terracotta voltage and five bespoke floral pastel accents.

### Primary
- **Terracotta Rose** (`#C9552A`): The signature brand accent. Carries primary CTAs ("Lihat Katalog", "Pesan Sekarang", "Konfirmasi WhatsApp"), price tags, and key interactive highlights.
- **Terracotta Hover** (`#AD441E`): Active state for primary interactive elements.
- **Terracotta Soft Wash** (`#FAEDE8`): Gentle background tint for selected dates, highlights, and active filter tabs.

### Secondary & Pastel Categorical Roles
- **Rose Blush** (`#FFCCDF`): Signature wash for Bouquets and romantic milestone arrangements.
- **Artisan Tosca** (`#B4C8CB`): Cool botanical wash for Vases and living room centerpieces.
- **Warm Peach** (`#FFD8BE`): Warm vibrant tint for Signature boxes (Yoona, Marii, Bomi).
- **Lavender Lilac** (`#E2D5F8`): Elegant pastel wash for Hand Bouquets (with Buy & Rent options).
- **Honey Ochre** (`#FCE3A7`): Golden celebration tint for Event Table Decorations.

### Neutral
- **Deep Botanical Ink** (`#1A1715`): Primary text color for high legibility and rich contrast on light surfaces.
- **Charcoal Soft** (`#4A4540`): Secondary body text, descriptions, and metadata.
- **Warm Muted** (`#7A7068`): Tertiary text, captions, date labels, and helper copy.
- **Hairline Border** (`#E8E2D9`): 1px structural container and divider line tone.
- **Hairline Soft** (`#F2ECE4`): Subdued card borders and inner table rules.
- **Linen Canvas** (`#FAF9F5`): Global background tone.
- **Warm Surface** (`#F5F0EB`): Background for featured sections, drawers, and admin sidebar.
- **Pure White Card** (`#FFFFFF`): Elevated card and modal backgrounds for clean image contrast.

### Named Rules
**The Floral Accent Dominance Rule.** The Terracotta primary accent carries key actions and never covers more than 15% of any viewport. Category pastel tints serve strictly as soft surface backgrounds or tag fills to keep the photography as the hero.
**The Warm Ground Rule.** Never use pure `#000000` for text or pure `#FFFFFF` for full-page canvas. Contrast is achieved through deep ink (`#1A1715`) against warm linen (`#FAF9F5`).

## Typography

**Display Font:** `'Fraunces', 'Copernicus', Georgia, serif`  
**Body Font:** `'Outfit', 'Inter', system-ui, -apple-system, sans-serif`  
**Label / Caps Font:** `'Outfit', sans-serif` (with uppercase tracking)

**Character:** A literary, handcrafted serif with soft curvaceous serifs paired with a modern geometric grotesque. The display face feels bespoke, personal, and artisan, while the body font ensures crystal-clear readability for product dimensions, pricing, and CMS tables.

### Hierarchy
- **Display XL** (Weight 600, `clamp(2.5rem, 5vw, 4rem)`, Line-height 1.08): Hero headlines on landing and major collection intros.
- **Display LG** (Weight 600, `clamp(2rem, 3.5vw, 2.75rem)`, Line-height 1.15): Section titles ("Koleksi Pilihan", "Momen Istimewa", "Detail Pesanan").
- **Heading MD** (Weight 600, `1.5rem` / 24px, Line-height 1.25): Card titles, modal headers, and product detail titles.
- **Body MD** (Weight 400/500, `1rem` / 16px, Line-height 1.6): Main descriptions, editorial paragraphs, customer testimonials.
- **Body SM** (Weight 400/500, `0.875rem` / 14px, Line-height 1.5): Price metadata, form labels, CMS table cells, status descriptions.
- **Label Caps** (Weight 600, `0.75rem` / 12px, Letter-spacing `0.15em`, Uppercase): Category tags, step numbers ("01", "02"), date markers, and breadcrumbs.

### Named Rules
**The Price-Display Rule.** All prices are formatted in IDR (`Rp 150.000`) and styled with `Fraunces` semi-bold display typography, celebrating the value and handcrafted nature of the arrangement.
**The Strict Tracking Rule.** Uppercase micro-labels must always use tracking `0.15em` to `0.25em` to maintain airy editorial legibility.

## Layout

- **Grid System:** 12-column responsive grid with a maximum content container width of `1200px` (`max-w-6xl`) and `24px` (`px-6`) mobile gutters.
- **Rhythm & Spacing:** Spacing rhythm follows an 8px base scale (`8px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`).
- **Catalog & Masonry:** Public catalog uses a responsive 2-column (mobile) to 3/4-column (desktop) grid with uniform aspect ratios (`4/5` for vertical floral arrangements, `4/3` for horizontal event decor).
- **Admin Dashboard Layout:** Left fixed sidebar (`260px` width) on warm surface (`#F5F0EB`) paired with a wide white content canvas (`#FFFFFF` or `#FAF9F5`) and sticky table headers.

## Elevation & Depth

By Gewa favors **flat tonal layering** and crisp 1px borders over heavy drop shadows. Depth is communicated through color contrast (white card over linen canvas) and whisper-soft ambient glow on hover.

### Shadow Vocabulary
- **Card Rest:** `box-shadow: 0 1px 3px 0 rgba(26, 23, 21, 0.04)` (subtle grounding).
- **Card Hover:** `box-shadow: 0 12px 32px -8px rgba(26, 23, 21, 0.08)` (smooth floating lift).
- **Modal / Floating CTA:** `box-shadow: 0 20px 48px -12px rgba(26, 23, 21, 0.16)` (elevated overlay).

### Named Rules
**The Tonal Layering Rule.** Surfaces achieve hierarchy by resting white cards (`#FFFFFF`) upon warm linen canvas (`#FAF9F5`), bordered by clean hairline strokes (`#E8E2D9`), rather than dark heavy drop shadows.

## Shapes

- **Card Corners:** `16px` (`rounded-2xl` / `rounded-lg`) for product tiles, order summary panels, and modal containers.
- **Button Radii:** Full pill (`9999px` / `rounded-full`) for all primary actions, category filters, and contact buttons.
- **Input Fields:** `10px` (`rounded-lg`) with 1px border stroke.
- **Status Pills:** Full pill (`rounded-full`) with `4px 12px` padding.
- **Borders:** Consistent 1px solid hairline (`#E8E2D9`) across all bordered components.

## Components

### Buttons
- **Primary Action:** Full pill (`rounded-full`), Terracotta background (`#C9552A`), white text, `12px 28px` padding, font weight 500. Subtle `scale(0.98)` on press and `opacity-90` on hover.
- **Secondary / Outline:** Full pill (`rounded-full`), transparent background, 1px `#1A1715` border, ink text (`#1A1715`), hover background `#FFFFFF`.
- **WhatsApp Action:** Full pill (`rounded-full`), `#25D366` emerald or Terracotta, white text, WhatsApp icon inline, `12px 24px` padding.

### Category Pills & Filter Chips
- **Rest State:** Full pill (`rounded-full`), surface soft background (`#F5F0EB`), text `#4A4540`, border 1px transparent.
- **Active State:** Full pill (`rounded-full`), terracotta soft wash (`#FAEDE8`) or category pastel wash, 1px `#C9552A` border, bold ink text.

### Product Card
- **Corner:** `16px` radius with overflow hidden.
- **Image Aspect:** `4/5` or `3/4` portrait frame with smooth `transform duration-500 hover:scale-105` zoom.
- **Card Body:** Category label in tracked uppercase, Product Name in `Fraunces` bold, Price per day/buy in display typography, availability pill badge, and instant CTA.

### Form Inputs & Date Range Picker
- **Input Fields:** `10px` radius, background `#FFFFFF`, border 1px `#E8E2D9`, text `#1A1715`, placeholder `#A89F96`.
- **Focus State:** 1px border `#C9552A` with soft ring `rgba(201, 85, 42, 0.15)`.
- **Date Range Picker:** Highlights available dates in green/clean, rented/booked dates in disabled gray with conflict warning tooltip.

### Admin CMS Table & Status Badges
- **Table Structure:** Clean whitespace rows, 1px `#F2ECE4` divider, hover row highlight in `#FAF9F5`.
- **Status Badges:**
  - `Pending`: Yellow/Amber pill (`bg-[#FEF3C7] text-[#92400E]`).
  - `DP Paid`: Blue/Tosca pill (`bg-[#E0F2FE] text-[#0369A1]`).
  - `Paid / In Production`: Emerald green pill (`bg-[#D1FAE5] text-[#065F46]`).
  - `Returned / Completed`: Neutral gray pill (`bg-[#F3F4F6] text-[#374151]`).
  - `Cancelled`: Red pill (`bg-[#FEE2E2] text-[#991B1B]`).

## Do's and Don'ts

### Do:
- **Do** celebrate the handcrafted, artisan quality of painted flowers with generous whitespace and high-resolution photography.
- **Do** use category-specific pastel washes (`#FFCCDF`, `#B4C8CB`, `#FFD8BE`, `#E2D5F8`, `#FCE3A7`) to create joyful visual variety across product lines.
- **Do** style prices in `Fraunces` serif to evoke the bespoke boutique atelier experience.
- **Do** provide clear, friction-free status pills and inline editing in the Admin CMS to allow effortless price and content updates.
- **Do** route finalized booking and inquiry summaries into pre-formatted, polite Indonesian WhatsApp messages.

### Don't:
- **Don't** use cold clinical pure black (`#000000`) or pure gray backgrounds; always tint with warm linen (`#FAF9F5`).
- **Don't** clutter product cards with heavy drop shadows or flashy gradient borders.
- **Don't** hide rental vs buy terms; always clearly display whether an item is for purchase (Bouquet/Vase) or available for rental (Hand Bouquet/Table Decor) with DP and late fee terms.
- **Don't** use generic stock iconography; maintain delicate, refined SVG line art suited to floristry.
