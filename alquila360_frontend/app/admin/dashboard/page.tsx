"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

type Metrics = {
  ingresosMes: number;
  morosidadTotal: number;
  porcentajeOcupacion: number;
  ticketsPendientes: number;
  ticketsSolicitado: number;
  ticketsEnProceso: number;
  ticketsFinalizado: number;
};

function formatBs(value: number) {
  return `Bs. ${value.toLocaleString("es-BO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

export default function AdminDashboardPage() {
  const router = useRouter();

  const [metrics, setMetrics] = useState<Metrics>({
    ingresosMes: 0,
    morosidadTotal: 0,
    porcentajeOcupacion: 0,
    ticketsPendientes: 0,
    ticketsSolicitado: 0,
    ticketsEnProceso: 0,
    ticketsFinalizado: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargarDashboard() {
      try {
        setLoading(true);
        setError(null);

        const [resPagos, resProps, resContratos, resTickets] = await Promise.all(
          [
            fetch(`${API_URL}/pagos`, { cache: "no-store" }),
            fetch(`${API_URL}/propiedades`, { cache: "no-store" }),
            fetch(`${API_URL}/contrato`, { cache: "no-store" }),
            fetch(`${API_URL}/tickets`, { cache: "no-store" }),
          ]
        );

        const [pagosData, propsData, contratosData, ticketsData] =
          await Promise.all([
            resPagos.ok ? resPagos.json() : [],
            resProps.ok ? resProps.json() : [],
            resContratos.ok ? resContratos.json() : [],
            resTickets.ok ? resTickets.json() : [],
          ]);

        // 1) INGRESOS DEL MES (pagos del mes actual)
        const ahora = new Date();
        const mesActual = ahora.getMonth();
        const anioActual = ahora.getFullYear();

        let ingresosMes = 0;
        if (Array.isArray(pagosData)) {
          ingresosMes = pagosData.reduce((acc: number, p: any) => {
            const fecha = p.fecha_pago || p.fecha || p.createdAt;
            const monto = Number(p.monto ?? 0);
            if (!fecha || isNaN(monto)) return acc;

            const d = new Date(fecha);
            if (
              d.getMonth() === mesActual &&
              d.getFullYear() === anioActual
            ) {
              return acc + monto;
            }
            return acc;
          }, 0);
        }

        // 2) MOROSIDAD TOTAL (mejor esfuerzo: cuotas pendientes, si existe /cuotas)
        let morosidadTotal = 0;
        try {
          const resCuotas = await fetch(`${API_URL}/cuotas`, {
            cache: "no-store",
          });
          if (resCuotas.ok) {
            const cuotasData = await resCuotas.json();
            if (Array.isArray(cuotasData)) {
              morosidadTotal = cuotasData
                .filter((c: any) => {
                  const est = (c.estado || "").toUpperCase();
                  return (
                    est === "PENDIENTE" ||
                    est === "ATRASADA" ||
                    est === "VENCIDA"
                  );
                })
                .reduce((acc: number, c: any) => {
                  const monto = Number(
                    c.monto ?? c.monto_cuota ?? 0
                  );
                  return acc + (isNaN(monto) ? 0 : monto);
                }, 0);
            }
          }
        } catch {
          // Si no existe /cuotas o falla, dejamos morosidadTotal en 0
          morosidadTotal = 0;
        }

        // 3) % OCUPACIÓN = contratos activos / propiedades totales
        const totalPropiedades = Array.isArray(propsData)
          ? propsData.length
          : 0;

        let contratosActivos = 0;
        if (Array.isArray(contratosData)) {
          contratosActivos = contratosData.filter((c: any) => {
            const est = (c.estado || "").toUpperCase();
            return (
              est === "VIGENTE" ||
              est === "ACTIVO" ||
              est === "RENOVADO" ||
              est === "" // por si vienen nulos
            );
          }).length;
        }

        const porcentajeOcupacion =
          totalPropiedades > 0
            ? Math.round((contratosActivos / totalPropiedades) * 100)
            : 0;

        // 4) TICKETS (pendientes + breakdown por estado)
        let ticketsPendientes = 0;
        let ticketsSolicitado = 0;
        let ticketsEnProceso = 0;
        let ticketsFinalizado = 0;

        if (Array.isArray(ticketsData)) {
          ticketsPendientes = ticketsData.filter((t: any) => {
            const e = (t.estado || "").toUpperCase();
            return e === "PENDIENTE";
          }).length;

          ticketsSolicitado = ticketsData.filter((t: any) => {
            const e = (t.estado || "").toUpperCase();
            return e === "PENDIENTE" || e === "SOLICITADO";
          }).length;

          ticketsEnProceso = ticketsData.filter((t: any) => {
            const e = (t.estado || "").toUpperCase();
            return e === "EN_PROCESO" || e === "EN PROCESO";
          }).length;

          ticketsFinalizado = ticketsData.filter((t: any) => {
            const e = (t.estado || "").toUpperCase();
            return (
              e === "RESUELTO" ||
              e === "FINALIZADO" ||
              e === "CERRADO"
            );
          }).length;
        }

        setMetrics({
          ingresosMes,
          morosidadTotal,
          porcentajeOcupacion,
          ticketsPendientes,
          ticketsSolicitado,
          ticketsEnProceso,
          ticketsFinalizado,
        });
      } catch (err: any) {
        console.error("Error cargando dashboard admin:", err);
        setError(
          err?.message || "No se pudieron cargar los datos del dashboard."
        );
      } finally {
        setLoading(false);
      }
    }

    cargarDashboard();
  }, []);

  if (loading) {
    return (
      <div className="px-6 py-6 text-slate-500">
        Cargando dashboard de administrador…
      </div>
    );
  }

  return (
    <div className="px-6 py-6 space-y-6">
      {error && (
        <p className="text-sm text-red-500 mb-2">
          {error}
        </p>
      )}

      {/* FILA DE TARJETAS RESUMEN */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-white shadow-sm border border-slate-200 p-4">
          <p className="text-xs font-medium text-slate-500">Ingresos del mes</p>
          <p className="mt-2 text-3xl font-bold text-emerald-600">
            {formatBs(metrics.ingresosMes)}
          </p>
        </div>
        <div className="rounded-2xl bg-white shadow-sm border border-slate-200 p-4">
          <p className="text-xs font-medium text-slate-500">Morosidad total</p>
          <p className="mt-2 text-3xl font-bold text-rose-500">
            {formatBs(metrics.morosidadTotal)}
          </p>
        </div>
        <div className="rounded-2xl bg-white shadow-sm border border-slate-200 p-4">
          <p className="text-xs font-medium text-slate-500">% de ocupados</p>
          <p className="mt-2 text-3xl font-bold text-emerald-600">
            {metrics.porcentajeOcupacion}%
          </p>
        </div>
        <div className="rounded-2xl bg-white shadow-sm border border-slate-200 p-4">
          <p className="text-xs font-medium text-slate-500">
            Tickets pendientes
          </p>
          <p className="mt-2 text-3xl font-bold text-amber-500">
            {metrics.ticketsPendientes}
          </p>
        </div>
      </div>

      {/* ALERTAS + RESUMEN GENERAL  (siguen siendo estáticas de momento) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Alertas */}
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

        {/* Resumen General */}
        <div className="rounded-2xl bg-white shadow-sm border border-slate-200 p-4">
          <p className="text-sm font-semibold text-slate-700 mb-3">
            Resumen general
          </p>
          <ul className="space-y-2 text-xs text-slate-700">
            <li>
              • Ingresos del mes actuales:{" "}
              <span className="font-semibold text-emerald-600">
                {formatBs(metrics.ingresosMes)}
              </span>
            </li>
            <li>
              • Morosidad total estimada:{" "}
              <span className="font-semibold text-rose-500">
                {formatBs(metrics.morosidadTotal)}
              </span>
            </li>
            <li>
              • Porcentaje de ocupación:{" "}
              <span className="font-semibold text-emerald-600">
                {metrics.porcentajeOcupacion}%
              </span>
            </li>
            <li>
              • Tickets pendientes de resolución:{" "}
              <span className="font-semibold text-amber-500">
                {metrics.ticketsPendientes}
              </span>
            </li>
            <li>• Revisa contratos próximos a vencer y pagos atrasados.</li>
          </ul>
        </div>
      </div>

      {/* NUEVO CONTRATO + REGISTRAR PAGO */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => router.push("/admin/contratos")}
            className="w-full rounded-2xl bg-white border border-slate-200 px-5 py-4 flex items-center justify-between text-sm font-semibold text-slate-800 shadow-sm hover:border-emerald-400 hover:shadow-md transition"
          >
            <span>+ Nuevo Contrato</span>
          </button>

          <button
            type="button"
            onClick={() => router.push("/admin/pagos")}
            className="w-full rounded-2xl bg-emerald-500 px-5 py-4 flex items-center justify-between text-sm font-semibold text-white shadow-md hover:bg-emerald-600 transition"
          >
            <span>+ Registrar Pago</span>
          </button>
        </div>

        {/* Estado de Tickets conectado */}
        <div className="rounded-2xl bg-white shadow-sm border border-slate-200 p-4">
          <p className="text-sm font-semibold text-slate-700 mb-3">
            Estado de Tickets
          </p>
          <ul className="text-xs text-slate-600 space-y-1">
            <li>Solicitado: {metrics.ticketsSolicitado}</li>
            <li>En Proceso: {metrics.ticketsEnProceso}</li>
            <li>Finalizado: {metrics.ticketsFinalizado}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
