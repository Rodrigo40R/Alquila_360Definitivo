"use client";

import { useState } from "react";

export default function SidebarMobileWrapper({ sidebar, children }: any) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="md:hidden px-4 py-2 bg-slate-100 border rounded-md m-3"
        onClick={() => setOpen(!open)}
      >
        ☰ Menu
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r shadow-lg transform transition-transform duration-300 md:static md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebar}
      </div>

      <div className="md:ml-64 p-5">{children}</div>
    </div>
  );
}
