"use client";

export default function AdminReservasPage() {
  const reservas = [
    {
      id: "#201",
      propiedad: "Departamento - Av. América",
      inquilino: "Carlos López",
      fechaInicio: "01/02/2025",
      fechaFin: "01/02/2026",
      estado: "Activa",
    },
    {
      id: "#202",
      propiedad: "Casa - Tiquipaya",
      inquilino: "María Gómez",
      fechaInicio: "15/01/2025",
      fechaFin: "15/01/2026",
      estado: "Por vencer",
    },
    {
      id: "#203",
      propiedad: "Garzonier - Cala Cala",
      inquilino: "José Ramírez",
      fechaInicio: "01/01/2024",
      fechaFin: "01/01/2025",
      estado: "Finalizada",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Gestión de reservas / contratos
          </h1>
          <p className="text-sm text-slate-600">
            Control centralizado de contratos registrados.
          </p>
        </div>
        <button className="px-4 py-2 rounded-md bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600">
          + Nuevo contrato
        </button>
      </div>

      <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">N°</th>
              <th className="px-4 py-3 text-left font-semibold">Propiedad</th>
              <th className="px-4 py-3 text-left font-semibold">Inquilino</th>
              <th className="px-4 py-3 text-left font-semibold">Inicio</th>
              <th className="px-4 py-3 text-left font-semibold">Fin</th>
              <th className="px-4 py-3 text-left font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((r) => (
              <tr
                key={r.id}
                className="border-t border-slate-200 hover:bg-slate-50 transition"
              >
                <td className="px-4 py-3 text-slate-700">{r.id}</td>
                <td className="px-4 py-3 text-slate-700">{r.propiedad}</td>
                <td className="px-4 py-3 text-slate-700">{r.inquilino}</td>
                <td className="px-4 py-3 text-slate-600">{r.fechaInicio}</td>
                <td className="px-4 py-3 text-slate-600">{r.fechaFin}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      r.estado === "Activa"
                        ? "bg-emerald-100 text-emerald-700"
                        : r.estado === "Por vencer"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {r.estado}
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
