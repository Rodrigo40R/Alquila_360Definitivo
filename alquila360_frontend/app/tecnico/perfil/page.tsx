"use client";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function PerfilTecnico() {
  const usuario = {
    nombre: "Pedro Ríos",
    email: "pedro@example.com",
    telefono: "70000000",
    especialidad: "Plomería",
  };

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-2xl font-bold text-slate-900">Mi perfil</h1>

      <Input label="Nombre" defaultValue={usuario.nombre} />
      <Input label="Correo" defaultValue={usuario.email} />
      <Input label="Teléfono" defaultValue={usuario.telefono} />
      <Input label="Especialidad" defaultValue={usuario.especialidad} />

      <Button variant="primary" className="w-full">Guardar cambios</Button>
    </div>
  );
}
