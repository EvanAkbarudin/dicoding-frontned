import { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js'
import { Doughnut, Bar } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

function Statistics() {
  const [stats, setStats] = useState({ total: 0, safe: 0, phishing: 0 })
  const [weeklyData, setWeeklyData] = useState({ safe: [], phishing: [], labels: [] })

  // Baca ulang setiap kali halaman di-focus (misal balik dari Home)
  useEffect(() => {
    const loadStats = () => {
      const history = JSON.parse(localStorage.getItem('sms_history') || '[]')
      const safe = history.filter((h) => h.status === 'safe').length
      const phishing = history.filter((h) => h.status === 'phishing').length
      setStats({ total: history.length, safe, phishing })

      const days = []
      const safePerDay = []
      const phishingPerDay = []

      for (let i = 6; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        const label = date.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric' })
        days.push(label)

        const dayStr = date.toDateString()
        const dayItems = history.filter((h) => new Date(h.date).toDateString() === dayStr)
        safePerDay.push(dayItems.filter((h) => h.status === 'safe').length)
        phishingPerDay.push(dayItems.filter((h) => h.status === 'phishing').length)
      }

      setWeeklyData({ labels: days, safe: safePerDay, phishing: phishingPerDay })
    }

    loadStats()

    // Refresh saat tab/window kembali aktif
    window.addEventListener('focus', loadStats)
    return () => window.removeEventListener('focus', loadStats)
  }, [])

  const doughnutData = {
    labels: ['Aman', 'Berbahaya'],
    datasets: [
      {
        data: [stats.safe, stats.phishing],
        backgroundColor: ['#22c55e', '#ef4444'],
        borderColor: ['#16a34a', '#dc2626'],
        borderWidth: 2,
      },
    ],
  }

  const barData = {
    labels: weeklyData.labels,
    datasets: [
      {
        label: 'Aman',
        data: weeklyData.safe,
        backgroundColor: '#86efac',
        borderColor: '#22c55e',
        borderWidth: 1,
        borderRadius: 6,
      },
      {
        label: 'Berbahaya',
        data: weeklyData.phishing,
        backgroundColor: '#fca5a5',
        borderColor: '#ef4444',
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  }

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: false },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
    },
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">📊 Statistik</h1>
        <p className="text-gray-500 mt-1">Ringkasan hasil pengecekan pesan kamu</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 text-center">
          <div className="text-4xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-base text-gray-500 mt-1">Total Dicek</div>
        </div>
        <div className="bg-white rounded-2xl border border-green-200 shadow-sm p-5 text-center">
          <div className="text-4xl font-bold text-green-600">{stats.safe}</div>
          <div className="text-base text-gray-500 mt-1">✅ Aman</div>
        </div>
        <div className="bg-white rounded-2xl border border-red-200 shadow-sm p-5 text-center">
          <div className="text-4xl font-bold text-red-600">{stats.phishing}</div>
          <div className="text-base text-gray-500 mt-1">🚨 Berbahaya</div>
        </div>
      </div>

      {stats.total === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <div className="text-6xl mb-4">📈</div>
          <p className="text-xl">Belum ada data statistik</p>
          <p className="text-base mt-2">Mulai cek pesan SMS kamu di halaman utama</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Perbandingan Aman vs Berbahaya
            </h2>
            <div className="max-w-xs mx-auto">
              <Doughnut data={doughnutData} />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Aktivitas 7 Hari Terakhir
            </h2>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      )}
    </main>
  )
}

export default Statistics
