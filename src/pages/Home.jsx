import { useState } from 'react'
import axios from 'axios'
import TextInput from '../components/TextInput'
import ResultCard from '../components/ResultCard'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

function Home() {
  const [message, setMessage] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleCheck = async () => {
    if (!message.trim()) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await axios.post(`${API_URL}/api/check-message`, {
        message: message.trim(),
      })

      const data = response.data

      // Simpan ke localStorage
      const history = JSON.parse(localStorage.getItem('sms_history') || '[]')
      const newEntry = {
        id: Date.now(),
        message: message.trim().slice(0, 100),
        status: data.status,
        reason: data.reason,
        date: new Date().toISOString(),
      }
      history.unshift(newEntry)
      // Simpan max 50 riwayat
      localStorage.setItem('sms_history', JSON.stringify(history.slice(0, 50)))

      setResult(data)
    } catch (err) {
      setError('Gagal menghubungi server. Pastikan backend sudah berjalan.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      {/* Hero */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-medium px-4 py-2 rounded-full mb-4">
          🤖 Didukung AI · Deteksi Real-time
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4 leading-tight">
          Jangan sampai<br />
          <span className="text-blue-600">tertipu pesan palsu.</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          Paste isi pesan SMS yang kamu terima, dan sistem kami akan menganalisis
          apakah pesan tersebut aman atau mencurigakan dalam hitungan detik.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { value: '89%', label: 'Akurasi deteksi' },
          { value: '17K+', label: 'Data training' },
          { value: '<2s', label: 'Waktu analisis' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 text-center"
          >
            <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Input */}
      <TextInput
        value={message}
        onChange={setMessage}
        onSubmit={handleCheck}
        loading={loading}
      />

      {/* Error */}
      {error && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-300 rounded-xl text-yellow-800 text-base">
          ⚠️ {error}
        </div>
      )}

      {/* Result */}
      <ResultCard result={result} />
    </main>
  )
}

export default Home
