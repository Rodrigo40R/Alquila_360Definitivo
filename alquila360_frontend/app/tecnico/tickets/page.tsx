"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState, useEffect } from "react";

import { getCurrentUser } from "@/lib/auth";
import {
  getTicketsByTecnico,
  TicketTecnicoFront,
  TicketEstadoTecnico,
} from "@/app/services/ticket.services";

// Estados que vienen del servicio de tickets
type TicketEstado = TicketEstadoTecnico;
interface Ticket extends TicketTecnicoFront {}

// Config de pestañas
const TAB_CONFIG = [
  { id: "pendientes", label: "Pendientes", estado: "pendiente" as TicketEstado },
  { id: "en-proceso", label: "En proceso", estado: "en_proceso" as TicketEstado },
  { id: "resueltos", label: "Resueltos", estado: "resuelto" as TicketEstado },
];

function estadoToLabel(estado: TicketEstado): string {
  if (estado === "pendiente") return "Pendiente";
  if (estado === "en_proceso") return "En proceso";
  return "Resuelto";
}

export default function TecnicoTicketsPage() {
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<string>("pendientes");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // Cargar tickets reales desde el backend
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
      } catch (err: any) {
        setError(err?.message ?? "Error al cargar tickets");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // Derivados por estado
  const ticketsPendientes = useMemo(
    () => tickets.filter((t) => t.estado === "pendiente"),
    [tickets]
  );
  const ticketsEnProceso = useMemo(
    () => tickets.filter((t) => t.estado === "en_proceso"),
    [tickets]
  );
  const ticketsResueltos = useMemo(
    () => tickets.filter((t) => t.estado === "resuelto"),
    [tickets]
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
  }, [
    currentTabConfig.estado,
    ticketsPendientes,
    ticketsEnProceso,
    ticketsResueltos,
  ]);

  // Cambio de pestaña
  const handleChangeTab = (id: string) => {
    setActiveTab(id);
    // Aquí solo cambiamos estado; si quieres también actualizar ?tab= en la URL,
    // habría que usar useRouter y router.replace, pero funcionalmente no es necesario.
  };

  // Estados de carga / error
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

  return (
    <div className="w-full h-full bg-slate-50">
      <div className="max-w-6xl mx-auto py-8 px-6 space-y-8">
        {/* Título */}
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold text-slate-900">
            Mantenimiento (Tickets)
          </h1>
          <p className="text-sm text-slate-600">
            Listado de tickets asignados a tu usuario técnico, filtrados por estado.
          </p>
        </header>

        {/* Tabs + tabla */}
        <section className="space-y-4">
          {/* Tabs */}
          <div className="flex gap-8 text-sm font-medium text-slate-600 border-b border-slate-200">
            {TAB_CONFIG.map((tab) => {
              const active = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleChangeTab(tab.id)}
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

          {/* Tabla */}
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
                {ticketsFiltrados.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-8 text-center text-slate-500"
                    >
                      No hay tickets en esta categoría.
                    </td>
                  </tr>
                )}

                {ticketsFiltrados.map((ticket, idx) => (
                  <tr
                    key={ticket.id}
                    className={`border-t border-slate-100 ${
                      idx % 2 === 0 ? "bg-white" : "bg-slate-50"
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
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
