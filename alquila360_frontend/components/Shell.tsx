"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export type NavItem = {
  href: string;
  label: string;
};

type ShellProps = {
  title?: string;
  subtitle?: string;
  roleLabel?: string;
  navItems?: NavItem[];
  children?: ReactNode;
};

export default function Shell({
  title,
  subtitle,
  roleLabel,
  navItems,
  children,
}: ShellProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top bar */}
      <header className="h-16 border-b bg-white flex items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="rounded-md bg-teal-500 px-2 py-1 text-xs font-semibold text-white">
            A360
          </span>
          <span className="font-semibold tracking-wide">ALQUILA360</span>
        </Link>

        <div className="flex items-center gap-4 text-sm text-slate-600">
          {roleLabel && (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">
              Rol: {roleLabel}
            </span>
          )}
          <Link
            href="/principal"
            className="text-xs font-medium text-teal-600 hover:text-teal-700"
          >
            Ir al inicio
          </Link>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar (si hay navItems) */}
        {navItems && navItems.length > 0 && (
          <aside className="w-60 bg-[var(--a360-sidebar)] text-slate-100 flex flex-col">
            <div className="h-14 flex items-center px-5 text-sm font-medium border-b border-slate-700/60">
              Menú
            </div>
            <nav className="flex-1 py-3 space-y-1 text-sm">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center px-5 py-2.5 transition ${
                      active
                        ? "bg-teal-500 text-white"
                        : "text-slate-100/80 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
        )}

        {/* Contenido */}
        <main className="flex-1 px-8 py-6">
          {(title || subtitle) && (
            <div className="mb-6">
              {title && (
                <h1 className="text-2xl font-semibold tracking-tight">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
              )}
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            {children}
          </div>
        </main>
      </div>

      {/* Footer base para zonas internas */}
      <footer className="border-t bg-white text-xs text-slate-500 h-10 flex items-center justify-center">
        © 2025 Alquila 360 – Gestión integral de alquileres
      </footer>
    </div>
  );
}
