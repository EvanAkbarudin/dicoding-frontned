import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { LogOut, User, Users } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const { user, openAuthModal, logout, login } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const links = [
    { path: "/", label: "Cek SMS" },
    { path: "/history", label: "Riwayat" },
    { path: "/statistics", label: "Statistik" },
    { path: "/education", label: "Edukasi" },
    { path: "/feedback", label: "Feedback" },
  ];

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-10 py-4 border-b border-white/10 dark:border-gray-800 bg-white dark:bg-[#0a0a0f] dark:bg-opacity-85 dark:backdrop-blur-xl transition-colors duration-300">
      {/* Logo */}
      <div className="flex items-center gap-2 font-display font-extrabold text-xl tracking-tight text-[#0a0a0f] dark:text-white cursor-pointer" onClick={() => navigate("/")}>
        <span className="w-2.5 h-2.5 rounded-full bg-[#e8ff47] animate-pulse" />
        Safe Massage
      </div>

      {/* Links */}
      <ul className="flex items-center gap-8 list-none">
        {links.map((l) => (
          <li key={l.path}>
            <button
              onClick={() => navigate(l.path)}
              className={`text-sm font-sans transition-colors duration-200 bg-transparent border-none cursor-pointer
                ${location.pathname === l.path ? "text-[#0a0a0f] dark:text-white font-medium" : "text-gray-600 dark:text-white/40 hover:text-gray-800 dark:hover:text-white/70 font-normal"}`}
            >
              {l.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Theme Toggle & CTA */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-lg border border-gray-300 dark:border-white/10 text-[#0a0a0f] dark:text-white
                     hover:bg-gray-100 dark:hover:bg-white/5 transition-colors duration-200"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm5.414 5.414a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707zM5 11a1 1 0 100-2H4a1 1 0 100 2h1z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        {user ? (
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold uppercase">
                {user.name.charAt(0)}
              </div>
              <span className="text-sm font-medium text-slate-800 dark:text-white font-sans max-w-[100px] truncate">{user.name}</span>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1a1a26] border border-gray-200 dark:border-white/10 rounded-xl shadow-lg py-1 z-50 transition-colors duration-300">
                <div className="px-4 py-2 border-b border-gray-100 dark:border-white/10 mb-1">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{user.name}</p>
                  <p className="text-xs text-slate-500 dark:text-white/50 truncate">{user.email}</p>
                </div>
                <button 
                  onClick={() => {
                    login({ name: 'Switch User', email: 'other@example.com' });
                    setIsProfileOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-white/70 hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2 transition-colors"
                >
                  <Users size={16} /> Switch Account
                </button>
                <button 
                  onClick={() => {
                    logout();
                    setIsProfileOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center gap-2 transition-colors"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={openAuthModal}
            className="px-5 py-2 rounded-lg bg-[#e8ff47] text-[#0a0a0f] text-sm font-medium font-sans
                       transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0"
          >
            Mulai Gratis
          </button>
        )}
      </div>
    </nav>
  );
}
