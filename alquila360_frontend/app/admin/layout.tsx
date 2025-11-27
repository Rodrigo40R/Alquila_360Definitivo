// app/admin/layout.tsx
import React from "react";
import DashboardShell from "@/components/layout/DashboardShell";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
const menu = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/contratos", label: "Contratos" },
  { href: "/admin/pagos", label: "Pagos y Finanzas" },
  { href: "/admin/mantenimiento", label: "Mantenimiento (Tickets)" }, // <= AQUÍ
  { href: "/admin/propiedades", label: "Propiedades" },
  { href: "/admin/usuarios", label: "Usuarios" },
  { href: "/admin/reportes", label: "Reportes" },
];


  return (
    <DashboardShell
      rol="Administrador"
      menu={menu}
      colorSidebar="#005047" // verde oscuro
    >
      {children}
    </DashboardShell>
  );
}
