"use client";

import { logoutUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function HeaderGeneral({ role }: { role: string }) {
  const router = useRouter();

  function handleLogout() {
    logoutUser();
    router.push("/login");
  }

  return (
    <header className="w-full bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
      <h2 className="text-sm text-slate-300">
        Estás conectado como:{" "}
        <span className="text-emerald-400 font-semibold">{role}</span>
      </h2>

      <button
        onClick={handleLogout}
        className="text-sm bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-md text-white font-medium transition"
      >
        Cerrar sesión
      </button>
    </header>
  );
}
