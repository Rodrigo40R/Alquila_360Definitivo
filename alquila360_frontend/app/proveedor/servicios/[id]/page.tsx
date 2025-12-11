"use client";

import Button from "@/components/ui/Button";

export default function VerServicioProveedor() {
  const servicio = {
    id: "#201",
    tipo: "Plomería",
    propiedad: "Depto América",
    descripcion: "Fuga en el lavamanos",
    estado: "En progreso",
    fecha: "12/02/25",
  };

  return (
    <div className="space-y-8 max-w-xl">
      <h1 className="text-3xl font-bold text-slate-900">Servicio {servicio.id}</h1>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
        <p className="font-semibold">{servicio.tipo}</p>
        <p>{servicio.propiedad}</p>
        <p className="text-slate-700">{servicio.descripcion}</p>
        <p className="text-xs text-slate-500">Fecha: {servicio.fecha}</p>
      </div>

      <div className="space-y-3">
        <p className="font-semibold">Actualizar estado:</p>

        {/* <div className="flex gap-3">
          <Button variant="primary">Marcar en progreso</Button>
          <Button variant="primary">Marcar completado</Button>
        </div> */}
      </div>
    </div>
  );
}
