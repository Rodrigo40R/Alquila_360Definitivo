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
  [key: string]: any;
}

export interface TicketFront {
  id: number;
  codigo: string;
  propiedad: string;    // "Propiedad de ..."
  tipo: string;         // descripción
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
