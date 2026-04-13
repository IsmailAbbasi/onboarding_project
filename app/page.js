import { getPosts } from "@/actions/posts"
import BlogCard from "@/components/BlogCard"

export default async function HomePage() {
  const posts = await getPosts()

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Latest Posts</h1>
      {posts && posts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No posts yet.</p>
      )}
    </div>
  )
}
