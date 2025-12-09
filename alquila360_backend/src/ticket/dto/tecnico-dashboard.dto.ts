// src/ticket/dto/tecnico-dashboard.dto.ts

export type TicketEstadoFront = "pendiente" | "en_proceso" | "resuelto";
export type TicketPrioridadFront = "alta" | "media" | "baja";

export class TicketResumenTecnicoDto {
  id: number;
  problema: string;
  fecha: string; // dd/MM/yyyy
  estado: TicketEstadoFront;
  detalle: string;
  direccion: string;
  departamento: string;
  prioridad: TicketPrioridadFront;
}

export class TecnicoDashboardDto {
  ticketSeleccionado: TicketResumenTecnicoDto | null;
  ticketsAsignados: TicketResumenTecnicoDto[];
  ticketsEnProceso: number;
  ticketsPendientes: number;
}
