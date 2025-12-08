"use client";

import { useState, useMemo } from "react";

type EstadoTicket = "Abierto" | "En proceso" | "Cerrado";

type Ticket = {
  id: string;
  titulo: string;
  propiedad: string;
  prioridad: "Alta" | "Media" | "Baja";
  estado: EstadoTicket;
  fecha: string;
};

const TICKETS: Ticket[] = [
  {
    id: "#305",
    titulo: "Contrato #305 por vencer",
    propiedad: "Depto - Av. América",
    prioridad: "Media",
    estado: "Abierto",
    fecha: "24/11/2025",
  },
  {
    id: "#412",
    titulo: "Cambio de cerradura puerta principal",
    propiedad: "Casa - Tiquipaya",
    prioridad: "Alta",
    estado: "En proceso",
    fecha: "22/11/2025",
  },
  {
    id: "#333",
    titulo: "Pintura fachada",
    propiedad: "Garzonier - Cala Cala",
    prioridad: "Baja",
    estado: "Cerrado",
    fecha: "10/11/2025",
  },
];

const TABS = ["Todos", "Abiertos", "En proceso", "Cerrados"] as const;
type Tab = (typeof TABS)[number];

export default function PropietarioMantenimientoPage() {
  const [tabActiva, setTabActiva] = useState<Tab>("Todos");

  // Contadores para las tarjetas de arriba (se calculan con los datos reales)
  const { total, abiertos, enProceso, cerrados } = useMemo(() => {
    let abiertos = 0;
    let enProceso = 0;
    let cerrados = 0;

    for (const t of TICKETS) {
      if (t.estado === "Abierto") abiertos++;
      else if (t.estado === "En proceso") enProceso++;
      else if (t.estado === "Cerrado") cerrados++;
    }

    return {
      total: TICKETS.length,
      abiertos,
      enProceso,
      cerrados,
    };
  }, []);

  // Filtrado según la pestaña seleccionada
  const ticketsFiltrados = useMemo(() => {
    switch (tabActiva) {
      case "Abiertos":
        return TICKETS.filter((t) => t.estado === "Abierto");
      case "En proceso":
        return TICKETS.filter((t) => t.estado === "En proceso");
      case "Cerrados":
        return TICKETS.filter((t) => t.estado === "Cerrado");
      case "Todos":
      default:
        return TICKETS;
    }
  }, [tabActiva]);

  return (
    <div className="p-8 space-y-8">
      {/* TÍTULO */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Mantenimiento (Tickets)
        </h1>
        <p className="text-sm text-slate-500">
          Consulta el estado de los tickets de tus propiedades.
        </p>
      </div>

      {/* TARJETAS RESUMEN */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-white border border-slate-200 px-6 py-4 shadow-sm">
          <p className="text-xs font-medium text-slate-500">Tickets totales</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{total}</p>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 px-6 py-4 shadow-sm">
          <p className="text-xs font-medium text-slate-500">Abiertos</p>
          <p className="mt-2 text-3xl font-bold text-emerald-600">
            {abiertos}
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 px-6 py-4 shadow-sm">
          <p className="text-xs font-medium text-slate-500">En proceso</p>
          <p className="mt-2 text-3xl font-bold text-amber-500">
            {enProceso}
          </p>
        </div>
      </div>

      {/* TABS DE FILTRO */}
      <div className="flex">
        <div className="inline-flex rounded-full bg-slate-100 p-1 text-sm font-medium">
          {TABS.map((tab) => {
            const activa = tabActiva === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setTabActiva(tab)}
                className={
                  "px-5 py-1.5 rounded-full transition-all " +
                  (activa
                    ? "bg-emerald-600 text-white shadow"
                    : "text-slate-600 hover:text-slate-800")
                }
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* TABLA */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold text-slate-500">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Título</th>
              <th className="px-6 py-3">Propiedad</th>
              <th className="px-6 py-3">Prioridad</th>
              <th className="px-6 py-3">Estado</th>
              <th className="px-6 py-3">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {ticketsFiltrados.map((t, idx) => (
              <tr
                key={t.id}
                className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}
              >
                <td className="px-6 py-3 text-slate-700">{t.id}</td>
                <td className="px-6 py-3 text-slate-900">{t.titulo}</td>
                <td className="px-6 py-3 text-slate-700">{t.propiedad}</td>
                <td className="px-6 py-3">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      t.prioridad === "Alta"
                        ? "bg-rose-50 text-rose-600"
                        : t.prioridad === "Media"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-sky-50 text-sky-600"
                    }`}
                  >
                    {t.prioridad}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      t.estado === "Abierto"
                        ? "bg-emerald-50 text-emerald-700"
                        : t.estado === "En proceso"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {t.estado}
                  </span>
                </td>
                <td className="px-6 py-3 text-slate-600">{t.fecha}</td>
              </tr>
            ))}

            {ticketsFiltrados.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-8 text-center text-slate-500 text-sm"
                >
                  No hay tickets con este estado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
