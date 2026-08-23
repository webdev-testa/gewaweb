import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

/**
 * Automatically scrolls window and scrollable containers to the top and synchronizes title on page route changes.
 */
export function RouteSync() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
    document.querySelectorAll("main").forEach((el) => {
      el.scrollTop = 0
    })
    document.title = pathname.startsWith("/admin") ? "CMS admin" : "ByGewa - Paint Your Moment"
  }, [pathname, search])

  return null
}

/**
 * Floating "Scroll to Top" button that appears whenever the page or container
 * is scrolled down (threshold ~120px) and smoothly scrolls back up.
 */
export function ScrollToTopButton({ className = "bottom-6 right-6" }: { className?: string }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const checkScroll = () => {
      const winScroll = window.scrollY || document.documentElement.scrollTop
      const mainEl = document.querySelector("main")
      const mainScroll = mainEl ? mainEl.scrollTop : 0
      setIsVisible(winScroll > 120 || mainScroll > 120)
    }

    window.addEventListener("scroll", checkScroll, { passive: true, capture: true })
    checkScroll()
    return () => window.removeEventListener("scroll", checkScroll, { capture: true })
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    document.querySelector("main")?.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!isVisible) return null

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Kembali ke atas halaman"
      title="Kembali ke atas"
      className={`fixed z-50 px-3.5 py-2.5 rounded-full bg-[#0F172A] text-white hover:bg-[#D94883] shadow-xl transition-all duration-300 transform hover:-translate-y-1 active-push border border-white/20 flex items-center gap-1.5 cursor-pointer ${className}`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
      <span className="text-xs font-semibold">Atas</span>
    </button>
  )
}
