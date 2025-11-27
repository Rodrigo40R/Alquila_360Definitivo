// components/layout/DashboardShell.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

type MenuItem = {
  href: string;
  label: string;
};

interface DashboardShellProps {
  rol: string;
  menu: MenuItem[];
  colorSidebar: string;
  children: React.ReactNode;
}

export default function DashboardShell({
  rol,
  menu,
  colorSidebar,
  children,
}: DashboardShellProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-slate-50">
      {/* SIDEBAR */}
      <aside
        className="w-72 flex flex-col text-white"
        style={{ backgroundColor: colorSidebar }}
      >
        {/* LOGO + ROL */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50/10 border border-emerald-300/70 overflow-hidden">
            <Image
              src="/logo-icon.png"
              alt="Alquila360 logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>

          <div className="flex flex-col leading-tight">
            <p className="text-xs opacity-80">{rol}</p>
            <p className="text-sm font-semibold tracking-wide">
              ALQUILA360
            </p>
          </div>
        </div>

        {/* MENÚ */}
        <nav className="flex-1 mt-4 space-y-1 px-3">
          {menu.map((item) => {
            const active = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center rounded-lg px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* FOOTER SIDEBAR */}
        <div className="px-6 py-4 border-t border-white/10 text-xs text-white/70">
          © 2025 Alquila 360 – Gestión integral de alquileres
        </div>
      </aside>

      {/* CONTENIDO */}
      <main className="flex-1 flex flex-col">
        {/* BARRA SUPERIOR */}
        <header className="flex items-center justify-end px-8 py-4 bg-white shadow-sm">
          <form action="/login">
            <button
              type="submit"
              className="rounded-full bg-red-500 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-red-600 transition"
            >
              Cerrar sesión
            </button>
          </form>
        </header>

        <section className="flex-1 overflow-y-auto p-8">{children}</section>
      </main>
    </div>
  );
}

