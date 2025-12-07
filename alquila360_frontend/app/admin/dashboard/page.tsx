"use client";

import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const router = useRouter();

  return (
    <div className="px-6 py-6 space-y-6">
      {/* FILA DE TARJETAS RESUMEN */}
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

      {/* ALERTAS + RESUMEN GENERAL  (SIN GRÁFICO) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Alertas (mismos datos que ya tenías) */}
        <div className="rounded-2xl bg-white shadow-sm border border-slate-200 p-4 space-y-3">
          <p className="text-sm font-semibold text-slate-700 mb-1">Alertas</p>

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

        {/* Resumen General (reemplaza al gráfico para que no se vea vacío) */}
        <div className="rounded-2xl bg-white shadow-sm border border-slate-200 p-4">
          <p className="text-sm font-semibold text-slate-700 mb-3">
            Resumen general
          </p>
          <ul className="space-y-2 text-xs text-slate-700">
            <li>
              • Ingresos del mes actuales:{" "}
              <span className="font-semibold text-emerald-600">$100,000</span>
            </li>
            <li>
              • Morosidad total estimada:{" "}
              <span className="font-semibold text-rose-500">$20,000</span>
            </li>
            <li>
              • Porcentaje de ocupación:{" "}
              <span className="font-semibold text-emerald-600">82%</span>
            </li>
            <li>
              • Tickets pendientes de resolución:{" "}
              <span className="font-semibold text-amber-500">5</span>
            </li>
            <li>• Revisa contratos próximos a vencer y pagos atrasados.</li>
          </ul>
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

        {/* Estado de tickets (igual que antes) */}
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
