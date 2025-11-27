"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  role: "propietario" | "inquilino" | "tecnico";
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  const menus = {
    propietario: [
      { label: "Dashboard", href: "/propietario/dashboard" },
      { label: "Propiedades", href: "/propietario/propiedades" },
      { label: "Pagos", href: "/propietario/pagos" },
      { label: "Tickets", href: "/propietario/tickets" },
    ],
    inquilino: [
      { label: "Dashboard", href: "/inquilino/dashboard" },
      { label: "Pagos", href: "/inquilino/pagos" },
      { label: "Perfil", href: "/inquilino/perfil" },
      { label: "Tickets", href: "/inquilino/tickets" },
    ],
    tecnico: [
      { label: "Dashboard", href: "/tecnico/dashboard" },
      { label: "Tickets asignados", href: "/tecnico/tickets" },
    ],
  };

  const items = menus[role];

  return (
    <aside className="w-60 min-h-screen bg-white border-r border-slate-200 px-5 py-6">
      <h1 className="text-lg font-bold text-emerald-400 mb-9 tracking-wide">
        ALQUILA360
      </h1>

      <nav className="flex flex-col gap-2">
        {items.map((item, i) => {
          const active = pathname === item.href;

          return (
            <Link
              key={i}
              href={item.href}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                active
                  ? "bg-emerald-500 text-slate-900"
                  : "text-slate-300 hover:bg-white hover:text-white"
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
