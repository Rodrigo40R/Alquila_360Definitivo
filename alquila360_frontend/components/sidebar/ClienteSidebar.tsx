"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ClienteSidebar() {
  const path = usePathname();

  const items = [
    { label: "Explorar", href: "/cliente" },
    { label: "Historial", href: "/cliente/historial" },
    { label: "Perfil", href: "/cliente/perfil" },
    { label: "Configuración", href: "/cliente/configuracion" },
  ];

  return (
    <aside className="w-56 h-screen bg-white border-r border-slate-200 px-4 py-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-6">Cliente</h2>

      <nav className="space-y-1">
        {items.map((item) => {
          const active = path.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-sm ${
                active
                  ? "bg-emerald-500 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
