"use client";

export default function InquilinoTicketsPage() {
  const tickets = [
    {
      id: "#03",
      asunto: "Fuga en la ducha",
      fecha: "28/01/2025",
      estado: "En proceso",
    },
    {
      id: "#04",
      asunto: "Luces parpadean en sala",
      fecha: "30/01/2025",
      estado: "Registrado",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Tickets de mantenimiento
          </h1>
          <p className="text-sm text-slate-600">
            Revisa el estado de tus solicitudes de mantenimiento.
          </p>
        </div>
        <button className="px-4 py-2 rounded-md bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600">
          + Nuevo ticket
        </button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm w-full overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">N° Ticket</th>
              <th className="px-4 py-3 text-left font-semibold">Asunto</th>
              <th className="px-4 py-3 text-left font-semibold">Fecha</th>
              <th className="px-4 py-3 text-left font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr
                key={t.id}
                className="border-t border-slate-200 hover:bg-slate-50 transition"
              >
                <td className="px-4 py-3 text-slate-700">{t.id}</td>
                <td className="px-4 py-3 text-slate-700">{t.asunto}</td>
                <td className="px-4 py-3 text-slate-600">{t.fecha}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      t.estado === "En proceso"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {t.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
