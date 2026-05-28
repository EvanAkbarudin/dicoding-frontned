export default function ResultCard({ result, onBack }) {
  const isSafe = result.status === "safe";

  const phishingScore = result.phishingScore !== undefined && result.phishingScore !== null
    ? Math.round(result.phishingScore)
    : (isSafe ? 15 : 85);

  const tips = isSafe
    ? ["Pesan ini tampak aman, namun tetap waspada terhadap link mencurigakan.", "Jangan pernah memberikan PIN, OTP, atau password kepada siapapun.", "Konfirmasi kebenaran pesan langsung kepada pengirim resmi."]
    : ["Jangan klik link apapun yang ada di pesan ini.", "Jangan berikan data pribadi seperti nomor KTP, rekening, atau OTP.", "Laporkan pesan ini ke pihak berwenang atau operator seluler Anda.", "Blokir nomor pengirim pesan tersebut."];

  return (
    <div data-aos="fade-up" className="max-w-4xl mx-auto mb-20 mt-20 px-10">
      {/* Back button */}
      <button
        onClick={onBack}
        className="mb-5 px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 text-gray-500 dark:text-white/40
                   text-xs font-sans bg-transparent cursor-pointer
                   hover:text-gray-800 dark:hover:text-white/70 transition-colors duration-200"
      >
        ← Cek SMS lain
      </button>

      <div
        className={`relative bg-white dark:bg-[#12121a] rounded-2xl p-8 overflow-hidden border shadow-sm dark:shadow-none transition-colors duration-300
          ${isSafe ? "border-[#2ecc71]/30" : "border-[#e74c3c]/30"}`}
      >
        {/* Top gradient line */}
        <div
          className={`absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent to-transparent
            ${isSafe ? "via-[#2ecc71]/30" : "via-[#e74c3c]/30"}`}
        />

        {/* Verdict row */}
        <div className="flex items-start justify-between mb-7">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl
                ${isSafe ? "bg-[#2ecc71]/15" : "bg-[#e74c3c]/15"}`}
            >
              {isSafe ? "✅" : "⚠️"}
            </div>
            <div>
              <h2
                className={`font-display font-bold text-xl
                  ${isSafe ? "text-[#2ecc71]" : "text-[#e74c3c]"}`}
              >
                {isSafe ? "Pesan Terlihat Aman" : "Pesan Mencurigakan"}
              </h2>
              <p className="text-xs text-gray-500 dark:text-white/40 mt-0.5 font-sans transition-colors duration-300">{isSafe ? "Tidak terdeteksi pola phishing yang signifikan" : "Terdeteksi pola phishing pada pesan ini"}</p>
            </div>
          </div>

          <div
            className={`font-display font-extrabold text-2xl px-4 py-2 rounded-xl
              ${isSafe ? "text-[#2ecc71] bg-[#2ecc71]/12" : "text-[#e74c3c] bg-[#e74c3c]/12"}`}
          >
            {isSafe ? "AMAN" : "BAHAYA"}
          </div>
        </div>

        {/* Risk meter */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-500 dark:text-white/40 font-sans mb-2 transition-colors duration-300">
            <span>Skor Risiko</span>
            <span className={`font-medium ${isSafe ? "text-[#2ecc71]" : "text-[#e74c3c]"}`}>{isSafe ? `RENDAH — ${phishingScore}/100` : `TINGGI — ${phishingScore}/100`}</span>
          </div>
          <div className="h-2 rounded-full bg-gray-100 dark:bg-[#1a1a26] overflow-hidden transition-colors duration-300">
            <div
              className={`h-full rounded-full transition-all duration-1000
                ${isSafe ? "bg-linear-to-r from-[#27ae60] to-[#2ecc71]" : "bg-linear-to-r from-[#f39c12] to-[#e74c3c]"}`}
              style={{ width: `${phishingScore}%` }}
            />
          </div>
        </div>

        {/* Reason */}
        <div className="mb-6">
          <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 dark:text-white/40 font-sans mb-3 transition-colors duration-300">Alasan Analisis</p>
          <div className="bg-gray-50 dark:bg-[#1a1a26] border border-gray-200 dark:border-white/10 rounded-xl px-5 py-4 transition-colors duration-300">
            <p className="text-sm text-slate-700 dark:text-white/80 leading-relaxed font-sans transition-colors duration-300" style={{ whiteSpace: "pre-line" }}>{result.reason}</p>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-gray-50 dark:bg-[#1a1a26] border border-gray-200 dark:border-white/10 rounded-xl px-5 py-4 transition-colors duration-300">
          <p className="text-xs font-medium text-[#0088cc] dark:text-[#47c8ff] mb-3 font-sans transition-colors duration-300">🤖 Saran dari AI</p>
          <ul className="space-y-1.5 list-none">
            {tips.map((tip, i) => (
              <li key={i} className="text-xs text-slate-600 dark:text-white/40 leading-relaxed pl-4 relative font-sans transition-colors duration-300">
                <span className="absolute left-0 top-0.5 text-[#0088cc] dark:text-[#47c8ff] text-[10px] transition-colors duration-300">→</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
