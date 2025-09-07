import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow flex items-center justify-between px-4 py-2">
      <Link href="/" className="font-bold text-xl text-blue-600">VivahSampan</Link>
      <div className="flex gap-4">
        <Link href="/users" className="hover:text-blue-500">Users</Link>
        <Link href="/vendors" className="hover:text-blue-500">Vendors</Link>
        <Link href="/media/upload" className="hover:text-blue-500">Upload Media</Link>
        <Link href="/login" className="hover:text-blue-500">Login</Link>
      </div>
    </nav>
  );
}
