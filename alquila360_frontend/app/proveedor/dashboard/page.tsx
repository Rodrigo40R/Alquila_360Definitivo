"use client";

export default function DashboardProveedor() {
  const stats = [
    { label: "Servicios activos", valor: 5 },
    { label: "Tickets asignados", valor: 3 },
    { label: "Servicios completados", valor: 21 },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-900">Panel del Proveedor</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-slate-500">{s.label}</p>
            <p className="text-2xl font-bold text-slate-900">{s.valor}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
