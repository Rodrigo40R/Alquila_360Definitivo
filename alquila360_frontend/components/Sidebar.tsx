"use client";
import Link from "next/link";
import { useState } from "react";
import { Ic } from "./icons";
import { usePathname } from "next/navigation";

const items = [
  { href: "/menu", label: "Graficos", icon: <Ic.Chart /> },
  { href: "/contratos", label: "Página de Contratos", icon: <Ic.File /> },
  { href: "/pagos", label: "Página de Pagos", icon: <Ic.Dollar /> },
  { href: "/tickets", label: "Página Tickets", icon: <Ic.Ticket /> },
  { href: "/reportes", label: "Página Reportes", icon: <Ic.Report /> },
  { href: "/usuarios", label: "Gestión de Usuarios", icon: <Ic.Users /> },
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  return (
    <aside className="mt-4">
      <button onClick={() => setOpen((v) => !v)} className="rounded-md p-2 text-slate-800">
        <Ic.Burger />
      </button>

      {open && (
        <div className="mt-4 w-[270px] space-y-3">
          {items.map((it) => {
            const active = pathname === it.href;
            return (
              <Link
                key={it.href}
                href={it.href}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${active ? "border-slate-900" : "border-slate-300"} bg-white`}
              >
                {it.icon}
                <span className={`${active ? "font-semibold underline" : ""}`}>{it.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </aside>
  );
}
