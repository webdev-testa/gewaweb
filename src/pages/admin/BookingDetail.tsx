import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import AdminLayout from "../../components/AdminLayout"
import BookingStatusBadge from "../../components/BookingStatusBadge"
import {
  getStoredBookings,
  updateBookingStatus,
  calculateLateFee,
  Booking,
  BookingStatus,
} from "../../data/mockBookings"
import { buildWaLink } from "../../lib/waLink"

export default function BookingDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [booking, setBooking] = useState<Booking | undefined>(undefined)
  const [successMsg, setSuccessMsg] = useState("")

  useEffect(() => {
    if (id) {
      const list = getStoredBookings()
      const found = list.find((b) => b.id === id)
      setBooking(found)
    }
  }, [id])

  if (!booking) {
    return (
      <AdminLayout>
        <div className="text-center py-20 bg-white rounded-3xl border border-[#E2E8F0] p-8">
          <h2 className="font-display font-bold text-lg text-[#0F172A] mb-2">Pesanan Tidak Ditemukan</h2>
          <Link to="/admin/bookings" className="text-xs font-semibold text-[#D94883] hover:underline">
            ← Kembali ke Daftar Pesanan
          </Link>
        </div>
      </AdminLayout>
    )
  }

  const isRent = booking.orderType === "rent"
  const lateCalculation = isRent ? calculateLateFee(booking) : null

  const handleStatusChange = (newStatus: BookingStatus) => {
    if (id) {
      updateBookingStatus(id, newStatus)
      setBooking((prev) => (prev ? { ...prev, status: newStatus } : undefined))
      setSuccessMsg(`Status pesanan berhasil diperbarui menjadi "${newStatus}"!`)
      setTimeout(() => setSuccessMsg(""), 3500)
    }
  }

  const waFollowUp = buildWaLink(
    `Halo kak ${booking.customerName}! 🌸 Kami dari By Gewa ingin mengonfirmasi pesanan ${booking.productName} (ID: ${booking.id}). Status saat ini: ${booking.status}.`
  )

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <Link
            to="/admin/bookings"
            className="text-xs font-semibold text-[#64748B] hover:text-[#0F172A]"
          >
            ← Kembali ke Daftar Pesanan
          </Link>
          <span className="text-xs font-mono text-[#64748B]">ID: {booking.id}</span>
        </div>

        {/* Live Success Banner */}
        {successMsg && (
          <div className="p-3.5 rounded-2xl bg-[#DCFCE7] border border-[#15803D]/20 text-[#15803D] text-xs font-medium flex items-center gap-2">
            <span>✓</span> {successMsg}
          </div>
        )}

        {/* Top Info Card */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="font-display font-bold text-2xl text-[#0F172A]">
                  {booking.customerName}
                </h2>
                <BookingStatusBadge status={booking.status} />
              </div>
              <p className="text-xs text-[#64748B]">
                WhatsApp: <span className="font-mono text-[#0F172A]">{booking.customerPhone}</span> • Dibuat: {booking.startDate}
              </p>
            </div>

            <a
              href={waFollowUp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full text-xs font-semibold bg-[#25D366] text-white hover:bg-[#20ba59] transition-all shadow-xs flex items-center gap-2 self-start sm:self-auto active-push"
            >
              <span>💬</span> Hubungi via WhatsApp
            </a>
          </div>

          {/* Status Progression Controls */}
          <div className="py-6 border-b border-[#E2E8F0] space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B] block">
              Ubah Status Transaksi (Workflow):
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleStatusChange("pending")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all active-push ${
                  booking.status === "pending"
                    ? "bg-[#FEF3C7] text-[#92400E] ring-2 ring-[#D97706]"
                    : "bg-[#F8FAFC] text-[#64748B] hover:bg-[#F1F5F9]"
                }`}
              >
                ⏳ Menunggu DP
              </button>

              <button
                type="button"
                onClick={() => handleStatusChange("dp_paid")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all active-push ${
                  booking.status === "dp_paid"
                    ? "bg-[#DBEAFE] text-[#1E40AF] ring-2 ring-[#2563EB]"
                    : "bg-[#F8FAFC] text-[#64748B] hover:bg-[#F1F5F9]"
                }`}
              >
                💳 DP Diterima (Diproduksi)
              </button>

              <button
                type="button"
                onClick={() => handleStatusChange("paid")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all active-push ${
                  booking.status === "paid"
                    ? "bg-[#DCFCE7] text-[#15803D] ring-2 ring-[#16A34A]"
                    : "bg-[#F8FAFC] text-[#64748B] hover:bg-[#F1F5F9]"
                }`}
              >
                ✅ Lunas / Bunga Diserahkan
              </button>

              <button
                type="button"
                onClick={() => handleStatusChange("returned")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all active-push ${
                  booking.status === "returned"
                    ? "bg-[#FAF5FF] text-[#7E22CE] ring-2 ring-[#9333EA]"
                    : "bg-[#F8FAFC] text-[#64748B] hover:bg-[#F1F5F9]"
                }`}
              >
                🌸 Selesai / Dikembalikan
              </button>

              <button
                type="button"
                onClick={() => handleStatusChange("cancelled")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all active-push ${
                  booking.status === "cancelled"
                    ? "bg-[#FEE2E2] text-[#991B1B] ring-2 ring-[#DC2626]"
                    : "bg-[#F8FAFC] text-[#64748B] hover:bg-[#F1F5F9]"
                }`}
              >
                ✕ Batalkan Pesanan
              </button>
            </div>
          </div>

          {/* Details Grid */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div className="space-y-4">
              <div>
                <span className="text-[#64748B] block mb-0.5 font-semibold">Produk & Varian:</span>
                <span className="font-bold text-sm text-[#0F172A] block">{booking.productName}</span>
                <span className="text-[#64748B]">Ukuran / Varian: {booking.sizeName}</span>
              </div>

              <div>
                <span className="text-[#64748B] block mb-0.5 font-semibold">Tipe Transaksi:</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold inline-block ${
                  isRent ? "bg-[#FAF5FF] text-[#7E22CE]" : "bg-[#F1F5F9] text-[#334155]"
                }`}>
                  {isRent ? "✨ Sewa (Rental 3 Hari)" : "🎁 Beli Selamanya"}
                </span>
              </div>

              <div>
                <span className="text-[#64748B] block mb-0.5 font-semibold">🎨 Konsep Warna:</span>
                <span className="font-bold text-[#0F172A] text-sm block">{booking.colorConcept}</span>
                <span className="text-[10px] text-[#D94883]">Kebijakan By Gewa: 1x revisi konsep warna</span>
              </div>

              {booking.greetingMessage && (
                <div>
                  <span className="text-[#64748B] block mb-0.5 font-semibold">💌 Pesan Kartu / Ucapan:</span>
                  <p className="italic text-[#334155] p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                    "{booking.greetingMessage}"
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[#64748B] block mb-0.5 font-semibold">Jadwal Tanggal:</span>
                <span className="font-bold text-sm text-[#0F172A] block">
                  {isRent ? `${booking.startDate} s/d ${booking.endDate}` : booking.startDate}
                </span>
              </div>

              <div>
                <span className="text-[#64748B] block mb-0.5 font-semibold">Rincian Finansial:</span>
                <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Total Nilai Pesanan:</span>
                    <span className="font-bold text-[#0F172A]">Rp {booking.totalAmount.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between text-[#15803D]">
                    <span>Deposit (DP 30%):</span>
                    <span className="font-bold">Rp {booking.dpAmount.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between text-[#64748B] pt-1 border-t border-[#E2E8F0]">
                    <span>Sisa Pelunasan:</span>
                    <span className="font-bold text-[#0F172A]">
                      Rp {(booking.totalAmount - booking.dpAmount).toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>

              {booking.notes && (
                <div>
                  <span className="text-[#64748B] block mb-0.5 font-semibold">Metode Pengiriman & Catatan:</span>
                  <p className="text-[#334155] p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                    {booking.notes}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Late Fee Calculation Alert */}
          {lateCalculation && lateCalculation.daysLate > 0 && (
            <div className="mt-6 p-4 rounded-2xl bg-[#FEE2E2] border border-[#DC2626]/20 text-[#991B1B] text-xs space-y-1">
              <div className="flex items-center gap-2 font-bold text-sm">
                <span>⚠️</span>
                <span>Terlambat Pengembalian ({lateCalculation.daysLate} Hari)</span>
              </div>
              <p>
                Estimasi Denda Keterlambatan: <strong>Rp {lateCalculation.lateFee.toLocaleString("id-ID")}</strong> (Tarif: Rp {booking.lateFeePerDay?.toLocaleString("id-ID") || "25.000"} / hari).
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
