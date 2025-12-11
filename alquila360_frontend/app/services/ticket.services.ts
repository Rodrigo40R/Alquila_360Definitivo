
// app/services/ticket.services.ts
import { instance } from "../utils/axios.util";
import { getStoredSession } from "@/lib/auth";

export type Prioridad = "Alta" | "Media" | "Baja" | string;
export type EstadoTicket = string;

export interface TicketBack {
  id_ticket: number;
  descripcion: string;
  prioridad: string;
  estado: string;
  subestado: string;
  inquilino?: {
    nombre?: string;
    apellido?: string;
  };
  tecnico?: {
    id_usuario?: number;
    nombre?: string;
    apellido?: string;
  } | null;

  // Estos pueden existir o no en el back; no los usamos en el dashboard de técnico
  direccion?: string;
  departamento?: string;
  fecha_creacion?: string;
  fecha_apertura?: string;

  [key: string]: any;
}

export interface TicketFront {
  id: number;
  codigo: string;
  propiedad: string; // "Propiedad de ..."
  tipo: string; // descripción
  prioridad: Prioridad;
  estado: EstadoTicket;
  fechaApertura: string;
  tieneTecnico: boolean; // indica si ya tiene técnico asignado
}

const BASE_PATH = "/tickets"; // coincide con @Controller('tickets')

const mapTicketBackToFront = (t: TicketBack): TicketFront => {
  const nombreInquilino = t.inquilino
    ? `${t.inquilino.nombre ?? ""} ${t.inquilino.apellido ?? ""}`.trim() ||
      "Inquilino sin nombre"
    : "Sin inquilino";

  return {
    id: t.id_ticket,
    codigo: `T-${t.id_ticket}`,
    propiedad: nombreInquilino,
    tipo: t.descripcion,
    prioridad: t.prioridad,
    estado: t.estado,
    fechaApertura: "",
    tieneTecnico: !!(t.tecnico?.id_usuario),
  };
};

export const getTickets = async (): Promise<TicketFront[]> => {
  const response = await instance.get<TicketBack[]>(BASE_PATH);
  return response.data.map(mapTicketBackToFront);
};

// Envía exactamente lo que CreateTicketDto pide
export const createTicket = async (data: {
  descripcion: string;
  prioridad: Prioridad;
  idInquilino: number;
}) => {
  const body = {
    descripcion: data.descripcion,
    prioridad: data.prioridad,
    estado: "Solicitado",
    subestado: "Pendiente",
    id_inquilino: data.idInquilino,
  };

  const response = await instance.post<TicketBack>(BASE_PATH, body);
  return mapTicketBackToFront(response.data);
};

//
// ------------- SERVICIO ESPECÍFICO PARA EL DASHBOARD DE TÉCNICO ---------
//

export type TicketEstadoTecnico = "pendiente" | "en_proceso" | "resuelto";

// 👉 Solo lo que usa tu dashboard: problema(descripcion), prioridad, estado
export interface TicketTecnicoFront {
  id: number;
  descripcion: string;
  prioridad: "alta" | "media" | "baja";
  estado: TicketEstadoTecnico;
}

function normalizarEstado(estado: string): TicketEstadoTecnico {
  const e = (estado || "").toLowerCase().trim();
  if (e === "pendiente") return "pendiente";
  if (e === "en proceso" || e === "en_proceso") return "en_proceso";
  if (e === "resuelto") return "resuelto";
  // Por defecto, si es algo raro, mapeamos según la lógica
  return "pendiente";
}

function normalizarPrioridad(p: string): "alta" | "media" | "baja" {
  const x = (p || "").toLowerCase().trim();
  if (x === "alta") return "alta";
  if (x === "media") return "media";
  if (x === "baja") return "baja";
  return "baja";
}

// Mapea el ticket del back a lo que necesita el dashboard de técnico
const mapTicketBackToTecnico = (t: TicketBack): TicketTecnicoFront => {
  return {
    id: t.id_ticket,
    descripcion: t.descripcion,
    prioridad: normalizarPrioridad(t.prioridad),
    estado: normalizarEstado(t.estado),
  };
};

/**
 * Obtiene los tickets asignados a un técnico concreto.
 * NO toca el resto de servicios.
 */
export const getTicketsByTecnico = async (
  idTecnico: number
): Promise<TicketTecnicoFront[]> => {
  const response = await instance.get<TicketBack[]>(
    `${BASE_PATH}/tecnico/${idTecnico}`
  );
  return response.data.map(mapTicketBackToTecnico);
};

/**
 * Actualiza el estado de un ticket a "Resuelto"
 * @param ticketId - ID del ticket a actualizar
 */
export const resolverTicket = async (ticketId: number): Promise<void> => {
  await instance.patch(`${BASE_PATH}/${ticketId}`, {
    estado: "Resuelto",
  });
};

//
// ------------- SERVICIO PARA TICKETS DEL INQUILINO AUTENTICADO ---------
//

export type EstadoTicketInquilino = "Pendiente" | "En proceso" | "Resuelto";

/**
 * Estructura de ticket para la página del inquilino
 */
export interface TicketInquilino {
  id: number;
  titulo: string;
  fecha: string;
  estado: EstadoTicketInquilino;
  descripcion: string;
}

/**
 * Obtiene los tickets del inquilino autenticado (desde JWT)
 * Incluye el token Bearer automáticamente
 */
export const getMisTickets = async (): Promise<TicketInquilino[]> => {
  const session = getStoredSession();
  const token = session?.token;

  if (!token) {
    throw new Error("No hay sesión activa");
  }

  const response = await instance.get<TicketInquilino[]>(
    `${BASE_PATH}/mis-tickets`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

/**
 * Crea un ticket desde el inquilino autenticado (JWT)
 * El id_inquilino se obtiene del token
 */
export const createMiTicket = async (data: {
  descripcion: string;
  prioridad: string;
}): Promise<TicketInquilino> => {
  const session = getStoredSession();
  const token = session?.token;

  if (!token) {
    throw new Error("No hay sesión activa");
  }

  const response = await instance.post<TicketInquilino>(
    `${BASE_PATH}/mis-tickets`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
