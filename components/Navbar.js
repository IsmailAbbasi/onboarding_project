import Link from "next/link"
import { auth } from "@/auth"
import { logout } from "@/actions/auth"

export default async function Navbar() {
  const session = await auth()
  const user = session?.user
  const isAdmin = user?.role === "ADMIN"

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto max-w-5xl flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold text-gray-900">
          Blog
        </Link>
        <div className="flex items-center gap-4">
          {isAdmin && (
            <Link
              href="/admin"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Admin
            </Link>
          )}
          {user ? (
            <form action={logout}>
              <button
                type="submit"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Logout
              </button>
            </form>
          ) : (
            <Link
              href="/login"
              className="text-sm text-white bg-gray-900 px-4 py-2 rounded hover:bg-gray-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
