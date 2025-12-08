// app/tecnico/layout.tsx
import React from "react";
import DashboardShell from "@/components/layout/DashboardShell";

export default function TecnicoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menu = [
    { href: "/tecnico/dashboard", label: "Dashboard" },
    { href: "/tecnico/tickets", label: "Mantenimiento (Tickets)" },
    //{ href: "/tecnico/perfil", label: "Perfil" },
  ];

  return (
    <DashboardShell
      rol="Técnico"
      menu={menu}
      colorSidebar="#38761D"
    >
      {children}
    </DashboardShell>
  );
}
