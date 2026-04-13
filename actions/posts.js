"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

async function requireAdmin() {
  const session = await auth()

  if (!session?.user) {
    throw new Error("Not authenticated")
  }

  if (session.user.role !== "ADMIN") {
    throw new Error("Not authorized")
  }

  return session.user
}

export async function createPost(prevState, formData) {
  const user = await requireAdmin()

  const title = formData.get("title")
  const content = formData.get("content")
  const excerpt = formData.get("excerpt")
  const published = formData.get("published") === "on"

  const slug =
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") +
    "-" +
    Date.now()

  try {
    await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        authorId: user.id,
        published,
      },
    })
  } catch (error) {
    console.error("Create post error:", error)
    return { error: "Failed to create post" }
  }

  revalidatePath("/")
  revalidatePath("/admin/posts")
  redirect("/admin/posts")
}

export async function updatePost(prevState, postId, formData) {
  await requireAdmin()

  const title = formData.get("title")
  const content = formData.get("content")
  const excerpt = formData.get("excerpt")
  const published = formData.get("published") === "on"

  try {
    await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        content,
        excerpt,
        published,
      },
    })
  } catch (error) {
    console.error("Update post error:", error)
    return { error: "Failed to update post" }
  }

  revalidatePath("/")
  revalidatePath("/admin/posts")
  redirect("/admin/posts")
}

export async function deletePost(prevState, formData) {
  await requireAdmin()

  const postId = formData.get("postId")

  try {
    await prisma.post.delete({
      where: { id: postId },
    })
  } catch (error) {
    console.error("Delete post error:", error)
    return { error: "Failed to delete post" }
  }

  revalidatePath("/")
  revalidatePath("/admin/posts")
}

export async function getPost(slug) {
  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        author: {
          include: {
            profile: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    })

    return post
  } catch (error) {
    console.error("Get post error:", error)
    return null
  }
}

export async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          include: {
            profile: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    })

    return posts
  } catch (error) {
    console.error("Get posts error:", error)
    return []
  }
}

export async function getAdminPosts() {
  await requireAdmin()

  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          include: {
            profile: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    })

    return posts
  } catch (error) {
    console.error("Get admin posts error:", error)
    return []
  }
}
