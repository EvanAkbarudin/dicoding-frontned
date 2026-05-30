import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "../context/AuthContext";
import { X, Eye, EyeOff } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

const registerSchema = z
  .object({
    name: z.string().min(2, "Nama minimal 2 karakter"),
    email: z.string().email("Email tidak valid"),
    password: z.string().min(6, "Password minimal 6 karakter"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak sama",
    path: ["confirmPassword"],
  });

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login, registerUser, loginWithGoogle } = useAuth();

  const [isLoginView, setIsLoginView] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLogin,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: registerSignup,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
    reset: resetSignup,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const handleGoogleCredentialResponse = async (response) => {
    setGeneralError("");
    setLoading(true);
    try {
      await loginWithGoogle(response.credential);
    } catch (err) {
      setGeneralError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthModalOpen) {
      const timer = setTimeout(() => {
        if (window.google && document.getElementById("google-signin-btn")) {
          try {
            const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;

            window.google.accounts.id.initialize({
              client_id,
              callback: handleGoogleCredentialResponse,
            });

            window.google.accounts.id.renderButton(document.getElementById("google-signin-btn"), {
              theme: "outline",
              size: "large",
              width: 382,
              text: "continue_with",
              shape: "rectangular",
            });

            window.google.accounts.id.prompt();
          } catch (err) {
            console.error("Google Sign-In initialization failed:", err);
          }
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const onLogin = async (data) => {
    setGeneralError("");
    setLoading(true);
    try {
      await login(data.email, data.password);
    } catch (err) {
      setGeneralError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onRegister = async (data) => {
    setGeneralError("");
    setLoading(true);
    try {
      await registerUser(data.name, data.email, data.password);
    } catch (err) {
      setGeneralError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const switchView = () => {
    setIsLoginView(!isLoginView);
    setGeneralError("");
    resetLogin();
    resetSignup();
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md bg-white dark:bg-[#12121a] border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden transition-colors duration-300">
        <button onClick={closeAuthModal} className="absolute top-4 right-4 text-gray-500 dark:text-white/40 hover:text-gray-800 dark:hover:text-white/80 transition-colors" disabled={loading}>
          <X size={20} />
        </button>

        <div className="p-8">
          <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mb-2">{isLoginView ? "Selamat Datang" : "Buat Akun"}</h2>

          <p className="text-sm text-slate-500 dark:text-white/50 font-sans mb-6">{isLoginView ? "Masuk untuk menyimpan riwayat pengecekan Anda." : "Daftar untuk mendapatkan akses penuh."}</p>

          {generalError && (
            <div className="mb-4 px-4 py-2.5 rounded-lg bg-[#e74c3c]/10 border border-[#e74c3c]/20 flex items-center gap-2">
              <span className="text-[#e74c3c] text-sm">⚠️</span>
              <p className="text-[#e74c3c] text-xs font-sans font-semibold">{generalError}</p>
            </div>
          )}

          <form onSubmit={isLoginView ? handleLoginSubmit(onLogin) : handleSignupSubmit(onRegister)} className="space-y-4">
            {!isLoginView && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-white/40 mb-1.5">Nama Lengkap</label>
                <input
                  type="text"
                  {...registerSignup("name")}
                  disabled={loading}
                  className="w-full bg-gray-50 dark:bg-[#1a1a26] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white text-sm outline-none focus:border-[#b8a800] focus:ring-1 focus:ring-[#b8a800]/30 transition-colors"
                  placeholder="John Doe"
                />
                {signupErrors.name && <p className="text-[#e74c3c] text-xs mt-1">{signupErrors.name.message}</p>}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-white/40 mb-1.5">Email</label>
              <input
                type="email"
                {...(isLoginView ? registerLogin("email") : registerSignup("email"))}
                disabled={loading}
                className="w-full bg-gray-50 dark:bg-[#1a1a26] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white text-sm outline-none focus:border-[#b8a800] focus:ring-1 focus:ring-[#b8a800]/30 transition-colors"
                placeholder="nama@email.com"
              />
              {(isLoginView ? loginErrors.email : signupErrors.email) && <p className="text-[#e74c3c] text-xs mt-1">{(isLoginView ? loginErrors.email : signupErrors.email).message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-white/40 mb-1.5">Password</label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...(isLoginView ? registerLogin("password") : registerSignup("password"))}
                  disabled={loading}
                  className="w-full bg-gray-50 dark:bg-[#1a1a26] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 pr-10 text-slate-900 dark:text-white text-sm outline-none focus:border-[#b8a800] focus:ring-1 focus:ring-[#b8a800]/30 transition-colors"
                  placeholder="••••••••"
                />

                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-white/40">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {(isLoginView ? loginErrors.password : signupErrors.password) && <p className="text-[#e74c3c] text-xs mt-1">{(isLoginView ? loginErrors.password : signupErrors.password).message}</p>}
            </div>

            {!isLoginView && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-white/40 mb-1.5">Konfirmasi Password</label>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    {...registerSignup("confirmPassword")}
                    disabled={loading}
                    className="w-full bg-gray-50 dark:bg-[#1a1a26] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 pr-10 text-slate-900 dark:text-white text-sm outline-none focus:border-[#b8a800] focus:ring-1 focus:ring-[#b8a800]/30 transition-colors"
                    placeholder="••••••••"
                  />

                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-white/40">
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {signupErrors.confirmPassword && <p className="text-[#e74c3c] text-xs mt-1">{signupErrors.confirmPassword.message}</p>}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full font-bold font-display py-3.5 rounded-xl mt-4 flex items-center justify-center gap-2 text-white dark:text-black transition-colors
              ${loading ? "bg-[#b8a800]" : "dark:bg-[#e8ff47] hover:bg-[#a89500] dark:hover:bg-[#e8ff47]"}`}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Memproses...
                </>
              ) : isLoginView ? (
                "Masuk"
              ) : (
                "Daftar"
              )}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px bg-gray-200 dark:bg-white/10 flex-1" />
            <span className="text-xs text-slate-400 dark:text-white/40 uppercase">Atau</span>
            <div className="h-px bg-gray-200 dark:bg-white/10 flex-1" />
          </div>

          <div className="w-full flex justify-center min-h-11.5 mt-4">
            <div id="google-signin-btn" className="w-full flex justify-center" />
          </div>

          <p className="text-center text-xs text-slate-500 dark:text-white/50 mt-6">
            {isLoginView ? "Belum punya akun?" : "Sudah punya akun?"}
            <button type="button" onClick={switchView} disabled={loading} className="ml-1 text-[#b8a800] dark:text-[#e8ff47] hover:underline font-semibold">
              {isLoginView ? "Daftar sekarang" : "Masuk di sini"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
