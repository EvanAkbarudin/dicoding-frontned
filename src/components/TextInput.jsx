function TextInput({ value, onChange, onSubmit, loading }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Teks Pesan SMS
      </h2>

      <textarea
        className="w-full h-44 p-4 text-lg border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:border-blue-500 transition-colors text-gray-700 placeholder-gray-400"
        placeholder="Paste atau ketik isi pesan SMS di sini..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <p className="text-sm text-gray-400 mt-2 mb-4">
        💡 Tips: sertakan seluruh isi pesan termasuk nomor pengirim jika ada
      </p>

      <button
        onClick={onSubmit}
        disabled={loading || !value.trim()}
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
