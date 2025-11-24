"use client";

export default function ClienteReservasPage() {
  const reservas = [
    { propiedad: "Depto Cala Cala", fecha: "12 FEB 2025", estado: "Confirmada" },
    { propiedad: "Casa Tiquipaya", fecha: "22 MAR 2025", estado: "Pendiente" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Mis Reservas</h1>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
        {reservas.map((r, i) => (
          <div
            key={i}
            className="flex justify-between items-center border-b pb-3"
          >
            <div>
              <p className="font-medium text-slate-900">{r.propiedad}</p>
              <p className="text-xs text-slate-500">{r.fecha}</p>
            </div>

            <span
              className={`px-3 py-1 text-xs rounded-full ${
                r.estado === "Confirmada"
                  ? "bg-emerald-100 text-emerald-700"
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
