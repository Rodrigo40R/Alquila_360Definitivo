"use client";

import Button from "@/components/ui/Button";

export default function VerTicketTecnico() {
  const ticket = {
    id: "#101",
    propiedad: "Depto América",
    descripcion: "Fuga de agua bajo el lavamanos",
    estado: "En progreso",
    fecha: "12/02/2025",
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-slate-900">Ticket {ticket.id}</h1>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
        <p className="font-semibold">{ticket.propiedad}</p>
        <p className="text-slate-700">{ticket.descripcion}</p>
        <p className="text-xs text-slate-500">Fecha: {ticket.fecha}</p>
      </div>

      <div className="space-y-3">
        <p className="font-semibold text-slate-800">Actualizar estado:</p>

        <div className="flex gap-3">
          <Button variant="primary">Marcar como En progreso</Button>
          <Button variant="primary">Marcar como Resuelto</Button>
        </div>
      </div>
    </div>
  );
}
