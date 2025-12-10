// app/services/ticket.services.ts
import { instance } from "../utils/axios.util";

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
  const e = (estado || "").toUpperCase();
  if (e === "PENDIENTE") return "pendiente";
  if (e === "EN_PROCESO") return "en_proceso";
  return "resuelto";
}

function normalizarPrioridad(p: string): "alta" | "media" | "baja" {
  const x = (p || "").toUpperCase();
  if (x === "ALTA") return "alta";
  if (x === "MEDIA") return "media";
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
