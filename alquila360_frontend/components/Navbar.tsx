"use client";

import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full border-b border-slate-200 bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="text-2xl font-bold text-brand-primary">
          ALQUILA360
        </a>

        {/* Desktop */}
        <div className="hidden md:flex gap-6 text-slate-700 font-medium">
          <a href="/services">Servicios</a>
          <a href="/sobre-nosotros">Sobre nosotros</a>
          <a href="/contacto">Contacto</a>
        </div>

        <div className="hidden md:flex gap-3">
          <a
            href="/login"
            className="px-4 py-2 rounded-md border border-slate-300 hover:bg-slate-100"
          >
            Iniciar sesión
          </a>

          <a
            href="/register"
            className="px-4 py-2 rounded-md bg-brand-primary text-white hover:bg-emerald-600"
          >
            Crear cuenta
          </a>
        </div>

        {/* Mobile button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 border border-slate-300 rounded-md"
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden flex flex-col gap-4 px-4 py-4 bg-white border-t border-slate-200">
          <a href="/services">Servicios</a>
          <a href="/sobre-nosotros">Sobre nosotros</a>
          <a href="/contacto">Contacto</a>

          <a
            href="/login"
            className="px-4 py-2 rounded-md border border-slate-300 hover:bg-slate-100 text-center"
          >
            Iniciar sesión
          </a>

          <a
            href="/register"
            className="px-4 py-2 rounded-md bg-brand-primary text-white text-center hover:bg-emerald-600"
          >
            Crear cuenta
          </a>
        </div>
      )}
    </nav>
  );
}
