import { useLocation, Link } from "react-router-dom"
import Layout from "../components/Layout"
import { buildBookingMessage, buildWaLink, buildDirectWaLink } from "../lib/waLink"

export default function BookingConfirm() {
  const location = useLocation()
  const state = location.state as {
    bookingId?: string
    customerName?: string
    customerPhone?: string
    productName?: string
    sizeName?: string
    orderType?: "buy" | "rent"
    colorConcept?: string
    greetingMessage?: string
    startDate?: string
    endDate?: string
    totalAmount?: number
    dpAmount?: number
    deliveryMethod?: string
    productImage?: string
  } | null

  // Fallback defaults if accessed directly
  const {
    customerName = "Pelanggan By Gewa",
    customerPhone = "-",
    productName = "Custom Painted Flowers",
    sizeName = "Midi",
    orderType = "buy",
    colorConcept = "Dusty Rose & Sage",
    greetingMessage = "-",
    startDate = new Date().toISOString().slice(0, 10),
    endDate = new Date().toISOString().slice(0, 10),
    totalAmount = 165000,
    dpAmount = 50000,
    deliveryMethod = "Self Pick-up Studio (Jl. Permata Jingga IV No.12, Malang)",
    productImage = "/assets/lines/bouquet.png",
  } = state || {}

  const isRent = orderType === "rent"

  const message = buildBookingMessage({
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
  })

  const waLink = buildWaLink(message)
  const directWa = buildDirectWaLink()

  const fmt = (d: string) => {
    try {
      return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
    } catch {
      return d
    }
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Success Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-[#FDF2F7] text-[#D94883] flex items-center justify-center text-2xl mx-auto mb-4 border border-[#FCE7F3] shadow-xs">
            🌸
          </div>
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D94883] block mb-1">
            Pemesanan Terkirim ke Sistem
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-[#0F172A] mb-3 pb-0.5">
            Satu Langkah Lagi!
          </h1>
          <p className="text-sm text-[#64748B] max-w-md mx-auto leading-relaxed">
            Silakan kirim rincian pesanan ke WhatsApp admin By Gewa untuk konfirmasi slot pengerjaan dan pembayaran DP.
          </p>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex items-center justify-between pb-6 border-b border-[#E2E8F0] mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#F8FAFC] p-2 flex items-center justify-center flex-shrink-0 border border-[#E2E8F0]">
                <img src={productImage} alt={productName} className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-[#FDF2F7] text-[#D94883] border border-[#FCE7F3]">
                  {isRent ? "Sewa / Rental" : "Pembelian"}
                </span>
                <h3 className="font-display font-bold text-lg text-[#0F172A] mt-1">{productName}</h3>
                <p className="text-xs text-[#64748B]">Varian: {sizeName}</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-[#64748B] block font-medium">Total Biaya</span>
              <span className="font-display font-bold text-xl text-[#D94883]">
                Rp {totalAmount.toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <span className="text-[#64748B] block mb-1">Nama Pemesan:</span>
              <span className="font-semibold text-[#0F172A] text-sm block">{customerName}</span>
              <span className="text-[#64748B] block mt-0.5 font-mono">{customerPhone}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <span className="text-[#64748B] block mb-1">
                {isRent ? "Jadwal Sewa:" : "Tanggal Pengiriman / Acara:"}
              </span>
              <span className="font-semibold text-[#0F172A] text-sm block">
                {isRent ? `${fmt(startDate)} – ${fmt(endDate)}` : fmt(startDate)}
              </span>
              <span className="text-[#64748B] block mt-0.5">
                {isRent ? "Durasi 3 Hari" : "Pengiriman Sesuai Jadwal"}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <span className="text-[#64748B] block mb-1">🎨 Konsep Warna:</span>
              <span className="font-semibold text-[#0F172A] block">{colorConcept}</span>
              <span className="text-[10px] text-[#D94883] mt-1 block">Tersedia 1x revisi warna</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <span className="text-[#64748B] block mb-1">💰 DP yang Dibayarkan:</span>
              <span className="font-bold text-sm text-[#15803D] block bg-[#DCFCE7] px-2 py-0.5 rounded-md inline-block">
                Rp {dpAmount.toLocaleString("id-ID")}
              </span>
              <span className="text-[10px] text-[#64748B] mt-1 block">Pelunasan saat barang selesai</span>
            </div>
          </div>

          {greetingMessage && greetingMessage !== "-" && (
            <div className="mt-4 p-3.5 rounded-xl bg-[#FDF2F7] border border-[#FCE7F3] text-xs">
              <span className="font-semibold text-[#D94883] block mb-0.5">💌 Pesan Kartu / Grafir:</span>
              <p className="italic text-[#334155]">"{greetingMessage}"</p>
            </div>
          )}
        </div>

        {/* WhatsApp Action Button */}
        <div className="space-y-4 text-center">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-8 rounded-full text-base font-bold text-white bg-[#25D366] hover:bg-[#20ba59] transition-all shadow-md flex items-center justify-center gap-3 active-push"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>Kirim Pesanan ke WhatsApp Admin (+62858-2222-0904)</span>
          </a>

          <p className="text-xs text-[#64748B]">
            Tombol di atas akan membuka WhatsApp dengan pesan yang sudah terisi otomatis.
          </p>

          <div className="pt-4 flex items-center justify-center gap-4 text-xs font-semibold">
            <Link to="/catalog" className="text-[#D94883] hover:underline">
              ← Kembali ke Katalog
            </Link>
            <span className="text-[#CBD5E1]">•</span>
            <a href={directWa} target="_blank" rel="noopener noreferrer" className="text-[#64748B] hover:text-[#0F172A]">
              Chat Manual Tanpa Format
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}
