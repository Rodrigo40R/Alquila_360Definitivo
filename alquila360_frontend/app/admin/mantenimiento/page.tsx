"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function AdminMantenimientoPage() {
  const router = useRouter();

  const tickets = [
    {
      id: "#305",
      titulo: "Fuga de agua en cocina",
      propiedad: "Depto - Av. América",
      inquilino: "Julio Cesar",
      prioridad: "Alta",
      estado: "En proceso",
      fecha: "24/11/2025",
    },
    {
      id: "#412",
      titulo: "Cambio de focos pasillo",
      propiedad: "Casa - Tiquipaya",
      inquilino: "María Gómez",
      prioridad: "Media",
      estado: "Abierto",
      fecha: "22/11/2025",
    },
    {
      id: "#287",
      titulo: "Revisión de caldera",
      propiedad: "Garzonier - Cala Cala",
      inquilino: "Carlos López",
      prioridad: "Baja",
      estado: "Cerrado",
      fecha: "15/11/2025",
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Mantenimiento (Tickets)
        </h1>
        <p className="text-sm text-slate-500">
          Control centralizado de tickets de mantenimiento y su estado.
        </p>
      </div>

      {/* tarjetas resumen */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Tickets totales</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">4</p>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Abiertos</p>
          <p className="mt-2 text-3xl font-semibold text-emerald-600">1</p>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">En proceso</p>
          <p className="mt-2 text-3xl font-semibold text-amber-600">1</p>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Cerrados</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">1</p>
        </div>
      </div>

      {/* filtros + botón nuevo ticket */}
      <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
        <div className="inline-flex rounded-full bg-slate-100 p-1 text-sm font-medium text-slate-600">
          <button className="rounded-full bg-white px-4 py-1 text-emerald-700 shadow-sm">
            Todos
          </button>
          <button className="px-4 py-1">Abiertos</button>
          <button className="px-4 py-1">En proceso</button>
          <button className="px-4 py-1">Cerrados</button>
          <button className="px-4 py-1">Sin asignar</button>
        </div>

        <button
          onClick={() => router.push("/admin/mantenimiento/nuevo-ticket")}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-emerald-700"
        >
          + Nuevo ticket
        </button>
      </div>

      {/* tabla de tickets */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                #
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Título
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Propiedad
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Inquilino
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Prioridad
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Estado
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Fecha
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tickets.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-slate-700">{t.id}</td>
                <td className="px-4 py-3 text-slate-900">{t.titulo}</td>
                <td className="px-4 py-3 text-slate-700">{t.propiedad}</td>
                <td className="px-4 py-3 text-slate-700">{t.inquilino}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      t.prioridad === "Alta"
                        ? "bg-rose-50 text-rose-600"
                        : t.prioridad === "Media"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-sky-50 text-sky-700"
                    }`}
                  >
                    {t.prioridad}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      t.estado === "Abierto"
                        ? "bg-emerald-50 text-emerald-700"
                        : t.estado === "En proceso"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {t.estado}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-700">{t.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
