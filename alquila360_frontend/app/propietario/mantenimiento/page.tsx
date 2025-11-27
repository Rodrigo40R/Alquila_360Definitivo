// app/propietario/mantenimiento/page.tsx
"use client";

import React from "react";

export default function PropietarioMantenimientoPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Mantenimiento (Tickets)
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Consulta el estado de los tickets de tus propiedades.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl bg-white shadow-sm px-6 py-4">
          <p className="text-sm text-slate-500">Tickets totales</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">3</p>
        </div>
        <div className="rounded-xl bg-white shadow-sm px-6 py-4">
          <p className="text-sm text-slate-500">Abiertos</p>
          <p className="mt-2 text-2xl font-semibold text-emerald-600">1</p>
        </div>
        <div className="rounded-xl bg-white shadow-sm px-6 py-4">
          <p className="text-sm text-slate-500">En proceso</p>
          <p className="mt-2 text-2xl font-semibold text-amber-500">1</p>
        </div>
      </div>

      <div className="inline-flex rounded-full bg-slate-100 p-1">
        <button className="px-4 py-1 text-sm rounded-full bg-emerald-600 text-white">
          Todos
        </button>
        <button className="px-4 py-1 text-sm rounded-full text-slate-600">
          Abiertos
        </button>
        <button className="px-4 py-1 text-sm rounded-full text-slate-600">
          En proceso
        </button>
        <button className="px-4 py-1 text-sm rounded-full text-slate-600">
          Cerrados
        </button>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-3 text-left font-medium">#</th>
              <th className="px-6 py-3 text-left font-medium">Título</th>
              <th className="px-6 py-3 text-left font-medium">Propiedad</th>
              <th className="px-6 py-3 text-left font-medium">Prioridad</th>
              <th className="px-6 py-3 text-left font-medium">Estado</th>
              <th className="px-6 py-3 text-left font-medium">Fecha</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            <tr>
              <td className="px-6 py-3">#305</td>
              <td className="px-6 py-3">
                Contrato #305 por vencer - Depto Av. América
              </td>
              <td className="px-6 py-3">Depto - Av. América</td>
              <td className="px-6 py-3">
                <span className="inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-600">
                  Media
                </span>
              </td>
              <td className="px-6 py-3">
                <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                  Abierto
                </span>
              </td>
              <td className="px-6 py-3">24/11/2025</td>
            </tr>
            <tr>
              <td className="px-6 py-3">#412</td>
              <td className="px-6 py-3">
                Cambio de cerradura puerta principal
              </td>
              <td className="px-6 py-3">Casa - Tiquipaya</td>
              <td className="px-6 py-3">
                <span className="inline-flex rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-600">
                  Alta
                </span>
              </td>
              <td className="px-6 py-3">
                <span className="inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-600">
                  En proceso
                </span>
              </td>
              <td className="px-6 py-3">22/11/2025</td>
            </tr>
            <tr>
              <td className="px-6 py-3">#333</td>
              <td className="px-6 py-3">Pintura fachada</td>
              <td className="px-6 py-3">Garzonier - Cala Cala</td>
              <td className="px-6 py-3">
                <span className="inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-600">
                  Baja
                </span>
              </td>
              <td className="px-6 py-3">
                <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                  Cerrado
                </span>
              </td>
              <td className="px-6 py-3">10/11/2025</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
