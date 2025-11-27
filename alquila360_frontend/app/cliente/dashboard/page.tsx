"use client";

export default function DashboardCliente() {
  const stats = [
    { label: "Reservas activas", valor: 1 },
    { label: "Propiedades vistas", valor: 14 },
    { label: "Tickets enviados", valor: 2 },
  ];

  const reservas = [
    {
      propiedad: "Departamento Cala Cala",
      fecha: "12 FEB 2025",
      estado: "Confirmada",
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-900">Mi Panel</h1>

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

      {/* Reservas */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-lg font-semibold text-slate-900 mb-3">
          Reservas activas
        </p>

        {reservas.map((r, i) => (
          <div key={i} className="border-b py-3 flex justify-between">
            <div>
              <p className="font-medium">{r.propiedad}</p>
              <p className="text-xs text-slate-500">Fecha: {r.fecha}</p>
            </div>

            <span className="px-3 py-1 rounded-full text-xs bg-emerald-100 text-emerald-700">
              {r.estado}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
