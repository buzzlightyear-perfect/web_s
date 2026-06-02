import Link from "next/link";

export default function Navbar(){
    return (
        <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <h1 className="text-2xl font-bold">MyLogo</h1>

      {/* Menu */}
      <div className="space-x-6">
        <Link href="/" className="hover:text-yellow-300">Home</Link>
        <Link href="/about" className="hover:text-yellow-300">Tentang</Link>
        <Link href="/courses" className="hover:text-yellow-300">Kursus</Link>
        <Link href="/services" className="hover:text-yellow-300">Layanan</Link>
        <Link href="/blog" className="hover:text-yellow-300">Blog</Link>
        <Link href="/gallery" className="hover:text-yellow-300">Galeri</Link>
        <Link href="/faq" className="hover:text-yellow-300">FAQ</Link>
        <Link href="/contact" className="hover:text-yellow-300">Kontak</Link>
      </div>
    </nav>
    )

}