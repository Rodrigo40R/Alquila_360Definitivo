// src/lib/auth.ts

// Tipo de rol que usas en el frontend
export type Rol = "administrador" | "propietario" | "inquilino" | "tecnico";

const SESSION_KEY = "alquila360_session";

export interface SessionStored {
  rol: Rol;
  correo: string;
  token: string;
}

export interface CurrentUser {
  id: number | null;     // id del usuario (extraído del JWT)
  rol: Rol;
  correo: string;
  token: string;
  payload?: any;         // payload completo del JWT (para debug)
}

/**
 * Guarda la sesión del usuario en localStorage.
 * Se llama en el login: loginUser(rolBack, correo, access_token)
 */
export function loginUser(rol: Rol, correo: string, token: string) {
  if (typeof window === "undefined") return;

  const session: SessionStored = { rol, correo, token };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

/**
 * Borra la sesión del usuario de localStorage.
 */
export function logoutUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
}

/**
 * Obtiene la sesión cruda desde localStorage (sin decodificar el token).
 */
export function getStoredSession(): SessionStored | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as SessionStored;
  } catch {
    return null;
  }
}

/**
 * Decodifica el JWT sin verificarlo (solo lectura de payload).
 */
function parseJwt(token: string): any | null {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Error al decodificar JWT:", e);
    return null;
  }
}

/**
 * Devuelve el usuario actual decodificando el JWT
 * para obtener el id (normalmente viene en payload.sub).
 */
export function getCurrentUser(): CurrentUser | null {
  const session = getStoredSession();
  if (!session) return null;

  const payload = parseJwt(session.token);

  // Aquí intentamos varios nombres por si cambia en tu backend
  const id: number | null =
    (payload?.sub as number | undefined) ??
    (payload?.id as number | undefined) ??
    (payload?.userId as number | undefined) ??
    null;

  // Para que puedas ver qué trae el token
  if (typeof window !== "undefined") {
    console.log("JWT payload (auth.ts):", payload);
  }

  return {
    id,
    rol: session.rol,
    correo: session.correo,
    token: session.token,
    payload,
  };
}
