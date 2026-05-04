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
import { useTheme } from '../context/ThemeContext'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

function Statistics() {
  const { isDark } = useTheme()
  const [stats, setStats] = useState({ total: 0, safe: 0, phishing: 0 })
  const [weeklyData, setWeeklyData] = useState({ safe: [], phishing: [], labels: [] })

  useEffect(() => {
    const loadStats = () => {
      try {
        const historyData = localStorage.getItem('sms_history')
        const history = historyData ? JSON.parse(historyData) : []
        
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
      } catch (error) {
        console.error('Error loading statistics:', error)
        setStats({ total: 0, safe: 0, phishing: 0 })
        setWeeklyData({ safe: [], phishing: [], labels: [] })
      }
    }

    loadStats()

    window.addEventListener('focus', loadStats)
    return () => window.removeEventListener('focus', loadStats)
  }, [])

  // Dynamic colors based on theme
  const textColor = isDark ? '#d1d5db' : '#374151'
  const gridColor = isDark ? '#374151' : '#e5e7eb'

  const doughnutData = {
    labels: ['Aman', 'Berbahaya'],
    datasets: [
      {
        data: [stats.safe, stats.phishing],
        backgroundColor: ['#22c55e', '#ef4444'],
        borderColor: isDark ? '#1f2937' : '#ffffff',
        borderWidth: 2,
      },
    ],
  }

  const doughnutOptions = {
    plugins: {
      legend: {
        labels: {
          color: textColor,
          font: { size: 14 },
        },
      },
    },
  }

  const barData = {
    labels: weeklyData.labels,
    datasets: [
      {
        label: 'Aman',
        data: weeklyData.safe,
        backgroundColor: isDark ? '#4ade80' : '#86efac',
        borderColor: '#22c55e',
        borderWidth: 1,
        borderRadius: 6,
      },
      {
        label: 'Berbahaya',
        data: weeklyData.phishing,
        backgroundColor: isDark ? '#f87171' : '#fca5a5',
        borderColor: '#ef4444',
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  }

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: textColor,
          font: { size: 14 },
        },
      },
      title: { display: false },
    },
    scales: {
      x: {
        ticks: { color: textColor },
        grid: { color: gridColor },
      },
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1, color: textColor },
        grid: { color: gridColor },
      },
    },
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">📊 Statistik</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Ringkasan hasil pengecekan pesan kamu</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-5 text-center transition-colors">
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</div>
          <div className="text-base text-gray-500 dark:text-gray-400 mt-1">Total Dicek</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-green-200 dark:border-green-700 shadow-sm p-5 text-center transition-colors">
          <div className="text-4xl font-bold text-green-600 dark:text-green-400">{stats.safe}</div>
          <div className="text-base text-gray-500 dark:text-gray-400 mt-1">✅ Aman</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-red-200 dark:border-red-700 shadow-sm p-5 text-center transition-colors">
          <div className="text-4xl font-bold text-red-600 dark:text-red-400">{stats.phishing}</div>
          <div className="text-base text-gray-500 dark:text-gray-400 mt-1">🚨 Berbahaya</div>
        </div>
      </div>

      {stats.total === 0 ? (
        <div className="text-center py-20 text-gray-400 dark:text-gray-500">
          <div className="text-6xl mb-4">📈</div>
          <p className="text-xl">Belum ada data statistik</p>
          <p className="text-base mt-2">Mulai cek pesan SMS kamu di halaman utama</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 transition-colors">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
              Perbandingan Aman vs Berbahaya
            </h2>
            <div className="max-w-xs mx-auto">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 transition-colors">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
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
