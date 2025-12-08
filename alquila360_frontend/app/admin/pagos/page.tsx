"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getPagos,
  type Pago,
  type EstadoPago,
} from "@/app/services/pagos.services";

function pillEstadoPago(estado: EstadoPago) {
  if (estado === "Completado") {
    return "bg-emerald-100 text-emerald-700 border border-emerald-200";
  }
  if (estado === "Pendiente") {
    return "bg-amber-100 text-amber-700 border border-amber-200";
  }
  return "bg-rose-100 text-rose-700 border border-rose-200";
}

function formatMonto(monto: number) {
  return `Bs. ${monto.toLocaleString("es-BO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

export default function AdminPagosPage() {
  const router = useRouter();

  const [pagos, setPagos] = useState<Pago[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargarPagos() {
      try {
        setLoading(true);
        const data = await getPagos();
        setPagos(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron obtener los pagos.");
      } finally {
        setLoading(false);
      }
    }

    cargarPagos();
  }, []);

  return (
    <div className="px-6 py-6 space-y-6">
      {/* TÍTULO + BOTÓN */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Pagos y finanzas
          </h1>
          <p className="text-sm text-slate-500">
            Visualiza y controla el estado de los pagos registrados.
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/admin/pagos/nuevo")}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-600"
        >
          <span className="text-lg leading-none">＋</span>
          Registrar pago
        </button>
      </div>

      {/* ESTADOS CARGA / ERROR */}
      {loading && (
        <p className="text-sm text-slate-500">Cargando pagos...</p>
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-slate-100 px-6 py-3 flex items-center justify-between">
            <p className="text-sm font-medium text-slate-700">
              Pagos de inquilinos
            </p>
            <p className="text-xs text-slate-400">
              {pagos.length} pagos registrados
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
                <tr>
                  <th className="px-6 py-3 text-left">Propiedad</th>
                  <th className="px-6 py-3 text-left">Inquilino</th>
                  <th className="px-6 py-3 text-left">Monto</th>
                  <th className="px-6 py-3 text-left">Fecha</th>
                  <th className="px-6 py-3 text-left">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pagos.map((pago) => (
                  <tr key={pago.id} className="hover:bg-slate-50/80">
                    <td className="px-6 py-4 text-slate-900">
                      {pago.propiedad}
                    </td>
                    <td className="px-6 py-4 text-slate-700">
                      {pago.inquilino}
                    </td>
                    <td className="px-6 py-4 font-semibold text-emerald-600">
                      {formatMonto(pago.monto)}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{pago.fecha}</td>
                    <td className="px-6 py-4">
                      <span
                        className={
                          "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold " +
                          pillEstadoPago(pago.estado)
                        }
                      >
                        {pago.estado}
                      </span>
                    </td>
                  </tr>
                ))}

                {pagos.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-6 text-center text-sm text-slate-400"
                    >
                      No hay pagos registrados todavía.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
