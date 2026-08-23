import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { isAuthenticated } from "./lib/auth"
import { RouteSync } from "./components/ScrollToTop"

// High-Fidelity Public Storefront Pages (Eagerly Loaded)
import Landing from "./pages/Landing"
import Catalog from "./pages/Catalog"
import ProductDetail from "./pages/ProductDetail"
import BookingConfirm from "./pages/BookingConfirm"
import ShippingChecker from "./pages/ShippingChecker"

// Code-Split Admin Console Pages (Loaded on Demand)
const AdminLogin = lazy(() => import("./pages/admin/Login"))
const Dashboard = lazy(() => import("./pages/admin/Dashboard"))
const AdminProducts = lazy(() => import("./pages/admin/Products"))
const ProductForm = lazy(() => import("./pages/admin/ProductForm"))
const AdminBookings = lazy(() => import("./pages/admin/Bookings"))
const BookingDetail = lazy(() => import("./pages/admin/BookingDetail"))

function AdminLoading() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-6">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#D94883] border-t-transparent animate-spin" />
        <span className="text-xs font-semibold text-[#64748B]">Memuat Console By Gewa...</span>
      </div>
    </div>
  )
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  if (!isAuthenticated()) return <Navigate to="/admin/login" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Handles scroll reset & document.title sync on route changes */}
      <RouteSync />

      <Suspense fallback={<AdminLoading />}>
        <Routes>
          {/* Main Storefront Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:slug" element={<ProductDetail />} />
          <Route path="/booking/confirm" element={<BookingConfirm />} />
          <Route path="/shipping" element={<ShippingChecker />} />

          {/* Code-Split Admin Console Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminRoute><Dashboard /></AdminRoute>} />
          <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
          <Route path="/admin/products/new" element={<AdminRoute><ProductForm /></AdminRoute>} />
          <Route path="/admin/products/:id/edit" element={<AdminRoute><ProductForm /></AdminRoute>} />
          <Route path="/admin/bookings" element={<AdminRoute><AdminBookings /></AdminRoute>} />
          <Route path="/admin/bookings/:id" element={<AdminRoute><BookingDetail /></AdminRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
