"use client";

import Link from "next/link";
import { useMemo } from "react";

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

// 🔹 Datos mock: solo frontend. El backend luego devolverá estos datos.
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

export default function TecnicoDashboardPage() {
  const ticketsPendientes = useMemo(
    () => MOCK_TICKETS.filter((t) => t.estado === "pendiente"),
    []
  );
  const ticketsEnProceso = useMemo(
    () => MOCK_TICKETS.filter((t) => t.estado === "en_proceso"),
    []
  );

  const ticketUrgente =
    ticketsPendientes.find((t) => t.prioridad === "alta") ?? ticketsPendientes[0] ?? null;

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

        {/* Bloque superior: ticket urgente + métricas */}
        <section className="grid grid-cols-1 lg:grid-cols-[2fr,1fr,1fr] gap-6 items-stretch">
          {/* Ticket MAS URGENTE */}
          <div className="rounded-xl bg-red-600 text-white p-6 shadow-md flex flex-col justify-between min-h-[200px]">
            <div className="space-y-2">
              <p className="text-sm font-semibold tracking-wide uppercase">
                Ticket MAS URGENTE
              </p>
              <h2 className="text-2xl font-bold leading-snug">
                {ticketUrgente ? ticketUrgente.problema : "Sin tickets urgentes"}
              </h2>
              {ticketUrgente && (
                <>
                  <p className="text-sm mt-1">
                    {ticketUrgente.direccion}
                    <br />
                    {ticketUrgente.departamento}
                  </p>
                  <p className="text-xs mt-1 text-red-100">
                    Prioridad:{" "}
                    {ticketUrgente.prioridad === "alta"
                      ? "Alta"
                      : ticketUrgente.prioridad === "media"
                      ? "Media"
                      : "Baja"}
                  </p>
                </>
              )}
            </div>

            <div className="mt-4">
              <Link
                href="/tecnico/tickets?tab=en-proceso"
                className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-sm font-semibold shadow-sm"
              >
                {ticketUrgente ? "Iniciar tarea" : "Ver tickets"}
              </Link>
            </div>
          </div>

          {/* Tarjeta: en proceso */}
          <div className="rounded-xl bg-slate-100 p-6 flex flex-col justify-between shadow-sm">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-800">Tickets en Proceso</p>
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
              <p className="text-sm font-semibold text-slate-800">Tickets Pendientes</p>
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

        {/* Tabla compacta SOLO pendientes */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">
              Tickets pendientes
            </h2>
            <Link
              href="/tecnico/tickets?tab=pendientes"
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
                  <th className="px-6 py-3 font-semibold">Detalle</th>
                </tr>
              </thead>
              <tbody>
                {ticketsPendientes.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-8 text-center text-slate-500"
                    >
                      No tienes tickets pendientes.
                    </td>
                  </tr>
                )}

                {ticketsPendientes.map((ticket, idx) => (
                  <tr
                    key={ticket.id}
                    className={`border-t border-slate-100 ${
                      idx % 2 === 0 ? "bg-white" : "bg-slate-50"
                    }`}
                  >
                    <td className="px-6 py-3 text-slate-800">{ticket.problema}</td>
                    <td className="px-6 py-3 text-slate-700">{ticket.fecha}</td>
                    <td className="px-6 py-3 text-slate-700">
                      {ticket.direccion}
                    </td>
                    <td className="px-6 py-3 text-slate-700">
                      {ticket.detalle.length > 60
                        ? ticket.detalle.slice(0, 60) + "..."
                        : ticket.detalle}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

