import { useState } from 'react'
import { useHistory } from '../context/HistoryContext'
import { timeAgo } from '../data/storage'
import { generateSinglePDF } from '../data/generatepdf'

export default function History() {
  const { history, removeAll, totalCount, safeCount, phishingCount } = useHistory()
  const [downloadingId, setDownloadingId] = useState(null)

  async function handleDownload(item) {
    setDownloadingId(item.id)
    try {
      await generateSinglePDF(item)
    } finally {
      setDownloadingId(null)
    }
  }

  const statCards = [
    { num: totalCount, label: 'Total dicek', numColor: 'text-slate-900 dark:text-white', glowColor: 'bg-[#e8ff47]' },
    { num: phishingCount, label: 'Terdeteksi phishing', numColor: 'text-[#e74c3c]', glowColor: 'bg-[#e74c3c]' },
    { num: safeCount, label: 'Terdeteksi aman', numColor: 'text-[#2ecc71]', glowColor: 'bg-[#2ecc71]' },
  ]

  return (
    <div className="max-w-4xl mx-auto mt-10 mb-20 px-10">

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-3 gap-3 mb-10">
        {statCards.map((s, index) => (
          <div
            key={s.label}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="relative bg-white dark:bg-[#12121a] border border-gray-200 dark:border-white/10 rounded-2xl p-6 overflow-hidden shadow-sm dark:shadow-none transition-colors duration-300"
          >
            <div className={`font-display font-extrabold text-4xl leading-none mb-1.5 transition-colors duration-300 ${s.numColor}`}>
              {s.num}
            </div>
            <div className="text-xs text-slate-500 dark:text-white/40 font-sans transition-colors duration-300">{s.label}</div>
            <div className={`absolute -top-5 -right-5 w-20 h-20 rounded-full opacity-[0.06] transition-colors duration-300 ${s.glowColor}`} />
          </div>
        ))}
      </div>

      {/* ── Header ── */}
      <div data-aos="fade-up" className="flex items-center justify-between mb-5">
        <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white transition-colors duration-300">
          Riwayat Pengecekan
        </h2>
        {history.length > 0 && (
          <button
            onClick={removeAll}
            className="px-3.5 py-1.5 rounded-lg border border-[#e74c3c]/30 text-[#e74c3c]
                       text-xs font-sans bg-transparent cursor-pointer
                       hover:bg-[#e74c3c]/10 transition-colors duration-200"
          >
            Hapus semua
          </button>
        )}
      </div>

      {/* ── List ── */}
      {history.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-4xl mb-4">📭</div>
          <p className="text-slate-400 dark:text-white/30 text-sm font-sans transition-colors duration-300">
            Belum ada riwayat pengecekan. Coba cek SMS pertamamu!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {history.map((item, index) => {
            const isSafe = item.status === 'safe'
            const isLoading = downloadingId === item.id
            const statusColor = isSafe ? 'text-[#2ecc71]' : 'text-[#e74c3c]'
            const iconBg = isSafe ? 'bg-[#2ecc71]/15' : 'bg-[#e74c3c]/15'
            const borderHover = isSafe ? 'hover:border-[#2ecc71]/20' : 'hover:border-[#e74c3c]/20'

            return (
              <div
                key={item.id}
                data-aos="fade-up"
                data-aos-delay={index * 50}
                className={`bg-white dark:bg-[#12121a] border border-gray-200 dark:border-white/10 rounded-2xl p-5 shadow-sm dark:shadow-none
                            transition-all duration-300 ${borderHover}`}
              >
                {/* Row atas: icon + teks + badge */}
                <div className="flex items-start justify-between gap-4">
                  {/* Kiri: icon + teks */}
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${iconBg}`}>{isSafe ? "✅" : "🚨"}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 dark:text-white/80 mb-1 font-sans truncate transition-colors duration-300">{item.message}</p>
                      <p className="text-xs text-slate-500 dark:text-white/30 font-sans leading-relaxed line-clamp-2 transition-colors duration-300">{item.reason}</p>

                      {/* Skor & Keyakinan */}
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                        {item.phishingScore !== undefined && item.phishingScore !== null && (
                          <span className={`inline-flex items-center text-[10px] px-2 py-0.5 rounded font-sans font-semibold tracking-wide uppercase ${isSafe ? "bg-[#2ecc71]/10 text-[#2ecc71]" : "bg-[#e74c3c]/10 text-[#e74c3c]"}`}>
                            Skor Risiko: {Math.round(item.phishingScore)}%
                          </span>
                        )}
                        {item.confidence !== undefined && item.confidence !== null && (
                          <span className="inline-flex items-center text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/40 font-sans font-semibold tracking-wide uppercase">
                            Keyakinan: {item.confidence}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Kanan: status + waktu */}
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className={`font-display font-bold text-sm transition-colors duration-300 ${statusColor}`}>{isSafe ? "AMAN" : "BAHAYA"}</span>
                    <span className="text-[10px] text-slate-400 dark:text-white/25 font-sans transition-colors duration-300">{timeAgo(item.timestamp)}</span>
                  </div>
                </div>

                {/* Row bawah: meta + tombol unduh */}
                <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-gray-100 dark:border-white/6 transition-colors duration-300">
                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-[10px] text-slate-400 dark:text-white/20 font-sans transition-colors duration-300">ID: SM-{item.id}</span>
                    <span className="text-slate-300 dark:text-white/10 transition-colors duration-300">·</span>
                    <span className="text-[10px] text-slate-400 dark:text-white/20 font-sans transition-colors duration-300">
                      {new Date(item.timestamp).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    {item.user?.email && (
                      <>
                        <span className="text-slate-300 dark:text-white/10 transition-colors duration-300">·</span>
                        <span className="text-[10px] text-[#b8a800] dark:text-[#e8ff47] font-sans font-medium transition-colors duration-300">👤 Pengecek: {item.user.email}</span>
                      </>
                    )}
                  </div>

                  {/* Tombol unduh PDF */}
                  <button
                    onClick={() => handleDownload(item)}
                    disabled={isLoading}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium font-sans
              transition-all duration-200
              ${
                isLoading
                  ? "bg-[#b8a800]/20 text-white/50 dark:bg-[#e8ff47]/20 dark:text-black/50 cursor-not-allowed"
                  : "bg-[#b8a800]/10 text-white border border-[#b8a800]/20 hover:bg-[#b8a800]/20 hover:border-[#b8a800]/40 dark:bg-[#e8ff47]/10 dark:text-black dark:border-[#e8ff47]/20 dark:hover:bg-[#e8ff47]/20 dark:hover:border-[#e8ff47]/40 active:scale-95"
              }`}
                  >
                    {isLoading ? (
                      <>
                        <span className="w-3 h-3 rounded-full border border-white/30 dark:border-black/30 border-t-white dark:border-t-black animate-spin" />
                        Menyiapkan...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Unduh PDF
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  )
}