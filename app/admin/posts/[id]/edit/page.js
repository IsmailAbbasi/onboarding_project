import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import PostForm from "@/components/PostForm";
import { updatePost } from "@/actions/posts";

export default async function EditPostPage({ params }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (!post) notFound();

  const updatePostWithId = updatePost.bind(null, post.id);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      <PostForm action={updatePostWithId} initialData={post} />
    </div>
  );
}
