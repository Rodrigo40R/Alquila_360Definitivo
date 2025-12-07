// components/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="w-full bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo_generico.png"
            alt="Alquila360"
            width={210}
            height={60}
            className="object-contain"
          />
        </div>

        {/* MENÚ SUPERIOR */}
        <ul className="hidden md:flex items-center gap-10 text-[15px] font-medium text-slate-700">
          <li>
            <Link href="/" className="hover:text-emerald-600 transition">
              Inicio
            </Link>
          </li>

          <li>
            <Link href="/servicios" className="hover:text-emerald-600 transition">
              Servicios
            </Link>
          </li>

          <li>
            <Link href="/contacto" className="hover:text-emerald-600 transition">
              Contacto
            </Link>
          </li>

          <li>
            <Link
              href="/sobre-nosotros"
              className="hover:text-emerald-600 transition"
            >
              Sobre nosotros
            </Link>
          </li>
        </ul>

        {/* BOTÓN LOGIN */}
        <Link
          href="/login"
          className="rounded-full bg-emerald-500 px-6 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-600 transition"
        >
          Iniciar Sesión
        </Link>
      </nav>
    </header>
  );
}
