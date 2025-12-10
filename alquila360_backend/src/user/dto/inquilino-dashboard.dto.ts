// src/user/dto/inquilino-dashboard.dto.ts

/**
 * Información de una multa asociada a una cuota vencida
 */
export class MultaDto {
  id_multa: number;
  tipo: string;        // 'Retraso', 'Daño', 'Incumplimiento'
  monto: number;
  fecha: string;       // ISO string
  estado: string;      // 'Pendiente', 'Pagada', 'Anulada'
  descripcion: string;
}

/**
 * Información detallada de una cuota
 */
export class CuotaDto {
  id_cuota: number;
  monto: number;
  fecha_vencimiento: string;  // ISO string
  estado: string;             // 'PENDIENTE', 'PAGADA', 'VENCIDA'
  alquilerPropiedad: number;  // monto_mensual del contrato
  multa?: MultaDto | null;    // si la cuota está vencida, puede tener multa
}

/**
 * DTO del dashboard del inquilino con información de cuotas
 * Array con 2 posiciones:
 *  [0] = cuota vencida más reciente
 *  [1] = próxima cuota a vencer
 */
export class InquilinoDashboardDto {
  cuotas: (CuotaDto | null)[];        // array con 2 posiciones: [cuota_vencida, proxima_cuota]
  ticketsActivos: number;             // cantidad de tickets abiertos
}
