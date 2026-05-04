import { NavLink } from 'react-router-dom'

function Navbar() {
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-base font-medium transition-colors ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
    }`

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">🛡️</span>
          <span className="text-xl font-bold text-blue-700">Safe Message</span>
        </div>

        {/* Menu */}
        <div className="flex gap-2">
          <NavLink to="/" end className={linkClass}>
            Cek SMS
          </NavLink>
          <NavLink to="/history" className={linkClass}>
            Riwayat
          </NavLink>
          <NavLink to="/statistics" className={linkClass}>
            Statistik
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
