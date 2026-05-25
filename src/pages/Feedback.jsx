import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ChevronDown, ExternalLink } from 'lucide-react';

const feedbackSchema = z.object({
  category: z.string().min(1, 'Pilih kategori masukan'),
  message: z.string().min(10, 'Detail masukan minimal 10 karakter'),
  email: z.string().email('Email tidak valid').optional().or(z.literal('')),
});

const CATEGORIES = [
  "Saran Fitur",
  "Bug / Error",
  "Kendala Penggunaan",
  "Kritik Tampilan",
  "Permintaan Fitur Baru",
  "Laporan Phishing",
  "Pengalaman Pengguna",
  "Keamanan Aplikasi",
  "Performa Aplikasi",
  "Lainnya"
];

export default function Feedback() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(feedbackSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Feedback data:", data);
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column - Feedback Form */}
        <div className="lg:col-span-8" data-aos="fade-up">
          <div className="bg-white dark:bg-[#12121a] border border-gray-200 dark:border-white/10 rounded-3xl p-8 lg:p-10 shadow-sm dark:shadow-none transition-colors duration-300">
            
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 border border-gray-200 dark:border-white/20
                        text-slate-500 dark:text-white/50 text-[10px] font-semibold tracking-[0.15em] uppercase
                        px-4 py-1.5 rounded-full mb-6 transition-colors duration-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e8ff47] inline-block" />
                Suara Pengguna
              </div>
              <h1 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 dark:text-white mb-4 transition-colors duration-300">
                Beri Masukan Anda
              </h1>
              <p className="text-base text-slate-500 dark:text-white/60 font-sans leading-relaxed max-w-2xl transition-colors duration-300">
                Masukan Anda sangat berharga bagi kami. Setiap saran membantu kami membangun ekosistem digital yang lebih aman bagi seluruh masyarakat Indonesia.
              </p>
            </div>

            {isSuccess ? (
              <div className="bg-[#2ecc71]/10 border border-[#2ecc71]/20 rounded-2xl p-8 text-center" data-aos="fade-up">
                <div className="w-16 h-16 rounded-full bg-[#2ecc71]/20 flex items-center justify-center text-3xl mx-auto mb-4">
                  ✅
                </div>
                <h3 className="font-display font-bold text-xl text-[#2ecc71] mb-2">Terima Kasih!</h3>
                <p className="text-sm text-slate-600 dark:text-white/60 font-sans">
                  Masukan Anda telah berhasil dikirim. Kami akan meninjaunya dengan saksama.
                </p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-gray-100 dark:bg-white/5 text-slate-700 dark:text-white text-sm font-medium hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                >
                  Kirim Masukan Lainnya
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Category Dropdown */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-white/40 mb-2 font-sans transition-colors duration-300">
                    Kategori Masukan
                  </label>
                  <div className="relative">
                    <select
                      {...register('category')}
                      className="w-full appearance-none bg-gray-50 dark:bg-[#1a1a26] border border-gray-200 dark:border-white/10 rounded-xl px-5 py-4 text-slate-900 dark:text-white text-base font-sans outline-none focus:border-[#e8ff47] focus:ring-1 focus:ring-[#e8ff47]/50 transition-colors cursor-pointer"
                    >
                      <option value="">Pilih kategori...</option>
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 dark:text-white/40">
                      <ChevronDown size={20} />
                    </div>
                  </div>
                  {errors.category && <p className="text-[#e74c3c] text-xs mt-1.5 font-sans">{errors.category.message}</p>}
                </div>

                {/* Detail Textarea */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-white/40 mb-2 font-sans transition-colors duration-300">
                    Detail Masukan
                  </label>
                  <textarea
                    {...register('message')}
                    rows={6}
                    placeholder="Ceritakan pengalaman atau saran Anda..."
                    className="w-full bg-gray-50 dark:bg-[#1a1a26] border border-gray-200 dark:border-white/10 rounded-xl px-5 py-4 text-slate-900 dark:text-white text-base font-sans leading-relaxed outline-none focus:border-[#e8ff47] focus:ring-1 focus:ring-[#e8ff47]/50 transition-colors resize-y min-h-[160px] placeholder-gray-400 dark:placeholder-white/30"
                  />
                  {errors.message && <p className="text-[#e74c3c] text-xs mt-1.5 font-sans">{errors.message.message}</p>}
                </div>

                {/* Optional Email */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-white/40 mb-2 font-sans transition-colors duration-300">
                    Email <span className="normal-case tracking-normal opacity-70 font-normal">(Opsional)</span>
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="nama@email.com"
                    className="w-full bg-gray-50 dark:bg-[#1a1a26] border border-gray-200 dark:border-white/10 rounded-xl px-5 py-4 text-slate-900 dark:text-white text-base font-sans outline-none focus:border-[#e8ff47] focus:ring-1 focus:ring-[#e8ff47]/50 transition-colors placeholder-gray-400 dark:placeholder-white/30"
                  />
                  <p className="text-xs text-gray-400 dark:text-white/30 mt-2 font-sans">
                    Hanya digunakan untuk tindak lanjut jika diperlukan.
                  </p>
                  {errors.email && <p className="text-[#e74c3c] text-xs mt-1.5 font-sans">{errors.email.message}</p>}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-display font-bold text-base transition-all duration-200 ${
                      isSubmitting 
                        ? 'bg-[#e8ff47]/50 text-[#0a0a0f]/50 cursor-not-allowed' 
                        : 'bg-[#e8ff47] text-[#0a0a0f] hover:bg-[#d4eb33] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(232,255,71,0.2)]'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-5 h-5 rounded-full border-2 border-[#0a0a0f]/30 border-t-[#0a0a0f] animate-spin" />
                        Mengirim...
                      </>
                    ) : 'Kirim Masukan'}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>

        {/* Right Column - Info Cards */}
        <div className="lg:col-span-4 flex flex-col gap-6" data-aos="fade-up" data-aos-delay="100">
          
          {/* Community Impact Card */}
          <div className="relative rounded-3xl overflow-hidden shadow-lg border border-gray-200 dark:border-white/10 group">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
              <img 
                src="/images/community_impact.png" 
                alt="Community Impact" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-[#0a0a0f]/30" />
            </div>

            <div className="relative p-8 h-full flex flex-col justify-end min-h-[380px]">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-2xl mb-auto border border-white/10">
                🛡️
              </div>
              
              <div className="mt-8">
                <h2 className="font-display font-bold text-2xl text-white mb-2">
                  Dampak Komunitas
                </h2>
                <p className="text-sm text-white/70 font-sans leading-relaxed mb-6 italic">
                  "Berkat masukan pengguna, kami dapat mendeteksi modus penipuan baru dalam hitungan jam."
                </p>
                
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#e8ff47]" />
                  <div className="font-display font-black text-4xl text-[#e8ff47] tracking-tight mb-1">
                    1.200+
                  </div>
                  <div className="text-xs text-white/60 font-sans font-medium">
                    Saran pengguna telah membantu akurasi deteksi phishing.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Issue Card */}
          <div className="bg-white dark:bg-[#12121a] border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-sm dark:shadow-none transition-colors duration-300">
            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-3 transition-colors duration-300">
              Ada Kendala Teknis?
            </h3>
            <p className="text-sm text-slate-500 dark:text-white/60 font-sans leading-relaxed mb-6 transition-colors duration-300">
              Jika Anda mengalami masalah teknis saat menggunakan aplikasi, silakan kunjungi Pusat Bantuan kami atau hubungi tim support.
            </p>
            <a 
              href="mailto:support@safemessage.id"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl border-2 border-gray-200 dark:border-white/20 text-slate-700 dark:text-white font-medium text-sm font-sans hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-200 group"
            >
              Hubungi Support
              <ExternalLink size={16} className="text-gray-400 group-hover:text-gray-600 dark:text-white/40 dark:group-hover:text-white/80 transition-colors" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
