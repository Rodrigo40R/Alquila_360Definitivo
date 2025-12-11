"use client";

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
  ];

  return (
    <DashboardShell
      rol="Técnico"
      menu={menu}
      colorSidebar="#26812B" // Color corporativo
    >
      {children}
    </DashboardShell>
  );
}
