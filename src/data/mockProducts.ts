export type Category = "bouquet" | "vase" | "hand-bouquet" | "signature" | "decoration"
export type AvailabilityType = "buy-only" | "rent-only" | "buy-and-rent"

export interface ProductSize {
  name: string
  buyPrice: number
  rentPrice?: number // IDR per 3-day rental period
  depositPercent?: number // typically 30%
  image?: string
  description?: string
}

export interface Product {
  id: string
  slug: string
  name: string
  category: Category
  availabilityType: AvailabilityType
  basePrice: number
  rentPricePerDay?: number // base 3-day rental price
  lateFeePerDay?: number // e.g. 25000 / day
  photos: string[]
  coverPhoto: string
  description: string
  active: boolean
  portfolio: boolean
  sizes: ProductSize[]
  allowedFlowers?: string[] // For Vase
  wrapOptions?: string[] // For Bouquet / Hand Bouquet
  pastelThemeColor: string // e.g. #FFCCDF, #B4C8CB, #FFD8BE, #E2D5F8, #FCE3A7
}

export const CATEGORIES: Record<Category, { title: string; subtitle: string; pastel: string; tag: string; emoji: string }> = {
  "bouquet": {
    title: "Bouquet",
    subtitle: "Painted Artificial Bouquet (Petite hingga Human Size)",
    pastel: "#FFCCDF",
    tag: "Beli / Custom",
    emoji: "💐",
  },
  "vase": {
    title: "Vase",
    subtitle: "Rangkaian Vas Bunga Eksklusif & Pilihan Spesies Bunga",
    pastel: "#B4C8CB",
    tag: "Beli / Custom",
    emoji: "🏺",
  },
  "hand-bouquet": {
    title: "Hand Bouquet",
    subtitle: "Buket Pengantin & Prewedding — Tersedia Opsi Beli & Sewa",
    pastel: "#FFD8E4",
    tag: "Beli & Sewa",
    emoji: "🌹",
  },
  "signature": {
    title: "Signature Creation",
    subtitle: "Yoona, Marii, Bomi & Bloom Box dengan Akrilik Personalisasi",
    pastel: "#E9D5FF",
    tag: "Beli / Hadiah",
    emoji: "✨",
  },
  "decoration": {
    title: "Table Decoration",
    subtitle: "Dekorasi Meja Event, Lamaran, Gathering & Table Setting",
    pastel: "#DBEAFE",
    tag: "Sewa Event",
    emoji: "🎀",
  },
}

export const initialProducts: Product[] = [
  {
    id: "prod-bouquet",
    slug: "painted-bouquet-collection",
    name: "By Gewa Painted Bouquet",
    category: "bouquet",
    availabilityType: "buy-only",
    basePrice: 80000,
    photos: [
      "/assets/lines/bouquet.png",
      "/assets/products/largo-buket.png",
      "/assets/products/grande-buket.png",
      "/assets/products/petite-buket.png",
      "/assets/products/human-size-buket.png",
    ],
    coverPhoto: "/assets/lines/bouquet.png",
    description:
      "Handcrafted painted artificial bouquet dengan pewarnaan gradasi artistik khas By Gewa ('Paint Your Moment'). Tahan lama selamanya sebagai kenang-kenangan wisuda, ulang tahun, dan perayaan istimewa. Dilengkapi wrapping premium dan greeting card personal.",
    active: true,
    portfolio: true,
    pastelThemeColor: "#FFCCDF",
    wrapOptions: ["Black Premium Wrap", "White Soft Elegance", "Pastel Soft Pink", "Natural Earthy"],
    sizes: [
      { name: "Petite", buyPrice: 80000, image: "/assets/products/petite-buket.png", description: "Buket mungil nan manis, cocok untuk hadiah wisuda atau teman spesial." },
      { name: "Midi", buyPrice: 165000, image: "/assets/products/midi-buket.png", description: "Ukuran proporsional paling diminati untuk kado kelulusan & ulang tahun." },
      { name: "Largo", buyPrice: 245000, image: "/assets/products/largo-buket.png", description: "Buket besar dengan komposisi bunga mewah dan berlapis." },
      { name: "Grande", buyPrice: 315000, image: "/assets/products/grande-buket.png", description: "Rangkaian megah dan dramatis untuk momen penting tak terlupakan." },
      { name: "Human size", buyPrice: 350000, image: "/assets/products/human-size-buket.png", description: "Buket raksasa setinggi badan untuk surprise statement paling spektakuler." },
    ],
  },
  {
    id: "prod-vase",
    slug: "painted-vase-arrangement",
    name: "By Gewa Artisan Vase Arrangement",
    category: "vase",
    availabilityType: "buy-only",
    basePrice: 125000,
    photos: [
      "/assets/lines/vase.png",
      "/assets/products/largo-vase.png",
      "/assets/products/gardenia-vase.png",
      "/assets/products/grande-vase.png",
      "/assets/products/petite-vase.png",
    ],
    coverPhoto: "/assets/lines/vase.png",
    description:
      "Rangkaian vas bunga keramik berpadu dengan lukisan bunga artifisial (Lily, Anthurium, Orchid, Hydrangea). Mempercantik meja kerja, sudut ruang tamu, atau hampers premium dengan estetika kontemporer yang elegan.",
    active: true,
    portfolio: true,
    pastelThemeColor: "#B4C8CB",
    allowedFlowers: ["Lily", "Anthurium", "Orchid", "Hydrangea"],
    sizes: [
      { name: "Petite", buyPrice: 125000, image: "/assets/products/petite-vase.png", description: "Vas minimalis meja kerja (Max 1 jenis bunga utama)." },
      { name: "Midi", buyPrice: 185000, image: "/assets/products/midi-vase.png", description: "Vas meja tamu elegan (Kombinasi hingga 2 jenis bunga)." },
      { name: "Largo", buyPrice: 250000, image: "/assets/products/largo-vase.png", description: "Komposisi rimbun dan artistik (Kombinasi hingga 3 jenis bunga)." },
      { name: "Grande", buyPrice: 285000, image: "/assets/products/grande-vase.png", description: "Vas mewah untuk centerpiece ruang utama (Termasuk Hydrangea)." },
      { name: "Gardenia", buyPrice: 365000, image: "/assets/products/gardenia-vase.png", description: "Signature arrangement terlengkap dengan vas premium & aneka bunga mekar." },
    ],
  },
  {
    id: "prod-hand-bouquet",
    slug: "bridal-hand-bouquet-collection",
    name: "Bridal Hand Bouquet (Beli & Sewa)",
    category: "hand-bouquet",
    availabilityType: "buy-and-rent",
    basePrice: 250000,
    rentPricePerDay: 150000,
    lateFeePerDay: 35000,
    photos: [
      "/assets/lines/hand-bouquet.png",
      "/assets/products/largo-hand-bouquet.png",
      "/assets/products/midi-hand-bouquet.png",
      "/assets/products/petite-hand-bouquet.png",
    ],
    coverPhoto: "/assets/lines/hand-bouquet.png",
    description:
      "Hand bouquet pengantin & sesi prewedding dengan detail pewarnaan custom sesuai tema busana dan gaun pengantin. Tersedia opsi Beli (keepsake selamanya) atau Sewa (rental 3 hari, DP 30%) dengan jaminan bunga prima dan rapi.",
    active: true,
    portfolio: true,
    pastelThemeColor: "#E2D5F8",
    wrapOptions: ["Silk Ribbon Cream", "Dusty Rose Satin", "Chiffon Earthy White", "Velvet Accent"],
    sizes: [
      { name: "Petite", buyPrice: 250000, rentPrice: 150000, depositPercent: 30, image: "/assets/products/petite-hand-bouquet.png", description: "Buket tangan ringkas untuk prewedding kasual atau bridesmaid." },
      { name: "Midi", buyPrice: 350000, rentPrice: 250000, depositPercent: 30, image: "/assets/products/midi-hand-bouquet.png", description: "Ukuran ideal untuk akad nikah, pemberkatan, atau resepsi intim." },
      { name: "Largo", buyPrice: 450000, rentPrice: 350000, depositPercent: 30, image: "/assets/products/largo-hand-bouquet.png", description: "Buket mewah menjuntai (cascade/lush) untuk resepsi megah & pesta malam." },
    ],
  },
  {
    id: "prod-signature",
    slug: "by-gewa-signature-collection",
    name: "By Gewa Signature Creations",
    category: "signature",
    availabilityType: "buy-only",
    basePrice: 100000,
    photos: [
      "/assets/lines/signature.png",
      "/assets/products/yoona.png",
      "/assets/products/marii.png",
      "/assets/products/bomi.png",
      "/assets/products/bloom-box.png",
      "/assets/products/acrylic-bloom-box.png",
    ],
    coverPhoto: "/assets/lines/signature.png",
    description:
      "Koleksi signature berkarakter unik: Yoona, Marii, Bomi, Bloom Box, dan Acrylic Bloom Box dengan plakat ucapan akrilik personal. Desain artistik eksklusif yang tidak ditemukan di florist konvensional.",
    active: true,
    portfolio: true,
    pastelThemeColor: "#FFD8BE",
    sizes: [
      { name: "Yoona", buyPrice: 100000, image: "/assets/products/yoona.png", description: "Bunga artifisial mini dalam dome/frame kaca artistik." },
      { name: "Marii", buyPrice: 175000, image: "/assets/products/marii.png", description: "Kombinasi bunga lukis dengan sentuhan rustic hangat." },
      { name: "Bomi", buyPrice: 300000, image: "/assets/products/bomi.png", description: "Kreasi floral berlayer dalam box silinder eksklusif." },
      { name: "Bloom Box", buyPrice: 300000, image: "/assets/products/bloom-box.png", description: "Hardbox mewah berpita dengan susunan bunga penuh warna." },
      { name: "Acrylic Bloom Box", buyPrice: 300000, image: "/assets/products/acrylic-bloom-box.png", description: "Box akrilik transparan premium dengan ukiran ucapan kustom di permukaan akrilik." },
    ],
  },
  {
    id: "prod-table-decor",
    slug: "event-table-decoration",
    name: "Event Table Decoration (Sewa)",
    category: "decoration",
    availabilityType: "rent-only",
    basePrice: 500000,
    rentPricePerDay: 500000,
    lateFeePerDay: 75000,
    photos: [
      "/assets/lines/decoration.png",
      "/assets/products/table-decoration.png",
    ],
    coverPhoto: "/assets/lines/decoration.png",
    description:
      "Paket sewa dekorasi meja untuk berbagai perayaan (Lamaran, Bridal Party, Ulang Tahun, Gathering, Workshop, Intimate Dinner). Termasuk rangkaian bunga lukis memanjang (table runner style), ornamen lilin, dan aksen meja.",
    active: true,
    portfolio: true,
    pastelThemeColor: "#FCE3A7",
    sizes: [
      { name: "Standard Setting (4-6 Kursi)", buyPrice: 0, rentPrice: 500000, depositPercent: 30, image: "/assets/products/table-decoration.png", description: "Rangkaian floral meja panjang 1.5 - 2 meter dengan lilin dekorasi." },
      { name: "Luxe Long Setting (8-12 Kursi)", buyPrice: 0, rentPrice: 950000, depositPercent: 30, image: "/assets/products/table-decoration.png", description: "Rangkaian floral panjang 3 - 4 meter dengan vas gantung & centerpieces." },
    ],
  },
]

export const portfolioPhotos = [
  { id: "ph1", url: "/assets/lines/bouquet.png", caption: "Painted Bouquet — Dusty Pink & Terracotta" },
  { id: "ph2", url: "/assets/products/largo-hand-bouquet.png", caption: "Hand Bouquet Largo — Akad Nikah & Prewedding" },
  { id: "ph3", url: "/assets/products/gardenia-vase.png", caption: "Gardenia Vase Arrangement — Living Room Accent" },
  { id: "ph4", url: "/assets/products/acrylic-bloom-box.png", caption: "Acrylic Bloom Box — Anniversary & Birthday Gift" },
  { id: "ph5", url: "/assets/products/table-decoration.png", caption: "Table Decoration — Intimate Bridal Party Malang" },
  { id: "ph6", url: "/assets/products/human-size-buket.png", caption: "Human Size Giant Bouquet — Graduation Surprise" },
  { id: "ph7", url: "/assets/products/bomi.png", caption: "Bomi Signature Series — Special Proposal Moment" },
  { id: "ph8", url: "/assets/lines/vase.png", caption: "Orchid & Anthurium Custom Painted Vase" },
  { id: "ph9", url: "/assets/products/yoona.png", caption: "Yoona Petite Keepsake — Desk Companion" },
]

// LocalStorage Store for live Admin CMS synchronization with clean URL asset migration
const STORAGE_KEY = "bygewa_products_catalog"
const VERSION_KEY = "bygewa_products_catalog_version"
const CURRENT_VERSION = "v3-clean-url-assets"

export function getStoredProducts(): Product[] {
  if (typeof window === "undefined") return initialProducts
  try {
    const version = localStorage.getItem(VERSION_KEY)
    const raw = localStorage.getItem(STORAGE_KEY)
    
    // Auto-migrate if first time or version upgraded
    if (!raw || version !== CURRENT_VERSION) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts))
      localStorage.setItem(VERSION_KEY, CURRENT_VERSION)
      return initialProducts
    }
    
    const parsed: Product[] = JSON.parse(raw)
    // Extra safety: if any photo contains spaces in old stored data, normalize it
    let hasDirtyUrls = false
    for (const p of parsed) {
      if (p.coverPhoto && p.coverPhoto.includes(" ")) hasDirtyUrls = true
    }
    if (hasDirtyUrls) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts))
      localStorage.setItem(VERSION_KEY, CURRENT_VERSION)
      return initialProducts
    }

    return parsed
  } catch (err) {
    console.error("Failed to read stored products:", err)
    return initialProducts
  }
}

export function saveStoredProducts(productsList: Product[]): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(productsList))
    localStorage.setItem(VERSION_KEY, CURRENT_VERSION)
    window.dispatchEvent(new Event("bygewa_products_updated"))
  } catch (err) {
    console.error("Failed to save products to localStorage:", err)
  }
}

export interface StudioAsset {
  title: string
  path: string
  category: Category | "general"
}

export const STUDIO_ASSETS: StudioAsset[] = [
  { title: "Bouquet Cover", path: "/assets/lines/bouquet.png", category: "bouquet" },
  { title: "Vase Cover", path: "/assets/lines/vase.png", category: "vase" },
  { title: "Hand Bouquet Cover", path: "/assets/lines/hand-bouquet.png", category: "hand-bouquet" },
  { title: "Signature Cover", path: "/assets/lines/signature.png", category: "signature" },
  { title: "Decoration Cover", path: "/assets/lines/decoration.png", category: "decoration" },
  { title: "Petite Buket", path: "/assets/products/petite-buket.png", category: "bouquet" },
  { title: "Midi Buket", path: "/assets/products/midi-buket.png", category: "bouquet" },
  { title: "Largo Buket", path: "/assets/products/largo-buket.png", category: "bouquet" },
  { title: "Grande Buket", path: "/assets/products/grande-buket.png", category: "bouquet" },
  { title: "Human Size Buket", path: "/assets/products/human-size-buket.png", category: "bouquet" },
  { title: "Petite Vase", path: "/assets/products/petite-vase.png", category: "vase" },
  { title: "Midi Vase", path: "/assets/products/midi-vase.png", category: "vase" },
  { title: "Largo Vase", path: "/assets/products/largo-vase.png", category: "vase" },
  { title: "Grande Vase", path: "/assets/products/grande-vase.png", category: "vase" },
  { title: "Gardenia Vase", path: "/assets/products/gardenia-vase.png", category: "vase" },
  { title: "Petite Hand Bouquet", path: "/assets/products/petite-hand-bouquet.png", category: "hand-bouquet" },
  { title: "Midi Hand Bouquet", path: "/assets/products/midi-hand-bouquet.png", category: "hand-bouquet" },
  { title: "Largo Hand Bouquet", path: "/assets/products/largo-hand-bouquet.png", category: "hand-bouquet" },
  { title: "Yoona Signature", path: "/assets/products/yoona.png", category: "signature" },
  { title: "Marii Signature", path: "/assets/products/marii.png", category: "signature" },
  { title: "Bomi Signature", path: "/assets/products/bomi.png", category: "signature" },
  { title: "Bloom Box", path: "/assets/products/bloom-box.png", category: "signature" },
  { title: "Acrylic Bloom Box", path: "/assets/products/acrylic-bloom-box.png", category: "signature" },
  { title: "Table Decoration Setting", path: "/assets/products/table-decoration.png", category: "decoration" },
  { title: "Header Banner Cover", path: "/assets/banner-cover.png", category: "general" },
]

export function getProductBySlug(slug: string): Product | undefined {
  const list = getStoredProducts()
  return list.find((p) => p.slug === slug)
}

export function updateProductPriceInStore(
  productId: string,
  newBasePrice: number,
  newRentPrice?: number
): void {
  const list = getStoredProducts()
  const idx = list.findIndex((p) => p.id === productId)
  if (idx !== -1) {
    list[idx].basePrice = newBasePrice
    if (newRentPrice !== undefined) {
      list[idx].rentPricePerDay = newRentPrice
    }
    // Also update primary size base price
    if (list[idx].sizes.length > 0) {
      list[idx].sizes[0].buyPrice = newBasePrice
      if (newRentPrice !== undefined && list[idx].sizes[0].rentPrice !== undefined) {
        list[idx].sizes[0].rentPrice = newRentPrice
      }
    }
    saveStoredProducts(list)
  }
}

export function resetProductsToInitial(): void {
  saveStoredProducts(initialProducts)
}
