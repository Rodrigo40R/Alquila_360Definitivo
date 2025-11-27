"use client";

export type TipoUsuarioBack =
  | "PROPIETARIO"
  | "INQUILINO"
  | "TECNICO"
  | "ADMINISTRADOR";

interface LoginInput {
  correo: string;
  password: string;
  tipo_usuario: TipoUsuarioBack;
}

// 👇 NUEVO: tipo para el registro
interface RegisterInput {
  nombre: string;
  correo: string;
  password: string;
  tipo_usuario: TipoUsuarioBack;
}

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

// ======================= LOGIN =======================
export async function login(data: LoginInput) {
  // 👇 AJUSTA *UNA* DE ESTAS DOS LÍNEAS SEGÚN tu main.ts

  // 1) Si NO tienes app.setGlobalPrefix('api'):
  const url = `${BASE_URL}/auth/login`;

  // 2) Si SÍ tienes app.setGlobalPrefix('api'):
  // const url = `${BASE_URL}/api/auth/login`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    let mensaje = "Credenciales inválidas o usuario no encontrado";

    try {
      const body = await res.json();
      if (body.message) {
        mensaje = Array.isArray(body.message)
          ? body.message.join(", ")
          : body.message;
      }
    } catch {
      // si no es JSON, dejamos el mensaje genérico
    }

    throw new Error(mensaje);
  }

  // Tu backend devuelve { access_token, user }
  return res.json() as Promise<{ access_token: string; user: any }>;
}

// ======================= REGISTER =======================
export async function registerUser(data: RegisterInput) {
  // Igual que arriba: ajusta según tengas o no prefix 'api'
  const url = `${BASE_URL}/auth/register`;
  // const url = `${BASE_URL}/api/auth/register`;

  const res = await fetch(url, {
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
      // si no es JSON, dejamos mensaje genérico
    }

    throw new Error(mensaje);
  }

  // por si tu backend devuelve el usuario creado o algún mensaje
  return res.json();
}
