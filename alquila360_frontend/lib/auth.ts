"use client";

export type Rol = "propietario" | "inquilino" | "tecnico" | "administrador";

export type TipoUsuarioBack =
  | "PROPIETARIO"
  | "INQUILINO"
  | "TECNICO"
  | "ADMINISTRADOR";

// -------- REGISTRO --------
interface RegisterUserInput {
  nombre: string;
  correo: string;
  password: string;
  tipo_usuario: TipoUsuarioBack;
}

/**
 * Registro de usuario contra el backend NestJS.
 * POST /users  con { nombre, correo, password, tipo_usuario }
 */
export async function registerUser(data: RegisterUserInput) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

  // si usas prefijo 'api' en Nest, cambia a: `${baseUrl}/api/users`
  const res = await fetch(`${baseUrl}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    let mensaje = "Error al registrar usuario";

    try {
      const body = await res.json();
      if (body.message) {
        mensaje = Array.isArray(body.message)
          ? body.message.join(", ")
          : body.message;
      }
    } catch {
      // si no viene JSON, se queda el mensaje genérico
    }

    throw new Error(mensaje);
  }

  return res.json(); // lo que devuelva tu backend
}

// -------- SESIÓN (LOGIN EN EL FRONT) --------

export interface SessionUser {
  rol: Rol;
  email: string;
  token?: string;
}

const STORAGE_KEY = "user";

/**
 * Guarda una “sesión” sencilla en localStorage con rol, correo y opcionalmente el token JWT.
 */
export function loginUser(rol: Rol, email: string, token?: string) {
  if (typeof window === "undefined") return;
  const payload: SessionUser = { rol, email, token };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function getUser(): SessionUser | null {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? (JSON.parse(data) as SessionUser) : null;
}

export function logoutUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export function isAuthorizedRol(rol: Rol) {
  const user = getUser();
  return user && user.rol === rol;
}
