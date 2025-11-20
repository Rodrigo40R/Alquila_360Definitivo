"use client";
import { useEffect, useRef, useState } from "react";
import { Ic } from "./icons";
import Link from "next/link";

export default function AvatarMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-full border border-slate-300 p-1 text-slate-700 bg-white"
        aria-label="usuario"
      >
        <Ic.User />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-300 bg-white shadow-lg overflow-hidden">
          <Link href="/perfil" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50">
            <Ic.User /> <span>perfil</span>
          </Link>
          <Link href="/configuracion" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50">
            <Ic.Gear /> <span>configuracion</span>
          </Link>
          <Link href="/" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50">
            <Ic.Logout /> <span>cerrar sesion</span>
          </Link>
        </div>
      )}
    </div>
  );
}
