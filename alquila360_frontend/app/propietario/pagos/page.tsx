"use client";

export default function PagosPropietario() {
  const pagos = [
    {
      id: 1,
      propiedad: "Departamento - Av. América",
      inquilino: "Carlos López",
      monto: "Bs. 2,500",
      fecha: "05/02/2025",
      estado: "Completado",
    },
    {
      id: 2,
      propiedad: "Casa - Tiquipaya",
      inquilino: "María Gómez",
      monto: "Bs. 3,800",
      fecha: "01/02/2025",
      estado: "Pendiente",
    },
    {
      id: 3,
      propiedad: "Garzonier - Cala Cala",
      inquilino: "José Ramírez",
      monto: "Bs. 1,500",
      fecha: "28/01/2025",
      estado: "Atrasado",
    },
  ];

  return (
    <div className="space-y-6">
      {/* TÍTULO */}
      <h1 className="text-2xl font-bold text-slate-900">Pagos</h1>

      {/* TABLA */}
      <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Propiedad</th>
              <th className="px-4 py-3 text-left font-semibold">Inquilino</th>
              <th className="px-4 py-3 text-left font-semibold">Monto</th>
              <th className="px-4 py-3 text-left font-semibold">Fecha</th>
              <th className="px-4 py-3 text-left font-semibold">Estado</th>
            </tr>
          </thead>

          <tbody>
            {pagos.map((pago) => (
              <tr
                key={pago.id}
                className="border-t border-slate-200 hover:bg-slate-50 transition"
              >
                <td className="px-4 py-3 text-slate-700">{pago.propiedad}</td>
                <td className="px-4 py-3 text-slate-700">{pago.inquilino}</td>
                <td className="px-4 py-3 text-emerald-600 font-semibold">
                  {pago.monto}
                </td>
                <td className="px-4 py-3 text-slate-600">{pago.fecha}</td>

                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      pago.estado === "Completado"
                        ? "bg-emerald-100 text-emerald-700"
                        : pago.estado === "Pendiente"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {pago.estado}
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
