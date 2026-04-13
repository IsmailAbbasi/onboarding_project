import Link from "next/link"

export default function BlogCard({ post }) {
  return (
    <article className="border rounded-lg p-6 hover:shadow-md transition-shadow">
      <Link href={`/blog/${post.slug}`}>
        <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600">
          {post.title}
        </h2>
      </Link>
      {post.excerpt && (
        <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
      )}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>
          By {post.author?.profile?.username || post.author?.name || "Unknown"}
        </span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
    </article>
  )
}
