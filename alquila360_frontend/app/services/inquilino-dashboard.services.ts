// src/app/services/inquilino-dashboard.services.ts
import axios from "axios";
import { getStoredSession } from "@/lib/auth";

/**
 * Información de una multa asociada a una cuota vencida
 */
export type Multa = {
  id_multa: number;
  tipo: string;
  monto: number;
  fecha: string;
  estado: string;
  descripcion: string;
};

/**
 * Información detallada de una cuota
 */
export type Cuota = {
  id_cuota: number;
  monto: number;
  fecha_vencimiento: string;
  estado: string;
  alquilerPropiedad: number;
  multa?: Multa | null;
};

/**
 * DTO del dashboard del inquilino
 * Retorna un array con 2 cuotas:
 *  [0] = cuota vencida más reciente
 *  [1] = próxima cuota a vencer
 */
export type DashboardInquilino = {
  cuotas: (Cuota | null)[];
  ticketsActivos: number;
};

/**
 * Obtiene los datos del dashboard del inquilino
 * Usa el token Bearer desde localStorage automáticamente
 */
export async function getDashboardInquilino(): Promise<DashboardInquilino> {
  try {
    const session = getStoredSession();
    const token = session?.token;

    const response = await axios.get<DashboardInquilino>(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/users/dashboard-inquilino`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        "No se pudo obtener el dashboard del inquilino"
    );
  }
}
