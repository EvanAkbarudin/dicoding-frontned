function LoadingSkeleton() {
  return (
    <div className="mt-6 rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-sm animate-pulse">
      {/* Header */}
      <div className="flex items-start gap-4 mb-5">
        <div className="w-14 h-14 bg-gray-200 rounded-full flex-shrink-0" />
        <div className="flex-1">
          <div className="h-7 bg-gray-200 rounded-lg w-3/4 mb-2" />
          <div className="h-4 bg-gray-100 rounded-lg w-1/2" />
        </div>
      </div>

      {/* Badge */}
      <div className="h-9 bg-gray-200 rounded-full w-36 mb-5" />

      <hr className="mb-5 border-gray-200" />

      {/* Reason */}
      <div className="h-5 bg-gray-200 rounded w-40 mb-3" />
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-4/6" />
      </div>

      <div className="mt-6 h-12 bg-gray-100 rounded-xl" />
    </div>
  )
}

export default LoadingSkeleton
