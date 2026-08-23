import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { login } from "../../lib/auth"

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("admin@bygewa.com")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (login(email, password)) {
      navigate("/admin")
    } else {
      setError("Password salah. Gunakan password demo: gewa2024")
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex flex-col justify-center items-center px-6 py-12">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-3">
            <img src="/assets/logo utama logogram.png" alt="By Gewa" className="w-8 h-8 object-contain" />
            <span className="text-2xl font-bold font-display text-[#0F172A]">By Gewa</span>
          </Link>
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D94883] block">
            Admin CMS & Studio Console
          </span>
          <p className="text-xs text-[#64748B] mt-1">
            Masuk untuk mengelola katalog bunga, harga, dan jadwal sewa.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] p-8 shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                Email Admin
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] text-[#0F172A] focus:outline-none focus:border-[#D94883]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password demo: gewa2024"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] text-[#0F172A] focus:outline-none focus:border-[#D94883]"
                required
              />
            </div>

            {error && <p className="text-xs text-[#DC2626]">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 rounded-full text-xs font-bold bg-[#D94883] text-white hover:bg-[#C2366F] transition-all shadow-sm active-push"
            >
              Masuk ke Admin Console
            </button>
          </form>

          <div className="mt-6 p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[11px] text-[#64748B] text-center">
            🔑 <strong>Demo Password:</strong> <code className="text-[#D94883] font-bold">gewa2024</code>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-xs text-[#64748B] hover:text-[#0F172A]">
            ← Kembali ke Halaman Utama
          </Link>
        </div>
      </div>
    </div>
  )
}
