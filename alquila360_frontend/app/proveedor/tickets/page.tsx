"use client";

export default function ProveedorTicketsPage() {
  const tickets = [
    {
      id: "#12",
      propiedad: "Casa Brasil",
      descripcion: "Cambio de enchufe quemado",
      estado: "Pendiente",
    },
    {
      id: "#15",
      propiedad: "Santa Fe 203",
      descripcion: "Fuga de agua cocina",
      estado: "En proceso",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Mis tickets</h1>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="px-3 py-2 text-left">Ticket</th>
              <th className="px-3 py-2 text-left">Propiedad</th>
              <th className="px-3 py-2 text-left">Descripción</th>
              <th className="px-3 py-2 text-left">Estado</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((t) => (
              <tr
                key={t.id}
                className="border-t border-slate-200 hover:bg-slate-50"
              >
                <td className="px-3 py-2">{t.id}</td>
                <td className="px-3 py-2">{t.propiedad}</td>
                <td className="px-3 py-2">{t.descripcion}</td>
                <td className="px-3 py-2">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      t.estado === "Pendiente"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-emerald-100 text-emerald-700"
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
