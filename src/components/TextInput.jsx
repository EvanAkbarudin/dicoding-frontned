import PropTypes from 'prop-types'

const MIN_LENGTH = 10

function TextInput({ value, onChange, onSubmit, loading }) {
  const trimmed = value.trim()
  const tooShort = trimmed.length > 0 && trimmed.length < MIN_LENGTH
  const isDisabled = loading || trimmed.length < MIN_LENGTH

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Teks Pesan SMS
      </h2>

      <textarea
        className={`w-full h-44 p-4 text-lg border-2 rounded-xl resize-none focus:outline-none transition-colors placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 ${
          tooShort
            ? 'border-orange-400 dark:border-orange-500 focus:border-orange-500 dark:focus:border-orange-400'
            : 'border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400'
        }`}
        placeholder="Paste atau ketik isi pesan SMS di sini..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <div className="flex items-center justify-between mt-2 mb-4">
        <p className="text-sm text-gray-400 dark:text-gray-500">
          💡 Tips: sertakan seluruh isi pesan termasuk nomor pengirim jika ada
        </p>
        <span className={`text-sm font-medium ${tooShort ? 'text-orange-500 dark:text-orange-400' : 'text-gray-400 dark:text-gray-500'}`}>
          {trimmed.length} karakter
          {tooShort && ` (min. ${MIN_LENGTH})`}
        </span>
      </div>

      <button
        onClick={onSubmit}
        disabled={isDisabled}
        className="w-full py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white text-xl font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
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

TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default TextInput
