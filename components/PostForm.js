"use client";

import { useActionState } from "react";

export default function PostForm({ action, initialData }) {
  const [state, formAction, isPending] = useActionState(action, null);

  return (
    <form action={formAction} className="space-y-4 max-w-2xl">
      {state?.error && (
        <p className="text-red-600 text-sm bg-red-50 p-3 rounded">
          {state.error}
        </p>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={initialData?.title || ""}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium mb-1">
          Excerpt
        </label>
        <input
          id="excerpt"
          name="excerpt"
          type="text"
          defaultValue={initialData?.excerpt || ""}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-1">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={12}
          defaultValue={initialData?.content || ""}
          className="w-full border rounded-lg px-3 py-2 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="published"
          name="published"
          type="checkbox"
          defaultChecked={initialData?.published ?? true}
          className="rounded"
        />
        <label htmlFor="published" className="text-sm">
          Published
        </label>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="px-4 py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-700 disabled:opacity-50"
      >
        {isPending ? "Saving..." : initialData ? "Update Post" : "Create Post"}
      </button>
    </form>
  );
}
