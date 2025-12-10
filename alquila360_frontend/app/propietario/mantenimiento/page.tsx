"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

// Definición de tipos basada en el backend
type TicketBackend = {
  id_ticket: number;
  titulo: string;
  descripcion: string;
  prioridad: string; // "ALTA" | "MEDIA" | "BAJA"
  estado: string;    // "ABIERTO" | "EN_PROCESO" | "CERRADO"
  fecha_creacion: string;
  // Relación anidada
  propiedad?: {
    direccion: string;
  };
};

const TABS = ["Todos", "Abierto", "En proceso", "Cerrado"] as const;
type Tab = (typeof TABS)[number];

export default function PropietarioMantenimientoPage() {
  const router = useRouter();
  
  // Estados
  const [tickets, setTickets] = useState<TicketBackend[]>([]);
  const [loading, setLoading] = useState(true);
  const [tabActiva, setTabActiva] = useState<Tab>("Todos");

  // 1. CARGA DE DATOS
  useEffect(() => {
    const fetchTickets = async () => {
      const user = getCurrentUser();

      // 🚩 CORRECCIÓN 1: Usar "propietario" en minúsculas y verificar user.id
      if (!user || user.rol !== "propietario" || !user.id) {
        router.push("/login");
        return;
      }

      // 🚩 CORRECCIÓN 2: Usar directamente la propiedad user.id
      const userId = user.id;

      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
        
        // Petición al endpoint de tickets del propietario
        const res = await fetch(`${baseUrl}/tickets/propietario/${userId}`, {
          headers: { "Authorization": `Bearer ${user.token}` }
        });

        if (res.ok) {
          const data = await res.json();
          setTickets(data);
        } else {
          console.error(`Error cargando tickets: ${res.status}`);
          setTickets([]); 
        }

      } catch (error) {
        console.error("Error de conexión:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [router]);

  // 2. CÁLCULO DE ESTADÍSTICAS (useMemo)
  const { total, abiertos, enProceso, cerrados } = useMemo(() => {
    let abiertos = 0;
    let enProceso = 0;
    let cerrados = 0;

    for (const t of tickets) {
      // Normalizamos el estado (backend suele enviar mayúsculas)
      const estado = t.estado?.toUpperCase() || "ABIERTO";
      
      if (estado === "ABIERTO") abiertos++;
      else if (estado === "EN_PROCESO" || estado === "EN PROCESO") enProceso++;
      else if (estado === "CERRADO") cerrados++;
    }

    return {
      total: tickets.length,
      abiertos,
      enProceso,
      cerrados,
    };
  }, [tickets]);

  // 3. FILTRADO DE LISTA
  const ticketsFiltrados = useMemo(() => {
    if (tabActiva === "Todos") return tickets;

    return tickets.filter((t) => {
      const estadoBackend = t.estado?.toUpperCase();
      const tabMayus = tabActiva.toUpperCase();
      
      // Ajuste para "En proceso" que tiene espacio
      if (tabActiva === "En proceso") {
        return estadoBackend === "EN_PROCESO" || estadoBackend === "EN PROCESO";
      }
      return estadoBackend === tabMayus;
    });
  }, [tabActiva, tickets]);

  // Auxiliar para formato fecha
  const formatDate = (isoStr: string) => {
    if (!isoStr) return "-";
    return new Date(isoStr).toLocaleDateString("es-ES");
  };

  if (loading) return <div className="p-8 text-slate-500">Cargando tickets...</div>;

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
            {ticketsFiltrados.map((t, idx) => {
                const prioridad = t.prioridad?.toUpperCase(); 
                const estado = t.estado?.toUpperCase()?.replace("_", " "); 
                
                return (
                    <tr
                        key={t.id_ticket}
                        className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}
                    >
                        <td className="px-6 py-3 text-slate-700">#{t.id_ticket}</td>
                        <td className="px-6 py-3 text-slate-900 font-medium">{t.titulo}</td>
                        <td className="px-6 py-3 text-slate-700 truncate max-w-[200px]">
                            {t.propiedad?.direccion || "Sin propiedad asignada"}
                        </td>
                        <td className="px-6 py-3">
                        <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            prioridad === "ALTA"
                                ? "bg-rose-50 text-rose-600"
                                : prioridad === "MEDIA"
                                ? "bg-amber-50 text-amber-600"
                                : "bg-sky-50 text-sky-600"
                            }`}
                        >
                            {t.prioridad || "Baja"}
                        </span>
                        </td>
                        <td className="px-6 py-3">
                        <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            estado === "ABIERTO"
                                ? "bg-emerald-50 text-emerald-700"
                                : (estado?.includes("PROCESO"))
                                ? "bg-amber-50 text-amber-700"
                                : "bg-slate-200 text-slate-700"
                            }`}
                        >
                            {estado || "Abierto"}
                        </span>
                        </td>
                        <td className="px-6 py-3 text-slate-600">
                            {formatDate(t.fecha_creacion)}
                        </td>
                    </tr>
                );
            })}

            {ticketsFiltrados.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-8 text-center text-slate-500 text-sm"
                >
                  No tienes tickets en este estado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}