"use client";

export default function ReportePreviewPage() {
  const datos = {
    titulo: "Reporte de Gestión — Enero 2025",
    ingresos: "Bs. 120,000",
    morosidad: "Bs. 25,300",
    contratosActivos: 85,
    ticketsFinalizados: 230,
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900">
        Vista previa del reporte
      </h1>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">
          {datos.titulo}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-xs text-slate-500">Ingresos</p>
            <p className="text-lg font-semibold text-slate-900">
              {datos.ingresos}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Morosidad</p>
            <p className="text-lg font-semibold text-red-600">
              {datos.morosidad}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Activos</p>
            <p className="text-lg font-semibold text-slate-900">
              {datos.contratosActivos}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Tickets fin.</p>
            <p className="text-lg font-semibold text-emerald-600">
              {datos.ticketsFinalizados}
            </p>
          </div>
        </div>

        <div className="mt-6 h-56 bg-slate-100 rounded-lg flex items-center justify-center text-sm text-slate-500">
          Gráfica del reporte (simulada)
        </div>

        <button className="w-full mt-4 px-4 py-2 rounded-md bg-emerald-500 text-white font-semibold hover:bg-emerald-600">
          Descargar PDF
        </button>
      </div>
    </div>
  );
}
