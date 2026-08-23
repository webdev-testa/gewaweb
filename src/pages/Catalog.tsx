import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import Layout from "../components/Layout"
import ProductCard from "../components/ProductCard"
import { getStoredProducts, CATEGORIES, Category } from "../data/mockProducts"

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryParam = searchParams.get("cat") as Category | null
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">(categoryParam || "all")
  const [filterType, setFilterType] = useState<"all" | "buy" | "rent">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [productsList, setProductsList] = useState(getStoredProducts())

  useEffect(() => {
    const handleUpdate = () => setProductsList(getStoredProducts())
    window.addEventListener("bygewa_products_updated", handleUpdate)
    return () => window.removeEventListener("bygewa_products_updated", handleUpdate)
  }, [])

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
  }, [categoryParam])

  const handleCategorySelect = (cat: Category | "all") => {
    setSelectedCategory(cat)
    if (cat === "all") {
      searchParams.delete("cat")
      setSearchParams(searchParams)
    } else {
      setSearchParams({ cat })
    }
  }

  const filtered = productsList.filter((p) => {
    if (!p.active) return false

    // Category filter
    if (selectedCategory !== "all" && p.category !== selectedCategory) {
      return false
    }

    // Availability type filter
    if (filterType === "rent") {
      if (p.availabilityType !== "buy-and-rent" && p.availabilityType !== "rent-only") return false
    } else if (filterType === "buy") {
      if (p.availabilityType === "rent-only") return false
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      return (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        CATEGORIES[p.category]?.title.toLowerCase().includes(q)
      )
    }

    return true
  })

  const categoryList: (Category | "all")[] = ["all", "bouquet", "vase", "hand-bouquet", "signature", "decoration"]

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Catalog Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] font-semibold text-[#D94883] mb-2">
            Katalog Lengkap
          </p>
          <h1 className="text-3xl sm:text-5xl font-display font-bold text-[#0F172A] mb-4">
            Koleksi Bunga By Gewa
          </h1>
          <p className="text-sm text-[#64748B] leading-relaxed">
            Temukan buket lukis eksklusif, vas dekorasi, bouquet pengantin, dan aksesoris pesta. Pilih beli selamanya atau sewa dengan sistem booking mudah.
          </p>
        </div>

        {/* Search & Availability Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-xs">
          {/* Category Pill Tabs */}
          <div
            role="tablist"
            aria-label="Filter kategori bunga"
            className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none"
          >
            {categoryList.map((cat) => {
              const isActive = selectedCategory === cat
              const label = cat === "all" ? "🌸 Semua Lini" : `${CATEGORIES[cat]?.emoji} ${CATEGORIES[cat]?.title || cat}`
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleCategorySelect(cat)}
                  className={`inline-flex items-center justify-center gap-1.5 whitespace-nowrap px-4 py-2.5 rounded-full text-xs font-semibold min-h-[44px] transition-all active-push shrink-0 ${
                    isActive
                      ? "bg-[#D94883] text-white shadow-xs"
                      : "bg-[#F1F5F9] text-[#334155] hover:bg-[#E2E8F0]"
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>

          {/* Search Box & Buy/Rent Toggle */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <div className="relative flex-1 md:w-56">
              <input
                id="catalog-search-input"
                type="text"
                aria-label="Cari kreasi bunga"
                placeholder="Cari kreasi bunga..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2.5 min-h-[44px] text-xs rounded-full border border-[#CBD5E1] bg-[#F8FAFC] text-[#0F172A] focus:outline-none focus:border-[#D94883]"
              />
              <span className="absolute left-2.5 top-3.5 text-xs text-[#94A3B8]" aria-hidden="true">🔍</span>
            </div>

            <select
              id="catalog-filter-type"
              aria-label="Filter berdasarkan tipe pemesanan"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as "all" | "buy" | "rent")}
              className="px-3.5 py-2.5 min-h-[44px] text-xs rounded-full border border-[#CBD5E1] bg-[#F8FAFC] text-[#334155] focus:outline-none focus:border-[#D94883]"
            >
              <option value="all">Semua Tipe</option>
              <option value="buy">Hanya Beli</option>
              <option value="rent">Tersedia Sewa</option>
            </select>
          </div>
        </div>

        {/* Catalog Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#E2E8F0] p-8">
            <span className="text-4xl block mb-3" aria-hidden="true">🌸</span>
            <h3 className="font-display font-bold text-lg text-[#0F172A] mb-1">
              Tidak Ada Produk yang Cocok
            </h3>
            <p className="text-xs text-[#64748B] mb-4">
              Coba ganti kata kunci pencarian atau pilih kategori lain.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all")
                setFilterType("all")
                setSearchQuery("")
              }}
              className="px-5 py-2 rounded-full text-xs font-semibold bg-[#D94883] text-white hover:bg-[#C2366F] transition-all active-push"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}
