"use client";

export type Rol = "propietario" | "inquilino" | "tecnico" | "administrador";

interface RegisterUserInput {
  nombre: string;
  correo: string;
  password: string;
  // Lo enviamos ya en mayúsculas desde el front si tu backend lo requiere
  tipo_usuario: string;
}

/**
 * Registro de usuario contra el backend NestJS.
 * Ajusta la URL/base si es necesario.
 */
export async function registerUser(data: RegisterUserInput) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

  const res = await fetch(`${baseUrl}/users`, {
    // si usas prefijo 'api', sería `${baseUrl}/api/users`
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
      // si no viene JSON, dejamos el mensaje genérico
    }

    throw new Error(mensaje);
  }

  return res.json(); // usuario creado o lo que devuelva tu backend
}

/**
 * Guarda una “sesión” sencilla en localStorage con rol y correo.
 * La usas sólo en el front.
 */
export function loginUser(rol: Rol, email: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("user", JSON.stringify({ rol, email }));
}

export function getUser() {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("user");
  return data ? JSON.parse(data) : null;
}

export function logoutUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("user");
}

export function isAuthorizedRol(rol: Rol) {
  const user = getUser();
  return user && user.rol === rol;
}
