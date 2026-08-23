export type BookingStatus = "pending" | "dp_paid" | "paid" | "returned" | "cancelled"
export type OrderType = "buy" | "rent"

export interface Booking {
  id: string
  customerName: string
  customerPhone: string
  productId: string
  productName: string
  sizeName: string
  orderType: OrderType
  colorConcept?: string
  greetingMessage?: string
  startDate: string
  endDate: string
  dpDueDate: string
  balanceDueDate: string
  status: BookingStatus
  dpAmount: number
  totalAmount: number
  lateFeePerDay?: number
  notes?: string
  createdAt: string
  returnedAt?: string
}


const today = new Date()
const d = (offset: number) => {
  const date = new Date(today)
  date.setDate(date.getDate() + offset)
  return date.toISOString().slice(0, 10)
}

export const initialBookings: Booking[] = [
  {
    id: "ord-101",
    customerName: "Aulia Rahmadani",
    customerPhone: "6285822220904",
    productId: "prod-hand-bouquet",
    productName: "Bridal Hand Bouquet (Sewa)",
    sizeName: "Largo",
    orderType: "rent",
    colorConcept: "Sage Green & Dusty Rose",
    greetingMessage: "Happy Wedding Aulia & Dimas",
    startDate: d(3),
    endDate: d(6),
    dpDueDate: d(1),
    balanceDueDate: d(2),
    status: "dp_paid",
    dpAmount: 105000,
    totalAmount: 350000,
    lateFeePerDay: 35000,
    notes: "Sewa 3 hari untuk resepsi di Ijen Suites Malang. Pickup di studio.",
    createdAt: d(-2),
  },
  {
    id: "ord-102",
    customerName: "Nabila Saraswati",
    customerPhone: "6281234567890",
    productId: "prod-bouquet",
    productName: "By Gewa Painted Bouquet (Beli)",
    sizeName: "Midi",
    orderType: "buy",
    colorConcept: "Pastel Lilac & Soft Peach",
    greetingMessage: "Happy Graduation S.Ked Nabila!",
    startDate: d(4),
    endDate: d(4),
    dpDueDate: d(2),
    balanceDueDate: d(3),
    status: "pending",
    dpAmount: 50000,
    totalAmount: 165000,
    notes: "Pengiriman instan GoSend ke UB Malang.",
    createdAt: d(-1),
  },
  {
    id: "ord-103",
    customerName: "Jessica Melinda",
    customerPhone: "6282345678901",
    productId: "prod-table-decor",
    productName: "Event Table Decoration (Sewa)",
    sizeName: "Standard Setting (4-6 Kursi)",
    orderType: "rent",
    colorConcept: "Autumn Terracotta & Champagne Gold",
    startDate: d(7),
    endDate: d(8),
    dpDueDate: d(3),
    balanceDueDate: d(6),
    status: "paid",
    dpAmount: 150000,
    totalAmount: 500000,
    lateFeePerDay: 50000,
    notes: "Dekorasi Intimate Dinner di Araya Malang. Full payment received.",
    createdAt: d(-5),
  },
  {
    id: "ord-104",
    customerName: "Kevin Christian",
    customerPhone: "628345678902",
    productId: "prod-signature",
    productName: "Acrylic Bloom Box (Beli)",
    sizeName: "Acrylic Bloom Box",
    orderType: "buy",
    colorConcept: "Blush Pink & White Lily",
    greetingMessage: "Will You Marry Me, Clara?",
    startDate: d(2),
    endDate: d(2),
    dpDueDate: d(-1),
    balanceDueDate: d(1),
    status: "paid",
    dpAmount: 100000,
    totalAmount: 300000,
    notes: "Grafir akrilik sudah disetujui 1x revisi.",
    createdAt: d(-4),
  },
  {
    id: "ord-105",
    customerName: "Dewi Anggraini",
    customerPhone: "628456789013",
    productId: "prod-hand-bouquet",
    productName: "Bridal Hand Bouquet (Sewa)",
    sizeName: "Midi",
    orderType: "rent",
    colorConcept: "Pure White & Emerald Accent",
    startDate: d(-4),
    endDate: d(-1),
    dpDueDate: d(-8),
    balanceDueDate: d(-5),
    status: "dp_paid",
    dpAmount: 75000,
    totalAmount: 250000,
    lateFeePerDay: 35000,
    notes: "Terlambat pengembalian 1 hari. Dikenakan denda harian Rp 35.000.",
    createdAt: d(-10),
  },
  {
    id: "ord-106",
    customerName: "Farah Salsabila",
    customerPhone: "628567890124",
    productId: "prod-vase",
    productName: "By Gewa Artisan Vase (Beli)",
    sizeName: "Grande",
    orderType: "buy",
    colorConcept: "Ocean Tosca & Hydrangea White",
    greetingMessage: "Happy New House Mom & Dad!",
    startDate: d(12),
    endDate: d(12),
    dpDueDate: d(5),
    balanceDueDate: d(10),
    status: "pending",
    dpAmount: 100000,
    totalAmount: 285000,
    notes: "Minta packing kayu kirim ke Surabaya via ekspedisi.",
    createdAt: d(0),
  },
  {
    id: "ord-107",
    customerName: "Rizky Pratama",
    customerPhone: "628678901235",
    productId: "prod-hand-bouquet",
    productName: "Bridal Hand Bouquet (Sewa)",
    sizeName: "Petite",
    orderType: "rent",
    colorConcept: "Pastel Lavender",
    startDate: d(-10),
    endDate: d(-7),
    dpDueDate: d(-15),
    balanceDueDate: d(-11),
    status: "returned",
    dpAmount: 45000,
    totalAmount: 150000,
    lateFeePerDay: 25000,
    notes: "Buket kembali dalam kondisi sangat baik dan bersih.",
    createdAt: d(-18),
  },
]

const BOOKINGS_KEY = "bygewa_bookings_list"

export function getStoredBookings(): Booking[] {
  if (typeof window === "undefined") return initialBookings
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY)
    if (!raw) {
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(initialBookings))
      return initialBookings
    }
    return JSON.parse(raw)
  } catch (err) {
    console.error("Failed to read bookings:", err)
    return initialBookings
  }
}

export function saveStoredBookings(list: Booking[]): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(list))
    window.dispatchEvent(new Event("bygewa_bookings_updated"))
  } catch (err) {
    console.error("Failed to save bookings:", err)
  }
}

export function addBooking(booking: Omit<Booking, "id" | "createdAt">): Booking {
  const list = getStoredBookings()
  const newBooking: Booking = {
    ...booking,
    id: `ord-${Date.now().toString().slice(-4)}`,
    createdAt: new Date().toISOString().slice(0, 10),
  }
  list.unshift(newBooking)
  saveStoredBookings(list)
  return newBooking
}

export function updateBookingStatus(id: string, newStatus: BookingStatus, notes?: string): void {
  const list = getStoredBookings()
  const b = list.find((item) => item.id === id)
  if (b) {
    b.status = newStatus
    if (notes !== undefined) b.notes = notes
    if (newStatus === "returned") b.returnedAt = new Date().toISOString().slice(0, 10)
    saveStoredBookings(list)
  }
}


export function calculateLateFee(b: Booking): { daysLate: number; lateFee: number } {
  if (b.orderType !== "rent" || b.status === "returned" || b.status === "cancelled") {
    return { daysLate: 0, lateFee: 0 }
  }
  const end = new Date(b.endDate)
  const now = new Date()
  end.setHours(0, 0, 0, 0)
  now.setHours(0, 0, 0, 0)

  const diffMs = now.getTime() - end.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays > 0) {
    const rate = b.lateFeePerDay || 25000
    return { daysLate: diffDays, lateFee: diffDays * rate }
  }
  return { daysLate: 0, lateFee: 0 }
}

export function getBookedDates(productId: string): { start: string; end: string }[] {
  return getStoredBookings()
    .filter((b) => b.productId === productId && b.orderType === "rent" && b.status !== "cancelled" && b.status !== "returned")
    .map((b) => ({ start: b.startDate, end: b.endDate }))
}
