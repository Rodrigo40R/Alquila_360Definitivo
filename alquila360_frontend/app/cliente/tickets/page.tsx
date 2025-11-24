"use client";

export default function ClienteTicketsPage() {
  const tickets = [
    {
      id: "#01",
      asunto: "Problema con la cerradura",
      estado: "Resuelto",
    },
    {
      id: "#02",
      asunto: "Humedad en la pared",
      estado: "En proceso",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Mis Tickets</h1>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        {tickets.map((t, i) => (
          <div key={i} className="flex justify-between border-b py-3">
            <div>
              <p className="font-medium text-slate-900">{t.id}</p>
              <p className="text-xs text-slate-500">{t.asunto}</p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs ${
                t.estado === "Resuelto"
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
  );
}
