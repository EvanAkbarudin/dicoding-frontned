export default function Education() {
    const warningSigns = [
        {
            icon: '⚠️',
            title: 'Mendesak',
            desc: 'Pesan yang memaksa Anda bertindak cepat, seperti "Akun Anda akan diblokir!"',
            iconBg: 'bg-[#ff4757]/15',
        },
        {
            icon: '🎁',
            title: 'Hadiah Palsu',
            desc: 'Menawarkan hadiah besar atau uang secara tiba-tiba tanpa alasan jelas.',
            iconBg: 'bg-[#ff4757]/15',
        },
        {
            icon: '🔗',
            title: 'Tautan Aneh',
            desc: 'Meminta Anda mengklik link yang terlihat mencurigakan atau tidak resmi.',
            iconBg: 'bg-[#ff4757]/15',
        },
        {
            icon: '👤',
            title: 'Pengirim Asing',
            desc: 'Pesan dari nomor tidak dikenal yang berpura-pura menjadi bank atau kerabat.',
            iconBg: 'bg-[#ff4757]/15',
        },
        {
            icon: '🔐',
            title: 'Minta Data',
            desc: 'Meminta PIN, password, atau kode OTP. Bank asli tidak pernah meminta ini.',
            iconBg: 'bg-[#ff4757]/15',
        },
        {
            icon: '✏️',
            title: 'Ejaan Buruk',
            desc: 'Pesan resmi biasanya rapi. Waspadai salah ketik atau tata bahasa yang aneh.',
            iconBg: 'bg-[#ff4757]/15',
        },
    ]

    const steps = [
        {
            icon: '🛑',
            title: '1. Berhenti dan Pikirkan',
            desc: 'Jangan terburu-buru. Ambil waktu untuk membaca pesan dengan teliti sebelum bertindak.',
        },
        {
            icon: '🚫',
            title: '2. Jangan Klik Sembarangan',
            desc: 'Hindari menekan tautan atau mengunduh lampiran dari pengirim yang tidak dikenal.',
        },
        {
            icon: '🔍',
            title: '3. Verifikasi Pengirim',
            desc: 'Hubungi institusi terkait menggunakan nomor resmi untuk memastikan kebenaran pesan.',
        },
        {
            icon: '🔒',
            title: '4. Jaga Kerahasiaan',
            desc: 'Tidak pernah membagikan password, PIN, atau OTP kepada siapapun.',
        },
        {
            icon: '📢',
            title: '5. Laporkan Pesan',
            desc: 'Gunakan Safe Massage untuk memeriksa dan melaporkan pesan yang mencurigakan.',
        },
    ]

    const faqs = [
        {
            q: 'Apakah data saya aman saat menggunakan aplikasi ini?',
            a: 'Ya. Safe Massage dirancang untuk menjaga privasi Anda. Kami hanya memeriksa pesan yang Anda minta untuk diperiksa, dan kami tidak menyimpan isi pesan pribadi Anda.',
        },
        {
            q: 'Apa yang harus saya lakukan jika terlanjur mengklik tautan penipuan?',
            a: 'Segera putuskan koneksi internet, ubah password akun penting Anda, dan hubungi bank Anda jika Anda merasa informasi keuangan Anda terancam.',
        },
        {
            q: 'Mengapa saya terus menerima pesan penipuan?',
            a: 'Nomor telepon Anda mungkin masuk ke dalam daftar nomor yang tersebar di internet. Tetap waspada dan jangan pernah merespons pesan tersebut.',
        },
    ]

    return (
        <div className="max-w-4xl mx-auto px-6 py-16 mb-20">

            {/* ── Page header ── */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 border border-white/20
                        text-white/50 text-[10px] font-semibold tracking-[0.15em] uppercase
                        px-4 py-1.5 rounded-full mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e8ff47] inline-block" />
                    Edukasi Keamanan Digital
                </div>
                <p className="text-sm text-white/50 font-sans font-light leading-relaxed max-w-sm mx-auto">
                    Pelajari cara melindungi diri Anda dari penipuan digital. Informasi
                    sederhana untuk menjaga pesan dan data Anda tetap aman.
                </p>
            </div>

            {/* ── Section 1: Apa itu Phishing? ── */}
            <div className="relative bg-[#12121a] border border-[#e8ff47]/20 rounded-2xl p-8 mb-16 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e8ff47]/40 to-transparent" />

                <h2 className="font-display font-bold text-[#e8ff47] text-xl mb-6 flex items-center gap-2">
                    🎣 Apa itu Phishing?
                </h2>

                <div className="flex gap-8 items-start">
                    <div className="flex-1 space-y-4">
                        <p className="text-sm text-white/70 font-sans font-light leading-relaxed">
                            Phishing adalah cara penipu mencoba mencuri informasi pribadi Anda
                            (seperti kata sandi atau nomor rekening) dengan menyamar sebagai
                            pihak yang terpercaya melalui pesan atau email.
                        </p>
                        <p className="text-sm text-white/70 font-sans font-light leading-relaxed">
                            Bayangkan mereka sedang memancing (fishing), dan pesan penipuan
                            adalah umpan yang mereka gunakan. Jangan sampai Anda 'terpancing'!
                        </p>
                    </div>

                    {/* Illustration box */}
                    <div className="w-44 h-36 flex-shrink-0 rounded-xl bg-[#1a1a3a] border border-white/10
                          flex items-center justify-center text-5xl">
                        🛡️
                    </div>
                </div>
            </div>

            {/* ── Section 2: Tanda-tanda Pesan Berbahaya ── */}
            <div className="mb-16">
                <h2 className="font-display font-bold text-white text-xl text-center mb-8">
                    Tanda-tanda Pesan Berbahaya
                </h2>

                <div className="grid grid-cols-3 gap-4">
                    {warningSigns.map((sign) => (
                        <div
                            key={sign.title}
                            className="bg-[#e8ff47] rounded-2xl p-6 flex flex-col items-center text-center
                         transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(232,255,71,0.15)]"
                        >
                            <div className={`w-12 h-12 rounded-full ${sign.iconBg} flex items-center justify-center text-2xl mb-4`}>
                                {sign.icon}
                            </div>
                            <h3 className="font-display font-bold text-[#0a0a0f] text-sm mb-2">
                                {sign.title}
                            </h3>
                            <p className="text-xs text-[#0a0a0f]/70 font-sans leading-relaxed">
                                {sign.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Section 3: 5 Langkah Melindungi Diri ── */}
            <div className="mb-16">
                <h2 className="font-display font-bold text-white text-xl text-center mb-8">
                    5 Langkah Melindungi Diri
                </h2>

                <div className="bg-[#0f1022] border border-white/10 rounded-2xl overflow-hidden">
                    {steps.map((step, i) => (
                        <div
                            key={step.title}
                            className={`flex items-start gap-4 px-7 py-5
                ${i < steps.length - 1 ? 'border-b border-white/[0.07]' : ''}`}
                        >
                            <span className="text-xl flex-shrink-0 mt-0.5">{step.icon}</span>
                            <div>
                                <p className="font-display font-bold text-[#e8ff47] text-sm mb-1">
                                    {step.title}
                                </p>
                                <p className="text-xs text-white/50 font-sans font-light leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Section 4: FAQ ── */}
            <div>
                <h2 className="font-display font-bold text-white text-xl text-center mb-8">
                    Pertanyaan yang Sering Diajukan
                </h2>

                <div className="flex flex-col gap-4">
                    {faqs.map((faq) => (
                        <div
                            key={faq.q}
                            className="bg-[#e8ff47] rounded-2xl px-7 py-5
                         transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(232,255,71,0.2)]"
                        >
                            <p className="font-display font-bold text-[#0a0a0f] text-sm mb-2">
                                {faq.q}
                            </p>
                            <p className="text-xs text-[#0a0a0f]/70 font-sans font-light leading-relaxed">
                                {faq.a}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}