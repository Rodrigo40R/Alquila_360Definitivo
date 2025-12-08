"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState, useEffect } from "react";

type TicketEstado = "pendiente" | "en_proceso" | "resuelto";

interface Ticket {
  id: number;
  problema: string;
  fecha: string;
  estado: TicketEstado;
  detalle: string;
  direccion: string;
  departamento: string;
  prioridad: "alta" | "media" | "baja";
}

// 🔹 Datos MOCK (idénticos a dashboard)
const MOCK_TICKETS: Ticket[] = [
  {
    id: 1,
    problema: "Fuga de gas",
    fecha: "12/02/2025",
    estado: "pendiente",
    detalle: "La fuga se debió a una rotura en la cañería del lavadero.",
    direccion: "Avenida Central #123, Ap 1423",
    departamento: "Dpto 1423",
    prioridad: "alta",
  },
  {
    id: 2,
    problema: "Fuga de gas",
    fecha: "12/02/2025",
    estado: "pendiente",
    detalle: "Fuga en la cocina principal.",
    direccion: "Avenida Central #123, Ap 1203",
    departamento: "Dpto 1203",
    prioridad: "alta",
  },
  {
    id: 3,
    problema: "Fuga de gas",
    fecha: "12/02/2025",
    estado: "en_proceso",
    detalle: "Se está verificando el regulador.",
    direccion: "Avenida Central #88",
    departamento: "Dpto 4B",
    prioridad: "alta",
  },
  {
    id: 4,
    problema: "Fuga de gas",
    fecha: "12/02/2025",
    estado: "en_proceso",
    detalle: "Revisión de mangueras internas.",
    direccion: "Av. Aroma #55",
    departamento: "Local 3",
    prioridad: "media",
  },
  {
    id: 5,
    problema: "Fuga de gas",
    fecha: "12/02/2025",
    estado: "resuelto",
    detalle: "Cambio completo de la tubería.",
    direccion: "Calle Bolivia #33",
    departamento: "Dpto 2A",
    prioridad: "alta",
  },
  {
    id: 6,
    problema: "Fuga de gas",
    fecha: "12/02/2025",
    estado: "resuelto",
    detalle: "Sellado de uniones.",
    direccion: "Avenida Central #123",
    departamento: "Dpto 102",
    prioridad: "media",
  },
];

const TAB_CONFIG = [
  { id: "pendientes", label: "Pendientes", estado: "pendiente" as TicketEstado },
  { id: "en-proceso", label: "En proceso", estado: "en_proceso" as TicketEstado },
  { id: "resueltos", label: "Resueltos", estado: "resuelto" as TicketEstado },
];

function cardColorsByEstado(estado: TicketEstado) {
  switch (estado) {
    case "pendiente":
      return "bg-red-600";
    case "en_proceso":
      return "bg-amber-500";
    case "resuelto":
      return "bg-emerald-600";
  }
}

function estadoToLabel(estado: TicketEstado): string {
  if (estado === "pendiente") return "Pendiente";
  if (estado === "en_proceso") return "En proceso";
  return "Resuelto";
}

export default function TecnicoTicketsPage() {
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get("tab");
  const ticketIdFromUrl = searchParams.get("ticketId");

  const [activeTab, setActiveTab] = useState<string>("pendientes");
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);

  // Leer tab desde URL
  useEffect(() => {
    if (
      tabFromUrl === "en-proceso" ||
      tabFromUrl === "resueltos" ||
      tabFromUrl === "pendientes"
    ) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  // Leer ticketId desde URL
  useEffect(() => {
    if (!ticketIdFromUrl) return;
    const id = Number(ticketIdFromUrl);
    if (!Number.isNaN(id)) {
      setSelectedTicketId(id);
    }
  }, [ticketIdFromUrl]);

  const ticketsPendientes = useMemo(
    () => MOCK_TICKETS.filter((t) => t.estado === "pendiente"),
    []
  );
  const ticketsEnProceso = useMemo(
    () => MOCK_TICKETS.filter((t) => t.estado === "en_proceso"),
    []
  );
  const ticketsResueltos = useMemo(
    () => MOCK_TICKETS.filter((t) => t.estado === "resuelto"),
    []
  );

  const currentTabConfig =
    TAB_CONFIG.find((t) => t.id === activeTab) ?? TAB_CONFIG[0];

  const ticketsFiltrados = useMemo(() => {
    switch (currentTabConfig.estado) {
      case "pendiente":
        return ticketsPendientes;
      case "en_proceso":
        return ticketsEnProceso;
      case "resuelto":
        return ticketsResueltos;
    }
  }, [currentTabConfig.estado, ticketsPendientes, ticketsEnProceso, ticketsResueltos]);

  // Ticket seleccionado
  const ticketSeleccionado: Ticket | null = useMemo(() => {
    if (selectedTicketId != null) {
      const byId = MOCK_TICKETS.find((t) => t.id === selectedTicketId);
      if (byId) return byId;
    }
    // Si no hay id, tomamos el primero del tab actual
    const lista =
      currentTabConfig.estado === "pendiente"
        ? ticketsPendientes
        : currentTabConfig.estado === "en_proceso"
        ? ticketsEnProceso
        : ticketsResueltos;

    return lista[0] ?? null;
  }, [
    selectedTicketId,
    currentTabConfig.estado,
    ticketsPendientes,
    ticketsEnProceso,
    ticketsResueltos,
  ]);

  const resumenCardColor = ticketSeleccionado
    ? cardColorsByEstado(ticketSeleccionado.estado)
    : "bg-slate-400";

  return (
    <div className="w-full h-full bg-slate-50">
      <div className="max-w-6xl mx-auto py-8 px-6 space-y-8">
        {/* Título */}
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold text-slate-900">
            Mis tareas de mantenimiento
          </h1>
          <p className="text-sm text-slate-600">
            Revisa y gestiona los tickets asignados a tu usuario técnico.
          </p>
        </header>

        {/* Tarjeta superior: ticket seleccionado */}
        <section className="grid grid-cols-1 lg:grid-cols-[2fr,1fr,1fr] gap-6 items-stretch">
          <div
            className={`rounded-xl ${resumenCardColor} text-white p-6 shadow-md flex flex-col justify-between min-h-[220px]`}
          >
            <div className="space-y-2">
              <p className="text-sm font-semibold tracking-wide uppercase">
                Ticket seleccionado
              </p>
              <h2 className="text-2xl font-bold leading-snug">
                {ticketSeleccionado
                  ? ticketSeleccionado.problema
                  : "Sin tickets seleccionados"}
              </h2>
              {ticketSeleccionado && (
                <>
                  <p className="text-sm mt-1">
                    {ticketSeleccionado.direccion}
                    <br />
                    {ticketSeleccionado.departamento}
                  </p>
                  <p className="text-xs mt-1 text-emerald-50/80">
                    Prioridad:{" "}
                    {ticketSeleccionado.prioridad === "alta"
                      ? "Alta"
                      : ticketSeleccionado.prioridad === "media"
                      ? "Media"
                      : "Baja"}{" "}
                    · Estado: {estadoToLabel(ticketSeleccionado.estado)}
                  </p>
                </>
              )}
            </div>

            <div className="mt-4">
              {ticketSeleccionado && (
                <button className="px-4 py-2 rounded-full bg-white text-slate-900 text-sm font-semibold shadow-sm cursor-default">
                  {estadoToLabel(ticketSeleccionado.estado)}
                </button>
              )}
            </div>
          </div>

          {/* Tarjeta: en proceso */}
          <div className="rounded-xl bg-slate-100 p-6 flex flex-col justify-between shadow-sm">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-800">Tickets</p>
              <p className="text-xs text-slate-500">en Proceso</p>
            </div>
            <div className="mt-4">
              <p className="text-4xl font-semibold text-slate-900">
                {ticketsEnProceso.length}
              </p>
            </div>
          </div>

          {/* Tarjeta: pendientes */}
          <div className="rounded-xl bg-slate-100 p-6 flex flex-col justify-between shadow-sm">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-800">Tickets</p>
              <p className="text-xs text-slate-500">Pendientes</p>
            </div>
            <div className="mt-4">
              <p className="text-4xl font-semibold text-slate-900">
                {ticketsPendientes.length}
              </p>
            </div>
          </div>
        </section>

        {/* Tabs + tabla */}
        <section className="space-y-4">
          <div className="flex gap-8 text-sm font-medium text-slate-600 border-b border-slate-200">
            {TAB_CONFIG.map((tab) => {
              const active = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 -mb-px border-b-2 transition-colors ${
                    active
                      ? "border-emerald-500 text-emerald-600"
                      : "border-transparent hover:text-slate-900 hover:border-slate-300"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="rounded-xl border border-slate-200 bg-emerald-50/40 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-emerald-50">
                <tr className="text-left text-slate-700">
                  <th className="px-6 py-3 font-semibold">Problema</th>
                  <th className="px-6 py-3 font-semibold">Fecha</th>
                  <th className="px-6 py-3 font-semibold">Estado</th>
                  <th className="px-6 py-3 font-semibold">Detalle</th>
                </tr>
              </thead>
              <tbody>
                {ticketsFiltrados.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-8 text-center text-slate-500"
                    >
                      No hay tickets en esta categoría.
                    </td>
                  </tr>
                )}

                {ticketsFiltrados.map((ticket, idx) => {
                  const isSelected = ticketSeleccionado
                    ? ticket.id === ticketSeleccionado.id
                    : false;

                  return (
                    <tr
                      key={ticket.id}
                      onClick={() => setSelectedTicketId(ticket.id)}
                      className={`border-t border-emerald-100 cursor-pointer ${
                        isSelected
                          ? "bg-emerald-100"
                          : idx % 2 === 0
                          ? "bg-white"
                          : "bg-emerald-50/60"
                      } hover:bg-emerald-100/80 transition`}
                    >
                      <td className="px-6 py-3 text-slate-800">
                        {ticket.problema}
                      </td>
                      <td className="px-6 py-3 text-slate-700">
                        {ticket.fecha}
                      </td>
                      <td className="px-6 py-3">
                        {ticket.estado === "pendiente" && (
                          <span className="text-red-500 font-medium">
                            Pendiente
                          </span>
                        )}
                        {ticket.estado === "en_proceso" && (
                          <span className="text-amber-500 font-medium">
                            En proceso
                          </span>
                        )}
                        {ticket.estado === "resuelto" && (
                          <span className="text-emerald-600 font-medium">
                            Resuelto
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-3 text-slate-700">
                        {ticket.detalle.length > 70
                          ? ticket.detalle.slice(0, 70) + "..."
                          : ticket.detalle}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

