import React from "react";
import DashboardShell from "@/components/layout/DashboardShell";

export default function PropietarioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Definimos el menú completo basándonos en las páginas que hemos creado
  const menu = [
    { label: "Dashboard", href: "/propietario/dashboard" },
    { label: "Propiedades", href: "/propietario/propiedades" },
    { label: "Contratos", href: "/propietario/contratos" },
    { label: "Pagos", href: "/propietario/pagos" },
    { label: "Tickets", href: "/propietario/tickets" }, // Ruta correcta según el archivo creado
    { label: "Reportes", href: "/propietario/reportes" },
    { label: "Mi Perfil", href: "/propietario/perfil" },
    { label: "Configuración", href: "/propietario/configuracion" },
  ];

  return (
    <DashboardShell
      rol="Propietario"
      menu={menu}
      colorSidebar="#1E4A4F" // Color corporativo (Dark Teal)
    >
      {children}
    </DashboardShell>
  );
}