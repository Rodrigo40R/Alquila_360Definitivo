"use client";

import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const router = useRouter();

  return (
    <div className="px-6 py-6 space-y-6">
      {/* FILA DE TARJETAS RESUMEN (puedes adaptar a tus datos) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-white shadow-sm border border-slate-200 p-4">
          <p className="text-xs font-medium text-slate-500">Ingresos del mes</p>
          <p className="mt-2 text-3xl font-bold text-emerald-600">$100,000</p>
        </div>
        <div className="rounded-2xl bg-white shadow-sm border border-slate-200 p-4">
          <p className="text-xs font-medium text-slate-500">Morosidad total</p>
          <p className="mt-2 text-3xl font-bold text-rose-500">$20,000</p>
        </div>
        <div className="rounded-2xl bg-white shadow-sm border border-slate-200 p-4">
          <p className="text-xs font-medium text-slate-500">% de ocupados</p>
          <p className="mt-2 text-3xl font-bold text-emerald-600">82%</p>
        </div>
        <div className="rounded-2xl bg-white shadow-sm border border-slate-200 p-4">
          <p className="text-xs font-medium text-slate-500">
            Tickets pendientes
          </p>
          <p className="mt-2 text-3xl font-bold text-amber-500">5</p>
        </div>
      </div>

      {/* MOROSIDAD VS PAGOS + ALERTAS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Morosidad vs pagos */}
        <div className="lg:col-span-2 rounded-2xl bg-white shadow-sm border border-dashed border-emerald-200 p-6 transition-colors duration-200 hover:bg-black group">
           <p className="text-sm font-semibold text-slate-700 mb-1 group-hover:text-white">
            Morosidad vs Pagos
          </p>
         <p className="text-xs text-slate-500 mb-6 group-hover:text-white">últimos 6 meses</p>
        <p className="text-sm text-slate-400 group-hover:text-white">
        Gráfico Morosidad vs Pagos (placeholder)
        </p>
        </div>

        {/* Alertas */}
        <div className="rounded-2xl bg-white shadow-sm border border-slate-200 p-4 space-y-3">
          <p className="text-sm font-semibold text-slate-700 mb-2">Alertas</p>

          <div className="rounded-xl bg-emerald-50 border border-emerald-100 px-3 py-2 text-xs text-slate-700">
            <p className="font-semibold text-slate-800">Contrato #305</p>
            <p>Por vencer</p>
          </div>

          <div className="rounded-xl bg-emerald-50 border border-emerald-100 px-3 py-2 text-xs text-slate-700">
            <p className="font-semibold text-slate-800">
              Alerta de falta de pago
            </p>
            <p>por Julio Cesar</p>
          </div>

          <div className="rounded-xl bg-emerald-50 border border-emerald-100 px-3 py-2 text-xs text-slate-700">
            <p className="font-semibold text-slate-800">Ticket de</p>
            <p>mantenimiento sin asignar</p>
          </div>
        </div>
      </div>

      {/* NUEVO CONTRATO + REGISTRAR PAGO */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        {/* Botones de acción */}
        <div className="space-y-3">
          {/* 👉 ESTE BOTÓN VA A /admin/contratos */}
          <button
            type="button"
            onClick={() => router.push("/admin/contratos")}
            className="w-full rounded-2xl bg-white border border-slate-200 px-5 py-4 flex items-center justify-between text-sm font-semibold text-slate-800 shadow-sm hover:border-emerald-400 hover:shadow-md transition"
          >
            <span>+ Nuevo Contrato</span>
          </button>

          {/* 👉 ESTE BOTÓN VA A /admin/pagos */}
          <button
            type="button"
            onClick={() => router.push("/admin/pagos")}
            className="w-full rounded-2xl bg-emerald-500 px-5 py-4 flex items-center justify-between text-sm font-semibold text-white shadow-md hover:bg-emerald-600 transition"
          >
            <span>+ Registrar Pago</span>
          </button>
        </div>

        {/* Estado de tickets (placeholder sencillo) */}
        <div className="rounded-2xl bg-white shadow-sm border border-slate-200 p-4">
          <p className="text-sm font-semibold text-slate-700 mb-3">
            Estado de Tickets
          </p>
          <ul className="text-xs text-slate-600 space-y-1">
            <li>Solicitado: 3</li>
            <li>En Proceso: 3</li>
            <li>Finalizado: 4</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
