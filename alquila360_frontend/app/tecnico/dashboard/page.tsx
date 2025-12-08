"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

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

// 🔹 Datos mock
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

function mapEstadoToTab(estado: TicketEstado): string {
  if (estado === "pendiente") return "pendientes";
  if (estado === "en_proceso") return "en-proceso";
  return "resueltos";
}

function estadoToLabel(estado: TicketEstado): string {
  if (estado === "pendiente") return "Pendiente";
  if (estado === "en_proceso") return "En proceso";
  return "Resuelto";
}

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

export default function TecnicoDashboardPage() {
  const ticketsPendientes = useMemo(
    () => MOCK_TICKETS.filter((t) => t.estado === "pendiente"),
    []
  );
  const ticketsEnProceso = useMemo(
    () => MOCK_TICKETS.filter((t) => t.estado === "en_proceso"),
    []
  );

  // Ticket urgente / seleccionado por defecto
  const ticketPorDefecto =
    ticketsPendientes.find((t) => t.prioridad === "alta") ??
    ticketsPendientes[0] ??
    ticketsEnProceso[0] ??
    MOCK_TICKETS[0] ??
    null;

  // Estado local: ticket seleccionado en la tabla
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(
    ticketPorDefecto ? ticketPorDefecto.id : null
  );

  const selectedTicket =
    MOCK_TICKETS.find((t) => t.id === selectedTicketId) ?? ticketPorDefecto;

  const resumenCardColor = selectedTicket
    ? cardColorsByEstado(selectedTicket.estado)
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
            Revisa el ticket más urgente y las tareas que tienes pendientes hoy.
          </p>
        </header>

        {/* Bloque superior */}
        <section className="grid grid-cols-1 lg:grid-cols-[2fr,1fr,1fr] gap-6 items-stretch">
          {/* Ticket SELECCIONADO */}
          <div
            className={`rounded-xl ${resumenCardColor} text-white p-6 shadow-md flex flex-col justify-between min-h-[220px]`}
          >
            <div className="space-y-2">
              <p className="text-sm font-semibold tracking-wide uppercase">
                Ticket seleccionado
              </p>
              <h2 className="text-2xl font-bold leading-snug">
                {selectedTicket ? selectedTicket.problema : "Sin tickets"}
              </h2>
              {selectedTicket && (
                <>
                  <p className="text-sm mt-1">
                    {selectedTicket.direccion}
                    <br />
                    {selectedTicket.departamento}
                  </p>
                  <p className="text-xs mt-1 text-emerald-50/80">
                    Prioridad:{" "}
                    {selectedTicket.prioridad === "alta"
                      ? "Alta"
                      : selectedTicket.prioridad === "media"
                      ? "Media"
                      : "Baja"}{" "}
                    · Estado: {estadoToLabel(selectedTicket.estado)}
                  </p>
                </>
              )}
            </div>

            <div className="mt-4">
              {selectedTicket && (
                <Link
                  href={`/tecnico/tickets?tab=${mapEstadoToTab(
                    selectedTicket.estado
                  )}&ticketId=${selectedTicket.id}`}
                  className="inline-flex items-center justify-center px-6 py-2 rounded-full bg-white text-slate-900 text-sm font-semibold shadow-sm hover:bg-slate-100"
                >
                  Ver detalle en Mantenimiento
                </Link>
              )}
            </div>
          </div>

          {/* Tarjeta: en proceso */}
          <div className="rounded-xl bg-slate-100 p-6 flex flex-col justify-between shadow-sm">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-800">
                Tickets en Proceso
              </p>
            </div>
            <div className="mt-4">
              <p className="text-4xl font-semibold text-slate-900">
                {ticketsEnProceso.length}
              </p>
              <Link
                href="/tecnico/tickets?tab=en-proceso"
                className="mt-3 inline-flex text-xs font-medium text-emerald-600 hover:underline"
              >
                Ver en Mantenimiento
              </Link>
            </div>
          </div>

          {/* Tarjeta: pendientes */}
          <div className="rounded-xl bg-slate-100 p-6 flex flex-col justify-between shadow-sm">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-800">
                Tickets Pendientes
              </p>
            </div>
            <div className="mt-4">
              <p className="text-4xl font-semibold text-slate-900">
                {ticketsPendientes.length}
              </p>
              <Link
                href="/tecnico/tickets?tab=pendientes"
                className="mt-3 inline-flex text-xs font-medium text-emerald-600 hover:underline"
              >
                Ver en Mantenimiento
              </Link>
            </div>
          </div>
        </section>

        {/* Tabla de asignados (solo UI, sin filtros) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">
              Tickets asignados
            </h2>
            <Link
              href="/tecnico/tickets"
              className="text-xs font-medium text-emerald-600 hover:underline"
            >
              Ir a vista completa de Mantenimiento
            </Link>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr className="text-left text-slate-700">
                  <th className="px-6 py-3 font-semibold">Problema</th>
                  <th className="px-6 py-3 font-semibold">Fecha</th>
                  <th className="px-6 py-3 font-semibold">Dirección</th>
                  <th className="px-6 py-3 font-semibold">Estado</th>
                  <th className="px-6 py-3 font-semibold">Detalle</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_TICKETS.map((ticket, idx) => {
                  const isSelected = ticket.id === selectedTicket?.id;
                  return (
                    <tr
                      key={ticket.id}
                      onClick={() => setSelectedTicketId(ticket.id)}
                      className={`border-t border-slate-100 cursor-pointer ${
                        isSelected
                          ? "bg-emerald-50"
                          : idx % 2 === 0
                          ? "bg-white"
                          : "bg-slate-50"
                      } hover:bg-emerald-50/70 transition`}
                    >
                      <td className="px-6 py-3 text-slate-800">
                        {ticket.problema}
                      </td>
                      <td className="px-6 py-3 text-slate-700">
                        {ticket.fecha}
                      </td>
                      <td className="px-6 py-3 text-slate-700">
                        {ticket.direccion}
                      </td>
                      <td className="px-6 py-3 text-slate-700">
                        {estadoToLabel(ticket.estado)}
                      </td>
                      <td className="px-6 py-3 text-slate-700">
                        {ticket.detalle.length > 80
                          ? ticket.detalle.slice(0, 80) + "..."
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
