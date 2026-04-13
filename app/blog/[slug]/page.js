import { auth } from "@/auth"
import { getPost } from "@/actions/posts"
import { getComments } from "@/actions/comments"
import { checkUserLike } from "@/actions/likes"
import { notFound } from "next/navigation"
import LikeButton from "@/components/LikeButton"
import CommentSection from "@/components/CommentSection"

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

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <article>
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <div className="text-sm text-gray-500 mb-8">
          By {post.author.profile?.username || post.author.name || "Unknown"}{" "}
          &middot; {new Date(post.createdAt).toLocaleDateString()}
        </div>
        <div className="prose max-w-none whitespace-pre-wrap mb-8">
          {post.content}
        </div>
      </article>

      <LikeButton
        slug={slug}
        likeCount={likeCount}
        hasLiked={hasLiked}
        isLoggedIn={!!session?.user}
      />

      <CommentSection
        slug={slug}
        comments={comments}
        userId={session?.user?.id}
        isAdmin={isAdmin}
        isLoggedIn={!!session?.user}
      />
    </div>
  )
}
