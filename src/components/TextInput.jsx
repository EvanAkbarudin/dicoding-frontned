import { useState } from 'react'
import { useHistory } from '../context/HistoryContext'
import { useAuth } from '../context/AuthContext'
import { checkMessage } from '../data/api'

export default function TextInput({ onResult }) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { addEntry } = useHistory()
  const { user, openAuthModal } = useAuth()

  async function handleCheck() {
    if (!user) {
      openAuthModal()
      return
    }

    if (!text.trim()) {
      setError('Masukkan pesan SMS terlebih dahulu.')
      return
    }
    setError('')
    setLoading(true)

    try {
      const data = await checkMessage(text)
      addEntry(data)
      onResult(data)
    } catch (err) {
      console.error(err)
      setError(
        'Gagal terhubung ke server. Periksa koneksi internet kamu atau coba beberapa saat lagi.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto mb-20 px-10">
      <div className="relative bg-white dark:bg-[#12121a] border border-gray-200 dark:border-white/10 rounded-2xl p-8 shadow-sm dark:shadow-none overflow-hidden transition-colors duration-300">
        {/* Top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linera-to-r from-transparent  via-[#b8a800]/60 dark:via-[#e8ff47]/40 to-transparent" />

        {/* Label */}
        <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 dark:text-white/40 mb-4 font-sans transition-colors duration-300">Isi Pesan SMS</p>

        {/* Textarea */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          placeholder={`Paste isi SMS yang ingin dicek di sini...\n\nContoh: "Selamat! Anda terpilih mendapatkan hadiah Rp 50.000.000."\n\nSemakin lengkap teks SMS, semakin akurat hasil analisisnya.`}
          className="w-full bg-gray-50 dark:bg-[#1a1a26] border border-gray-200 dark:border-white/10 rounded-xl px-6 py-5
                     text-slate-900 dark:text-white/90 text-base font-normal font-sans leading-relaxed
                     placeholder-gray-400 dark:placeholder-white/40 outline-none resize-y min-h-40
                     focus:border-[#b8a800] dark:focus:border-[#e8ff47]/50 focus:ring-2 focus:ring-[#b8a800]/30 dark:focus:ring-transparent transition-all duration-300"
        />

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 mt-3 px-4 py-2.5 rounded-lg bg-[#e74c3c]/10 border border-[#e74c3c]/20">
            <span className="text-[#e74c3c] text-sm">⚠️</span>
            <p className="text-[#e74c3c] text-xs font-sans">{error}</p>
          </div>
        )}

        {/* Footer row */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-gray-500 dark:text-white/40 font-sans transition-colors duration-300">💡 Tips: sertakan seluruh isi SMS termasuk link dan nomor pengirim</span>

          <button
            onClick={handleCheck}
            disabled={loading}
            className={`flex items-center gap-2.5 px-7 py-3.5 rounded-xl
                        font-display font-bold text-[#0a0a0f] text-sm
                        transition-all duration-200
                        ${loading ? "bg-[#e8ff47]/50 cursor-not-allowed" : "bg-[#e8ff47] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(232,255,71,0.2)] active:translate-y-0"}`}
          >
            {loading ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-[#0a0a0f]/30 border-t-[#0a0a0f] animate-spin" />
                Menganalisis...
              </>
            ) : (
              <>
                Cek Pesan
                <span className="w-5 h-5 rounded-full bg-[#0a0a0f]/20 flex items-center justify-center text-[10px]">→</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}