// src/ticket/dto/inquilino-tickets.dto.ts

/**
 * DTO para representar un ticket desde el punto de vista del inquilino
 */
export class TicketInquilinoDto {
  id: number;
  titulo: string;
  fecha: string;
  estado: 'Pendiente' | 'En proceso' | 'Resuelto';
  descripcion: string;
}
