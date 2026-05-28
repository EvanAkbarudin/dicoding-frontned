import { useState } from 'react'
import TextInput from '../components/TextInput'
import ResultCard from '../components/ResultCard'

export default function Home() {
  const [result, setResult] = useState(null)

  if (result) {
    return <ResultCard result={result} onBack={() => setResult(null)} />
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative max-w-7xl mx-auto px-10 pt-16 pb-20">
        {/* Glow blob */}
        <div
          className="absolute -top-25 -right-25 w-150 h-150 rounded-full
                        bg-[radial-gradient(circle,rgba(232,255,71,0.06)_0%,transparent_70%)]
                        pointer-events-none"
        />

        {/* Badge */}
        <div
          data-aos="fade-up"
          className="inline-flex items-center gap-2 border border-gray-200 dark:border-white/20
                        text-slate-600 dark:text-white/60 text-[10px] font-semibold tracking-[0.15em] uppercase
                        px-4 py-1.5 rounded-full mb-10 transition-colors duration-300"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#b8a800] dark:bg-[#e8ff47] inline-block" />
          Didukung AI · Deteksi Real-time
        </div>

        {/* Heading — massive uppercase setiap kata per baris */}
        <h1
          data-aos="fade-up"
          data-aos-delay="100"
          className="font-display font-extrabold uppercase leading-[0.9] tracking-tight
                       text-slate-900 dark:text-white mb-10 transition-colors duration-300"
          style={{ fontSize: "clamp(72px, 12vw, 80px)" }}
        >
          Jangan Sampai
          <br />
          Tertipu SMS
          <br />
          <span className="text-[#b8a800]  dark:text-[#e8ff47]">Palsu.</span>
        </h1>

        {/* Subtitle */}
        <p data-aos="fade-up" data-aos-delay="200" className="text-base font-light text-slate-500 dark:text-white/50 leading-relaxed max-w-sm mb-14 font-sans transition-colors duration-300">
          Paste isi SMS yang kamu terima, dan sistem kami akan menganalisis apakah pesan tersebut aman atau merupakan upaya phishing dalam hitungan detik.
        </p>

        {/* Stats */}
        <div data-aos="fade-up" data-aos-delay="300" className="flex gap-12">
          {[
            ["89%", "Akurasi deteksi"],
            ["50K+", "Pesan dianalisis"],
            ["<2s", "Waktu analisis"],
          ].map(([num, label]) => (
            <div key={label}>
              <div className="font-display font-extrabold text-slate-900 dark:text-white transition-colors duration-300" style={{ fontSize: "clamp(32px, 4vw, 48px)" }}>
                {num}
              </div>
              <div className="text-xs text-slate-400 dark:text-white/40 mt-1 font-sans transition-colors duration-300">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Input area ── */}
      <div data-aos="fade-up" data-aos-delay="400">
        <TextInput onResult={setResult} />
      </div>
    </>
  );
}