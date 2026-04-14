import Link from "next/link"

export default function BlogCard({ post }) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  return (
    <article className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Content */}
      <div className="relative p-6">
        {/* Category badge (if you want to add categories later) */}
        <div className="mb-4 flex items-center justify-between">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
            Article
          </span>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{post._count?.likes || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <span>{post._count?.comments || 0}</span>
            </div>
          </div>
        </div>

        <Link href={`/blog/${post.slug}`} className="block">
          <h2 className="mb-3 text-2xl font-bold text-gray-900 transition-colors duration-200 group-hover:text-blue-600">
            {post.title}
          </h2>
        </Link>

        {post.excerpt && (
          <p className="mb-4 line-clamp-3 text-gray-600">
            {post.excerpt}
          </p>
        )}

        {/* Author and date */}
        <div className="flex items-center gap-3 border-t pt-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-semibold text-white">
            {(post.author?.profile?.username || post.author?.name || "U")[0].toUpperCase()}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">
              {post.author?.profile?.username || post.author?.name || "Unknown"}
            </p>
            <p className="text-xs text-gray-500">{formattedDate}</p>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors duration-200 group-hover:bg-blue-600 group-hover:text-white"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}
