import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../context/AuthContext';
import { X, Eye, EyeOff } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak sama",
  path: ["confirmPassword"],
});

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login } = useAuth();
  const [isLoginView, setIsLoginView] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register: registerLogin, handleSubmit: handleLoginSubmit, formState: { errors: loginErrors }, reset: resetLogin } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { register: registerSignup, handleSubmit: handleSignupSubmit, formState: { errors: signupErrors }, reset: resetSignup } = useForm({
    resolver: zodResolver(registerSchema),
  });

  if (!isAuthModalOpen) return null;

  const onLogin = (data) => {
    login(data);
  };

  const onRegister = (data) => {
    login(data);
  };

  const switchView = () => {
    setIsLoginView(!isLoginView);
    resetLogin();
    resetSignup();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md bg-white dark:bg-[#12121a] border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden transition-colors duration-300">
        
        {/* Close Button */}
        <button 
          onClick={closeAuthModal}
          className="absolute top-4 right-4 text-gray-500 dark:text-white/40 hover:text-gray-800 dark:hover:text-white/80 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mb-2">
            {isLoginView ? 'Selamat Datang' : 'Buat Akun'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-white/50 font-sans mb-6">
            {isLoginView ? 'Masuk untuk menyimpan riwayat pengecekan Anda.' : 'Daftar untuk mendapatkan akses penuh.'}
          </p>

          <form onSubmit={isLoginView ? handleLoginSubmit(onLogin) : handleSignupSubmit(onRegister)} className="space-y-4">
            
            {!isLoginView && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-white/40 mb-1.5">Nama Lengkap</label>
                <input 
                  type="text" 
                  {...registerSignup('name')}
                  className="w-full bg-gray-50 dark:bg-[#1a1a26] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white text-sm outline-none focus:border-[#e8ff47] focus:ring-1 focus:ring-[#e8ff47]/50 transition-colors"
                  placeholder="John Doe"
                />
                {signupErrors.name && <p className="text-[#e74c3c] text-xs mt-1">{signupErrors.name.message}</p>}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-white/40 mb-1.5">Email</label>
              <input 
                type="email" 
                {...(isLoginView ? registerLogin('email') : registerSignup('email'))}
                className="w-full bg-gray-50 dark:bg-[#1a1a26] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white text-sm outline-none focus:border-[#e8ff47] focus:ring-1 focus:ring-[#e8ff47]/50 transition-colors"
                placeholder="nama@email.com"
              />
              {(isLoginView ? loginErrors.email : signupErrors.email) && (
                <p className="text-[#e74c3c] text-xs mt-1">{(isLoginView ? loginErrors.email : signupErrors.email).message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-white/40 mb-1.5">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  {...(isLoginView ? registerLogin('password') : registerSignup('password'))}
                  className="w-full bg-gray-50 dark:bg-[#1a1a26] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 pr-10 text-slate-900 dark:text-white text-sm outline-none focus:border-[#e8ff47] focus:ring-1 focus:ring-[#e8ff47]/50 transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-white/40 dark:hover:text-white/70 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {(isLoginView ? loginErrors.password : signupErrors.password) && (
                <p className="text-[#e74c3c] text-xs mt-1">{(isLoginView ? loginErrors.password : signupErrors.password).message}</p>
              )}
            </div>

            {!isLoginView && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-white/40 mb-1.5">Konfirmasi Password</label>
                <div className="relative">
                  <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    {...registerSignup('confirmPassword')}
                    className="w-full bg-gray-50 dark:bg-[#1a1a26] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 pr-10 text-slate-900 dark:text-white text-sm outline-none focus:border-[#e8ff47] focus:ring-1 focus:ring-[#e8ff47]/50 transition-colors"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-white/40 dark:hover:text-white/70 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {signupErrors.confirmPassword && <p className="text-[#e74c3c] text-xs mt-1">{signupErrors.confirmPassword.message}</p>}
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-[#e8ff47] hover:bg-[#d4eb33] text-[#0a0a0f] font-bold font-display py-3.5 rounded-xl mt-4 transition-colors"
            >
              {isLoginView ? 'Masuk' : 'Daftar'}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px bg-gray-200 dark:bg-white/10 flex-1"></div>
            <span className="text-xs text-slate-400 dark:text-white/40 font-sans uppercase">Atau</span>
            <div className="h-px bg-gray-200 dark:bg-white/10 flex-1"></div>
          </div>

          <button 
            type="button"
            onClick={() => login({ name: 'Google User', email: 'user@gmail.com' })}
            className="w-full bg-white dark:bg-[#1a1a26] border border-gray-200 dark:border-white/10 text-slate-700 dark:text-white hover:bg-gray-50 dark:hover:bg-[#20202e] font-medium text-sm py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
              </g>
            </svg>
            Lanjutkan dengan Google
          </button>

          <p className="text-center text-xs text-slate-500 dark:text-white/50 mt-6 font-sans transition-colors">
            {isLoginView ? 'Belum punya akun?' : 'Sudah punya akun?'}
            <button 
              type="button"
              onClick={switchView}
              className="ml-1 text-[#0088cc] dark:text-[#e8ff47] hover:underline font-semibold"
            >
              {isLoginView ? 'Daftar sekarang' : 'Masuk di sini'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
