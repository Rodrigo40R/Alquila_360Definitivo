// src/user/dto/inquilino-dashboard.dto.ts

export class UltimoPagoDto {
  monto: number;
  fecha: string;   // ISO string
  estado: string;  // "PAGADO", "PENDIENTE", etc.
}

export class InquilinoDashboardDto {
  proximoPago: string;         // fecha del próximo pago
  montoMensual: number;        // monto del contrato
  ticketsActivos: number;      // cantidad de tickets abiertos
  ultimosPagos: UltimoPagoDto[];
}
