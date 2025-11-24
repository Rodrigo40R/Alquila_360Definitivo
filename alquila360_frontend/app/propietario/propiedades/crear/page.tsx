"use client";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function CrearPropiedadPage() {
  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-2xl font-bold text-slate-900">Nueva propiedad</h1>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <Input label="Nombre" placeholder="Departamento Av. América" />
        <Input label="Dirección" placeholder="Av. América 1234" />
        <Input label="Precio mensual (Bs)" type="number" />
        <Input label="Servicios incluidos" placeholder="Wifi, parqueo…" />

        <Button type="submit">Registrar propiedad</Button>
      </div>
    </div>
  );
}
