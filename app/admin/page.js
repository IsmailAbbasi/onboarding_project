import { prisma } from "@/lib/prisma"

export default async function AdminDashboard() {
  const [postCount, commentCount, userCount] = await Promise.all([
    prisma.post.count(),
    prisma.comment.count(),
    prisma.profile.count(),
  ])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="border rounded-lg p-6">
          <p className="text-sm text-gray-500">Total Posts</p>
          <p className="text-3xl font-bold">{postCount}</p>
        </div>
        <div className="border rounded-lg p-6">
          <p className="text-sm text-gray-500">Total Comments</p>
          <p className="text-3xl font-bold">{commentCount}</p>
        </div>
        <div className="border rounded-lg p-6">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-3xl font-bold">{userCount}</p>
        </div>
      </div>
    </div>
  )
}
