"use client";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function EditarPropiedad() {
  const propiedad = {
    nombre: "Depto - Av. América",
    direccion: "Av. América 123",
    tipo: "Departamento",
    precio: "2500",
  };

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-2xl font-bold text-slate-900">Editar propiedad</h1>

      <Input label="Nombre" defaultValue={propiedad.nombre} />
      <Input label="Dirección" defaultValue={propiedad.direccion} />

      <div className="space-y-1">
        <label className="text-sm text-slate-600">Tipo</label>
        <select
          defaultValue={propiedad.tipo}
          className="border border-slate-300 rounded-md px-3 py-2 text-sm"
        >
          <option>Departamento</option>
          <option>Casa</option>
          <option>Garzonier</option>
        </select>
      </div>

      <Input label="Precio mensual" defaultValue={propiedad.precio} />

      <Button variant="primary" className="w-full">
        Actualizar propiedad
      </Button>
    </div>
  );
}
