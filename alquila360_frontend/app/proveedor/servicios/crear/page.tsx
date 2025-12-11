"use client";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function CrearServicioPage() {
  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-2xl font-bold text-slate-900">Nuevo servicio</h1>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <Input label="Nombre del servicio" placeholder="Plomería" />
        <Input label="Descripción" placeholder="Reparación de fugas…" />

        {/* <Button type="submit">Registrar servicio</Button> */}
      </div>
    </div>
  );
}
