"use client";

export default function DashboardTecnicoPage() {
  const stats = [
    { label: "Tickets activos", valor: 3 },
    { label: "Tickets finalizados", valor: 18 },
  ];

  const tickets = [
    { id: "#12", propiedad: "Casa Brasil", estado: "En proceso" },
    { id: "#15", propiedad: "Santa Fe 203", estado: "Pendiente" },
    { id: "#18", propiedad: "Av. América", estado: "Pendiente" },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-900">Panel del Técnico</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="font-semibold text-slate-900 mb-4">Tickets asignados</p>
        <div className="space-y-3">
          {tickets.map((t, i) => (
            <div
              key={i}
              className="flex justify-between border-b pb-3 items-center"
            >
              <div>
                <p className="font-medium text-slate-900">{t.id}</p>
                <p className="text-xs text-slate-500">{t.propiedad}</p>
              </div>

              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  t.estado === "En proceso"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {t.estado}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
