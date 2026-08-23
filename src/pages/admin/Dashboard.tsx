import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import AdminLayout from "../../components/AdminLayout"
import BookingStatusBadge from "../../components/BookingStatusBadge"
import { getStoredBookings } from "../../data/mockBookings"
import { getStoredProducts } from "../../data/mockProducts"
import { buildWaLink } from "../../lib/waLink"

export default function Dashboard() {
  const [bookingsList, setBookingsList] = useState(getStoredBookings())
  const [productsList, setProductsList] = useState(getStoredProducts())

  useEffect(() => {
    const handleBookingsUpdate = () => setBookingsList(getStoredBookings())
    const handleProductsUpdate = () => setProductsList(getStoredProducts())

    window.addEventListener("bygewa_bookings_updated", handleBookingsUpdate)
    window.addEventListener("bygewa_products_updated", handleProductsUpdate)

    return () => {
      window.removeEventListener("bygewa_bookings_updated", handleBookingsUpdate)
      window.removeEventListener("bygewa_products_updated", handleProductsUpdate)
    }
  }, [])

  const pending = bookingsList.filter((b) => b.status === "pending")
  const dpPaid = bookingsList.filter((b) => b.status === "dp_paid")
  const activeRentals = bookingsList.filter((b) => b.orderType === "rent" && (b.status === "dp_paid" || b.status === "paid"))
  const completed = bookingsList.filter((b) => b.status === "returned" || b.status === "paid")

  const totalRevenue = bookingsList
    .filter((b) => b.status !== "cancelled")
    .reduce((sum, b) => sum + b.totalAmount, 0)

  const recent = bookingsList.slice(0, 5)

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#D94883]">
                By Gewa Studio Dashboard
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D] font-bold">
                Online
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#0F172A]">
              Selamat Datang, Admin By Gewa! 🌸
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1">
              Pantau pesanan bunga, jadwal sewa hand bouquet, dan kelola harga produk secara real-time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/products"
              className="px-5 py-2.5 rounded-full text-xs font-bold bg-[#D94883] text-white hover:bg-[#C2366F] transition-all shadow-sm active-push"
            >
              ⚙️ Kelola Harga & CMS
            </Link>
            <Link
              to="/admin/bookings"
              className="px-5 py-2.5 rounded-full text-xs font-bold border border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A] hover:bg-white transition-all active-push"
            >
              📋 Semua Pesanan
            </Link>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs">
            <span className="text-xs text-[#64748B] block mb-1">Total Nilai Pesanan</span>
            <span className="font-display font-bold text-2xl text-[#0F172A] block">
              Rp {totalRevenue.toLocaleString("id-ID")}
            </span>
            <span className="text-[10px] text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 rounded-full inline-block mt-2 font-semibold">
              {bookingsList.length} Transaksi Tercatat
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs">
            <span className="text-xs text-[#64748B] block mb-1">Menunggu Konfirmasi DP</span>
            <span className="font-display font-bold text-2xl text-[#D97706] block">
              {pending.length} Pesanan
            </span>
            <span className="text-[10px] text-[#92400E] bg-[#FEF3C7] px-2 py-0.5 rounded-full inline-block mt-2 font-semibold">
              Perlu follow-up WhatsApp
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs">
            <span className="text-xs text-[#64748B] block mb-1">Jadwal Sewa Aktif</span>
            <span className="font-display font-bold text-2xl text-[#9333EA] block">
              {activeRentals.length} Rangkaian
            </span>
            <span className="text-[10px] text-[#7E22CE] bg-[#FAF5FF] px-2 py-0.5 rounded-full inline-block mt-2 font-semibold">
              Hand Bouquet & Table Decor
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs">
            <span className="text-xs text-[#64748B] block mb-1">Koleksi Aktif di Katalog</span>
            <span className="font-display font-bold text-2xl text-[#D94883] block">
              {productsList.filter((p) => p.active).length} Lini
            </span>
            <span className="text-[10px] text-[#D94883] bg-[#FDF2F7] px-2 py-0.5 rounded-full inline-block mt-2 font-semibold">
              Tampil di Storefront
            </span>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-xs">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E2E8F0]">
            <div>
              <h3 className="font-display font-bold text-lg text-[#0F172A]">
                Pesanan & Booking Terbaru
              </h3>
              <p className="text-xs text-[#64748B]">
                Daftar transaksi terkini dari pelanggan website By Gewa
              </p>
            </div>
            <Link
              to="/admin/bookings"
              className="text-xs font-semibold text-[#D94883] hover:underline"
            >
              Lihat Semua ({bookingsList.length}) →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[#64748B] uppercase tracking-wider text-[10px] border-b border-[#F1F5F9]">
                  <th className="pb-3 px-3 font-semibold whitespace-nowrap min-w-[160px]">ID / Pemesan</th>
                  <th className="pb-3 px-3 font-semibold whitespace-nowrap min-w-[180px]">Produk & Varian</th>
                  <th className="pb-3 px-3 font-semibold whitespace-nowrap min-w-[100px]">Tipe</th>
                  <th className="pb-3 px-3 font-semibold whitespace-nowrap min-w-[140px]">Jadwal / Tanggal</th>
                  <th className="pb-3 px-3 font-semibold whitespace-nowrap min-w-[120px]">Total Biaya</th>
                  <th className="pb-3 px-3 font-semibold whitespace-nowrap min-w-[130px]">Status</th>
                  <th className="pb-3 px-3 font-semibold text-right whitespace-nowrap min-w-[120px]">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {recent.map((b) => {
                  const waCustomer = buildWaLink(`Halo kak ${b.customerName}! 🌸 Kami dari admin By Gewa ingin mengonfirmasi pesanan ${b.productName} (${b.sizeName}).`)
                  return (
                    <tr key={b.id} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="font-bold text-[#0F172A] block">{b.customerName}</span>
                        <span className="text-[10px] text-[#64748B]">{b.id} • {b.customerPhone}</span>
                      </td>
                      <td className="py-3.5 px-3 min-w-[180px]">
                        <span className="font-medium text-[#0F172A] block">{b.productName}</span>
                        <span className="text-[10px] text-[#64748B]">Varian: {b.sizeName}</span>
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full inline-block whitespace-nowrap ${
                          b.orderType === "rent" ? "bg-[#FAF5FF] text-[#7E22CE]" : "bg-[#F1F5F9] text-[#334155]"
                        }`}>
                          {b.orderType === "rent" ? "Sewa" : "Beli"}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="text-[#0F172A]">{b.startDate}</span>
                        {b.orderType === "rent" && (
                          <span className="text-[10px] text-[#64748B] block">s/d {b.endDate}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="font-bold text-[#0F172A]">
                          Rp {b.totalAmount.toLocaleString("id-ID")}
                        </span>
                        <span className="text-[10px] text-[#15803D] block font-medium">
                          DP: Rp {b.dpAmount.toLocaleString("id-ID")}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <BookingStatusBadge status={b.status} />
                      </td>
                      <td className="py-3.5 px-3 text-right whitespace-nowrap space-x-2">
                        <a
                          href={waCustomer}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#25D366]/10 text-[#075E54] hover:bg-[#25D366]/20 transition-colors"
                        >
                          💬 WA
                        </a>
                        <Link
                          to={`/admin/bookings/${b.id}`}
                          className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#FDF2F7] text-[#D94883] hover:bg-[#D94883] hover:text-white transition-colors"
                        >
                          Detail →
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
