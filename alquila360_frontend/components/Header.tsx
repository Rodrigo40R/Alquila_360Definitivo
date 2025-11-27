"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
      <Link href="/" className="font-bold text-slate-900 text-lg">
        ALQUILA360
      </Link>

      <nav className="flex gap-6 text-sm text-slate-700">
        <Link href="/sobre-nosotros">Sobre nosotros</Link>
        <Link href="/services">Servicios</Link>
        <Link href="/login">Login</Link>
      </nav>
    </header>
  );
}
