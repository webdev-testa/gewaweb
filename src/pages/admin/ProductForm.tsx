import { useState, useEffect, useRef } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import AdminLayout from "../../components/AdminLayout"
import {
  getStoredProducts,
  saveStoredProducts,
  Product,
  Category,
  AvailabilityType,
  CATEGORIES,
  STUDIO_ASSETS,
  StudioAsset,
} from "../../data/mockProducts"

export default function ProductForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [category, setCategory] = useState<Category>("bouquet")
  const [availabilityType, setAvailabilityType] = useState<AvailabilityType>("buy-only")
  const [basePrice, setBasePrice] = useState(150000)
  const [rentPricePerDay, setRentPricePerDay] = useState(100000)
  const [lateFeePerDay, setLateFeePerDay] = useState(25000)
  const [coverPhoto, setCoverPhoto] = useState("/assets/Aset Foto Jenis Lini Produk/Bouquet By Gewa.png")
  const [description, setDescription] = useState("")
  const [active, setActive] = useState(true)
  const [portfolio, setPortfolio] = useState(true)
  const [sizesStr, setSizesStr] = useState("Petite, Midi, Largo, Grande")

  // Asset picker modal state
  const [showAssetModal, setShowAssetModal] = useState(false)
  const [assetFilter, setAssetFilter] = useState<string>("all")
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showAssetModal) {
        setShowAssetModal(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [showAssetModal])

  useEffect(() => {
    if (isEdit && id) {
      const list = getStoredProducts()
      const found = list.find((p) => p.id === id)
      if (found) {
        setName(found.name)
        setSlug(found.slug)
        setCategory(found.category)
        setAvailabilityType(found.availabilityType)
        setBasePrice(found.basePrice)
        setRentPricePerDay(found.rentPricePerDay || 0)
        setLateFeePerDay(found.lateFeePerDay || 25000)
        setCoverPhoto(found.coverPhoto || found.photos[0] || "")
        setDescription(found.description)
        setActive(found.active)
        setPortfolio(found.portfolio)
        setSizesStr(found.sizes.map((s) => s.name).join(", "))
      }
    }
  }, [isEdit, id])

  const handleNameChange = (val: string) => {
    setName(val)
    if (!isEdit) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      )
    }
  }

  // Handle local file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string
        if (result) {
          setCoverPhoto(result)
          if (!name.trim()) {
            const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, "")
            handleNameChange(fileNameWithoutExt)
          }
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFilePicker = () => {
    fileInputRef.current?.click()
  }

  const selectAssetFromLibrary = (asset: StudioAsset) => {
    setCoverPhoto(asset.path)
    if (asset.category !== "general" && (!category || category === "bouquet")) {
      setCategory(asset.category)
    }
    setShowAssetModal(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const sizeNames = sizesStr.split(",").map((s) => s.trim()).filter(Boolean)
    const sizes = sizeNames.map((sz, idx) => {
      const multiplier = 1 + idx * 0.4
      return {
        name: sz,
        buyPrice: Math.round(basePrice * multiplier),
        rentPrice: availabilityType !== "buy-only" ? Math.round(rentPricePerDay * multiplier) : undefined,
        depositPercent: 30,
        description: `Varian ukuran ${sz}`,
      }
    })

    const list = getStoredProducts()
    const pastelColor = CATEGORIES[category]?.pastel || "#FFCCDF"

    if (isEdit && id) {
      const idx = list.findIndex((p) => p.id === id)
      if (idx !== -1) {
        list[idx] = {
          ...list[idx],
          name: name || "Koleksi Bunga By Gewa",
          slug,
          category,
          availabilityType,
          basePrice,
          rentPricePerDay: availabilityType !== "buy-only" ? rentPricePerDay : undefined,
          lateFeePerDay,
          coverPhoto,
          description,
          active,
          portfolio,
          sizes: sizes.length > 0 ? sizes : list[idx].sizes,
          pastelThemeColor: pastelColor,
        }
      }
    } else {
      const newProd: Product = {
        id: `prod-${Date.now()}`,
        slug: slug || `flower-${Date.now()}`,
        name: name || "Koleksi Bunga By Gewa",
        category,
        availabilityType,
        basePrice,
        rentPricePerDay: availabilityType !== "buy-only" ? rentPricePerDay : undefined,
        lateFeePerDay,
        photos: [coverPhoto],
        coverPhoto,
        description,
        active,
        portfolio,
        sizes: sizes.length > 0 ? sizes : [{ name: "Standard", buyPrice: basePrice }],
        pastelThemeColor: pastelColor,
      }
      list.unshift(newProd)
    }

    saveStoredProducts(list)
    navigate("/admin/products")
  }

  const catInfo = CATEGORIES[category]
  const isRentable = availabilityType === "buy-and-rent" || availabilityType === "rent-only"

  const filteredAssets = STUDIO_ASSETS.filter((a) => {
    if (assetFilter === "all") return true
    return a.category === assetFilter
  })

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Hidden Native File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*"
          className="hidden"
        />

        {/* Top Header & Breadcrumb */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[#0F172A]">
              {isEdit ? "Edit Koleksi & Foto Bunga" : "Tambah Koleksi Bunga Baru"}
            </h2>
            <p className="text-xs text-[#64748B]">
              Ubah foto dengan klik gambar di bawah atau pilih dari galeri asset studio.
            </p>
          </div>
          <Link
            to="/admin/products"
            className="text-xs font-semibold text-[#64748B] hover:text-[#0F172A]"
          >
            ← Kembali ke Daftar
          </Link>
        </div>

        {/* ========================================================= */}
        {/* INTERACTIVE AVATAR-STYLE LIVE PREVIEW & PHOTO CHANGER CARD */}
        {/* ========================================================= */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Interactive Click-to-Edit Photo Frame */}
            <div className="relative group flex-shrink-0">
              <div
                onClick={triggerFilePicker}
                className="w-36 h-44 sm:w-44 sm:h-52 rounded-2xl bg-[#F8FAFC] border-2 border-dashed border-[#D94883]/40 p-2 flex items-center justify-center cursor-pointer overflow-hidden transition-all duration-300 group-hover:border-[#D94883] group-hover:shadow-md relative"
                title="Klik untuk Upload / Ganti Foto Utama"
              >
                {/* Background Wash */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{ backgroundColor: catInfo?.pastel || "#FFCCDF" }}
                />

                <img
                  src={coverPhoto}
                  alt={name || "Preview Foto Bunga"}
                  className="w-full h-full object-contain relative z-10 transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    ;(e.target as HTMLElement).setAttribute(
                      "src",
                      "/assets/Aset Foto Jenis Lini Produk/Bouquet By Gewa.png"
                    )
                  }}
                />

                {/* Hover Camera Overlay Badge */}
                <div className="absolute inset-0 bg-[#0F172A]/65 z-20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-3 text-center rounded-2xl backdrop-blur-xs">
                  <span className="text-2xl mb-1">📷</span>
                  <span className="text-xs font-bold leading-tight">Klik untuk Upload Foto Baru</span>
                  <span className="text-[10px] text-gray-200 mt-1">PNG, JPG, WebP</span>
                </div>
              </div>

              {/* Floating Camera Action Badge */}
              <button
                type="button"
                onClick={triggerFilePicker}
                className="absolute -bottom-2 -right-2 z-30 w-9 h-9 rounded-full bg-[#D94883] text-white flex items-center justify-center shadow-md hover:bg-[#C2366F] transition-transform active-push border-2 border-white"
                title="Upload Foto dari Komputer"
              >
                📷
              </button>
            </div>

            {/* Live Title & Details Preview */}
            <div className="flex-1 text-center sm:text-left space-y-2.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span
                  className="px-3 py-0.5 rounded-full text-xs font-bold text-[#0F172A] shadow-xs"
                  style={{ backgroundColor: catInfo?.pastel || "#FFCCDF" }}
                >
                  {catInfo?.title || category}
                </span>

                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#F1F5F9] text-[#334155]">
                  {availabilityType === "buy-only" && "🎁 Hanya Beli"}
                  {availabilityType === "rent-only" && "✨ Hanya Sewa (Rental)"}
                  {availabilityType === "buy-and-rent" && "🌸 Beli & Tersedia Sewa"}
                </span>

                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${active ? "bg-[#DCFCE7] text-[#15803D]" : "bg-gray-100 text-gray-500"}`}>
                  {active ? "● Status: Tayang di Katalog" : "○ Status: Draft / Nonaktif"}
                </span>
              </div>

              {/* Live Synchronized Title Display */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#0F172A] leading-tight pb-0.5">
                  {name.trim() || <span className="text-[#94A3B8] italic">Ketik Nama Produk di Form...</span>}
                </h3>
                <p className="text-xs text-[#64748B] font-mono mt-0.5">
                  Slug URL: <span className="text-[#D94883]">/catalog/{slug || "slug-url"}</span>
                </p>
              </div>

              {/* Live Price Display */}
              <div className="pt-2 flex items-center justify-center sm:justify-start gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#64748B] block font-semibold">Harga Jual</span>
                  <span className="text-lg font-display font-bold text-[#0F172A]">
                    Rp {basePrice.toLocaleString("id-ID")}
                  </span>
                </div>

                {isRentable && (
                  <div className="pl-4 border-l border-[#E2E8F0]">
                    <span className="text-[10px] uppercase tracking-wider text-[#9333EA] block font-semibold">Harga Sewa / 3 Hari</span>
                    <span className="text-lg font-display font-bold text-[#9333EA]">
                      Rp {rentPricePerDay.toLocaleString("id-ID")}
                    </span>
                  </div>
                )}
              </div>

              {/* Quick Action Buttons for Photo */}
              <div className="pt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <button
                  type="button"
                  onClick={triggerFilePicker}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[#FDF2F7] text-[#D94883] hover:bg-[#D94883] hover:text-white transition-all shadow-2xs border border-[#D94883]/20 flex items-center gap-1.5 active-push"
                >
                  <span>📁</span> Upload dari Komputer
                </button>

                <button
                  type="button"
                  onClick={() => setShowAssetModal(true)}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[#F8FAFC] text-[#0F172A] hover:bg-[#E2E8F0] transition-all shadow-2xs border border-[#E2E8F0] flex items-center gap-1.5 active-push"
                >
                  <span>🖼️</span> Pilih dari Galeri Studio ({STUDIO_ASSETS.length} Asset)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* MAIN PRODUCT CONFIGURATION FORM */}
        {/* ========================================================= */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 space-y-6 shadow-xs">
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="product-form-name" className="block text-xs font-semibold text-[#0F172A] mb-1">
                Nama Koleksi Produk (Live Update):
              </label>
              <input
                id="product-form-name"
                type="text"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Contoh: Painted Bouquet Largo"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A] focus:outline-none focus:border-[#D94883]"
                required
              />
            </div>

            <div>
              <label htmlFor="product-form-slug" className="block text-xs font-semibold text-[#0F172A] mb-1">
                Slug URL:
              </label>
              <input
                id="product-form-slug"
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="painted-bouquet-largo"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A] focus:outline-none focus:border-[#D94883]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="product-form-category" className="block text-xs font-semibold text-[#0F172A] mb-1">
                Kategori Lini:
              </label>
              <select
                id="product-form-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A] focus:outline-none focus:border-[#D94883]"
              >
                <option value="bouquet">💐 Bouquet (Buket Bunga Lukis)</option>
                <option value="vase">🏺 Vase (Rangkaian Vas Keramik)</option>
                <option value="hand-bouquet">🌹 Hand Bouquet (Pengantin Beli/Sewa)</option>
                <option value="signature">✨ Signature (Yoona, Marii, Bloom Box)</option>
                <option value="decoration">🎀 Table Decoration (Sewa Event)</option>
              </select>
            </div>

            <div>
              <label htmlFor="product-form-availability" className="block text-xs font-semibold text-[#0F172A] mb-1">
                Tipe Ketersediaan Transaksi:
              </label>
              <select
                id="product-form-availability"
                value={availabilityType}
                onChange={(e) => setAvailabilityType(e.target.value as AvailabilityType)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A] focus:outline-none focus:border-[#D94883]"
              >
                <option value="buy-only">🎁 Hanya Beli (Milik Selamanya)</option>
                <option value="buy-and-rent">🌸 Beli & Tersedia Sewa (3 Hari)</option>
                <option value="rent-only">✨ Hanya Sewa Event (Rental)</option>
              </select>
            </div>
          </div>

          {/* Pricing Config */}
          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-4">
            <h3 className="font-display font-bold text-sm text-[#0F172A]">
              Pengaturan Harga & Sewa
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="product-form-base-price" className="block text-xs font-semibold text-[#0F172A] mb-1">
                  Harga Beli Dasar (IDR):
                </label>
                <input
                  id="product-form-base-price"
                  type="number"
                  value={basePrice}
                  onChange={(e) => setBasePrice(Number(e.target.value))}
                  step="5000"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E2E8F0] bg-white font-bold text-[#0F172A]"
                  required
                />
              </div>

              {availabilityType !== "buy-only" && (
                <div>
                  <label htmlFor="product-form-rent-price" className="block text-xs font-semibold text-[#9333EA] mb-1">
                    Harga Sewa Dasar (3 Hari):
                  </label>
                  <input
                    id="product-form-rent-price"
                    type="number"
                    value={rentPricePerDay}
                    onChange={(e) => setRentPricePerDay(Number(e.target.value))}
                    step="5000"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#D94883] bg-white font-bold text-[#9333EA]"
                    required
                  />
                </div>
              )}

              {availabilityType !== "buy-only" && (
                <div>
                  <label htmlFor="product-form-late-fee" className="block text-xs font-semibold text-[#64748B] mb-1">
                    Denda Keterlambatan / Hari:
                  </label>
                  <input
                    id="product-form-late-fee"
                    type="number"
                    value={lateFeePerDay}
                    onChange={(e) => setLateFeePerDay(Number(e.target.value))}
                    step="5000"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E2E8F0] bg-white text-[#0F172A]"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Direct Path Input */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="product-form-photo" className="block text-xs font-semibold text-[#0F172A]">
                Foto Utama (URL / Path Asset):
              </label>
              <button
                type="button"
                onClick={() => setShowAssetModal(true)}
                className="text-[11px] font-semibold text-[#D94883] hover:underline"
              >
                Buka Galeri Foto Lengkap ({STUDIO_ASSETS.length}) →
              </button>
            </div>
            <input
              id="product-form-photo"
              type="text"
              value={coverPhoto}
              onChange={(e) => setCoverPhoto(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A] mb-2 font-mono text-[11px]"
              required
            />
          </div>

          {/* Sizes / Variants */}
          <div>
            <label htmlFor="product-form-sizes" className="block text-xs font-semibold text-[#0F172A] mb-1">
              Daftar Ukuran Varian (Pisahkan dengan koma):
            </label>
            <input
              id="product-form-sizes"
              type="text"
              value={sizesStr}
              onChange={(e) => setSizesStr(e.target.value)}
              placeholder="Petite, Midi, Largo, Grande"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A]"
            />
            <span className="text-[10px] text-[#64748B] mt-1 block">
              Contoh: Petite, Midi, Largo, Grande, Gardenia, Human size
            </span>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="product-form-desc" className="block text-xs font-semibold text-[#0F172A] mb-1">
              Deskripsi Produk:
            </label>
            <textarea
              id="product-form-desc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ceritakan bahan, konsep lukis, dan kegunaan rangkaian bunga ini..."
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A]"
              required
            />
          </div>

          {/* Status Switches */}
          <div className="flex items-center gap-6 pt-2 border-t border-[#E2E8F0]">
            <label className="flex items-center gap-2 text-xs font-semibold text-[#0F172A] cursor-pointer">
              <input
                type="checkbox"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
                className="w-4 h-4 rounded text-[#D94883]"
              />
              <span>Tayangkan di Katalog Storefront</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-semibold text-[#0F172A] cursor-pointer">
              <input
                type="checkbox"
                checked={portfolio}
                onChange={(e) => setPortfolio(e.target.checked)}
                className="w-4 h-4 rounded text-[#D94883]"
              />
              <span>Tampilkan di Galeri Portofolio</span>
            </label>
          </div>

          {/* Submit */}
          <div className="pt-4 flex items-center justify-end gap-3">
            <Link
              to="/admin/products"
              className="px-5 py-2.5 rounded-full text-xs font-medium text-[#64748B] hover:bg-gray-100"
            >
              Batal
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full text-xs font-bold bg-[#D94883] text-white hover:bg-[#C2366F] transition-all shadow-sm active-push"
            >
              {isEdit ? "Simpan Perubahan Produk" : "Tambahkan ke Katalog"}
            </button>
          </div>
        </form>

        {/* ========================================================= */}
        {/* VISUAL ASSET BROWSER MODAL (FIXED EMOJI & TEXT ALIGNMENT) */}
        {/* ========================================================= */}
        {showAssetModal && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Pilih Foto dari Galeri Asset By Gewa"
            className="fixed inset-0 z-50 bg-[#0F172A]/70 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-[#E2E8F0] overflow-hidden">
              {/* Modal Header */}
              <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
                <div>
                  <h3 className="font-display font-bold text-lg text-[#0F172A]">
                    Pilih Foto dari Galeri Asset By Gewa
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    Klik gambar untuk memilih foto produk secara instan.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAssetModal(false)}
                  className="w-8 h-8 rounded-full bg-white border border-[#E2E8F0] text-sm text-[#64748B] hover:text-[#0F172A] flex items-center justify-center shadow-xs"
                >
                  ✕
                </button>
              </div>

              {/* Filter Tabs (Generous Margin & Padding Matching Reference, No Scrollbar) */}
              <div className="px-6 py-5 border-b border-[#E2E8F0] bg-white">
                <div className="flex flex-wrap items-center gap-2.5">
                  {[
                    { key: "all", label: "Semua Asset", icon: "🌸" },
                    { key: "bouquet", label: "Bouquet", icon: "💐" },
                    { key: "vase", label: "Vase", icon: "🏺" },
                    { key: "hand-bouquet", label: "Hand Bouquet", icon: "🌹" },
                    { key: "signature", label: "Signature", icon: "✨" },
                    { key: "decoration", label: "Decoration", icon: "🎀" },
                  ].map((t) => {
                    const isActive = assetFilter === t.key
                    return (
                      <button
                        key={t.key}
                        type="button"
                        onClick={() => setAssetFilter(t.key)}
                        className={`inline-flex items-center justify-center gap-2 px-4.5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap min-h-[38px] transition-all active-push shrink-0 ${
                          isActive
                            ? "bg-[#D94883] text-white shadow-xs"
                            : "bg-[#F1F5F9] text-[#334155] hover:bg-[#E2E8F0]"
                        }`}
                      >
                        <span className="text-sm leading-none shrink-0" aria-hidden="true">{t.icon}</span>
                        <span>{t.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Asset Grid */}
              <div className="p-6 overflow-y-auto flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 bg-[#F8FAFC]">
                {filteredAssets.map((asset) => {
                  const isSelected = coverPhoto === asset.path
                  return (
                    <button
                      key={asset.path}
                      type="button"
                      onClick={() => selectAssetFromLibrary(asset)}
                      className={`group p-3 rounded-2xl bg-white border text-left transition-all flex flex-col justify-between hover:-translate-y-1 hover:shadow-md ${
                        isSelected
                          ? "border-[#D94883] ring-2 ring-[#D94883] shadow-xs"
                          : "border-[#E2E8F0] hover:border-[#D94883]/50"
                      }`}
                    >
                      <div className="w-full aspect-[4/5] rounded-xl bg-[#F8FAFC] p-2 flex items-center justify-center overflow-hidden mb-2 relative">
                        <img
                          src={asset.path}
                          alt={asset.title}
                          className="w-full h-full object-contain transition-transform group-hover:scale-105"
                        />
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#D94883] text-white text-[10px] flex items-center justify-center font-bold shadow-xs">
                            ✓
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#0F172A] block truncate">
                          {asset.title}
                        </span>
                        <span className="text-[10px] text-[#64748B] block truncate font-mono">
                          {asset.path.split("/").pop()}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-[#E2E8F0] bg-white flex items-center justify-between">
                <button
                  type="button"
                  onClick={triggerFilePicker}
                  className="text-xs font-semibold text-[#D94883] hover:underline flex items-center gap-1.5"
                >
                  <span>📷</span> Ingin upload file baru dari laptop?
                </button>
                <button
                  type="button"
                  onClick={() => setShowAssetModal(false)}
                  className="px-5 py-2 rounded-full text-xs font-semibold bg-[#0F172A] text-white hover:bg-[#1E293B]"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
