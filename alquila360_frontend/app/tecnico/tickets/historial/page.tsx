"use client";

export default function HistorialTecnico() {
  const historial = [
    { id: "#80", descripcion: "Fuga de agua", fecha: "01/02/2025", estado: "Resuelto" },
    { id: "#76", descripcion: "Cerrajería", fecha: "29/01/2025", estado: "Resuelto" },
    { id: "#70", descripcion: "Cable eléctrico suelto", fecha: "27/01/2025", estado: "Resuelto" },
  ];

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-900">Historial</h1>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        {historial.map((h) => (
          <div key={h.id} className="grid grid-cols-3 border-b last:border-none py-3">
            <p className="font-semibold">{h.id}</p>
            <p className="text-slate-600">{h.descripcion}</p>
            <p className="text-emerald-600 text-sm">{h.estado}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
