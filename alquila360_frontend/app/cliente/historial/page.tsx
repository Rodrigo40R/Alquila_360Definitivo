"use client";

export default function ClienteHistorialPage() {
  const historial = [
    {
      id: 1,
      tipo: "Solicitud de información",
      propiedad: "Departamento moderno en Cochabamba",
      fecha: "15/01/2025",
      estado: "Respondida",
    },
    {
      id: 2,
      tipo: "Solicitud de visita",
      propiedad: "Casa familiar en Tiquipaya",
      fecha: "20/01/2025",
      estado: "Pendiente",
    },
    {
      id: 3,
      tipo: "Solicitud de reserva",
      propiedad: "Garzonier en Cala Cala",
      fecha: "28/01/2025",
      estado: "Rechazada",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Historial de solicitudes
        </h1>
        <p className="text-sm text-slate-600">
          Revisa las solicitudes que enviaste a propietarios.
        </p>
      </div>

      <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Tipo</th>
              <th className="px-4 py-3 text-left font-semibold">Propiedad</th>
              <th className="px-4 py-3 text-left font-semibold">Fecha</th>
              <th className="px-4 py-3 text-left font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody>
            {historial.map((h) => (
              <tr
                key={h.id}
                className="border-t border-slate-200 hover:bg-slate-50 transition"
              >
                <td className="px-4 py-3 text-slate-700">{h.tipo}</td>
                <td className="px-4 py-3 text-slate-700">{h.propiedad}</td>
                <td className="px-4 py-3 text-slate-600">{h.fecha}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      h.estado === "Respondida"
                        ? "bg-emerald-100 text-emerald-700"
                        : h.estado === "Pendiente"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {h.estado}
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
