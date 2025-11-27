"use client";

export default function TicketsPropietario() {
  const tickets = [
    {
      id: 1,
      propiedad: "Depto - América",
      descripcion: "Fuga de agua en baño",
      estado: "En progreso",
      fecha: "05/02/2025",
    },
    {
      id: 2,
      propiedad: "Casa - Tiquipaya",
      descripcion: "Problema eléctrico",
      estado: "Pendiente",
      fecha: "02/02/2025",
    },
    {
      id: 3,
      propiedad: "Garzonier – Cala Cala",
      descripcion: "Puerta dañada",
      estado: "Resuelto",
      fecha: "01/02/2025",
    },
  ];

  const getColor = (estado: string) => {
    if (estado === "Pendiente") return "bg-yellow-100 text-yellow-700";
    if (estado === "En progreso") return "bg-blue-100 text-blue-700";
    return "bg-emerald-100 text-emerald-700";
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Tickets</h1>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        {tickets.map((t) => (
          <div
            key={t.id}
            className="grid grid-cols-4 items-center border-b last:border-none py-3"
          >
            <p>{t.propiedad}</p>
            <p className="text-slate-500">{t.descripcion}</p>
            <span
              className={`px-3 py-1 rounded-full text-xs text-center ${getColor(
                t.estado
              )}`}
            >
              {t.estado}
            </span>
            <p className="text-slate-500">{t.fecha}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
