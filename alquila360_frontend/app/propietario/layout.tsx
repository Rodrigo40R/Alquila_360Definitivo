import React from "react";
import DashboardShell from "@/components/layout/DashboardShell";

export default function PropietarioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Menú del propietario SIN pagos y SIN tickets
  const menu = [
    { label: "Dashboard", href: "/propietario/dashboard" },
    { label: "Propiedades", href: "/propietario/propiedades" },
    { label: "Contratos", href: "/propietario/contratos" },
    { label: "Reportes", href: "/propietario/reportes" },
    { label: "Mi Perfil", href: "/propietario/perfil" },
    { label: "Configuración", href: "/propietario/configuracion" },
  ];

  return (
    <DashboardShell
      rol="Propietario"
      menu={menu}
      colorSidebar="#1E4A4F"
    >
      {children}
    </DashboardShell>
  );
}
