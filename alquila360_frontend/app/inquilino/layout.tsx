// app/inquilino/layout.tsx
import React from "react";
import DashboardShell from "@/components/layout/DashboardShell";

export default function InquilinoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menu = [
    { href: "/inquilino/dashboard", label: "Dashboard" },
    { href: "/inquilino/pagos", label: "Pagos" },
    { href: "/inquilino/perfil", label: "Perfil" },
    { href: "/inquilino/tickets", label: "Tickets" },
  ];

  return (
    <DashboardShell
      rol="Inquilino"
      menu={menu}
      colorSidebar="#008D6F"
    >
      {children}
    </DashboardShell>
  );
}
