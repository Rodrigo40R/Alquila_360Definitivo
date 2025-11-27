// src/app/services/inquilino-dashboard.services.ts

export type UltimoPago = {
  monto: number;
  fecha: string;   // ISO string
  estado: string;  // "PAGADO", etc.
};

export type DashboardInquilino = {
  proximoPago: string;     // ISO string
  montoMensual: number;
  ticketsActivos: number;
  ultimosPagos: UltimoPago[];
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getDashboardInquilino(
  userId: number
): Promise<DashboardInquilino> {
  const res = await fetch(
    `${API_URL}/users/${userId}/dashboard-inquilino`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("No se pudo obtener el dashboard del inquilino");
  }

  return res.json();
}
