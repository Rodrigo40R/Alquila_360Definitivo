"use client";

import { useState } from "react";
import Link from "next/link";

export default function NavbarTop() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center">
      <Link href="/principal" className="text-xl font-bold text-slate-900">
        ALQUILA360
      </Link>

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-md hover:bg-slate-100"
        >
          <div className="h-8 w-8 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700 font-semibold">
            M
          </div>
          <span className="text-sm text-slate-700">Mateo</span>
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-md shadow-md">
            <Link
              href="/perfil"
              className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
            >
              Mi perfil
            </Link>
            <Link
              href="/soporte"
              className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
            >
              Soporte
            </Link>
            <button
              className="block text-left w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
