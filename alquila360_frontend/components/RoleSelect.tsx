"use client";
import { useMemo, useState } from "react";
type Role = "administrador" | "propietario" | "inquilino" | "tecnico" | "";
export default function RoleSelect() {
  const [role, setRole] = useState<Role>("");
  const placeholder = useMemo(() => role ? `Ingresaste como ${role}` : "Escribe aquí tu nombre de usuario", [role]);
  return (
    <div className="space-y-4">
      <label className="text-sm font-medium">Ingresa tu nombre de usuario</label>
      <div className="relative">
        <input className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 pr-12" placeholder={placeholder}/>
        <select className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
          value={role} onChange={(e)=>setRole(e.target.value as Role)}>
          <option value="">Selecciona un rol</option>
          <option value="administrador">Administrador</option>
          <option value="propietario">Propietario</option>
          <option value="inquilino">Inquilino</option>
          <option value="tecnico">Técnico</option>
        </select>
      </div>
    </div>
  );
}
