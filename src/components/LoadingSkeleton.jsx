function LoadingSkeleton() {
  return (
    <div className="mt-6 relative rounded-2xl border border-white/10 bg-[#12121a] p-8 overflow-hidden animate-pulse">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#e8ff47]/20 to-transparent" />

      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-white/5 shrink-0" />
        <div className="flex-1">
          <div className="h-6 bg-white/5 rounded-lg w-3/4 mb-2.5" />
          <div className="h-3.5 bg-white/4 rounded-lg w-1/2" />
        </div>
      </div>

      {/* Badge */}
      <div className="h-8 bg-white/5 rounded-full w-32 mb-6" />

      {/* Divider */}
      <div className="h-px bg-white/5 mb-6" />

      {/* Reason label */}
      <div className="h-3 bg-white/5 rounded w-32 mb-3" />

      {/* Reason box */}
      <div className="bg-[#1a1a26] border border-white/5 rounded-xl p-4 space-y-2.5">
        <div className="h-3.5 bg-white/5 rounded w-full" />
        <div className="h-3.5 bg-white/5 rounded w-5/6" />
        <div className="h-3.5 bg-white/5 rounded w-4/6" />
      </div>

      {/* Bottom bar */}
      <div className="mt-6 h-11 bg-white/4 rounded-xl" />
    </div>
  );
}

export default LoadingSkeleton;
