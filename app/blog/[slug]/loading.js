export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Header Skeleton */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 h-4 w-32 animate-pulse-soft rounded bg-white/20" />
          <div className="mb-6 h-16 w-full animate-pulse-soft rounded-lg bg-white/20" />
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 animate-pulse-soft rounded-full bg-white/20" />
            <div className="flex-1">
              <div className="mb-2 h-5 w-32 animate-pulse-soft rounded bg-white/20" />
              <div className="h-4 w-48 animate-pulse-soft rounded bg-white/10" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent" />
      </div>

      {/* Content Skeleton */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-2xl bg-white p-8 shadow-xl sm:p-12">
          <div className="space-y-4">
            <div className="h-4 w-full animate-pulse-soft rounded bg-gray-200" />
            <div className="h-4 w-full animate-pulse-soft rounded bg-gray-200" />
            <div className="h-4 w-5/6 animate-pulse-soft rounded bg-gray-200" />
            <div className="h-4 w-full animate-pulse-soft rounded bg-gray-200" />
            <div className="h-4 w-4/5 animate-pulse-soft rounded bg-gray-200" />
          </div>
        </div>

        <div className="mb-8">
          <div className="h-12 w-32 animate-pulse-soft rounded-xl bg-white shadow-lg" />
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-6 h-8 w-48 animate-pulse-soft rounded bg-gray-200" />
          <div className="mb-8 h-32 w-full animate-pulse-soft rounded-xl bg-gray-100" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl border border-gray-200 p-5">
                <div className="mb-3 flex items-center gap-3">
                  <div className="h-10 w-10 animate-pulse-soft rounded-full bg-gray-200" />
                  <div className="flex-1">
                    <div className="mb-2 h-4 w-24 animate-pulse-soft rounded bg-gray-200" />
                    <div className="h-3 w-16 animate-pulse-soft rounded bg-gray-200" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full animate-pulse-soft rounded bg-gray-200" />
                  <div className="h-4 w-3/4 animate-pulse-soft rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
