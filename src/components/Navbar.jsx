import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { LogOut, Users, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const { user, openAuthModal, logout, login } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { path: "/", label: "Cek SMS" },
    { path: "/history", label: "Riwayat" },
    { path: "/statistics", label: "Statistik" },
    { path: "/education", label: "Edukasi" },
    { path: "/feedback", label: "Feedback" },
  ];

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-10 py-4 border-b border-white/10 dark:border-gray-800 bg-white dark:bg-[#0a0a0f] dark:bg-opacity-85 dark:backdrop-blur-xl transition-colors duration-300">
      {/* Logo */}
      <div className="flex items-center gap-2 font-display font-extrabold text-lg sm:text-xl tracking-tight text-[#0a0a0f] dark:text-white cursor-pointer" onClick={() => navigate("/")}>
        <span className="w-2.5 h-2.5 rounded-full bg-[#e8ff47] animate-pulse" />
        <span className="hidden sm:inline">Safe Massage</span>
        <span className="sm:hidden">SM</span>
      </div>

      {/* Desktop Links */}
      <ul className="hidden lg:flex items-center gap-6 xl:gap-8 list-none">
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

      {/* Right side: Theme Toggle & CTA/Profile */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Theme Toggle Switch */}
        <button
          onClick={toggleTheme}
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className={`relative flex items-center w-14 h-7 rounded-full border transition-all duration-300 focus:outline-none
            ${isDark ? "bg-[#1a1a2e] border-white/20" : "bg-gray-100 border-gray-300"}`}
        >
          <span className="absolute left-1.5 text-xs select-none">☀️</span>
          <span className="absolute right-1.5 text-xs select-none">🌙</span>
          <span
            className={`absolute top-0.5 w-6 h-6 rounded-full shadow-md transition-all duration-300 flex items-center justify-center
              ${isDark ? "translate-x-7 bg-[#e8ff47]" : "translate-x-0.5 bg-white border border-gray-200"}`}
          />
        </button>

        {user ? (
          <div className="relative hidden sm:block">
            <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 transition-colors">
              <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold uppercase">{user.name.charAt(0)}</div>
              <span className="text-sm font-medium text-slate-800 dark:text-white font-sans max-w-20 truncate hidden md:inline">{user.name}</span>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1a1a26] border border-gray-200 dark:border-white/10 rounded-xl shadow-lg py-1 z-50 transition-colors duration-300">
                <div className="px-4 py-2 border-b border-gray-100 dark:border-white/10 mb-1">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{user.name}</p>
                  <p className="text-xs text-slate-500 dark:text-white/50 truncate">{user.email}</p>
                </div>
                <button
                  onClick={() => {
                    login({ name: "Switch User", email: "other@example.com" });
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
            className="hidden sm:flex px-4 sm:px-5 py-2 rounded-lg bg-[#e8ff47] text-[#0a0a0f] text-sm font-medium font-sans
                       transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0"
          >
            Mulai Gratis
          </button>
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-[#0a0a0f] border-b border-gray-200 dark:border-white/10 lg:hidden shadow-lg">
          <ul className="flex flex-col py-4 px-4 gap-2">
            {links.map((l) => (
              <li key={l.path}>
                <button
                  onClick={() => {
                    navigate(l.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-sans transition-colors duration-200
                    ${location.pathname === l.path 
                      ? "bg-[#e8ff47]/10 text-[#0a0a0f] dark:text-white font-medium" 
                      : "text-gray-600 dark:text-white/60 hover:bg-gray-50 dark:hover:bg-white/5"}`}
                >
                  {l.label}
                </button>
              </li>
            ))}
            {!user && (
              <li className="mt-2 pt-2 border-t border-gray-200 dark:border-white/10">
                <button
                  onClick={() => {
                    openAuthModal();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 rounded-lg bg-[#e8ff47] text-[#0a0a0f] text-sm font-medium font-sans text-center"
                >
                  Mulai Gratis
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
