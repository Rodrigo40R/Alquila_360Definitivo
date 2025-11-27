// src/app/services/user.services.ts
import { instance } from "../utils/axios.util";

export interface User {
  id_usuario: number;
  nombre: string;
  correo: string;
  tipo_usuario: string;
  verificado: boolean;
  estado_cuenta: string;
}

const BASE_PATH = "/users";

export const getUsers = async () => {
  const response = await instance.get(BASE_PATH);
  return response.data;
};

export const createUser = async (user: {
  nombre: string;
  correo: string;
  password: string;
  tipo_usuario: string;
}) => {
  const response = await instance.post(BASE_PATH, user);
  return response.data;
};

export const getUserById = async (id: number) => {
  const response = await instance.get(`${BASE_PATH}/${id}`);
  return response.data;
};

export const updateUser = async (id: number, userData: Partial<User>) => {
  const response = await instance.patch(`${BASE_PATH}/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await instance.delete(`${BASE_PATH}/${id}`);
  return response.data;
};

/* 🔹 NUEVO: tipos y service para el dashboard del inquilino */

export interface UltimoPago {
  monto: number;
  fecha: string;   // ISO string
  estado: string;  // "PAGADO", etc.
}

export interface DashboardInquilino {
  proximoPago: string;      // ISO string
  montoMensual: number;
  ticketsActivos: number;
  ultimosPagos: UltimoPago[];
}

/**
 * Obtiene los datos del dashboard del inquilino a partir del id de usuario.
 * Pega a: GET /users/:id/dashboard-inquilino
 */
export const getInquilinoDashboard = async (
  idUsuario: number
): Promise<DashboardInquilino> => {
  const response = await instance.get<DashboardInquilino>(
    `${BASE_PATH}/${idUsuario}/dashboard-inquilino`
  );
  return response.data;
};
