import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import Layout from "../components/Layout"
import { getProductBySlug, Product, CATEGORIES, ProductSizeOption } from "../data/mockProducts"
import { addBooking, getBookedDates } from "../data/mockBookings"
import { buildContactMessage, buildWaLink } from "../lib/waLink"

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const [product, setProduct] = useState<Product | undefined>(slug ? getProductBySlug(slug) : undefined)

  useEffect(() => {
    if (slug) setProduct(getProductBySlug(slug))
  }, [slug])

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0)
  const [orderType, setOrderType] = useState<"buy" | "rent">("buy")
  const [selectedWrap, setSelectedWrap] = useState<string>("")
  const [selectedFlowers, setSelectedFlowers] = useState<string[]>([])
  const [colorConcept, setColorConcept] = useState("")
  const [greetingMessage, setGreetingMessage] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [deliveryMethod, setDeliveryMethod] = useState("Ambil di Studio (Jl. Permata Jingga IV No.12, Malang)")

  const todayStr = new Date().toISOString().slice(0, 10)
  const [startDate, setStartDate] = useState(todayStr)
  const [rentalDays, setRentalDays] = useState(3)

  useEffect(() => {
    if (product) {
      if (product.availabilityType === "rent-only") {
        setOrderType("rent")
      } else {
        setOrderType("buy")
      }
      if (product.wrapOptions && product.wrapOptions.length > 0) {
        setSelectedWrap(product.wrapOptions[0])
      }
      if (product.allowedFlowers && product.allowedFlowers.length > 0) {
        setSelectedFlowers([product.allowedFlowers[0]])
      }
    }
  }, [product])

  if (!product) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <span className="text-4xl block mb-3" aria-hidden="true">🌸</span>
          <h2 className="font-display font-bold text-2xl text-[#0F172A] mb-2">Produk Tidak Ditemukan</h2>
          <p className="text-sm text-[#64748B] mb-6">Produk yang kamu cari mungkin telah diperbarui.</p>
          <Link to="/catalog" className="px-6 py-2.5 rounded-full text-xs font-semibold bg-[#D94883] text-white active-push">
            Kembali ke Katalog
          </Link>
        </div>
      </Layout>
    )
  }

  const catInfo = CATEGORIES[product.category]
  const currentSize: ProductSizeOption = product.sizes[selectedSizeIndex] || {
    name: "Standard",
    buyPrice: product.basePrice,
    rentPrice: product.rentPricePerDay,
  }

  // Calculate pricing
  const isRental = orderType === "rent"
  const unitPrice = isRental ? (currentSize.rentPrice || product.rentPricePerDay || product.basePrice) : currentSize.buyPrice
  const totalAmount = unitPrice
  const dpAmount = isRental ? Math.round(totalAmount * 0.3) : Math.min(50000, totalAmount)

  // Calculate end date for rentals
  const calcEndDate = () => {
    if (!isRental) return startDate
    const start = new Date(startDate)
    start.setDate(start.getDate() + (rentalDays - 1))
    return start.toISOString().slice(0, 10)
  }
  const endDate = calcEndDate()

  // Booked dates conflict check
  const existingBooked = getBookedDates(product.id)
  const isDateConflict = isRental && existingBooked.some((b) => {
    return (startDate <= b.end && endDate >= b.start)
  })

  const handleFlowerToggle = (flower: string) => {
    if (selectedFlowers.includes(flower)) {
      if (selectedFlowers.length > 1) {
        setSelectedFlowers(selectedFlowers.filter((f) => f !== flower))
      }
    } else {
      setSelectedFlowers([...selectedFlowers, flower])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!customerName.trim() || !customerPhone.trim()) {
      alert("Mohon lengkapi nama dan nomor WhatsApp kamu.")
      return
    }

    if (isDateConflict) {
      alert("Maaf, tanggal yang kamu pilih bertabrakan dengan jadwal sewa lain. Silakan pilih tanggal lain.")
      return
    }

    // Save booking to store
    const newBooking = addBooking({
      customerName,
      customerPhone,
      productId: product.id,
      productName: product.name,
      sizeName: currentSize.name,
      orderType,
      colorConcept: colorConcept || "Custom Konsep By Gewa",
      greetingMessage,
      startDate,
      endDate,
      dpDueDate: startDate,
      balanceDueDate: startDate,
      status: "pending",
      dpAmount,
      totalAmount,
      notes: `${deliveryMethod}${selectedWrap ? ` | Wrap: ${selectedWrap}` : ""}${selectedFlowers.length > 0 ? ` | Bunga: ${selectedFlowers.join(", ")}` : ""}`,
    })

    // Redirect to BookingConfirm page with state
    navigate("/booking/confirm", {
      state: {
        bookingId: newBooking.id,
        customerName,
        customerPhone,
        productName: product.name,
        sizeName: currentSize.name,
        orderType,
        colorConcept: colorConcept || "Standard Studio Color",
        greetingMessage,
        startDate,
        endDate,
        totalAmount,
        dpAmount,
        deliveryMethod,
        productImage: currentSize.image || product.coverPhoto,
      },
    })
  }

  const directConsultLink = buildWaLink(buildContactMessage(product.name))

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-[#64748B]">
          <Link to="/" className="hover:text-[#D94883]">Beranda</Link>
          <span>/</span>
          <Link to="/catalog" className="hover:text-[#D94883]">Katalog</Link>
          <span>/</span>
          <span className="text-[#0F172A] font-semibold" aria-current="page">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Product Showcase Frame */}
          <div className="lg:col-span-6 space-y-4 sticky top-24">
            <div className="relative aspect-[4/5] rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] overflow-hidden flex items-center justify-center p-8 shadow-xs">
              <div
                className="absolute inset-0 opacity-20 transition-opacity"
                style={{ backgroundColor: product.pastelThemeColor || catInfo?.pastel }}
                aria-hidden="true"
              />
              <img
                src={currentSize.image || product.coverPhoto || product.photos[0]}
                alt={`${product.name} varian ${currentSize.name}`}
                className="relative z-10 w-full h-full object-contain transition-all duration-300"
              />
              <div className="absolute top-4 left-4 z-20 flex gap-2">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/95 backdrop-blur-xs text-[#0F172A] shadow-xs border border-[#E2E8F0]">
                  {currentSize.name}
                </span>
                <span
                  className="px-3 py-1 text-xs font-semibold rounded-full text-[#0F172A] shadow-xs"
                  style={{ backgroundColor: catInfo?.pastel || "#FFCCDF" }}
                >
                  {catInfo?.title}
                </span>
              </div>
            </div>

            {/* Size & Variant Selector */}
            {product.sizes.length > 1 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-2">
                  Pilih Ukuran / Varian:
                </p>
                <div className="grid grid-cols-5 gap-2" role="group" aria-label="Pilihan ukuran produk">
                  {product.sizes.map((s, idx) => (
                    <button
                      key={s.name}
                      type="button"
                      onClick={() => setSelectedSizeIndex(idx)}
                      aria-pressed={selectedSizeIndex === idx}
                      className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center active-push ${
                        selectedSizeIndex === idx
                          ? "border-[#D94883] bg-[#FDF2F7] ring-1 ring-[#D94883]"
                          : "border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]"
                      }`}
                    >
                      <span className="text-xs font-bold text-[#0F172A] block">{s.name}</span>
                      <span className="text-[10px] text-[#64748B] block mt-0.5 font-medium">
                        {isRental && s.rentPrice ? `Rp ${(s.rentPrice/1000)}k` : `Rp ${(s.buyPrice/1000)}k`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Atelier Craft Pillars */}
            <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] grid grid-cols-3 gap-2 text-center text-xs text-[#64748B] shadow-xs">
              <div>
                <span className="block text-base mb-0.5" aria-hidden="true">🎨</span>
                <span className="font-semibold text-[#0F172A] block">1x Revisi Warna</span>
                <span className="text-[10px]">Preview foto sebelum kirim</span>
              </div>
              <div>
                <span className="block text-base mb-0.5" aria-hidden="true">🌸</span>
                <span className="font-semibold text-[#0F172A] block">Bunga Abadi</span>
                <span className="text-[10px]">Cat tahan lama & elegan</span>
              </div>
              <div>
                <span className="block text-base mb-0.5" aria-hidden="true">💬</span>
                <span className="font-semibold text-[#0F172A] block">WhatsApp Fast</span>
                <span className="text-[10px]">Respon cepat admin</span>
              </div>
            </div>
          </div>

          {/* Right Column: Customization & Booking Console */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-xs">
            <div className="mb-6">
              <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#D94883] block mb-1">
                {catInfo?.subtitle || "By Gewa Painted Florals"}
              </span>
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#0F172A] mb-2 pb-0.5">
                {product.name}
              </h1>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Price Banner */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#64748B] block">
                    {isRental ? "Harga Sewa (3 Hari):" : "Harga Pembelian (Milik Selamanya):"}
                  </span>
                  <span className="text-2xl font-display font-bold text-[#D94883]">
                    Rp {totalAmount.toLocaleString("id-ID")}
                  </span>
                </div>
                {isRental && (
                  <div className="text-right">
                    <span className="text-xs text-[#64748B] block">Deposit (DP 30%):</span>
                    <span className="text-sm font-bold text-[#0F172A]">
                      Rp {dpAmount.toLocaleString("id-ID")}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Buy vs Rent Selector */}
            {product.availabilityType === "buy-and-rent" && (
              <div className="mb-6">
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-2">
                  Tipe Pemesanan:
                </span>
                <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Tipe Pemesanan">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={orderType === "buy"}
                    onClick={() => setOrderType("buy")}
                    className={`py-3 px-4 rounded-2xl border text-left transition-all active-push ${
                      orderType === "buy"
                        ? "border-[#D94883] bg-[#FDF2F7] ring-1 ring-[#D94883]"
                        : "border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]"
                    }`}
                  >
                    <span className="block text-sm font-bold text-[#0F172A]">🎁 Beli (Keep Forever)</span>
                    <span className="block text-xs text-[#64748B] mt-0.5">Milik selamanya untuk kenang-kenangan</span>
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={orderType === "rent"}
                    onClick={() => setOrderType("rent")}
                    className={`py-3 px-4 rounded-2xl border text-left transition-all active-push ${
                      orderType === "rent"
                        ? "border-[#D94883] bg-[#FDF2F7] ring-1 ring-[#D94883]"
                        : "border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]"
                    }`}
                  >
                    <span className="block text-sm font-bold text-[#0F172A]">✨ Sewa / Rental (3 Hari)</span>
                    <span className="block text-xs text-[#64748B] mt-0.5">Hemat biaya, DP 30%, kembalikan tepat waktu</span>
                  </button>
                </div>
              </div>
            )}

            {/* Booking & Personalization Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Flower species selection (for Vases) */}
              {product.allowedFlowers && product.allowedFlowers.length > 0 && (
                <div>
                  <span className="block text-xs font-semibold text-[#0F172A] mb-2">
                    🌸 Pilihan Spesies Bunga Utama:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.allowedFlowers.map((fl) => {
                      const isSel = selectedFlowers.includes(fl)
                      return (
                        <button
                          key={fl}
                          type="button"
                          onClick={() => handleFlowerToggle(fl)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all active-push ${
                            isSel
                              ? "bg-[#D1E7DD] text-[#0F5132] font-semibold border border-[#A3CFBB]"
                              : "bg-[#F8FAFC] text-[#334155] border border-[#CBD5E1]"
                          }`}
                        >
                          {fl} {isSel ? "✓" : "+"}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Wrapping Selection */}
              {product.wrapOptions && product.wrapOptions.length > 0 && (
                <div>
                  <label htmlFor="select-wrapping" className="block text-xs font-semibold text-[#0F172A] mb-2">
                    🎀 Pilihan Warna Wrapping / Pita:
                  </label>
                  <select
                    id="select-wrapping"
                    value={selectedWrap}
                    onChange={(e) => setSelectedWrap(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] text-[#0F172A] focus:outline-none focus:border-[#D94883]"
                  >
                    {product.wrapOptions.map((w) => (
                      <option key={w} value={w}>{w}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Color Concept Input */}
              <div>
                <label htmlFor="input-color-concept" className="block text-xs font-semibold text-[#0F172A] mb-1">
                  🎨 Request Konsep Warna (Custom Paint):
                </label>
                <input
                  id="input-color-concept"
                  type="text"
                  placeholder="Contoh: Dusty Rose & Sage Green / Pastel Lilac & Cream"
                  value={colorConcept}
                  onChange={(e) => setColorConcept(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] text-[#0F172A] focus:outline-none focus:border-[#D94883]"
                />
                <span className="text-[10px] text-[#64748B] mt-1 block">
                  ✨ By Gewa menyediakan 1x revisi konsep warna saat preview foto sebelum dikirim.
                </span>
              </div>

              {/* Greeting Card Message */}
              <div>
                <label htmlFor="input-greeting-message" className="block text-xs font-semibold text-[#0F172A] mb-1">
                  💌 Ucapan Kartu / Grafir Akrilik (Opsional):
                </label>
                <textarea
                  id="input-greeting-message"
                  rows={2}
                  placeholder="Tuliskan ucapan selamat wisuda, ulang tahun, atau pesan spesial..."
                  value={greetingMessage}
                  onChange={(e) => setGreetingMessage(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] text-[#0F172A] focus:outline-none focus:border-[#D94883]"
                />
              </div>

              {/* Date Selection */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#0F172A]">
                    📅 {isRental ? "Jadwal Sewa & Pengambilan:" : "Tanggal Acara / Pengiriman:"}
                  </span>
                  {isRental && (
                    <span className="text-[10px] font-semibold text-[#D94883] bg-[#FDF2F7] px-2 py-0.5 rounded-full">
                      Durasi: {rentalDays} Hari
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="input-start-date" className="text-[10px] text-[#64748B] block mb-1">
                      {isRental ? "Tanggal Mulai Sewa:" : "Tanggal Dibutuhkan:"}
                    </label>
                    <input
                      id="input-start-date"
                      type="date"
                      value={startDate}
                      min={todayStr}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full p-2 text-xs rounded-lg border border-[#CBD5E1] bg-white text-[#0F172A]"
                      required
                    />
                  </div>

                  {isRental && (
                    <div>
                      <label htmlFor="input-end-date" className="text-[10px] text-[#64748B] block mb-1">
                        Tanggal Pengembalian:
                      </label>
                      <input
                        id="input-end-date"
                        type="date"
                        value={endDate}
                        readOnly
                        className="w-full p-2 text-xs rounded-lg border border-[#CBD5E1] bg-white/70 text-[#475569] cursor-not-allowed font-medium"
                      />
                    </div>
                  )}
                </div>

                {isDateConflict && (
                  <div className="p-2.5 rounded-lg bg-[#FEE2E2] text-[#991B1B] text-xs flex items-center gap-2" role="alert">
                    <span>⚠️</span>
                    <span>Jadwal tanggal ini sudah terisi. Silakan pilih tanggal mulai yang lain.</span>
                  </div>
                )}
              </div>

              {/* Delivery Method */}
              <div>
                <label htmlFor="select-delivery-method" className="block text-xs font-semibold text-[#0F172A] mb-1">
                  🚚 Pengambilan / Pengiriman:
                </label>
                <select
                  id="select-delivery-method"
                  value={deliveryMethod}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] text-[#0F172A] focus:outline-none focus:border-[#D94883]"
                >
                  <option value="Ambil di Studio (Jl. Permata Jingga IV No.12, Malang)">
                    📍 Self Pick-up Studio (Jl. Permata Jingga IV No.12, Malang)
                  </option>
                  <option value="Instant Courier Grab/Gojek (Malang Raya)">
                    🛵 Kurir Instan Grab/Gojek (Malang Raya)
                  </option>
                  <option value="Ekspedisi JNE/TIKI/J&T (Luar Kota / Jawa-Bali)">
                    📦 Ekspedisi Luar Kota (JNE/TIKI/J&T)
                  </option>
                </select>
              </div>

              {/* Customer Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#E2E8F0]">
                <div>
                  <label htmlFor="input-customer-name" className="block text-xs font-semibold text-[#0F172A] mb-1">
                    Nama Pemesan:
                  </label>
                  <input
                    id="input-customer-name"
                    type="text"
                    placeholder="Nama lengkap kamu"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] text-[#0F172A]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="input-customer-phone" className="block text-xs font-semibold text-[#0F172A] mb-1">
                    Nomor WhatsApp:
                  </label>
                  <input
                    id="input-customer-phone"
                    type="tel"
                    placeholder="Contoh: 08123456789"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] text-[#0F172A]"
                    required
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 space-y-2.5">
                <button
                  type="submit"
                  disabled={isDateConflict}
                  className={`w-full py-3.5 px-6 rounded-full text-sm font-semibold text-white transition-all shadow-md active-push ${
                    isDateConflict
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#D94883] hover:bg-[#C2366F]"
                  }`}
                >
                  {isRental ? "Lanjut Konfirmasi Sewa →" : "Lanjut Konfirmasi Pesanan →"}
                </button>

                <a
                  href={directConsultLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-6 rounded-full text-xs font-medium text-[#334155] border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] flex items-center justify-center gap-2 transition-colors active-push"
                >
                  <span>💬</span> Tanya / Konsultasi Dulu via WhatsApp
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}
