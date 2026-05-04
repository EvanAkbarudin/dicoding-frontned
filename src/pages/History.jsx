import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

function History() {
  const [history, setHistory] = useState([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('sms_history') || '[]')
    setHistory(data)
  }, [])

  const handleClearAll = () => {
    if (window.confirm('Hapus semua riwayat?')) {
      localStorage.removeItem('sms_history')
      setHistory([])
      toast.success('Semua riwayat dihapus')
    }
  }

  const handleDeleteOne = (id) => {
    const updated = history.filter((item) => item.id !== id)
    localStorage.setItem('sms_history', JSON.stringify(updated))
    setHistory(updated)
    toast.success('Riwayat dihapus')
  }

  const formatDate = (iso) => {
    const date = new Date(iso)
    return date.toLocaleString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">📋 Riwayat Pengecekan</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {history.length > 0 ? `${history.length} pesan pernah dicek` : 'Semua pesan yang pernah kamu cek'}
          </p>
        </div>
        {history.length > 0 && (
          <button
            onClick={handleClearAll}
            className="px-4 py-2 text-sm text-red-600 dark:text-red-400 border border-red-300 dark:border-red-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            Hapus Semua
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-20 text-gray-400 dark:text-gray-500">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-xl">Belum ada riwayat pengecekan</p>
          <p className="text-base mt-2">Cek pesan SMS kamu di halaman utama</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => {
            const isPhishing = item.status === 'phishing'
            return (
              <div
                key={item.id}
                className={`bg-white dark:bg-gray-800 rounded-2xl border-2 p-5 shadow-sm transition-colors ${
                  isPhishing ? 'border-red-200 dark:border-red-800' : 'border-green-200 dark:border-green-800'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <span className="text-2xl flex-shrink-0">
                      {isPhishing ? '🚨' : '✅'}
                    </span>
                    <div className="min-w-0">
                      <p className="text-gray-800 dark:text-gray-100 text-base font-medium truncate">
                        {item.message}{item.message.length >= 100 ? '...' : ''}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 line-clamp-2">
                        {item.reason}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{formatDate(item.date)}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        isPhishing 
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' 
                          : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      }`}
                    >
                      {isPhishing ? 'Berbahaya' : 'Aman'}
                    </span>
                    <button
                      onClick={() => handleDeleteOne(item.id)}
                      className="text-xs text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                      aria-label="Hapus riwayat ini"
                    >
                      🗑 Hapus
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}

export default History
