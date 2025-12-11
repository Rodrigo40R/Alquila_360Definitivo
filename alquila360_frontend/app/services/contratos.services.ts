// src/services/contratosService.ts (o la ruta que uses)

export type EstadoContrato = "Activa" | "Por vencer" | "Finalizada";

export type Contrato = {
  id: number;
  numero: string;
  inquilino: string;
  propietario: string;
  inicio: string;
  fin: string;
  monto_mensual: number;
  estado: EstadoContrato;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// 🔹 Mapeo de estado BD -> estado del dashboard
function mapEstadoBackToFront(estadoBack: string): EstadoContrato {
  const normalizado = (estadoBack || "").toUpperCase();

  if (
    normalizado === "ACTIVA" ||
    normalizado === "ACTIVO" ||
    normalizado === "VIGENTE" ||
    normalizado === "RENOVADO"
  ) {
    return "Activa";
  }

  if (normalizado === "POR_VENCER" || normalizado === "POR VENCER") {
    return "Por vencer";
  }

  // CANCELADO, FINALIZADO, etc.
  return "Finalizada";
}

// 🔹 Mapeo de contrato tal como viene del backend -> modelo del front
function mapContratoFromBackToFront(c: any): Contrato {
  return {
    id: c.id_contrato ?? c.id ?? 0,
    numero: `#${c.id_contrato ?? c.id ?? "?"}`,
    inquilino:
      c.inquilino?.nombre_completo ||
      c.inquilino?.nombre ||
      "Inquilino sin nombre",
    propietario:
      c.propietario?.nombre_completo ||
      c.propietario?.nombre ||
      "Propietario sin nombre",
    inicio: c.fecha_inicio,
    fin: c.fecha_fin,
    monto_mensual: Number(c.monto_mensual ?? 0),
    estado: mapEstadoBackToFront(c.estado),
  };
}

// 🔹 Obtener TODOS los contratos (ej: para admin)
export async function getContratos(token?: string): Promise<Contrato[]> {
  const url = `${API_URL}/contrato`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(`Error al obtener contratos: ${res.status} - ${text}`);
  }

  const data = JSON.parse(text);
  return Array.isArray(data) ? data.map(mapContratoFromBackToFront) : [];
}

// 🔹 Obtener contratos SOLO del propietario logueado
export async function getContratosByPropietario(
  idPropietario: number,
  token: string
): Promise<Contrato[]> {
  const url = `${API_URL}/contrato/propietario/${idPropietario}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(
      `Error al obtener contratos del propietario: ${res.status} - ${text}`
    );
  }

  const data = JSON.parse(text);
  return Array.isArray(data) ? data.map(mapContratoFromBackToFront) : [];
}

// 🔹 DTO del front que coincide con tu entidad
export type CrearContratoDto = {
  fecha_inicio: string;
  fecha_fin: string;
  monto_mensual: number;
  estado: string;
  id_propietario: number;
  id_inquilino: number;
};

export async function crearContrato(dto: CrearContratoDto, token?: string): Promise<void> {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}/contrato`, {
    method: "POST",
    headers,
    body: JSON.stringify(dto),
  });

  const text = await res.text();
  console.log("Status crear contrato:", res.status);
  console.log("Body crear contrato:", text);

  if (!res.ok) {
    throw new Error(`No se pudo crear contrato: ${res.status} - ${text}`);
  }
}
