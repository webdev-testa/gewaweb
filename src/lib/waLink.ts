export const BY_GEWA_WA = "6285822220904"

export interface WhatsAppOrderParams {
  customerName: string
  productName: string
  sizeName: string
  orderType: "buy" | "rent"
  colorConcept?: string
  greetingMessage?: string
  startDate: string
  endDate?: string
  totalAmount: number
  dpAmount: number
  deliveryMethod?: string
}

export function buildBookingMessage(params: WhatsAppOrderParams): string {
  const {
    customerName,
    productName,
    sizeName,
    orderType,
    colorConcept,
    greetingMessage,
    startDate,
    endDate,
    totalAmount,
    dpAmount,
    deliveryMethod,
  } = params

  const fmt = (d: string) => {
    try {
      return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
    } catch {
      return d
    }
  }

  const isRent = orderType === "rent"

  const lines = [
    `Halo By Gewa! 🌸✨`,
    ``,
    `Saya *${customerName}* ingin konfirmasi pemesanan via website:`,
    ``,
    `📦 *Produk:* ${productName}`,
    `📏 *Ukuran/Varian:* ${sizeName}`,
    `🏷️ *Tipe Transaksi:* ${isRent ? "Sewa / Rental" : "Beli (Keep Forever)"}`,
  ]

  if (colorConcept) {
    lines.push(`🎨 *Request Konsep Warna:* ${colorConcept}`)
  }

  if (greetingMessage) {
    lines.push(`💌 *Ucapan Kartu/Akrilik:* "${greetingMessage}"`)
  }

  if (isRent && endDate && endDate !== startDate) {
    lines.push(`📅 *Jadwal Sewa:* ${fmt(startDate)} – ${fmt(endDate)}`)
  } else {
    lines.push(`📅 *Tanggal Acara / Pengiriman:* ${fmt(startDate)}`)
  }

  if (deliveryMethod) {
    lines.push(`🚚 *Metode Pengambilan:* ${deliveryMethod}`)
  }

  lines.push(
    ``,
    `💰 *Total Biaya:* Rp ${totalAmount.toLocaleString("id-ID")}`,
    `🏦 *DP yang perlu ditransfer:* Rp ${dpAmount.toLocaleString("id-ID")}`,
    ``,
    `Mohon info rekening dan konfirmasinya ya By Gewa! Terima kasih 🙏🎨`
  )

  return lines.join("\n")
}

export function buildWaLink(message: string): string {
  return `https://wa.me/${BY_GEWA_WA}?text=${encodeURIComponent(message)}`
}

export function buildDirectWaLink(): string {
  return `https://wa.me/${BY_GEWA_WA}?text=${encodeURIComponent("Halo By Gewa! 🌸 Saya ingin konsultasi kustomisasi bunga lukis / sewa hand bouquet. Boleh dibantu?")}`
}

export function buildContactMessage(productName?: string): string {
  if (productName) {
    return `Halo By Gewa! 🌸 Saya tertarik dengan koleksi *${productName}*. Boleh saya konsultasi ketersediaan dan konsep warnanya?`
  }
  return `Halo By Gewa! 🌸 Saya ingin tanya info sewa & pemesanan bunga lukis. Boleh dibantu?`
}
