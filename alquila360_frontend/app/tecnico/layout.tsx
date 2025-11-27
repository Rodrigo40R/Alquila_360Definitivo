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
    { href: "/tecnico/tickets", label: "Tickets" },
    { href: "/tecnico/perfil", label: "Perfil" },
  ];

  return (
    <DashboardShell
      rol="Técnico"
      menu={menu}
      colorSidebar="#005B73"
    >
      {children}
    </DashboardShell>
  );
}
