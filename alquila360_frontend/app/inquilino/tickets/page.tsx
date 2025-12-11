"use client";

import React, { useState, useEffect } from "react";
import { getMisTickets, createMiTicket, TicketInquilino, EstadoTicketInquilino } from "@/app/services/ticket.services";

type EstadoTicket = EstadoTicketInquilino;

interface Ticket extends TicketInquilino {}

export default function InquilinoTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [tab, setTab] = useState<EstadoTicket>("Pendiente");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState(
    "Se envió con éxito la solicitud"
  );
  const [evaluarServicio, setEvaluarServicio] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Campos del formulario
  const [titulo, setTitulo] = useState("");
  const [prioridad, setPrioridad] = useState("Alta");

  // Cargar tickets del backend
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMisTickets();
        setTickets(data);
        // Seleccionar el primer ticket si existe
        if (data.length > 0 && !selectedId) {
          setSelectedId(data[0].id);
        }
      } catch (err: any) {
        setError(err.message || "Error al cargar los tickets");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredTickets = tickets.filter((t) => t.estado === tab);
  const selectedTicket =
    tickets.find((t) => t.id === selectedId) ?? filteredTickets[0] ?? null;

  const handleCrearTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) return;

    try {
      // Llamar al backend para crear el ticket
      const nuevoTicket = await createMiTicket({
        descripcion: titulo.trim(),
        prioridad: prioridad,
      });

      // Agregar el nuevo ticket a la lista
      setTickets((prev) => [nuevoTicket, ...prev]);
      setTab("Pendiente");
      setSelectedId(nuevoTicket.id);

      // Limpiar el formulario
      setTitulo("");
      setPrioridad("Alta");

      // Mostrar mensaje de éxito
      setSuccessMessage("Se envió con éxito la solicitud");
      setShowSuccess(true);
    } catch (err: any) {
      setError(err.message || "Error al crear el ticket");
      console.error(err);
    }
  };

  const handleEvaluarEnvio = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("Tu evaluación fue enviada con éxito");
    setShowSuccess(true);
    setEvaluarServicio(false);
  };

  // Si estamos en modo "Evaluar servicio", mostramos solo esa vista
  if (evaluarServicio) {
    return (
      <div className="min-h-full flex flex-col">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Inquilino</h1>

        <div className="rounded-[32px] border border-slate-300 bg-slate-50 px-10 py-8 max-w-5xl">
          <h2 className="text-xl font-semibold mb-6">Evaluar servicio</h2>

          <form onSubmit={handleEvaluarEnvio} className="space-y-8">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full border border-slate-400 flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-900">
                Deja un comentario
              </label>
              <textarea
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm min-h-[180px] outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Escribe aquí..."
              />
            </div>

            <div className="flex justify-center gap-6 pt-4">
              <button
                type="button"
                onClick={() => setEvaluarServicio(false)}
                className="min-w-[140px] rounded-md bg-emerald-900 text-white px-6 py-2 text-sm font-semibold hover:bg-emerald-950"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="min-w-[140px] rounded-md bg-red-600 text-white px-6 py-2 text-sm font-semibold hover:bg-red-700"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <footer className="mt-10 text-center text-xs text-slate-500">
          © 2025 Alquila 360 – Gestión integral de alquileres
        </footer>

        {/* Modal éxito */}
        {showSuccess && (
          <SuccessModal
            message={successMessage}
            onClose={() => setShowSuccess(false)}
          />
        )}
      </div>
    );
  }

  // Vista normal de mantenimiento
  
  // Mostrar loading
  if (loading) {
    return (
      <div className="min-h-full flex flex-col">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Inquilino</h1>
        <div className="flex justify-center items-center py-12">
          <div className="text-slate-600">Cargando tickets...</div>
        </div>
      </div>
    );
  }

  // Mostrar error
  if (error) {
    return (
      <div className="min-h-full flex flex-col">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Inquilino</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 font-medium">Error</p>
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-full flex flex-col">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Inquilino</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Columna 1: Mis solicitudes */}
        <section className="rounded-[32px] border border-slate-300 bg-slate-50 px-6 py-6 flex flex-col">
          <h2 className="text-lg font-semibold mb-4">
            Mis solicitudes de mantenimiento
          </h2>

          {/* Tabs */}
          <div className="flex gap-2 text-xs mb-4">
            {(["Pendiente", "En proceso", "Resuelto"] as EstadoTicket[]).map(
              (estado) => {
                const active = tab === estado;
                return (
                  <button
                    key={estado}
                    type="button"
                    onClick={() => setTab(estado)}
                    className={
                      "rounded-full px-3 py-1 border text-xs font-semibold " +
                      (active
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-slate-200 text-slate-700 border-slate-300")
                    }
                  >
                    {estado === "Pendiente" && "Pendientes"}
                    {estado === "En proceso" && "En proceso"}
                    {estado === "Resuelto" && "Resueltos"}
                  </button>
                );
              }
            )}
          </div>

          {/* Botón crear */}
          <button
            type="button"
            onClick={() => {
              // simplemente enfocamos el formulario (podrías hacer scroll si quieres)
              const form = document.getElementById("form-ticket");
              form?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="mb-4 w-full rounded-full bg-emerald-500 text-white text-xs font-semibold py-2 hover:bg-emerald-600"
          >
            NUEVOS TICKET'S
          </button>

          {/* Lista */}
          <div className="flex-1 overflow-y-auto space-y-2 mt-1">
            {filteredTickets.length === 0 && (
              <p className="text-xs text-slate-500">
                No hay tickets en este estado.
              </p>
            )}

            {filteredTickets.map((ticket) => {
              const active = ticket.id === selectedTicket?.id;
              const estado = ticket.estado;

              const badgeColor =
                estado === "Pendiente"
                  ? "bg-red-500"
                  : estado === "En proceso"
                  ? "bg-emerald-400"
                  : "bg-emerald-800";

              const badgeText =
                estado === "Pendiente"
                  ? "Pendientes"
                  : estado === "En proceso"
                  ? "En proceso"
                  : "Resueltos";

              return (
                <button
                  key={ticket.id}
                  type="button"
                  onClick={() => setSelectedId(ticket.id)}
                  className={
                    "w-full text-left rounded-md border px-4 py-3 bg-white hover:bg-slate-100 " +
                    (active ? "border-slate-900" : "border-slate-200")
                  }
                >
                  <p className="text-sm font-semibold text-slate-900">
                    {ticket.titulo}
                  </p>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-[11px] text-slate-500">
                      {ticket.fecha}
                    </p>
                    <span
                      className={
                        "inline-flex items-center rounded-full px-3 py-0.5 text-[11px] font-semibold text-white " +
                        badgeColor
                      }
                    >
                      {badgeText}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Columna 2: Crear solicitud */}
        <section
          id="form-ticket"
          className="rounded-[32px] border border-slate-300 bg-slate-50 px-6 py-6"
        >
          <h2 className="text-lg font-semibold mb-4">
            Crear solicitudes de mantenimiento
          </h2>

          <form onSubmit={handleCrearTicket} className="space-y-4 text-sm">
            <div className="space-y-1">
              <label className="block font-medium text-slate-900">
                Descripción del problema
              </label>
              <input
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Ej. Fuga de agua en el baño"
                required
              />
            </div>

            {/* Prioridad */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-900">
                Prioridad
              </p>
              <div className="flex flex-wrap gap-4 text-xs">
                {["Alta", "Media", "Baja"].map((nivel) => (
                  <label key={nivel} className="flex items-center gap-1.5">
                    <input
                      type="radio"
                      name="prioridad"
                      value={nivel}
                      checked={prioridad === nivel}
                      onChange={() => setPrioridad(nivel)}
                      className="h-3 w-3"
                    />
                    <span>{nivel}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 w-full rounded-md bg-emerald-500 text-white py-2 text-sm font-semibold hover:bg-emerald-600"
            >
              Enviar solicitud
            </button>
          </form>
        </section>

        {/* Columna 3: Detalle del ticket seleccionado */}
        {/* <section className="rounded-[32px] border border-slate-300 bg-slate-50 px-6 py-6 flex flex-col">
          {selectedTicket ? (
            <>
              <h2 className="text-lg font-semibold mb-4">
                {selectedTicket.titulo}
              </h2>

              <div className="mb-4 rounded-md bg-white border border-slate-200 px-4 py-3 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-700 px-3 py-0.5 text-[11px] font-semibold">
                    Resuelto
                  </span>
                </div>
                <p className="text-slate-500 mt-2">
                  <span className="font-semibold text-slate-700">
                    Fecha de creación:{" "}
                  </span>
                  10 de Enero 2024
                </p>
                <p className="text-slate-500">
                  <span className="font-semibold text-slate-700">
                    Técnico asignado:{" "}
                  </span>
                  Fernando Román
                </p>
              </div>

              <div className="mb-4 rounded-md bg-white border border-slate-200 px-4 py-3 text-xs space-y-2">
                <p className="font-semibold text-slate-900">
                  Comentarios / Seguimiento
                </p>
                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                    <span>FR</span>
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-500">
                      Fernando Román · Hoy, 10:10 am
                    </p>
                    <p className="text-xs text-slate-700">
                      Servicio resuelto satisfactoriamente.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6 rounded-md bg-white border border-slate-200 px-4 py-3 text-xs">
                <p className="font-semibold text-slate-900 mb-2">Evidencias</p>
                <div className="flex gap-2">
                  <div className="w-24 h-20 rounded-md bg-slate-200" />
                  <div className="w-24 h-20 rounded-md bg-slate-200" />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setEvaluarServicio(true)}
                className="mt-auto w-full rounded-md bg-emerald-500 text-white py-2 text-sm font-semibold hover:bg-emerald-600"
              >
                Evaluar Servicio
              </button>
            </>
          ) : (
            <p className="text-sm text-slate-500">
              Selecciona un ticket de la lista para ver el detalle.
            </p>
          )}
        </section> */}
      </div>

      {/* Footer */}
      <footer className="mt-10 text-center text-xs text-slate-500">
        © 2025 Alquila 360 – Gestión integral de alquileres
      </footer>

      {/* Modal éxito */}
      {showSuccess && (
        <SuccessModal
          message={successMessage}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
}

function SuccessModal({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl px-10 py-8 shadow-xl max-w-md w-full text-center border border-slate-200">
        <div className="mb-4 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
            <span className="text-3xl">✅</span>
          </div>
        </div>
        <p className="mb-6 text-sm text-slate-800">{message}</p>
        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-md bg-emerald-500 text-white py-2 text-sm font-semibold hover:bg-emerald-600"
        >
          Ok
        </button>
      </div>
    </div>
  );
}
