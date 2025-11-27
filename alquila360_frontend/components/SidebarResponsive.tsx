"use client";

import { useState } from "react";

export default function SidebarResponsive({ menu, children }: any) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
      {/* Mobile button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden absolute top-3 left-3 z-50 p-2 bg-white border rounded-md shadow-sm"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static left-0 top-0 h-full w-64 bg-white border-r border-slate-200 p-4 transition-transform duration-300 z-40 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <p className="text-2xl font-bold text-brand-primary mb-6">ALQUILA360</p>
        {menu}
      </aside>

      {/* Main content */}
      <main className="w-full md:ml-64 p-6">{children}</main>
    </div>
  );
}
