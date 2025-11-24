"use client";

export default function HistorialServiciosProveedor() {
  const historial = [
    { id: "#180", tipo: "Electricidad", fecha: "01/02/25", estado: "Completado" },
    { id: "#176", tipo: "Plomería", fecha: "29/01/25", estado: "Completado" },
    { id: "#170", tipo: "Carpintería", fecha: "27/01/25", estado: "Completado" },
  ];

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-2xl font-bold text-slate-900">Historial</h1>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        {historial.map((h) => (
          <div
            key={h.id}
            className="grid grid-cols-3 border-b py-3 last:border-none"
          >
            <p className="font-semibold">{h.id}</p>
            <p className="text-slate-700">{h.tipo}</p>
            <span className="text-emerald-600 text-sm">{h.estado}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
