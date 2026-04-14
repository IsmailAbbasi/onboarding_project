import { getPosts } from "@/actions/posts"
import BlogCard from "@/components/BlogCard"

// Revalidate every 60 seconds
export const revalidate = 60

export default async function HomePage() {
  const { posts, total } = await getPosts(1, 9)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="block">Welcome to Our Blog</span>
              <span className="block bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent">
                Insights & Stories
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-blue-100">
              Discover the latest articles, tutorials, and insights from our community of writers
            </p>
            <div className="mt-8 flex items-center justify-center gap-4 text-sm text-blue-200">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.259 0 2.397.322 3.5.804V4.804zm2 10A7.969 7.969 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804v10z" />
                </svg>
                <span>{total} Articles</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent" />
      </div>

      {/* Posts Grid */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {posts && posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="mb-4 rounded-full bg-gray-100 p-6">
              <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-lg text-gray-500">No posts yet.</p>
            <p className="mt-2 text-sm text-gray-400">Check back soon for new content!</p>
          </div>
        )}
      </div>
    </div>
  )
}
