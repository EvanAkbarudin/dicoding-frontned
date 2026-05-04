function ResultCard({ result, onReset }) {
  if (!result) return null

  const isPhishing = result.status === 'phishing'

  return (
    <div
      className={`mt-6 rounded-2xl border-2 p-6 shadow-sm ${
        isPhishing ? 'bg-red-50 border-red-300' : 'bg-green-50 border-green-300'
      }`}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-5">
        <span className="text-5xl">{isPhishing ? '🚨' : '✅'}</span>
        <div>
          <h3 className={`text-2xl font-bold ${isPhishing ? 'text-red-700' : 'text-green-700'}`}>
            {isPhishing ? 'Pesan Mencurigakan!' : 'Pesan Terlihat Aman'}
          </h3>
          <p className="text-gray-600 text-base mt-1">
            {isPhishing
              ? 'Pesan ini terdeteksi mengandung pola penipuan'
              : 'Tidak terdeteksi pola penipuan yang signifikan'}
          </p>
        </div>
      </div>

      {/* Status badge */}
      <div
        className={`inline-block px-4 py-2 rounded-full text-base font-semibold mb-5 ${
          isPhishing ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'
        }`}
      >
        Status: {isPhishing ? '⚠️ BERBAHAYA' : '✅ AMAN'}
      </div>

      <hr className={`mb-5 ${isPhishing ? 'border-red-200' : 'border-green-200'}`} />

      {/* Reason */}
      <div>
        <h4 className="text-lg font-semibold text-gray-700 mb-2">🤖 Penjelasan dari AI</h4>
        <p className="text-gray-700 text-base leading-relaxed bg-white rounded-xl p-4 border border-gray-200">
          {result.reason}
        </p>
      </div>

      {/* Tips phishing */}
      {isPhishing && (
        <div className="mt-5 bg-red-100 rounded-xl p-4">
          <h4 className="text-base font-semibold text-red-800 mb-2">⚠️ Yang harus dilakukan:</h4>
          <ul className="list-disc list-inside text-red-700 text-base space-y-1">
            <li>Jangan klik link apapun dalam pesan ini</li>
            <li>Jangan berikan data pribadi atau kode OTP</li>
            <li>Jangan transfer uang dengan alasan apapun</li>
            <li>Laporkan ke pihak berwenang jika perlu</li>
          </ul>
        </div>
      )}

      {/* Tombol cek lagi */}
      <button
        onClick={onReset}
        className="mt-6 w-full py-3 border-2 border-blue-500 text-blue-600 hover:bg-blue-50 text-lg font-semibold rounded-xl transition-colors"
      >
        🔄 Cek Pesan Lain
      </button>
    </div>
  )
}

export default ResultCard
