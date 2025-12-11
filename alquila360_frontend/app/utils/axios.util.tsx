import axios from "axios";
import { getStoredSession } from "@/lib/auth";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token JWT automáticamente
instance.interceptors.request.use(
  (config) => {
    // Obtener el token del localStorage
    const session = getStoredSession();
    const token = session?.token;

    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
