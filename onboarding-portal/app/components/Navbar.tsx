import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b">
      <h1 className="text-xl font-bold text-blue-600">
        RecruitPortal
      </h1>

      <div className="flex gap-6 items-center">
        <Link href="/" className="text-gray-600 hover:text-black">
          Home
        </Link>
        <Link href="/login" className="text-gray-600 hover:text-black">
          Login
        </Link>
        <Link href="/login">
  <button className="bg-blue-600 text-white px-4 py-2 rounded">
    Create Account
  </button>
</Link>

      </div>
    </nav>
  );
}
