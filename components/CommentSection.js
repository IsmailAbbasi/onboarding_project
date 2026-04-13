"use client"

import { useTransition } from "react"
import { addComment, deleteComment } from "@/actions/comments"

export default function CommentSection({
  slug,
  comments,
  userId,
  isAdmin,
  isLoggedIn,
}) {
  const [isPending, startTransition] = useTransition()
  const addCommentWithSlug = addComment.bind(null, slug)

  function handleSubmit(e) {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)

    startTransition(async () => {
      await addCommentWithSlug(formData)
      form.reset()
    })
  }

  function handleDelete(commentId) {
    const formData = new FormData()
    formData.set("commentId", commentId)
    formData.set("slug", slug)

    startTransition(async () => {
      await deleteComment(formData)
    })
  }

  return (
    <section className="mt-10">
      <h3 className="text-lg font-semibold mb-4">
        Comments ({comments.length})
      </h3>

      {isLoggedIn ? (
        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            name="content"
            placeholder="Write a comment..."
            required
            rows={3}
            className="w-full border rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isPending}
            className="mt-2 px-4 py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-700 disabled:opacity-50"
          >
            {isPending ? "Posting..." : "Post Comment"}
          </button>
        </form>
      ) : (
        <p className="mb-6 text-sm text-gray-500">
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>{" "}
          to leave a comment.
        </p>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                {comment.user?.profile?.username || comment.user?.name || "Unknown"}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
                {(userId === comment.userId || isAdmin) && (
                  <button
                    onClick={() => handleDelete(comment.id)}
                    disabled={isPending}
                    className="text-xs text-red-500 hover:text-red-700 disabled:opacity-50"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-700">{comment.content}</p>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-sm text-gray-400">No comments yet.</p>
        )}
      </div>
    </section>
  )
}
