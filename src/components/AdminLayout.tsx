import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { logout } from "../lib/auth"
import { ScrollToTopButton } from "./ScrollToTop"

interface AdminLayoutProps {
  children: React.ReactNode
}

const navItems = [
  { to: "/admin", label: "Dashboard Ringkasan", icon: "📊" },
  { to: "/admin/products", label: "Katalog & CMS Harga", icon: "🌸" },
  { to: "/admin/bookings", label: "Pesanan & Jadwal Sewa", icon: "📅" },
]

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileDrawerOpen) {
        setMobileDrawerOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [mobileDrawerOpen])

  const handleLogout = () => {
    logout()
    navigate("/admin/login")
  }

  const currentNavTitle = navItems.find((i) =>
    i.to === "/admin"
      ? location.pathname === "/admin"
      : location.pathname.startsWith(i.to)
  )?.label ?? "Admin Studio"

  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden md:flex w-64 flex-shrink-0 flex-col bg-[#0F172A] text-[#F8FAFC] border-r border-[#1E293B]">
        <div className="p-6 border-b border-[#1E293B]">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/assets/logo utama logogram.png"
              alt="By Gewa Logo"
              className="w-7 h-7 object-contain filter invert brightness-200"
            />
            <div>
              <span className="text-xl font-bold font-display text-white leading-none block">
                By Gewa
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#D94883] font-semibold">
                Admin CMS & Studio
              </span>
            </div>
          </Link>
        </div>

        <div className="px-4 py-3 bg-white/5 border-b border-[#1E293B] text-xs text-[#94A3B8]">
          <span className="text-emerald-400">●</span> Studio Malang Active
        </div>

        <nav className="flex-1 p-4 space-y-1.5" aria-label="Navigasi Menu Admin Desktop">
          {navItems.map((item) => {
            const active =
              item.to === "/admin"
                ? location.pathname === "/admin"
                : location.pathname.startsWith(item.to)
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all ${
                  active
                    ? "bg-[#D94883] text-white shadow-xs font-semibold"
                    : "text-[#94A3B8] hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-[#1E293B] space-y-2">
          <Link
            to="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs text-[#CBD5E1] bg-white/5 hover:bg-white/10 transition-colors"
          >
            <span>↗</span> Buka Storefront Pelanggan
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors"
          >
            <span>⏎</span> Keluar
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Slide-out Drawer */}
      {mobileDrawerOpen && (
        <div
          id="admin-mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Navigasi Menu Admin Mobile"
          className="fixed inset-0 z-50 flex md:hidden"
        >
          <div
            className="fixed inset-0 bg-[#0F172A]/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileDrawerOpen(false)}
          />

          <aside className="relative w-72 max-w-[80vw] h-full bg-[#0F172A] text-[#F8FAFC] flex flex-col justify-between p-6 z-10 shadow-2xl border-r border-[#1E293B]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#1E293B] mb-4">
                <Link to="/" className="flex items-center gap-2.5">
                  <img
                    src="/assets/logo utama logogram.png"
                    alt="By Gewa Logo"
                    className="w-6 h-6 object-contain filter invert brightness-200"
                  />
                  <span className="text-lg font-bold font-display text-white leading-none">
                    By Gewa Admin
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileDrawerOpen(false)}
                  aria-label="Tutup menu admin"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold text-[#94A3B8] hover:text-white"
                >
                  ✕
                </button>
              </div>

              <nav className="space-y-1.5" aria-label="Navigasi Menu Admin Mobile">
                {navItems.map((item) => {
                  const active =
                    item.to === "/admin"
                      ? location.pathname === "/admin"
                      : location.pathname.startsWith(item.to)
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileDrawerOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                        active
                          ? "bg-[#D94883] text-white shadow-xs font-semibold"
                          : "text-[#94A3B8] hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span className="text-base">{item.icon}</span>
                      {item.label}
                    </Link>
                  )
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-[#1E293B] space-y-2">
              <Link
                to="/"
                target="_blank"
                onClick={() => setMobileDrawerOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs text-[#CBD5E1] bg-white/5 hover:bg-white/10"
              >
                <span>↗</span> Buka Storefront Live
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs text-[#94A3B8] hover:text-white hover:bg-white/5"
              >
                <span>⏎</span> Keluar
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <header className="h-16 flex items-center justify-between px-4 sm:px-8 border-b border-[#E2E8F0] bg-white flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Trigger */}
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(true)}
              aria-label="Buka Menu Admin"
              aria-expanded={mobileDrawerOpen}
              aria-controls="admin-mobile-nav"
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A] hover:bg-white shadow-xs active:scale-95"
            >
              <span className="text-lg">☰</span>
            </button>

            <div>
              <h1 className="text-base sm:text-lg font-bold font-display text-[#0F172A] line-clamp-1">
                {currentNavTitle}
              </h1>
              <p className="text-[11px] sm:text-xs text-[#64748B] hidden sm:block">
                By Gewa Painted Artificial Flower • Management Console
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/catalog"
              target="_blank"
              className="text-xs font-semibold text-[#D94883] hover:underline"
            >
              Katalog Live →
            </Link>
            <div className="w-8 h-8 rounded-full bg-[#FCE7F3] text-[#D94883] font-bold text-xs flex items-center justify-center border border-[#FCE7F3]">
              BG
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 sm:p-8 relative">
          {children}
          <ScrollToTopButton className="bottom-6 right-6" />
        </main>
      </div>
    </div>
  )
}
