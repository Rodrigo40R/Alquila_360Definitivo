// app/admin/layout.tsx
import type { ReactNode } from "react";
import Shell from "@/components/Shell";

const adminNav = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/usuarios", label: "Usuarios" },
  { href: "/admin/configuracion", label: "Configuración" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <Shell navItems={adminNav} roleLabel="Administrador">
      {children}
    </Shell>
  );
}
