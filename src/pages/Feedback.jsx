import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ChevronDown, ExternalLink } from "lucide-react";
import api from "../lib/axios";

const feedbackSchema = z.object({
  category: z.string().min(1, "Pilih kategori masukan"),
  message: z.string().min(10, "Detail masukan minimal 10 karakter"),
  email: z.string().email("Email tidak valid").optional().or(z.literal("")),
});

const CATEGORIES = ["Saran Fitur", "Bug / Error", "Kendala Penggunaan", "Kritik Tampilan", "Permintaan Fitur Baru", "Laporan Phishing", "Pengalaman Pengguna", "Keamanan Aplikasi", "Performa Aplikasi", "Lainnya"];

export default function Feedback() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(feedbackSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await api.post("/api/v1/feedbacks", data);
      if (response.data?.status === "success") {
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
      }
    } catch (err) {
      console.error("Failed to submit feedback:", err);
      alert(err.response?.data?.error || "Gagal mengirimkan masukan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const primaryLight = "bg-[#b8a800] text-white hover:bg-[#a89500]";
  const primaryDark = "dark:bg-[#e8ff47] dark:text-black dark:hover:bg-[#d4eb33]";

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* LEFT */}
        <div className="lg:col-span-8">
          <div className="bg-white dark:bg-[#12121a] border border-gray-200 dark:border-white/10 rounded-3xl p-8 lg:p-10">
            {/* Header */}
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 border border-gray-200 dark:border-white/20 text-slate-500 dark:text-white/50 text-[10px] font-semibold uppercase tracking-[0.15em] px-4 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b8a800] dark:bg-[#e8ff47]" />
                Suara Pengguna
              </div>

              <h1 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 dark:text-white mb-4">Beri Masukan Anda</h1>

              <p className="text-base text-slate-500 dark:text-white/60 leading-relaxed max-w-2xl">Masukan Anda sangat berharga bagi kami.</p>
            </div>

            {/* SUCCESS */}
            {isSuccess ? (
              <div className="bg-[#2ecc71]/10 border border-[#2ecc71]/20 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-[#2ecc71]/20 flex items-center justify-center mx-auto mb-4">✅</div>
                <h3 className="font-bold text-xl text-[#2ecc71] mb-2">Terima Kasih!</h3>
                <p className="text-sm text-slate-600 dark:text-white/60">Masukan berhasil dikirim.</p>
                <button onClick={() => setIsSuccess(false)} className="mt-6 px-6 py-2.5 rounded-xl bg-gray-100 dark:bg-white/5 text-sm">
                  Kirim Lagi
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* CATEGORY */}
                <div>
                  <label className="text-xs font-semibold uppercase text-slate-500 dark:text-white/40 mb-2 block">Kategori Masukan</label>

                  <div className="relative">
                    <select
                      {...register("category")}
                      className="w-full appearance-none bg-gray-50 dark:bg-[#1a1a26] border border-gray-200 dark:border-white/10 rounded-xl px-5 py-4 text-slate-900 dark:text-white focus:ring-1 focus:ring-[#b8a800]/30 dark:focus:ring-[#e8ff47]/30 outline-none"
                    >
                      <option value="">Pilih kategori...</option>
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>

                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/40" />
                  </div>

                  {errors.category && <p className="text-[#e74c3c] text-xs mt-1">{errors.category.message}</p>}
                </div>

                {/* MESSAGE */}
                <div>
                  <label className="text-xs font-semibold uppercase text-slate-500 dark:text-white/40 mb-2 block">Detail Masukan</label>

                  <textarea
                    {...register("message")}
                    rows={6}
                    className="w-full bg-gray-50 dark:bg-[#1a1a26] border border-gray-200 dark:border-white/10 rounded-xl px-5 py-4 text-slate-900 dark:text-white outline-none focus:ring-1 focus:ring-[#b8a800]/30 dark:focus:ring-[#e8ff47]/30"
                  />

                  {errors.message && <p className="text-[#e74c3c] text-xs mt-1">{errors.message.message}</p>}
                </div>

                {/* EMAIL */}
                <div>
                  <label className="text-xs font-semibold uppercase text-slate-500 dark:text-white/40 mb-2 block">Email (Opsional)</label>

                  <input
                    type="email"
                    {...register("email")}
                    className="w-full bg-gray-50 dark:bg-[#1a1a26] border border-gray-200 dark:border-white/10 rounded-xl px-5 py-4 text-slate-900 dark:text-white outline-none focus:ring-1 focus:ring-[#b8a800]/30 dark:focus:ring-[#e8ff47]/30"
                  />
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all
                    ${isSubmitting ? "bg-[#b8a800]/50 dark:bg-[#e8ff47]/40 text-white dark:text-black cursor-not-allowed" : `${primaryLight} ${primaryDark}`}`}
                >
                  {isSubmitting ? "Mengirim..." : "Kirim Masukan"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10">
            <div className="p-8 bg-linear-to-b from-black/80 to-black/40">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-6">🛡️</div>

              <h2 className="text-white font-bold text-xl mb-2">Dampak Komunitas</h2>
              <p className="text-white/70 text-sm mb-6 italic">"Masukan pengguna membantu deteksi lebih cepat"</p>

              <div className="text-[#e8ff47] font-bold text-3xl">1.200+</div>
              <div className="text-white/60 text-xs">Saran pengguna terkumpul</div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#12121a] border border-gray-200 dark:border-white/10 rounded-3xl p-8">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Ada Kendala?</h3>

            <p className="text-sm text-slate-500 dark:text-white/60 mb-6">Hubungi support jika ada masalah.</p>

            <a
              href="mailto:evanakbarudin088@gmail.com?cc=rasenkurniawan@gmail.com,rantinthp@gmail.com,feyzahasna@gmail.com,noviadchy879@gmail.com,hafiudinbagir@gmail.com"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 dark:border-white/10 text-slate-700 dark:text-white"
            >
              Hubungi Support <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
