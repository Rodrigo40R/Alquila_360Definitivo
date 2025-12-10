"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getCurrentUser } from "@/lib/auth";
import {
  getTicketsByTecnico,
  TicketTecnicoFront,
  TicketEstadoTecnico,
} from "@/app/services/ticket.services";

// Alias para que tu código siga funcionando igual
type TicketEstado = TicketEstadoTecnico;
interface Ticket extends TicketTecnicoFront {}

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
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🟢 Cargar desde backend
  useEffect(() => {
    const user = getCurrentUser();

    if (!user || user.id == null) {
      setError("No se encontró la sesión de técnico.");
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        const data = await getTicketsByTecnico(user.id!);
        setTickets(data);

        const ticketsPendientes = data.filter((t) => t.estado === "pendiente");
        const ticketsEnProceso = data.filter(
          (t) => t.estado === "en_proceso"
        );

        const ticketPorDefecto =
          ticketsPendientes.find((t) => t.prioridad === "alta") ??
          ticketsPendientes[0] ??
          ticketsEnProceso[0] ??
          data[0] ??
          null;

        setSelectedTicketId(ticketPorDefecto ? ticketPorDefecto.id : null);
      } catch (err: any) {
        setError(err?.message ?? "Error al cargar tickets");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // 🔵 Derivados del estado
  const ticketsPendientes = useMemo(
    () => tickets.filter((t) => t.estado === "pendiente"),
    [tickets]
  );

  const ticketsEnProceso = useMemo(
    () => tickets.filter((t) => t.estado === "en_proceso"),
    [tickets]
  );

  const selectedTicket =
    tickets.find((t) => t.id === selectedTicketId) ?? null;

  const resumenCardColor = selectedTicket
    ? cardColorsByEstado(selectedTicket.estado)
    : "bg-slate-400";

  // ============== Estados de carga y error ==============
  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-600">Cargando tickets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-50">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  // =================== UI PRINCIPAL =====================
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
                {selectedTicket ? selectedTicket.descripcion : "Sin tickets"}
              </h2>

              {selectedTicket && (
                <p className="text-xs mt-1 text-emerald-50/80">
                  Prioridad:{" "}
                  {selectedTicket.prioridad === "alta"
                    ? "Alta"
                    : selectedTicket.prioridad === "media"
                    ? "Media"
                    : "Baja"}{" "}
                  · Estado: {estadoToLabel(selectedTicket.estado)}
                </p>
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

        {/* Tabla de asignados */}
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
                  <th className="px-6 py-3 font-semibold">Prioridad</th>
                  <th className="px-6 py-3 font-semibold">Estado</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket, idx) => {
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
                        {ticket.descripcion}
                      </td>
                      <td className="px-6 py-3 text-slate-700">
                        {ticket.prioridad === "alta"
                          ? "Alta"
                          : ticket.prioridad === "media"
                          ? "Media"
                          : "Baja"}
                      </td>
                      <td className="px-6 py-3 text-slate-700">
                        {estadoToLabel(ticket.estado)}
                      </td>
                    </tr>
                  );
                })}

                {tickets.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-4 text-center text-slate-500"
                    >
                      No tienes tickets asignados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
