"use client";

export default function HistorialTicketsPage() {
  const historial = [
    { id: "#23", propiedad: "Cala Cala", estado: "Resuelto", fecha: "12/01/2025" },
    { id: "#18", propiedad: "Tiquipaya", estado: "Resuelto", fecha: "05/01/2025" },
    { id: "#15", propiedad: "Av. América", estado: "Cancelado", fecha: "01/01/2025" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Historial de Tickets</h1>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
        {historial.map((t, i) => (
          <div key={i} className="flex justify-between border-b pb-3">
            <div>
              <p className="font-semibold">{t.id}</p>
              <p className="text-xs text-slate-500">{t.propiedad}</p>
            </div>

            <div className="flex flex-col text-right">
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  t.estado === "Resuelto"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {t.estado}
              </span>

              <p className="text-xs text-slate-500">{t.fecha}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
