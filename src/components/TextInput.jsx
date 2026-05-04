const MIN_LENGTH = 10

function TextInput({ value, onChange, onSubmit, loading }) {
  const trimmed = value.trim()
  const tooShort = trimmed.length > 0 && trimmed.length < MIN_LENGTH
  const isDisabled = loading || trimmed.length < MIN_LENGTH

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Teks Pesan SMS
      </h2>

      <textarea
        className={`w-full h-44 p-4 text-lg border-2 rounded-xl resize-none focus:outline-none transition-colors text-gray-700 placeholder-gray-400 ${
          tooShort
            ? 'border-orange-400 focus:border-orange-500'
            : 'border-gray-200 focus:border-blue-500'
        }`}
        placeholder="Paste atau ketik isi pesan SMS di sini..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <div className="flex items-center justify-between mt-2 mb-4">
        <p className="text-sm text-gray-400">
          💡 Tips: sertakan seluruh isi pesan termasuk nomor pengirim jika ada
        </p>
        <span className={`text-sm font-medium ${tooShort ? 'text-orange-500' : 'text-gray-400'}`}>
          {trimmed.length} karakter
          {tooShort && ` (min. ${MIN_LENGTH})`}
        </span>
      </div>

      <button
        onClick={onSubmit}
        disabled={isDisabled}
        className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-xl font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Menganalisis...
          </>
        ) : (
          <>Periksa Pesan →</>
        )}
      </button>
    </div>
  )
}

export default TextInput
