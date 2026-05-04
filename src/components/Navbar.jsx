import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-base font-medium transition-colors ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
    }`

  const mobileLinkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-xl text-lg font-medium transition-colors ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
    }`

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">🛡️</span>
          <span className="text-xl font-bold text-blue-700">Safe Message</span>
        </div>

        {/* Desktop menu */}
        <div className="hidden sm:flex gap-2">
          <NavLink to="/" end className={linkClass}>Cek SMS</NavLink>
          <NavLink to="/history" className={linkClass}>Riwayat</NavLink>
          <NavLink to="/statistics" className={linkClass}>Statistik</NavLink>
        </div>

        {/* Hamburger button (mobile) */}
        <button
          className="sm:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Buka menu"
        >
          {menuOpen ? (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-1 border-t border-gray-100 pt-3">
          <NavLink to="/" end className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
            🔍 Cek SMS
          </NavLink>
          <NavLink to="/history" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
            📋 Riwayat
          </NavLink>
          <NavLink to="/statistics" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
            📊 Statistik
          </NavLink>
        </div>
      )}
    </nav>
  )
}

export default Navbar
