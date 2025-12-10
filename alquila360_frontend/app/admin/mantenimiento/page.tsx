"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getTickets,
  type TicketFront as Ticket,
  type Prioridad,
  type EstadoTicket,
} from "../../services/ticket.services";

function pillPrioridad(p: Prioridad) {
  if (p === "Alta") return "bg-red-100 text-red-700 border border-red-200";
  if (p === "Media")
    return "bg-amber-100 text-amber-700 border border-amber-200";
  return "bg-sky-100 text-sky-700 border border-sky-200";
}

function pillEstado(e: EstadoTicket) {
  if (e === "Solicitado")
    return "bg-slate-100 text-slate-700 border border-slate-200";
  if (e === "En proceso")
    return "bg-amber-100 text-amber-700 border border-amber-200";
  return "bg-emerald-100 text-emerald-700 border border-emerald-200";
}

export default function AdminTicketsPage() {
  const router = useRouter();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargarTickets() {
      try {
        setLoading(true);
        setError(null);
        const data = await getTickets();
        setTickets(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron obtener los tickets.");
      } finally {
        setLoading(false);
      }
    }

    cargarTickets();
  }, []);

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Mantenimiento (Tickets)
          </h1>
          <p className="text-sm text-slate-500">
            Administra las solicitudes de mantenimiento de todas las
            propiedades.
          </p>
        </div>
        <button
          type="button"
          onClick={() => router.push("/admin/tickets/nuevo")}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-600"
        >
          <span className="text-lg leading-none">＋</span>
          Nuevo ticket
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 px-6 py-3 flex items-center justify-between">
          <p className="text-sm font-medium text-slate-700">
            Tickets de mantenimiento
          </p>
          <p className="text-xs text-slate-400">
            {tickets.length} tickets registrados
          </p>
        </div>

        {loading && (
          <div className="px-6 py-4 text-sm text-slate-500">
            Cargando tickets...
          </div>
        )}

        {error && !loading && (
          <div className="px-6 py-4 text-sm text-red-600">{error}</div>
        )}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
                <tr>
                  <th className="px-6 py-3 text-left">Código</th>
                  <th className="px-6 py-3 text-left">Propiedad de</th>
                  <th className="px-6 py-3 text-left">Tipo</th>
                  <th className="px-6 py-3 text-left">Prioridad</th>
                  <th className="px-6 py-3 text-left">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tickets.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/80">
                    <td className="px-6 py-4 text-slate-800 font-semibold">
                      {t.codigo}
                    </td>
                    <td className="px-6 py-4 text-slate-700">
                      {/* Aquí usamos el nombre del inquilino */}
                      Propiedad de {t.propiedad}
                    </td>
                    <td className="px-6 py-4 text-slate-700">{t.tipo}</td>
                    <td className="px-6 py-4">
                      <span
                        className={
                          "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold " +
                          pillPrioridad(t.prioridad)
                        }
                      >
                        {t.prioridad}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={
                          "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold " +
                          pillEstado(t.estado)
                        }
                      >
                        {t.estado}
                      </span>
                    </td>
                  </tr>
                ))}

                {tickets.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-6 text-center text-sm text-slate-500"
                    >
                      No hay tickets registrados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
