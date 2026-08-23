import { Link } from "react-router-dom"
import { Product, CATEGORIES } from "../data/mockProducts"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const catInfo = CATEGORIES[product.category]
  const isRentable = product.availabilityType === "buy-and-rent" || product.availabilityType === "rent-only"
  const isRentOnly = product.availabilityType === "rent-only"

  return (
    <Link
      to={`/catalog/${product.slug}`}
      className="group flex flex-col bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#D94883] hover:shadow-[0_12px_32px_-8px_rgba(15,23,42,0.06)] focus-visible:ring-2 focus-visible:ring-[#D94883] active:scale-[0.99]"
      aria-label={`Lihat detail ${product.name} - ${catInfo?.title || product.category}`}
    >
      {/* Image Container with Ambient Background Wash */}
      <div className="relative w-full aspect-[4/5] bg-[#F8FAFC] overflow-hidden flex items-center justify-center p-5">
        <div
          className="absolute inset-0 opacity-25 transition-opacity duration-300 group-hover:opacity-40"
          style={{ backgroundColor: product.pastelThemeColor || catInfo?.pastel || "#F8FAFC" }}
          aria-hidden="true"
        />

        <img
          src={product.coverPhoto || product.photos[0]}
          alt={`Koleksi ${product.name} By Gewa`}
          loading="lazy"
          className="relative z-10 w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Availability Badge */}
        <div className="absolute top-3.5 right-3.5 z-20">
          {isRentOnly ? (
            <span className="px-2.5 py-0.5 text-[11px] font-semibold tracking-wide rounded-full bg-[#EFF6FF] text-[#1E40AF] shadow-xs border border-[#BFDBFE]">
              Sewa Event
            </span>
          ) : isRentable ? (
            <span className="px-2.5 py-0.5 text-[11px] font-semibold tracking-wide rounded-full bg-[#FAF5FF] text-[#7E22CE] shadow-xs border border-[#E9D5FF]">
              Beli & Sewa
            </span>
          ) : (
            <span className="px-2.5 py-0.5 text-[11px] font-semibold tracking-wide rounded-full bg-white/95 backdrop-blur-xs text-[#0F172A] shadow-xs border border-[#E2E8F0]">
              Beli / Keep
            </span>
          )}
        </div>
      </div>

      {/* Card Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <span
              className="inline-block w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: catInfo?.pastel || "#D94883" }}
              aria-hidden="true"
            />
            <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#64748B]">
              {catInfo?.title || product.category}
            </p>
          </div>
          <h3 className="font-display font-semibold text-base text-[#0F172A] leading-snug group-hover:text-[#D94883] transition-colors mb-1.5 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-[#64748B] line-clamp-2 mb-3 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#64748B] block uppercase tracking-wider font-medium">
              {isRentOnly ? "Sewa Mulai" : "Mulai Dari"}
            </span>
            <span className="font-display font-bold text-sm sm:text-base text-[#0F172A]">
              Rp {(isRentOnly ? product.rentPricePerDay || product.basePrice : product.basePrice).toLocaleString("id-ID")}
            </span>
            {isRentable && !isRentOnly && product.rentPricePerDay && (
              <span className="text-[10px] text-[#D94883] block font-medium">
                (Sewa: Rp {product.rentPricePerDay.toLocaleString("id-ID")})
              </span>
            )}
          </div>
          <span className="text-xs font-semibold text-[#D94883] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
            Lihat <span>→</span>
          </span>
        </div>
      </div>
    </Link>
  )
}
