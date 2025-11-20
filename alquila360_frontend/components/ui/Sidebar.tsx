"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type NavItem = {
  href: string;
  label: string;
};

export type SidebarProps = {
  roleLabel: string;
  items: NavItem[];
};

const Sidebar: React.FC<SidebarProps> = ({ roleLabel, items }) => {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col bg-emerald-900 text-white">
      {/* Logo / título */}
      <div className="flex items-center gap-2 px-6 py-4 text-lg font-semibold border-b border-emerald-800">
        <span className="text-emerald-300">ALQUILA360</span>
      </div>

      {/* Rol */}
      <div className="px-6 py-3 text-sm text-emerald-100 border-b border-emerald-800">
        Rol: <span className="font-medium">{roleLabel}</span>
      </div>

      {/* Navegación */}
      <nav className="flex-1 space-y-1 px-3 py-4 text-sm">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-lg px-3 py-2 transition ${
                active
                  ? "bg-emerald-600 text-white"
                  : "text-emerald-100 hover:bg-emerald-800 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer pequeño del sidebar */}
      <div className="px-6 py-4 text-[11px] text-emerald-200 border-t border-emerald-800">
        © 2025 Alquila 360
      </div>
    </aside>
  );
};

export default Sidebar;
