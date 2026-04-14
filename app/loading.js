export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section Skeleton */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto mb-6 h-16 w-3/4 animate-pulse-soft rounded-lg bg-white/20" />
            <div className="mx-auto mb-4 h-12 w-2/3 animate-pulse-soft rounded-lg bg-white/10" />
            <div className="mx-auto h-6 w-1/2 animate-pulse-soft rounded-lg bg-white/10" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent" />
      </div>

      {/* Posts Grid Skeleton */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl bg-white p-6 shadow-lg"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="h-6 w-16 animate-pulse-soft rounded-full bg-gray-200" />
                <div className="flex gap-3">
                  <div className="h-4 w-8 animate-pulse-soft rounded bg-gray-200" />
                  <div className="h-4 w-8 animate-pulse-soft rounded bg-gray-200" />
                </div>
              </div>
              <div className="mb-3 h-8 w-full animate-pulse-soft rounded bg-gray-200" />
              <div className="mb-2 h-4 w-full animate-pulse-soft rounded bg-gray-200" />
              <div className="mb-4 h-4 w-3/4 animate-pulse-soft rounded bg-gray-200" />
              <div className="flex items-center gap-3 border-t pt-4">
                <div className="h-10 w-10 animate-pulse-soft rounded-full bg-gray-200" />
                <div className="flex-1">
                  <div className="mb-2 h-4 w-24 animate-pulse-soft rounded bg-gray-200" />
                  <div className="h-3 w-16 animate-pulse-soft rounded bg-gray-200" />
                </div>
                <div className="h-10 w-10 animate-pulse-soft rounded-full bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
