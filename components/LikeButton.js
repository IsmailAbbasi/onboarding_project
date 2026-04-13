"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleLike } from "@/actions/likes";

export default function LikeButton({ slug, likeCount, hasLiked, isLoggedIn }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleClick() {
    if (!isLoggedIn) {
      router.push(`/login?redirectTo=/blog/${slug}`);
      return;
    }

    startTransition(async () => {
      await toggleLike(slug);
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`flex items-center gap-2 px-4 py-2 rounded border transition-colors ${
        hasLiked
          ? "bg-red-50 border-red-200 text-red-600"
          : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
      } ${isPending ? "opacity-50" : ""}`}
    >
      <span>{hasLiked ? "♥" : "♡"}</span>
      <span>{likeCount}</span>
    </button>
  );
}
