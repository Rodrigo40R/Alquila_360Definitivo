"use client";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function CrearUsuarioAdmin() {
  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-2xl font-bold text-slate-900">Nuevo usuario</h1>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <Input label="Nombre completo" />
        <Input label="Correo" />
        <Input label="Contraseña" type="password" />
        <Input label="Rol" placeholder="Admin, Propietario, Inquilino…" />

        <Button type="submit">Crear usuario</Button>
      </div>
    </div>
  );
}
