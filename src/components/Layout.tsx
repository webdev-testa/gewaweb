import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { buildDirectWaLink } from "../lib/waLink"
import { ScrollToTopButton } from "./ScrollToTop"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const waLink = buildDirectWaLink()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [mobileMenuOpen])

  const navLinks = [
    { to: "/", label: "Beranda", icon: "🏠" },
    { to: "/catalog", label: "Katalog Bunga", icon: "🌸" },
    { to: "/shipping", label: "Pengiriman & Studio", icon: "📍" },
    { to: "/admin", label: "Admin CMS", icon: "⚙️" },
  ]

  const categories = [
    { to: "/catalog?cat=bouquet", label: "Painted Bouquet" },
    { to: "/catalog?cat=vase", label: "Artisan Vase" },
    { to: "/catalog?cat=hand-bouquet", label: "Hand Bouquet (Beli / Sewa)" },
    { to: "/catalog?cat=signature", label: "Signature Creations" },
    { to: "/catalog?cat=decoration", label: "Table Decoration" },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCFB] text-[#0F172A] selection:bg-[#FCE7F3] selection:text-[#D94883] relative">
      {/* Top Announcement Strip */}
      <div className="bg-[#FFF5F8] border-b border-[#FCE7F3] text-xs py-2 px-6 text-center font-medium text-[#9D174D]">
        <span>
          🌸 <strong>By Gewa</strong> — Bespoke Painted Artificial Flowers & Floral Rentals • <em>"Paint Your Moment"</em>
        </span>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 border-b border-[#E2E8F0] bg-[#FDFCFB]/95 backdrop-blur-md transition-all">
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-white border border-[#E2E8F0] p-1 flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105">
              <img
                src="/assets/logo utama logogram.png"
                alt="By Gewa Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-2xl font-bold tracking-tight font-display text-[#0F172A] leading-none block">
                By Gewa
              </span>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-[#D94883] font-semibold mt-0.5">
                Floral Atelier & Rental
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    isActive
                      ? "text-[#D94883] font-semibold"
                      : "text-[#475569] hover:text-[#0F172A]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D94883] rounded-full" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Desktop WhatsApp & Mobile Hamburger Menu Trigger */}
          <div className="flex items-center gap-3">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full bg-[#D94883] text-white hover:bg-[#C2366F] transition-all shadow-xs active-push"
            >
              <span>💬</span> Konsultasi WhatsApp
            </a>

            {/* Hamburger Sidebar Toggle Button on the Right Side */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Buka Menu Navigasi"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F8FAFC] shadow-xs active:scale-95 transition-all"
            >
              <span className="text-lg">☰</span>
            </button>
          </div>
        </div>
      </header>

      {/* TOGGLEABLE SLIDE-OUT SIDEBAR DRAWER (FROM RIGHT SIDE) */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Menu Navigasi By Gewa"
          className="fixed inset-0 z-50 flex justify-end md:hidden"
        >
          <div
            className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <aside className="relative w-80 max-w-[85vw] h-full bg-white shadow-2xl border-l border-[#E2E8F0] flex flex-col justify-between p-6 z-10 overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#FDF2F7] border border-[#FCE7F3] p-1 flex items-center justify-center">
                    <img
                      src="/assets/logo utama logogram.png"
                      alt="By Gewa"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="font-display font-bold text-lg text-[#0F172A] block leading-none">
                      By Gewa
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-[#D94883] font-bold">
                      Menu Navigasi
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full border border-[#E2E8F0] flex items-center justify-center text-sm font-bold text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#94A3B8] px-2 block mb-1">
                  Menu Utama
                </span>
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.to
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? "bg-[#FDF2F7] text-[#D94883] font-semibold border border-[#FCE7F3]"
                          : "text-[#334155] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                      }`}
                    >
                      <span className="text-base">{link.icon}</span>
                      <span>{link.label}</span>
                    </Link>
                  )
                })}
              </div>

              <div className="pt-2 border-t border-[#E2E8F0] space-y-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#94A3B8] px-2 block mb-1">
                  5 Lini Koleksi Bunga
                </span>
                {categories.map((cat, idx) => (
                  <Link
                    key={idx}
                    to={cat.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3.5 py-1.5 text-xs text-[#64748B] hover:text-[#D94883] hover:bg-[#FDF2F7] rounded-lg transition-colors"
                  >
                    • {cat.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#E2E8F0] space-y-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-full text-xs font-semibold bg-[#D94883] text-white hover:bg-[#C2366F] transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <span>💬</span> Chat WhatsApp (+62858-2222-0904)
              </a>

              <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[10px] text-[#64748B] space-y-0.5">
                <p className="font-semibold text-[#0F172A]">📍 Studio By Gewa Malang</p>
                <p>Jl. Permata Jingga IV No. 12, Malang</p>
                <p className="text-[#059669] font-medium">Buka Setiap Hari (08.00 - 20.00 WIB)</p>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1">{children}</main>

      {/* Floating Scroll To Top Button */}
      <ScrollToTopButton className="bottom-6 right-6" />

      {/* Studio Footer */}
      <footer className="border-t border-[#1E293B] bg-[#0F172A] text-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/logo utama logogram.png"
                alt="By Gewa Logo"
                className="w-8 h-8 object-contain filter invert brightness-200"
              />
              <h3 className="text-2xl font-bold font-display text-white">
                By Gewa
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-[#94A3B8] max-w-md mb-6">
              Bespoke painted artificial flowers & floral rentals — <em>"Paint Your Moment"</em>. Rangkaian bunga lukis abadi untuk wisuda, pernikahan, hampers, dan dekorasi acara di Malang Raya dan seluruh Indonesia.
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-[#CBD5E1]">
              <span className="px-2.5 py-1 bg-white/10 rounded-full">🌸 5 Lini Produk</span>
              <span className="px-2.5 py-1 bg-white/10 rounded-full">🎨 1x Revisi Warna</span>
              <span className="px-2.5 py-1 bg-white/10 rounded-full">📍 Studio Malang</span>
              <span className="px-2.5 py-1 bg-white/10 rounded-full">📦 Kirim Seluruh Indonesia</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#94A3B8] mb-4">
              Lini Produk
            </h4>
            <ul className="space-y-2.5 text-sm text-[#94A3B8]">
              <li>
                <Link to="/catalog?cat=bouquet" className="hover:text-[#FFCCDF] transition-colors">
                  Painted Bouquet
                </Link>
              </li>
              <li>
                <Link to="/catalog?cat=vase" className="hover:text-[#B4C8CB] transition-colors">
                  Artisan Vase
                </Link>
              </li>
              <li>
                <Link to="/catalog?cat=hand-bouquet" className="hover:text-[#FFCCDF] transition-colors">
                  Hand Bouquet (Beli & Sewa)
                </Link>
              </li>
              <li>
                <Link to="/catalog?cat=signature" className="hover:text-[#E9D5FF] transition-colors">
                  Signature Creations
                </Link>
              </li>
              <li>
                <Link to="/catalog?cat=decoration" className="hover:text-[#DBEAFE] transition-colors">
                  Table Decoration
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#94A3B8] mb-4">
              Studio & Kontak
            </h4>
            <div className="space-y-3 text-sm text-[#94A3B8]">
              <p>
                📍 <strong>Studio By Gewa</strong><br />
                Jl. Permata Jingga IV No. 12, Tunggulwulung, Lowokwaru, Kota Malang, Jawa Timur 65143
              </p>
              <p>
                🕒 <strong>Jam Buka:</strong><br />
                Senin - Minggu: 08.00 - 20.00 WIB
              </p>
              <p>
                📱 <strong>WhatsApp:</strong><br />
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FFCCDF] hover:underline font-mono"
                >
                  +62 858-2222-0904
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-[#334155] max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <p>© {new Date().getFullYear()} By Gewa Painted Artificial Flower. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/admin" className="hover:text-white transition-colors">
              Admin CMS Console
            </Link>
            <a
              href="https://instagram.com/bygewa"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram @bygewa
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
