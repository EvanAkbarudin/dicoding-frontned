function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-10 transition-colors">
      <div className="max-w-3xl mx-auto px-4 py-6 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          © 2026 <span className="font-semibold text-blue-600 dark:text-blue-400">Safe Message</span> — Melindungi pengguna Indonesia dari penipuan SMS
        </p>
        <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
          Dibangun dengan TensorFlow · FastAPI · React
        </p>
      </div>
    </footer>
  )
}

export default Footer
