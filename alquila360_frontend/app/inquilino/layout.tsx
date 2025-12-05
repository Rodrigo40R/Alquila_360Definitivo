// app/inquilino/layout.tsx
"use client";

import React from "react";
import DashboardShell from "@/components/layout/DashboardShell";

export default function InquilinoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 👉 Menú EXACTO según el Figma
  const menu = [
    { href: "/inquilino/dashboard", label: "Dashboard" },
    { href: "/inquilino/tickets", label: "Mantenimiento (Ticktes)" },
    { href: "/inquilino/pagos", label: "Pagos" },
  ];

  return (
    <DashboardShell
      rol="Inquilino"
      menu={menu}
      colorSidebar="#2E8471" // Puedes cambiar a #008D6F si deseas más oscuro
    >
      {children}
    </DashboardShell>
  );
}
