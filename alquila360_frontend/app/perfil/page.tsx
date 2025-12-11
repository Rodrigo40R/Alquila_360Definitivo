"use client";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function EditarPerfilPage() {
  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-2xl font-bold text-slate-900">Editar perfil</h1>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <Input label="Nombre" defaultValue="Mateo" />
        <Input label="Correo" defaultValue="mateo@gmail.com" />
        <Input label="Contraseña" type="password" />
        <Input label="Teléfono" defaultValue="+591 72000000" />

        {/* <Button type="submit">Guardar cambios</Button> */}
      </div>
    </div>
  );
}
