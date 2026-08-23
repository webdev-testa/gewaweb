import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Layout from "../components/Layout"
import ProductCard from "../components/ProductCard"
import { getStoredProducts, portfolioPhotos, Category } from "../data/mockProducts"
import { buildDirectWaLink } from "../lib/waLink"

export default function Landing() {
  const [productsList, setProductsList] = useState(getStoredProducts())
  const waLink = buildDirectWaLink()

  useEffect(() => {
    const handleUpdate = () => setProductsList(getStoredProducts())
    window.addEventListener("bygewa_products_updated", handleUpdate)
    return () => window.removeEventListener("bygewa_products_updated", handleUpdate)
  }, [])

  const featured = productsList.filter((p) => p.active).slice(0, 4)

  const lineCategories: { key: Category; name: string; desc: string; img: string; pastel: string }[] = [
    {
      key: "bouquet",
      name: "Painted Bouquet",
      desc: "Buket bunga lukis bergradasi cantik dari ukuran Petite hingga Human Size.",
      img: "/assets/lines/bouquet.png",
      pastel: "#FFCCDF",
    },
    {
      key: "vase",
      name: "Artisan Vase",
      desc: "Rangkaian vas keramik dengan lukisan bunga eksklusif (Lily, Orchid, Anthurium).",
      img: "/assets/lines/vase.png",
      pastel: "#B4C8CB",
    },
    {
      key: "hand-bouquet",
      name: "Hand Bouquet",
      desc: "Buket pengantin & prewedding. Tersedia opsi Beli selamanya atau Sewa 3 hari.",
      img: "/assets/lines/hand-bouquet.png",
      pastel: "#FFD8E4",
    },
    {
      key: "signature",
      name: "Signature Creations",
      desc: "Yoona, Marii, Bomi, dan Bloom Box berplakat akrilik pesan personal.",
      img: "/assets/lines/signature.png",
      pastel: "#E9D5FF",
    },
    {
      key: "decoration",
      name: "Table Decoration",
      desc: "Sewa dekorasi meja estetik untuk lamaran, bridal party, dan intimate event.",
      img: "/assets/lines/decoration.png",
      pastel: "#DBEAFE",
    },
  ]

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[#E2E8F0] bg-gradient-to-b from-[#FFF5F8]/40 via-[#FDFCFB] to-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FDF2F7] border border-[#D94883]/20 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#D94883]" aria-hidden="true" />
              <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#D94883]">
                By Gewa • Paint Your Moment
              </span>
            </div>

            {/* Headline with Descender Clearance */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold leading-[1.12] text-[#0F172A] mb-5 pb-1">
              Bunga Lukis Abadi,<br />
              <em className="font-light italic text-[#D94883]">Untuk Momen Istimewamu.</em>
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-[#475569] max-w-xl mb-8">
              Rangkaian <strong>painted artificial flower</strong> artisan dengan pilihan warna custom sesuai konsepmu. Tersedia opsi pembelian dan sewa (Hand Bouquet & Table Decor) dengan kemudahan pemesanan langsung terhubung ke WhatsApp.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <Link
                to="/catalog"
                className="px-8 py-3.5 font-semibold text-sm rounded-full bg-[#D94883] text-white hover:bg-[#C2366F] transition-all shadow-xs active-push"
              >
                Lihat Katalog Koleksi
              </Link>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 font-medium text-sm rounded-full border border-[#0F172A] text-[#0F172A] bg-white hover:bg-[#F8FAFC] transition-all active-push"
              >
                Konsultasi Warna Custom
              </a>
            </div>

            {/* 3 Pillar Badges */}
            <div className="mt-10 pt-6 border-t border-[#E2E8F0] grid grid-cols-3 gap-6 max-w-md">
              <div>
                <span className="block font-display font-bold text-2xl text-[#0F172A]">100%</span>
                <span className="text-xs text-[#64748B] font-medium">Hand-Painted</span>
              </div>
              <div>
                <span className="block font-display font-bold text-2xl text-[#0F172A]">1x</span>
                <span className="text-xs text-[#64748B] font-medium">Revisi Warna</span>
              </div>
              <div>
                <span className="block font-display font-bold text-2xl text-[#0F172A]">Beli / Sewa</span>
                <span className="text-xs text-[#64748B] font-medium">Deposit DP 30%</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md rounded-3xl overflow-hidden bg-[#F8FAFC] p-4 shadow-[0_16px_40px_-12px_rgba(15,23,42,0.08)] border border-[#E2E8F0]">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-white flex items-center justify-center p-2 relative">
                <img
                  src="/assets/Banner Cover/Header Gform (1).png"
                  alt="By Gewa Floral Atelier Banner"
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-white/60 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#D94883] font-bold block">Artisan Collection</span>
                    <span className="text-xs font-semibold text-[#0F172A]">Custom Paint & Floral Atelier</span>
                  </div>
                  <Link to="/catalog" className="text-xs font-bold text-[#D94883] hover:underline flex items-center gap-0.5">
                    Explore <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Product Lines Showcase with Pastel Cards */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#0F172A] mb-3 pb-0.5">
            5 Lini Koleksi By Gewa
          </h2>
          <p className="text-sm text-[#64748B] leading-relaxed">
            Setiap kreasi floral dirancang secara khusus untuk melengkapi momen bahagiamu dengan palet warna personal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {lineCategories.map((cat) => (
            <Link
              key={cat.key}
              to={`/catalog?cat=${cat.key}`}
              className="group p-5 rounded-2xl border border-[#E2E8F0] bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_-8px_rgba(15,23,42,0.06)] flex flex-col justify-between"
              aria-label={`Jelajahi koleksi ${cat.name}`}
            >
              <div>
                <div
                  className="w-full aspect-square rounded-xl mb-4 overflow-hidden flex items-center justify-center p-3 transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundColor: cat.pastel }}
                  aria-hidden="true"
                >
                  <img
                    src={cat.img}
                    alt={`Lini ${cat.name}`}
                    loading="lazy"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="font-display font-bold text-base text-[#0F172A] mb-1.5 group-hover:text-[#D94883] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                  {cat.desc}
                </p>
              </div>

              <span className="text-xs font-semibold text-[#D94883] flex items-center gap-1 group-hover:gap-1.5 transition-all">
                Pilih Seri <span>→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works (3 Steps) */}
      <section className="py-20 bg-[#F8FAFC] border-y border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#0F172A] mb-5 leading-tight pb-0.5">
                Alur Pemesanan & Sewa Mudah
              </h2>
              <p className="text-sm leading-relaxed text-[#475569] mb-6">
                Tidak perlu bingung. Pilih produk di website, tentukan konsep warna atau jadwal sewa, dan konfirmasi langsung dengan admin By Gewa via WhatsApp.
              </p>
              <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] text-xs text-[#64748B] space-y-1.5 shadow-xs">
                <p className="font-semibold text-[#0F172A]">💡 Catatan Penting:</p>
                <p>• Bunga artifisial dapat disimpan selamanya sebagai kenang-kenangan.</p>
                <p>• Hand Bouquet & Table Decor tersedia untuk disewa (rental 3 hari dengan DP 30%).</p>
                <p>• Disediakan 1x revisi konsep warna sebelum pesanan masuk antrean produksi.</p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {[
                {
                  num: "01",
                  title: "Pilih Produk & Request Warna",
                  desc: "Pilih lini bunga yang kamu inginkan (Bouquet, Vase, Signature, Hand Bouquet, atau Table Decor). Cantumkan konsep warna idaman dan ucapan kartu.",
                  badge: "Langkah 1",
                },
                {
                  num: "02",
                  title: "Tentukan Beli atau Sewa & Cek DP",
                  desc: "Untuk Hand Bouquet & Table Decor, kamu bisa memilih opsi Sewa dengan deposit 30%. Sistem akan langsung menghitung estimasi DP dan total biaya secara transparan.",
                  badge: "Langkah 2",
                },
                {
                  num: "03",
                  title: "Konfirmasi Cepat via WhatsApp",
                  desc: "Klik tombol WhatsApp di halaman konfirmasi. Pesananmu akan otomatis terkirim rapi ke WhatsApp By Gewa (+62858-2222-0904) untuk pembayaran DP dan jadwal pengerjaan.",
                  badge: "Langkah 3",
                },
              ].map((step) => (
                <div
                  key={step.num}
                  className="flex gap-5 p-5 sm:p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs transition-all hover:border-[#D94883]"
                >
                  <span className="font-display font-bold text-3xl sm:text-4xl text-[#D94883]/35 flex-shrink-0 leading-none">
                    {step.num}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display font-bold text-base text-[#0F172A]">
                        {step.title}
                      </h3>
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FDF2F7] text-[#D94883]">
                        {step.badge}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#0F172A] pb-0.5">
              Koleksi Pilihan Terkini
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1">
              Rangkaian floral paling banyak diminati oleh pelanggan By Gewa
            </p>
          </div>
          <Link
            to="/catalog"
            className="text-sm font-semibold text-[#D94883] hover:underline flex items-center gap-1"
          >
            Lihat Semua Koleksi <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section className="py-20 bg-[#FDFCFB] border-t border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#0F172A] mb-2 pb-0.5">
              Galeri Momen Terlukis
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              Potret karya nyata By Gewa untuk wisuda, lamaran, wedding, dan hampers di Malang Raya dan seluruh Indonesia.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {portfolioPhotos.slice(0, 6).map((item) => (
              <div
                key={item.id}
                className="group relative rounded-2xl overflow-hidden border border-[#E2E8F0] bg-white aspect-[4/3] flex items-center justify-center p-3 transition-all duration-300 hover:border-[#D94883] hover:shadow-sm"
              >
                <img
                  src={item.url}
                  alt={item.caption}
                  loading="lazy"
                  className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-xs font-medium text-white">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SEAMLESS BOTANICAL CTA CARD (NO AWKWARD WHITESPACE GAP) */}
      {/* ========================================================= */}
      <section className="py-16 md:py-20 px-6 max-w-6xl mx-auto">
        <div className="rounded-3xl p-8 sm:p-14 text-center bg-gradient-to-br from-[#FFF0F6] via-[#FDF2F7] to-[#F0FDFA] border border-[#FCE7F3] shadow-sm relative overflow-hidden">
          {/* Subtle floral backdrop glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#FFCCDF]/30 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-[#B4C8CB]/30 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.2em] text-[#D94883] font-bold block mb-2">
              Konsultasi & Pemesanan
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 text-[#0F172A] leading-tight pb-1">
              Siap Melukis Momen Bahagiamu?
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed mb-8 max-w-lg mx-auto">
              Diskusikan palet warna custom, tipe buket, atau jadwal sewa hand bouquet langsung dengan tim By Gewa sekarang.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full font-semibold text-sm bg-[#D94883] text-white hover:bg-[#C2366F] transition-all shadow-md active-push"
              >
                Chat WhatsApp Sekarang
              </a>
              <Link
                to="/catalog"
                className="px-8 py-3.5 rounded-full font-semibold text-sm border border-[#CBD5E1] bg-white text-[#0F172A] hover:bg-[#F8FAFC] transition-colors active-push"
              >
                Jelajahi Katalog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
