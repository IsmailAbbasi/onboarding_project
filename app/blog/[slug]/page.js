import { auth } from "@/auth"
import { getPost, getAllPostSlugs } from "@/actions/posts"
import { getComments } from "@/actions/comments"
import { checkUserLike } from "@/actions/likes"
import { notFound } from "next/navigation"
import LikeButton from "@/components/LikeButton"
import CommentSection from "@/components/CommentSection"

// Generate static params for all published posts
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Revalidate every 60 seconds
export const revalidate = 60

export default async function BlogPostPage({ params }) {
  const { slug } = await params
  const session = await auth()

  const post = await getPost(slug)

  if (!post || !post.published) {
    notFound()
  }

  const comments = await getComments(post.id)
  const hasLiked = session?.user
    ? await checkUserLike(post.id, session.user.id)
    : false

  const likeCount = post._count.likes
  const isAdmin = session?.user?.role === "ADMIN"

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Back button */}
          <a
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-blue-200 transition-colors duration-200 hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </a>

          {/* Title */}
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          {/* Author info */}
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-lg font-semibold text-white backdrop-blur-sm">
              {(post.author.profile?.username || post.author.name || "U")[0].toUpperCase()}
            </div>
            <div>
              <p className="font-medium text-white">
                {post.author.profile?.username || post.author.name || "Unknown"}
              </p>
              <div className="flex items-center gap-3 text-sm text-blue-200">
                <span>{formattedDate}</span>
                <span>•</span>
                <span>{post._count.comments} comments</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent" />
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main article card */}
        <article className="mb-8 rounded-2xl bg-white p-8 shadow-xl sm:p-12">
          <div className="prose prose-lg max-w-none">
            {post.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed text-gray-700">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {/* Like button */}
        <div className="mb-8">
          <LikeButton
            slug={slug}
            likeCount={likeCount}
            hasLiked={hasLiked}
            isLoggedIn={!!session?.user}
          />
        </div>

        {/* Comments section */}
        <div className="rounded-2xl bg-white p-8 shadow-xl">
          <CommentSection
            slug={slug}
            comments={comments}
            userId={session?.user?.id}
            isAdmin={isAdmin}
            isLoggedIn={!!session?.user}
          />
        </div>
      </div>
    </div>
  )
}
