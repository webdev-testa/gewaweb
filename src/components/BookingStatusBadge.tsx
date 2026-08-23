import { BookingStatus } from "../data/mockBookings"

interface Props {
  status: BookingStatus
}

export default function BookingStatusBadge({ status }: Props) {
  const configs: Record<BookingStatus, { label: string; bg: string; text: string; dot: string }> = {
    pending: {
      label: "Menunggu DP",
      bg: "bg-[#FEF3C7]",
      text: "text-[#92400E]",
      dot: "bg-[#F59E0B]",
    },
    dp_paid: {
      label: "DP Diterima (30%)",
      bg: "bg-[#E0F2FE]",
      text: "text-[#0369A1]",
      dot: "bg-[#0284C7]",
    },
    paid: {
      label: "Lunas / Produksi",
      bg: "bg-[#D1FAE5]",
      text: "text-[#065F46]",
      dot: "bg-[#10B981]",
    },
    returned: {
      label: "Selesai / Kembali",
      bg: "bg-[#F3F4F6]",
      text: "text-[#374151]",
      dot: "bg-[#6B7280]",
    },
    cancelled: {
      label: "Dibatalkan",
      bg: "bg-[#FEE2E2]",
      text: "text-[#991B1B]",
      dot: "bg-[#EF4444]",
    },
  }

  const c = configs[status] || configs.pending

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  )
}
