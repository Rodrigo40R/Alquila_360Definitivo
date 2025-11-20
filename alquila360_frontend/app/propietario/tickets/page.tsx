"use client";

export default function TicketsPropietario() {
  const tickets = [
    {
      id: 1,
      titulo: "Goteras en el techo",
      propiedad: "Casa - Tiquipaya",
      fecha: "12/02/2025",
      estado: "Pendiente",
    },
    {
      id: 2,
      titulo: "Corte de luz",
      propiedad: "Departamento - Av. América",
      fecha: "10/02/2025",
      estado: "En proceso",
    },
    {
      id: 3,
      titulo: "Puerta dañada",
      propiedad: "Garzonier - Cala Cala",
      fecha: "05/02/2025",
      estado: "Resuelto",
    },
  ];

  return (
    <div className="space-y-6">
      {/* TÍTULO */}
      <h1 className="text-2xl font-bold text-slate-100">Tickets</h1>

      {/* LISTA */}
      <div className="space-y-4">
        {tickets.map((t) => (
          <div
            key={t.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex justify-between items-center hover:bg-slate-800/50 transition"
          >
            <div>
              <h2 className="text-lg font-semibold text-slate-200">
                {t.titulo}
              </h2>
              <p className="text-sm text-slate-400">{t.propiedad}</p>
              <p className="text-xs text-slate-500 mt-1">{t.fecha}</p>
            </div>

            <span
              className={`px-4 py-1 text-xs font-semibold rounded-full ${
                t.estado === "Pendiente"
                  ? "bg-yellow-500/20 text-yellow-300"
                  : t.estado === "En proceso"
                  ? "bg-blue-500/20 text-blue-300"
                  : "bg-emerald-500/20 text-emerald-300"
              }`}
            >
              {t.estado}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
