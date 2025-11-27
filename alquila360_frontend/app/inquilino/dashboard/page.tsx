"use client";

import { useEffect, useState } from "react";
import {
  getInquilinoDashboard,
  type DashboardInquilino,
} from "@/app/services/user.services";
import { getCurrentUser } from "@/lib/auth";

// "2026-02-12" -> "12 FEB"
function formatFechaCorta(iso: string) {
  const date = new Date(iso);
  const dia = date.getDate().toString().padStart(2, "0");
  const mes = date.toLocaleString("es-ES", { month: "short" }).toUpperCase();
  return `${dia} ${mes}`;
}

// Devuelve textos tipo "Hoy", "Hace 1 mes", etc.
function formatFechaRelativa(iso: string) {
  const fecha = new Date(iso);
  const hoy = new Date();

  const diffMs = hoy.getTime() - fecha.getTime();
  const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDias === 0) return "Hoy";
  if (diffDias === 1) return "Hace 1 día";
  if (diffDias < 30) return `Hace ${diffDias} días`;

  const diffMeses = Math.floor(diffDias / 30);
  if (diffMeses === 1) return "Hace 1 mes";
  return `Hace ${diffMeses} meses`;
}

export default function DashboardInquilinoPage() {
  const [dashboard, setDashboard] = useState<DashboardInquilino | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargarDashboard() {
      try {
        setLoading(true);

        const user = getCurrentUser();
        console.log("Usuario en sesión (dashboard):", user);

        if (!user) {
          setError("No hay usuario en sesión. Inicia sesión nuevamente.");
          return;
        }

        if (!user.id) {
          setError(
            "El usuario en sesión no tiene un id válido (revisa el payload del JWT en la consola)."
          );
          return;
        }

          const data = await getInquilinoDashboard(user.id);
        setDashboard(data);
      } catch (err: any) {
        console.error(err);
        setError("No se pudo cargar el panel del inquilino.");
      } finally {
        setLoading(false);
      }
    }

    cargarDashboard();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Panel del Inquilino
        </h1>
        <p>Cargando...</p>
      </div>
    );
  }

  if (error || !dashboard) {
    return (
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Panel del Inquilino
        </h1>
        <p className="text-red-500">{error ?? "Error al cargar datos"}</p>
      </div>
    );
  }

  // 👇 MISMO FORMATO QUE TENÍAS
  const datos = {
    proximoPago: formatFechaCorta(dashboard.proximoPago),
    monto: `Bs. ${dashboard.montoMensual}`,
    ticketsActivos: dashboard.ticketsActivos,
  };

  const pagos = dashboard.ultimosPagos.map((pago) => ({
    monto: `Bs. ${pago.monto}`,
    estado: pago.estado === "PAGADO" ? "Pagado" : pago.estado,
    fecha: formatFechaRelativa(pago.fecha),
  }));

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
