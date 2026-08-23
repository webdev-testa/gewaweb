import { useState } from "react"
import Layout from "../components/Layout"
import { estimateShipping, type ShippingEstimate } from "../lib/shipping"

export default function ShippingChecker() {
  const [destination, setDestination] = useState("")
  const [weight, setWeight] = useState("1.5")
  const [results, setResults] = useState<ShippingEstimate[] | null>(null)
  const [error, setError] = useState("")

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setResults(null)

    if (!destination.trim()) {
      setError("Masukkan kota tujuan")
      return
    }
    const w = parseFloat(weight)
    if (isNaN(w) || w <= 0) {
      setError("Masukkan perkiraan berat yang valid (dalam kg)")
      return
    }

    setResults(estimateShipping(destination, w))
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-10 text-center max-w-xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] font-semibold text-[#D94883] mb-2">
            Logistik & Pengiriman
          </p>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-[#0F172A] mb-3 pb-0.5">
            Cek Lokasi Studio & Ongkir
          </h1>
          <p className="text-sm text-[#64748B] leading-relaxed">
            By Gewa melayani self pick-up di Studio Malang, pengiriman instan Grab/Gojek, serta kurir reguler ke seluruh kota di Indonesia.
          </p>
        </div>

        {/* Studio Location Card */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FDF2F7] text-[#D94883] flex items-center justify-center text-xl flex-shrink-0 border border-[#FCE7F3]">
              📍
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-[#FDF2F7] text-[#D94883] border border-[#FCE7F3]">
                Studio Utama By Gewa
              </span>
              <h3 className="font-display font-bold text-lg text-[#0F172A] mt-1.5 mb-1">
                Jl. Permata Jingga IV No. 12, Malang Raya
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                Buka setiap hari (08.00–20.00 WIB). Kamu bisa mengambil pesanan buket, sewa hand bouquet, atau vas langsung ke studio tanpa biaya pengiriman.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-3 py-1 bg-[#F8FAFC] text-[#334155] rounded-full border border-[#E2E8F0]">🛵 Grab/Gojek Instant</span>
                <span className="px-3 py-1 bg-[#F8FAFC] text-[#334155] rounded-full border border-[#E2E8F0]">🚗 Self Pick-up Mobil/Motor</span>
                <span className="px-3 py-1 bg-[#F8FAFC] text-[#334155] rounded-full border border-[#E2E8F0]">📦 Packing Kardus Khusus</span>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Estimator Form */}
        <form onSubmit={handleCheck} className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs mb-8">
          <h3 className="font-display font-bold text-base text-[#0F172A] mb-4">
            Kalkulator Ongkos Kirim Luar Kota (Asal: Malang)
          </h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="shipping-dest" className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                Kota / Kabupaten Tujuan:
              </label>
              <input
                id="shipping-dest"
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Contoh: Surabaya, Jakarta Selatan, Bandung, Denpasar..."
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] text-[#0F172A] focus:outline-none focus:border-[#D94883]"
              />
            </div>

            <div>
              <label htmlFor="shipping-weight" className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                Estimasi Berat (kg):
              </label>
              <input
                id="shipping-weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                step="0.5"
                min="0.5"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] text-[#0F172A] focus:outline-none focus:border-[#D94883]"
              />
              <p className="text-[10px] text-[#64748B] mt-1">
                Petite/Midi Bouquet: ~1 kg • Largo/Grande/Vase: ~2–3 kg • Signature Box: ~1.5 kg
              </p>
            </div>

            {error && <p className="text-xs text-[#DC2626]">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 text-xs font-bold rounded-full bg-[#D94883] text-white hover:bg-[#C2366F] transition-all active-push"
            >
              Cek Estimasi Ongkir
            </button>
          </div>
        </form>

        {/* Results */}
        {results && (
          <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-xs mb-8">
            <h3 className="font-display font-bold text-base text-[#0F172A] mb-4">
              Estimasi Pengiriman ke {destination} ({weight} kg)
            </h3>
            <div className="space-y-3">
              {results.map((r, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]"
                >
                  <div>
                    <p className="font-bold text-xs text-[#0F172A]">
                      {r.courier} — {r.service}
                    </p>
                    <p className="text-[11px] text-[#64748B] mt-0.5">
                      {r.description} • Estimasi Tiba: {r.etd}
                    </p>
                  </div>
                  <p className="font-display font-bold text-sm text-[#D94883]">
                    Rp {r.cost.toLocaleString("id-ID")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Shipping Safety Tips */}
        <div className="rounded-3xl border border-[#E2E8F0] p-6 bg-[#F8FAFC]">
          <h4 className="font-display font-bold text-sm text-[#0F172A] mb-2">
            Standar Pengemasan By Gewa:
          </h4>
          <ul className="text-xs space-y-1.5 text-[#475569]">
            <li>📦 Dilengkapi hardbox khusus & bubble wrap tebal anti-penyok.</li>
            <li>🌸 Bunga artifisial aman dari layu, siap pakai saat tiba di tujuan.</li>
            <li>📍 Pengiriman lokal Malang Raya dapat dijadwalkan tepat waktu via kurir instan.</li>
            <li>🔁 Untuk sewa, pengembalian dapat diantar langsung atau dikirim via kurir dengan resi terlacak.</li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}
