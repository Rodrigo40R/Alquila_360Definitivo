"use client";

export default function TicketUnificadoPage() {
  const ticket = {
    id: "#018",
    propiedad: "Departamento - Cala Cala",
    creador: "Carlos López (Inquilino)",
    estado: "En proceso",
    prioridad: "Alta",
    descripcion: "Fuga de agua debajo del lavaplatos.",
    fecha: "12/02/2025",
    imagen: null,
    tecnico: "Pedro Gómez",
    historial: [
      { evento: "Ticket creado", fecha: "12/02/2025 09:15" },
      { evento: "Técnico asignado (Pedro Gómez)", fecha: "12/02/2025 09:30" },
      { evento: "Técnico en camino", fecha: "12/02/2025 10:00" },
    ],
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-slate-900">Ticket {ticket.id}</h1>

      {/* Datos principales */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <Item label="Propiedad" value={ticket.propiedad} />
        <Item label="Creador" value={ticket.creador} />

        <Item
          label="Estado"
          value={
            <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs">
              {ticket.estado}
            </span>
          }
        />

        <Item
          label="Prioridad"
          value={
            <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs">
              {ticket.prioridad}
            </span>
          }
        />

        <Item label="Fecha" value={ticket.fecha} />

        <Item label="Descripción" value={ticket.descripcion} />

        <Item label="Técnico asignado" value={ticket.tecnico} />

        {ticket.imagen && (
          <div>
            <p className="text-sm text-slate-600">Imagen adjunta:</p>
            <img src={ticket.imagen} className="rounded-lg border mt-2 h-52" />
          </div>
        )}
      </div>

      {/* Historial del ticket */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="font-semibold text-slate-900 mb-3 text-lg">Historial</p>
        <div className="space-y-3">
          {ticket.historial.map((h, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="w-2 h-2 mt-1 bg-emerald-500 rounded-full"></div>
              <div>
                <p className="text-sm text-slate-900">{h.evento}</p>
                <p className="text-xs text-slate-500">{h.fecha}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Item({ label, value }: any) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-500 text-sm">{label}:</span>
      <span className="font-medium text-slate-900 text-sm">{value}</span>
    </div>
  );
}
