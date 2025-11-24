export default function PDFReportTemplate() {
  return (
    <div className="p-10 text-slate-900 bg-white text-sm">
      <h1 className="text-2xl font-bold mb-6">Reporte General — Enero 2025</h1>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 border border-slate-200 rounded-lg">
          <p className="text-xs text-slate-500">Ingresos</p>
          <p className="text-lg font-bold">Bs. 120,000</p>
        </div>
        <div className="p-4 border border-slate-200 rounded-lg">
          <p className="text-xs text-slate-500">Morosidad</p>
          <p className="text-lg font-bold text-red-600">Bs. 25,300</p>
        </div>
        <div className="p-4 border border-slate-200 rounded-lg">
          <p className="text-xs text-slate-500">Contratos activos</p>
          <p className="text-lg font-bold">85</p>
        </div>
        <div className="p-4 border border-slate-200 rounded-lg">
          <p className="text-xs text-slate-500">Tickets finalizados</p>
          <p className="text-lg font-bold text-emerald-600">230</p>
        </div>
      </div>

      <div className="h-56 bg-slate-200 rounded-lg flex items-center justify-center">
        Gráfica generada aquí
      </div>

      <p className="mt-10 text-xs text-slate-500">
        * Este reporte fue generado automáticamente por ALQUILA360.
      </p>
    </div>
  );
}
