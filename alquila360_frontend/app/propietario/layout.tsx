// app/propietario/layout.tsx
import React from "react";
import DashboardShell from "@/components/layout/DashboardShell";

export default function PropietarioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
const menu = [
  { href: "/propietario/dashboard", label: "Dashboard" },
  { href: "/propietario/mantenimiento", label: "Mantenimiento (Tickets)" }, // <= AQUÍ
  { href: "/propietario/propiedades", label: "Propiedades" },
];

  return (
    <DashboardShell
      rol="Propietario"
      menu={menu}
      colorSidebar="#003B66" // azul oscuro
    >
      {children}
    </DashboardShell>
  );
}
