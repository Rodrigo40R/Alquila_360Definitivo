"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getContratos,
  type Contrato,
  type EstadoContrato,
} from "@/app/services/contratos.services";

function pillEstado(estado: EstadoContrato) {
  if (estado === "Activa") {
    return "bg-emerald-100 text-emerald-700 border border-emerald-200";
  }
  if (estado === "Por vencer") {
    return "bg-amber-100 text-amber-700 border border-amber-200";
  }
  return "bg-slate-100 text-slate-700 border border-slate-200";
}

export default function AdminContratosPage() {
  const router = useRouter();

  const [contratos, setContratos] = useState<Contrato[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargarContratos() {
      try {
        setLoading(true);
        const data = await getContratos();
        setContratos(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron obtener los contratos.");
      } finally {
        setLoading(false);
      }
    }

    cargarContratos();
  }, []);

  const activas = contratos.filter((c) => c.estado === "Activa").length;
  const porVencer = contratos.filter((c) => c.estado === "Por vencer").length;
  const finalizadas = contratos.filter((c) => c.estado === "Finalizada").length;

  return (
    <div className="px-6 py-6 space-y-6">
      {/* TÍTULO + BOTÓN */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Contratos</h1>
          <p className="text-sm text-slate-500">
            Gestión centralizada de reservas y contratos activos.
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/admin/contratos/nuevo")}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-600"
        >
          <span className="text-lg leading-none">＋</span>
          Nuevo contrato
        </button>
      </div>

      {/* ESTADOS DE CARGA / ERROR */}
      {loading && (
        <p className="text-sm text-slate-500">Cargando contratos...</p>
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* RESUMEN */}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-medium text-slate-500">Activos</p>
              <p className="mt-1 text-2xl font-bold text-emerald-600">
                {activas}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-medium text-slate-500">Por vencer</p>
              <p className="mt-1 text-2xl font-bold text-amber-500">
                {porVencer}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-medium text-slate-500">Finalizados</p>
              <p className="mt-1 text-2xl font-bold text-slate-700">
                {finalizadas}
              </p>
            </div>
          </div>

          {/* TABLA */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="border-b border-slate-100 px-6 py-3 flex items-center justify-between">
              <p className="text-sm font-medium text-slate-700">
                Contratos registrados
              </p>
              <p className="text-xs text-slate-400">
                {contratos.length} contratos en total
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
                  <tr>
                    <th className="px-6 py-3 text-left">N°</th>
                    <th className="px-6 py-3 text-left">Inquilino</th>
                    <th className="px-6 py-3 text-left">Monto mensual</th>
                    <th className="px-6 py-3 text-left">Inicio</th>
                    <th className="px-6 py-3 text-left">Fin</th>
                    <th className="px-6 py-3 text-left">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {contratos.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/80">
                      <td className="px-6 py-4 text-slate-500">{c.numero}</td>
                      <td className="px-6 py-4 text-slate-900">
                        {c.inquilino}
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        {c.monto_mensual.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-slate-600">{c.inicio}</td>
                      <td className="px-6 py-4 text-slate-600">{c.fin}</td>
                      <td className="px-6 py-4">
                        <span
                          className={
                            "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold " +
                            pillEstado(c.estado)
                          }
                        >
                          {c.estado}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {contratos.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-6 text-center text-sm text-slate-400"
                      >
                        No hay contratos registrados todavía.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
