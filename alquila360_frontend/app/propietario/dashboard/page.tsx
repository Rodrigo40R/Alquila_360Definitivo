"use client";

export default function DashboardPropietario() {
  return (
    <div className="space-y-6">

      {/* TÍTULO */}
      <h1 className="text-2xl font-bold text-slate-100">Dashboard</h1>

      {/* TARJETAS RESUMEN */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
          <p className="text-sm text-slate-400">Propiedades</p>
          <h2 className="text-2xl font-bold text-emerald-400">12</h2>
        </div>

        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
          <p className="text-sm text-slate-400">Pagos recibidos</p>
          <h2 className="text-2xl font-bold text-emerald-400">Bs. 14,500</h2>
        </div>

        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
          <p className="text-sm text-slate-400">Tickets abiertos</p>
          <h2 className="text-2xl font-bold text-red-400">3</h2>
        </div>

      </div>

      {/* SECCIÓN PRINCIPAL: GRAFICO + LISTADOS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* GRAFICO SIMULADO */}
        <div className="lg:col-span-2 p-6 rounded-xl bg-slate-900 border border-slate-800">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">
            Ingresos del mes
          </h3>

          <div className="w-full h-48 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400">
            <p className="text-sm">Gráfico aquí (simulación)</p>
          </div>
        </div>

        {/* TICKETS RECIENTES */}
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">
            Tickets recientes
          </h3>

          <div className="space-y-3">

            <div className="p-3 rounded-lg bg-slate-800 border border-slate-700">
              <p className="text-sm text-slate-300">Filtro roto – Dpto #12</p>
              <p className="text-xs text-slate-500">Pendiente • 12/02/2025</p>
            </div>

            <div className="p-3 rounded-lg bg-slate-800 border border-slate-700">
              <p className="text-sm text-slate-300">Corte de luz – Casa #3</p>
              <p className="text-xs text-slate-500">En proceso • 11/02/2025</p>
            </div>

            <div className="p-3 rounded-lg bg-slate-800 border border-slate-700">
              <p className="text-sm text-slate-300">Goteras – PH #2</p>
              <p className="text-xs text-slate-500">Resuelto • 09/02/2025</p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
