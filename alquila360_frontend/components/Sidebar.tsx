// components/ui/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export type SidebarItem = {
  label: string;
  href: string;
};

export interface SidebarProps {
  title?: string;
  items?: SidebarItem[];
}

const defaultItems: SidebarItem[] = [
  { href: '/principal', label: 'Dashboard' },
  { href: '/propietario/mantenimiento', label: 'Mantenimiento' },
  { href: '/propietario/propiedades', label: 'Propiedades' },
  { href: '/propietario/pagos', label: 'Pagos' },
  { href: '/propietario/reportes', label: 'Reportes' },
  { href: '/configuracion', label: 'Configuración' },
  { href: '/perfil', label: 'Perfil' }
];

export default function Sidebar({ title = 'Propietario', items }: SidebarProps) {
  const pathname = usePathname();

  const navItems: SidebarItem[] = items && items.length > 0 ? items : defaultItems;

  return (
    <aside className="flex h-screen w-64 flex-col bg-[#003b3b] text-white">
      <div className="px-6 py-4 text-lg font-semibold">
        <div className="text-xs opacity-80">ALQUILA360</div>
        <div className="text-base">{title}</div>
      </div>

      <nav className="mt-2 flex-1 space-y-1 px-2 text-sm">
        {navItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center rounded-md px-3 py-2 transition
                ${
                  active
                    ? 'bg-white text-[#003b3b] font-semibold'
                    : 'hover:bg-[#005858]'
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
