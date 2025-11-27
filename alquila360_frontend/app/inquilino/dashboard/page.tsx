"use client";

export default function DashboardInquilinoPage() {
  const datos = {
    proximoPago: "12 FEB",
    monto: "Bs. 350",
    ticketsActivos: 2,
  };

  const pagos = [
    { monto: "Bs. 350", estado: "Pagado", fecha: "Hoy" },
    { monto: "Bs. 350", estado: "Pagado", fecha: "Hace 1 mes" },
    { monto: "Bs. 350", estado: "Pagado", fecha: "Hace 2 meses" },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-900">Panel del Inquilino</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Próximo pago</p>
          <p className="text-2xl font-bold text-slate-900">
            {datos.proximoPago}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Monto mensual</p>
          <p className="text-2xl font-bold text-emerald-600">{datos.monto}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Tickets activos</p>
          <p className="text-2xl font-bold text-slate-900">
            {datos.ticketsActivos}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="font-semibold text-slate-900 mb-4">Últimos pagos</p>
        <div className="space-y-3">
          {pagos.map((p, i) => (
            <div key={i} className="flex justify-between border-b pb-3">
              <div>
                <p className="font-medium text-slate-900">{p.monto}</p>
                <p className="text-xs text-slate-500">{p.fecha}</p>
              </div>
              <span className="px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700">
                {p.estado}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
