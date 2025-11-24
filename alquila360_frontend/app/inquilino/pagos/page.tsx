"use client";

export default function InquilinoPagosPage() {
  const pagos = [
    {
      id: 1,
      concepto: "Alquiler Enero",
      fecha: "01/01/2025",
      monto: "Bs. 2,500",
      estado: "Pagado",
    },
    {
      id: 2,
      concepto: "Alquiler Febrero",
      fecha: "05/02/2025",
      monto: "Bs. 2,500",
      estado: "Pendiente",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Mis pagos</h1>
        <p className="text-sm text-slate-600">
          Consulta tus pagos realizados y pendientes.
        </p>
      </div>

      <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Concepto</th>
              <th className="px-4 py-3 text-left font-semibold">Fecha</th>
              <th className="px-4 py-3 text-left font-semibold">Monto</th>
              <th className="px-4 py-3 text-left font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody>
            {pagos.map((p) => (
              <tr
                key={p.id}
                className="border-t border-slate-200 hover:bg-slate-50 transition"
              >
                <td className="px-4 py-3 text-slate-700">{p.concepto}</td>
                <td className="px-4 py-3 text-slate-600">{p.fecha}</td>
                <td className="px-4 py-3 text-emerald-600 font-semibold">
                  {p.monto}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      p.estado === "Pagado"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {p.estado}
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
