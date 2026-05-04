import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-20 text-center">
      <div className="text-8xl mb-6">🔍</div>
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-3">Halaman Tidak Ditemukan</h1>
      <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
        Halaman yang kamu cari tidak ada atau sudah dipindahkan.
      </p>
      <Link
        to="/"
        className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-lg font-semibold rounded-xl transition-colors"
      >
        🏠 Kembali ke Beranda
      </Link>
    </main>
  )
}

export default NotFound
