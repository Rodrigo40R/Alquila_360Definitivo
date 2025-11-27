"use client";

export default function InquilinoDashboardPage() {
  const tarjetas = [
    {
      titulo: "Próximo pago",
      valor: "Bs. 2,500",
      detalle: "Vence el 05/02/2025",
    },
    {
      titulo: "Tickets abiertos",
      valor: "2",
      detalle: "1 en alta prioridad",
    },
    {
      titulo: "Contratos activos",
      valor: "1",
      detalle: "Casa Brasil",
    },
    {
      titulo: "Pagos realizados",
      valor: "12",
      detalle: "Últimos 12 meses",
    },
  ];

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

  const tickets = [
    {
      id: "#03",
      asunto: "Fuga de agua en baño",
      estado: "En proceso",
    },
    {
      id: "#04",
      asunto: "Revisión de enchufes",
      estado: "Registrado",
    },
  ];

  return (
    <div className="space-y-6">
      {/* ENCABEZADO */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Panel del inquilino
        </h1>
        <p className="text-sm text-slate-600">
          Resumen de tus pagos, contrato y tickets de mantenimiento.
        </p>
      </div>

      {/* TARJETAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tarjetas.map((t) => (
          <div
            key={t.titulo}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <p className="text-xs text-slate-500">{t.titulo}</p>
            <p className="mt-2 text-xl font-semibold text-slate-900">
              {t.valor}
            </p>
            <p className="mt-1 text-xs text-slate-500">{t.detalle}</p>
          </div>
        ))}
      </div>

      {/* PAGOS + TICKETS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Pagos recientes */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold text-slate-900 mb-3">
            Historial de pagos
          </p>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">
                    Concepto
                  </th>
                  <th className="px-4 py-2 text-left font-semibold">Fecha</th>
                  <th className="px-4 py-2 text-left font-semibold">Monto</th>
                  <th className="px-4 py-2 text-left font-semibold">Estado</th>
                </tr>
              </thead>
              <tbody>
                {pagos.map((p) => (
                  <tr
                    key={p.id}
                    className="border-t border-slate-200 hover:bg-slate-50 transition"
                  >
                    <td className="px-4 py-2 text-slate-700">{p.concepto}</td>
                    <td className="px-4 py-2 text-slate-600">{p.fecha}</td>
                    <td className="px-4 py-2 text-emerald-600 font-semibold">
                      {p.monto}
                    </td>
                    <td className="px-4 py-2">
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

        {/* Tickets */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold text-slate-900 mb-3">
            Tickets recientes
          </p>
          <div className="space-y-2 text-sm">
            {tickets.map((t) => (
              <div
                key={t.id}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
              >
                <p className="font-semibold text-slate-900">{t.asunto}</p>
                <p className="text-xs text-slate-600">{t.id}</p>
                <p className="mt-1 text-xs">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                      t.estado === "En proceso"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {t.estado}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
