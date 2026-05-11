import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">

      {/* ── Content area ── */}
      <main className="flex-1 flex flex-col items-center justify-center relative overflow-hidden px-6 py-20">

        {/* Giant 404 background text */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden="true"
        >
        </div>

        {/* Search icon box */}
        <div className="relative z-10 w-16 h-16 rounded-2xl bg-[#1a1a26] border border-white/10 flex items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#e8ff47"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        {/* Badge pill */}
        <div className="relative z-10 inline-flex items-center gap-2 border border-white/20 rounded-full px-4 py-1.5 mb-8">
          <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white/60 font-sans">
            Kesalahan Navigasi • Data Tidak Ditemukan
          </span>
        </div>


        <h1
          className="relative z-10 font-display font-extrabold text-white text-center uppercase leading-none tracking-tight mb-6"
          style={{ fontSize: 'clamp(56px, 10vw, 80px)' }}
        >
          Halaman<br />Tidak<br />Ditemukan
        </h1>


        <p className="relative z-10 text-center text-white/50 font-sans font-light text-base leading-relaxed max-w-md mb-10">
          Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
          Pastikan URL yang Anda masukkan sudah benar.
        </p>


        <Link
          to="/"
          className="relative z-10 inline-flex items-center gap-2.5 px-8 py-4 rounded-xl
                     bg-[#e8ff47] text-[#0a0a0f] font-display font-bold text-base
                     transition-all duration-200
                     hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(232,255,71,0.25)]
                     active:translate-y-0 mb-16"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Kembali ke Beranda
        </Link>

        {/* System status pill */}
        <div className="relative z-10 inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] rounded-full px-5 py-2">
          <span className="w-2 h-2 rounded-full bg-[#e8ff47] animate-pulse" />
          <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/50 font-sans">
            Safe Massage System Active
          </span>
        </div>

      </main>

    </div>
  )
}