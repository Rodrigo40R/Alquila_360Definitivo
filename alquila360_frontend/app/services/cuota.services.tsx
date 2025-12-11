// src/app/services/cuota.services.tsx
import { instance } from "../utils/axios.util";

const BASE_PATH = "/cuotas";

export interface Cuota {
  id_cuota: number;
  monto: number;
  fecha_vencimiento: string;
  estado: string;
}

export const pagarCuota = async (idCuota: number): Promise<Cuota> => {
  const response = await instance.patch(`${BASE_PATH}/${idCuota}/pagar`);
  return response.data;
};
