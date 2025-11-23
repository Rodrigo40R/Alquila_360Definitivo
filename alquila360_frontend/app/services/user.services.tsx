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

export const createUser = async (user: Partial<User>) => {
  const response = await instance.post(BASE_PATH, user);
  return response.data;
};

export const getUserById = async (id: number) => {
  const response = await instance.get(`${BASE_PATH}/${id}`);
  return response.data;
};

export const updateUser = async (id: number, userData: Partial<User>) => {
  const response = await instance.put(`${BASE_PATH}/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await instance.delete(`${BASE_PATH}/${id}`);
  return response.data;
};