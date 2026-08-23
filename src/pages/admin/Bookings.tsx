import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import AdminLayout from "../../components/AdminLayout"
import BookingStatusBadge from "../../components/BookingStatusBadge"
import {
  getStoredBookings,
  Booking,
  BookingStatus,
} from "../../data/mockBookings"
import { buildWaLink } from "../../lib/waLink"

export default function AdminBookings() {
  const [bookingsList, setBookingsList] = useState<Booking[]>(getStoredBookings())
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const handleUpdate = () => setBookingsList(getStoredBookings())
    window.addEventListener("bygewa_bookings_updated", handleUpdate)
    return () => window.removeEventListener("bygewa_bookings_updated", handleUpdate)
  }, [])

  const filtered = bookingsList.filter((b) => {
    if (statusFilter !== "all" && b.status !== statusFilter) return false
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      return (
        b.customerName.toLowerCase().includes(q) ||
        b.customerPhone.includes(q) ||
        b.productName.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q)
      )
    }
    return true
  })

  const tabs: { key: string; label: string; icon: string }[] = [
    { key: "all", label: "Semua", icon: "📋" },
    { key: "pending", label: "Menunggu DP", icon: "⏳" },
    { key: "dp_paid", label: "DP Diterima", icon: "💳" },
    { key: "paid", label: "Lunas / Aktif", icon: "✅" },
    { key: "returned", label: "Selesai", icon: "🌸" },
    { key: "cancelled", label: "Dibatalkan", icon: "✕" },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[#0F172A]">
              Pesanan & Jadwal Sewa Bunga
            </h2>
            <p className="text-xs text-[#64748B]">
              Triage status pesanan, verifikasi DP 30%, dan pantau tanggal pengembalian sewa.
            </p>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white p-5 rounded-3xl border border-[#E2E8F0] shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto py-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {tabs.map((tab) => {
              const count =
                tab.key === "all"
                  ? bookingsList.length
                  : bookingsList.filter((b) => b.status === tab.key).length
              const isActive = statusFilter === tab.key
              return (
                <button
                  key={tab.key}
                  onClick={() => setStatusFilter(tab.key)}
                  className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap min-h-[44px] transition-all shrink-0 active-push ${
                    isActive
                      ? "bg-[#D94883] text-white shadow-xs"
                      : "bg-[#F1F5F9] text-[#334155] hover:bg-[#E2E8F0]"
                  }`}
                >
                  <span className="text-xs shrink-0">{tab.icon}</span>
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${isActive ? "bg-white/20 text-white" : "bg-white text-[#64748B]"}`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="w-full md:w-64">
            <input
              type="text"
              placeholder="Cari nama, no WA, ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-full border border-[#CBD5E1] bg-[#F8FAFC] text-[#0F172A] focus:outline-none focus:border-[#D94883]"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[#64748B] uppercase tracking-wider text-[10px] bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <th className="py-3.5 px-4 font-semibold whitespace-nowrap min-w-[180px]">ID & Pemesan</th>
                  <th className="py-3.5 px-4 font-semibold whitespace-nowrap min-w-[200px]">Item & Varian</th>
                  <th className="py-3.5 px-4 font-semibold whitespace-nowrap min-w-[150px]">Tipe & Konsep</th>
                  <th className="py-3.5 px-4 font-semibold whitespace-nowrap min-w-[150px]">Jadwal Tanggal</th>
                  <th className="py-3.5 px-4 font-semibold whitespace-nowrap min-w-[130px]">Total & DP</th>
                  <th className="py-3.5 px-4 font-semibold whitespace-nowrap min-w-[140px]">Status</th>
                  <th className="py-3.5 px-4 font-semibold text-right whitespace-nowrap min-w-[130px]">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-xs text-[#64748B]">
                      Tidak ada pesanan yang sesuai dengan filter.
                    </td>
                  </tr>
                ) : (
                  filtered.map((b) => {
                    const waLink = buildWaLink(
                      `Halo kak ${b.customerName}! 🌸 Kami dari By Gewa ingin mengonfirmasi pesanan ${b.productName} (${b.id}).`
                    )
                    return (
                      <tr key={b.id} className="hover:bg-[#F8FAFC] transition-colors">
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className="font-bold text-[#0F172A] block">{b.customerName}</span>
                          <span className="text-[10px] text-[#64748B] font-mono">{b.id}</span>
                          <span className="text-[10px] text-[#64748B] block">{b.customerPhone}</span>
                        </td>

                        <td className="py-4 px-4 min-w-[200px]">
                          <span className="font-medium text-[#0F172A] block">{b.productName}</span>
                          <span className="text-[10px] text-[#64748B]">Ukuran: {b.sizeName}</span>
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full inline-block mb-1 whitespace-nowrap ${
                            b.orderType === "rent" ? "bg-[#FAF5FF] text-[#7E22CE]" : "bg-[#F1F5F9] text-[#334155]"
                          }`}>
                            {b.orderType === "rent" ? "Sewa 3 Hari" : "Beli"}
                          </span>
                          <span className="text-[10px] text-[#64748B] block line-clamp-1">
                            🎨 {b.colorConcept}
                          </span>
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className="font-medium text-[#0F172A]">{b.startDate}</span>
                          {b.orderType === "rent" && (
                            <span className="text-[10px] text-[#64748B] block">s/d {b.endDate}</span>
                          )}
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className="font-bold text-sm text-[#0F172A] block">
                            Rp {b.totalAmount.toLocaleString("id-ID")}
                          </span>
                          <span className="text-[10px] text-[#15803D] font-semibold">
                            DP: Rp {b.dpAmount.toLocaleString("id-ID")}
                          </span>
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap">
                          <BookingStatusBadge status={b.status} />
                        </td>

                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <a
                              href={waLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#25D366]/10 text-[#075E54] hover:bg-[#25D366]/20 transition-colors"
                              title="Chat WhatsApp Pemesan"
                            >
                              💬 WA
                            </a>
                            <Link
                              to={`/admin/bookings/${b.id}`}
                              className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#FDF2F7] text-[#D94883] hover:bg-[#D94883] hover:text-white transition-colors"
                            >
                              Kelola →
                            </Link>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
