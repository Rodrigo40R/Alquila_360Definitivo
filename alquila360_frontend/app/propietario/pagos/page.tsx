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
      <h1 className="text-2xl font-bold text-slate-100">Pagos</h1>

      {/* TABLA */}
      <div className="w-full overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
        <table className="w-full text-sm">
          <thead className="bg-slate-800/60 text-slate-300">
            <tr>
              <th className="px-4 py-3 text-left">Propiedad</th>
              <th className="px-4 py-3 text-left">Inquilino</th>
              <th className="px-4 py-3 text-left">Monto</th>
              <th className="px-4 py-3 text-left">Fecha</th>
              <th className="px-4 py-3 text-left">Estado</th>
            </tr>
          </thead>

          <tbody>
            {pagos.map((pago) => (
              <tr
                key={pago.id}
                className="border-t border-slate-800 hover:bg-slate-800/40 transition"
              >
                <td className="px-4 py-3 text-slate-200">{pago.propiedad}</td>
                <td className="px-4 py-3 text-slate-300">{pago.inquilino}</td>
                <td className="px-4 py-3 text-emerald-400 font-semibold">
                  {pago.monto}
                </td>
                <td className="px-4 py-3 text-slate-400">{pago.fecha}</td>

                {/* ESTADO DE COLOR */}
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      pago.estado === "Completado"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : pago.estado === "Pendiente"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
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
