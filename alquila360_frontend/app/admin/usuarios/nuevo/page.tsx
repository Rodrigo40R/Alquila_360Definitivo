"use client";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useState } from "react";

export default function CrearUsuarioAdmin() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("Inquilino");

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-2xl font-bold text-slate-900">Nuevo usuario</h1>

      <Input label="Nombre completo" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <Input label="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />

      <div className="space-y-1">
        <label className="text-sm text-slate-600">Rol</label>
        <select
          className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm"
          value={rol}
          onChange={(e) => setRol(e.target.value)}
        >
          <option>Inquilino</option>
          <option>Propietario</option>
          <option>Técnico</option>
          <option>Proveedor</option>
          <option>Admin</option>
        </select>
      </div>

      <Button variant="primary" className="w-full">Guardar usuario</Button>
    </div>
  );
}
