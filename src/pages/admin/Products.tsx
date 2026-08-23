import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import AdminLayout from "../../components/AdminLayout"
import {
  getStoredProducts,
  saveStoredProducts,
  updateProductPriceInStore,
  resetProductsToInitial,
  Product,
  CATEGORIES,
  STUDIO_ASSETS,
} from "../../data/mockProducts"

export default function AdminProducts() {
  const [productsList, setProductsList] = useState<Product[]>(getStoredProducts())
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editBasePrice, setEditBasePrice] = useState<number>(0)
  const [editRentPrice, setEditRentPrice] = useState<number>(0)
  const [successMessage, setSuccessMessage] = useState<string>("")
  const [activePreviewImage, setActivePreviewImage] = useState<string | null>(null)
  const [showAssetGallery, setShowAssetGallery] = useState(false)

  // Upload photo directly from table
  const [targetPhotoProductId, setTargetPhotoProductId] = useState<string | null>(null)
  const tableFileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const handleUpdate = () => setProductsList(getStoredProducts())
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActivePreviewImage(null)
        setShowAssetGallery(false)
      }
    }
    window.addEventListener("bygewa_products_updated", handleUpdate)
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("bygewa_products_updated", handleUpdate)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const startEditPrice = (product: Product) => {
    setEditingId(product.id)
    setEditBasePrice(product.basePrice)
    setEditRentPrice(product.rentPricePerDay || 0)
  }

  const saveQuickPrice = (productId: string) => {
    updateProductPriceInStore(productId, editBasePrice, editRentPrice > 0 ? editRentPrice : undefined)
    setEditingId(null)
    setSuccessMessage("Harga produk berhasil diperbarui dan langsung tayang di katalog pelanggan!")
    setTimeout(() => setSuccessMessage(""), 4000)
  }

  const handleTablePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && targetPhotoProductId) {
      const reader = new FileReader()
      reader.onload = (ev) => {
        const result = ev.target?.result as string
        if (result) {
          const updated = productsList.map((p) => {
            if (p.id === targetPhotoProductId) {
              return { ...p, coverPhoto: result, photos: [result, ...p.photos.slice(1)] }
            }
            return p
          })
          saveStoredProducts(updated)
          setProductsList(updated)
          setSuccessMessage("Foto produk berhasil diubah!")
          setTimeout(() => setSuccessMessage(""), 3000)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const toggleProductActive = (productId: string) => {
    const updated = productsList.map((p) => {
      if (p.id === productId) {
        return { ...p, active: !p.active }
      }
      return p
    })
    saveStoredProducts(updated)
    setProductsList(updated)
  }

  const handleDelete = (productId: string) => {
    if (confirm("Apakah kamu yakin ingin menghapus produk ini dari katalog?")) {
      const updated = productsList.filter((p) => p.id !== productId)
      saveStoredProducts(updated)
      setProductsList(updated)
      setSuccessMessage("Produk berhasil dihapus.")
      setTimeout(() => setSuccessMessage(""), 3000)
    }
  }

  const handleReset = () => {
    if (confirm("Reset katalog ke pengaturan bawaan By Gewa (5 Lini Bunga)?")) {
      resetProductsToInitial()
      setProductsList(getStoredProducts())
      setSuccessMessage("Katalog berhasil di-reset ke data bawaan.")
      setTimeout(() => setSuccessMessage(""), 3000)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Hidden Table File Input */}
        <input
          type="file"
          ref={tableFileInputRef}
          onChange={handleTablePhotoChange}
          accept="image/*"
          className="hidden"
        />

        {/* Header with Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[#0F172A]">
              Katalog & CMS Harga Produk
            </h2>
            <p className="text-xs text-[#64748B]">
              Kelola harga, foto produk, status tayang, dan rincian varian bunga secara real-time.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowAssetGallery(true)}
              className="px-3.5 py-2 rounded-full text-xs font-semibold border border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F8FAFC] transition-colors shadow-2xs flex items-center gap-1.5 active-push"
            >
              <span>🖼️</span> Galeri Asset ({STUDIO_ASSETS.length})
            </button>
            <button
              onClick={handleReset}
              className="px-3 py-2 rounded-full text-xs font-medium border border-[#E2E8F0] text-[#64748B] hover:bg-white transition-colors"
            >
              🔄 Reset
            </button>
            <Link
              to="/admin/products/new"
              className="px-5 py-2.5 rounded-full text-xs font-bold bg-[#D94883] text-white hover:bg-[#C2366F] transition-all shadow-sm flex items-center gap-1.5 active-push"
            >
              <span>+</span> Tambah Koleksi Baru
            </Link>
          </div>
        </div>

        {/* Live Notification Banner */}
        {successMessage && (
          <div className="p-3.5 rounded-2xl bg-[#DCFCE7] border border-[#15803D]/20 text-[#15803D] text-xs font-medium flex items-center gap-2">
            <span>✓</span> {successMessage}
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] overflow-hidden shadow-xs">
          <div className="p-4 border-b border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between">
            <span className="text-xs font-bold text-[#0F172A]">
              Daftar Lini Produk ({productsList.length})
            </span>
            <span className="text-[11px] text-[#64748B]">
              💡 Klik foto produk untuk preview besar atau klik <strong>"Edit Full"</strong> untuk ganti foto & judul
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[#64748B] uppercase tracking-wider text-[10px] bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <th className="py-3.5 px-4 font-semibold whitespace-nowrap min-w-[260px]">Foto & Nama</th>
                  <th className="py-3.5 px-4 font-semibold whitespace-nowrap min-w-[140px]">Kategori</th>
                  <th className="py-3.5 px-4 font-semibold whitespace-nowrap min-w-[130px]">Tipe Transaksi</th>
                  <th className="py-3.5 px-4 font-semibold whitespace-nowrap min-w-[140px]">Harga Beli / Mulai</th>
                  <th className="py-3.5 px-4 font-semibold whitespace-nowrap min-w-[140px]">Harga Sewa / Hari</th>
                  <th className="py-3.5 px-4 font-semibold whitespace-nowrap min-w-[110px]">Status Tayang</th>
                  <th className="py-3.5 px-4 font-semibold text-right whitespace-nowrap min-w-[180px]">Aksi CMS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {productsList.map((product) => {
                  const catInfo = CATEGORIES[product.category]
                  const isEditing = editingId === product.id
                  const isRentable = product.availabilityType === "buy-and-rent" || product.availabilityType === "rent-only"
                  const photoSrc = product.coverPhoto || product.photos[0]

                  return (
                    <tr key={product.id} className="hover:bg-[#F8FAFC]/70 transition-colors">
                      {/* Photo & Name */}
                      <td className="py-4 px-4 min-w-[260px]">
                        <div className="flex items-center gap-3">
                          {/* Clickable Image with Preview & Quick Upload Trigger */}
                          <div
                            onClick={() => setActivePreviewImage(photoSrc)}
                            className="w-14 h-14 rounded-xl bg-[#F8FAFC] p-1 flex-shrink-0 border border-[#E2E8F0] flex items-center justify-center cursor-pointer hover:border-[#D94883] hover:scale-105 transition-all relative group"
                            title="Klik untuk lihat foto besar"
                          >
                            <img
                              src={photoSrc}
                              alt={product.name}
                              className="w-full h-full object-contain"
                            />
                            <span className="absolute inset-0 bg-[#0F172A]/40 text-white text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-xl transition-opacity">
                              🔍
                            </span>
                          </div>

                          <div>
                            <Link
                              to={`/admin/products/${product.id}/edit`}
                              className="font-bold text-[#0F172A] block text-sm hover:text-[#D94883] transition-colors"
                            >
                              {product.name}
                            </Link>
                            <span className="text-[10px] text-[#64748B]">
                              {product.sizes.length} Varian Ukuran ({product.sizes.map((s) => s.name).join(", ")})
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold text-[#0F172A] whitespace-nowrap leading-tight"
                          style={{ backgroundColor: catInfo?.pastel || "#FFCCDF" }}
                        >
                          {catInfo?.title || product.category}
                        </span>
                      </td>

                      {/* Availability Type */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center text-[11px] text-[#334155] whitespace-nowrap">
                          {product.availabilityType === "buy-only" && "🎁 Hanya Beli"}
                          {product.availabilityType === "rent-only" && "✨ Hanya Sewa"}
                          {product.availabilityType === "buy-and-rent" && "🌸 Beli & Sewa"}
                        </span>
                      </td>

                      {/* Base / Buy Price */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        {isEditing ? (
                          <div className="space-y-1">
                            <input
                              type="number"
                              value={editBasePrice}
                              onChange={(e) => setEditBasePrice(Number(e.target.value))}
                              step="5000"
                              className="w-28 p-1.5 text-xs rounded-lg border border-[#D94883] bg-white font-bold text-[#0F172A]"
                            />
                            <span className="text-[9px] text-[#64748B] block">IDR Base Price</span>
                          </div>
                        ) : (
                          <div>
                            <span className="font-bold text-sm text-[#0F172A]">
                              Rp {product.basePrice.toLocaleString("id-ID")}
                            </span>
                            {product.sizes.length > 1 && (
                              <span className="text-[10px] text-[#64748B] block">mulai dari</span>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Rent Price */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        {isRentable ? (
                          isEditing ? (
                            <div className="space-y-1">
                              <input
                                type="number"
                                value={editRentPrice}
                                onChange={(e) => setEditRentPrice(Number(e.target.value))}
                                step="5000"
                                className="w-28 p-1.5 text-xs rounded-lg border border-[#D94883] bg-white font-bold text-[#9333EA]"
                              />
                              <span className="text-[9px] text-[#64748B] block">IDR Sewa / 3 Hari</span>
                            </div>
                          ) : (
                            <div>
                              <span className="font-bold text-sm text-[#9333EA]">
                                Rp {(product.rentPricePerDay || product.basePrice).toLocaleString("id-ID")}
                              </span>
                              <span className="text-[10px] text-[#64748B] block">/ 3 hari sewa</span>
                            </div>
                          )
                        ) : (
                          <span className="text-[#94A3B8] text-xs">—</span>
                        )}
                      </td>

                      {/* Active Toggle */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => toggleProductActive(product.id)}
                          className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold whitespace-nowrap transition-all active-push ${
                            product.active
                              ? "bg-[#DCFCE7] text-[#15803D]"
                              : "bg-[#F1F5F9] text-[#64748B]"
                          }`}
                        >
                          {product.active ? "● Tayang" : "○ Nonaktif"}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        {isEditing ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => saveQuickPrice(product.id)}
                              className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#15803D] text-white hover:bg-[#166534] active-push"
                            >
                              Simpan
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="px-2.5 py-1.5 rounded-full text-xs text-[#64748B] hover:bg-gray-100"
                            >
                              Batal
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => startEditPrice(product)}
                              className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#FDF2F7] text-[#D94883] hover:bg-[#D94883] hover:text-white transition-colors active-push"
                            >
                              ✏️ Ubah Harga
                            </button>
                            <Link
                              to={`/admin/products/${product.id}/edit`}
                              className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#F8FAFC] text-[#0F172A] hover:bg-[#E2E8F0] transition-colors active-push"
                            >
                              Edit Full 🖼️
                            </Link>
                            <Link
                              to={`/catalog/${product.slug}`}
                              target="_blank"
                              className="text-[11px] text-[#64748B] hover:text-[#0F172A] p-1"
                              title="Lihat di Storefront"
                            >
                              ↗
                            </Link>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="text-[11px] text-[#DC2626] hover:text-red-700 p-1"
                              title="Hapus Produk"
                            >
                              ✕
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lightbox Photo Preview Modal */}
        {activePreviewImage && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Preview Foto Produk"
            onClick={() => setActivePreviewImage(null)}
            className="fixed inset-0 z-50 bg-[#0F172A]/80 backdrop-blur-xs flex items-center justify-center p-4 cursor-zoom-out"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 max-w-lg w-full text-center shadow-2xl border border-[#E2E8F0] relative"
            >
              <button
                type="button"
                onClick={() => setActivePreviewImage(null)}
                aria-label="Tutup preview foto"
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-bold text-[#64748B] hover:text-[#0F172A]"
              >
                ✕
              </button>
              <div className="w-full aspect-[4/5] rounded-2xl bg-[#F8FAFC] p-4 flex items-center justify-center mb-4">
                <img
                  src={activePreviewImage}
                  alt="Full preview"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-xs font-mono text-[#64748B] break-all mb-4">
                {activePreviewImage}
              </p>
              <button
                type="button"
                onClick={() => setActivePreviewImage(null)}
                className="px-6 py-2 rounded-full text-xs font-semibold bg-[#D94883] text-white hover:bg-[#C2366F]"
              >
                Tutup Preview
              </button>
            </div>
          </div>
        )}

        {/* Asset Gallery Overview Modal */}
        {showAssetGallery && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Galeri Asset Foto Studio By Gewa"
            className="fixed inset-0 z-50 bg-[#0F172A]/75 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-[#E2E8F0] overflow-hidden">
              <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
                <div>
                  <h3 className="font-display font-bold text-lg text-[#0F172A]">
                    Galeri Asset Foto Studio By Gewa
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    Semua foto produk yang tersimpan di sistem ({STUDIO_ASSETS.length} asset).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAssetGallery(false)}
                  className="w-8 h-8 rounded-full bg-white border border-[#E2E8F0] text-sm text-[#64748B] hover:text-[#0F172A] flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 bg-[#F8FAFC]">
                {STUDIO_ASSETS.map((asset) => (
                  <div
                    key={asset.path}
                    onClick={() => {
                      setShowAssetGallery(false)
                      setActivePreviewImage(asset.path)
                    }}
                    className="p-3 rounded-2xl bg-white border border-[#E2E8F0] cursor-pointer hover:border-[#D94883] hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div className="w-full aspect-[4/5] rounded-xl bg-white p-2 flex items-center justify-center overflow-hidden mb-2 border border-[#E2E8F0]">
                      <img
                        src={asset.path}
                        alt={asset.title}
                        className="w-full h-full object-contain transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#0F172A] block truncate">
                        {asset.title}
                      </span>
                      <span className="text-[10px] text-[#D94883] font-semibold block">
                        {asset.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-[#E2E8F0] bg-white flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setShowAssetGallery(false)}
                  className="px-6 py-2 rounded-full text-xs font-semibold bg-[#0F172A] text-white hover:bg-[#1E293B]"
                >
                  Tutup Galeri
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
