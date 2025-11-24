"use client";

export default function HistorialReservasCliente() {
  const historial = [
    { propiedad: "Departamento Cala Cala", fecha: "12/01/2025", estado: "Aceptada" },
    { propiedad: "Casa Tiquipaya", fecha: "05/12/2024", estado: "Rechazada" },
    { propiedad: "Garzonier América", fecha: "28/11/2024", estado: "Cancelada" },
  ];

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-900">Historial de reservas</h1>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        {historial.map((r, i) => (
          <div key={i} className="flex justify-between border-b pb-3">
            <div>
              <p className="font-medium">{r.propiedad}</p>
              <p className="text-xs text-slate-500">{r.fecha}</p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs ${
                r.estado === "Aceptada"
                  ? "bg-emerald-100 text-emerald-700"
                  : r.estado === "Rechazada"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {r.estado}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
