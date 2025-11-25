export type EstadoContrato = "Activa" | "Por vencer" | "Finalizada";

export type Contrato = {
  id: number;
  numero: string;
  inquilino: string;
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

  if (
    normalizado === "POR_VENCER" ||
    normalizado === "POR VENCER"
  ) {
    return "Por vencer";
  }

  // CANCELADO, FINALIZADO, etc.
  return "Finalizada";
}

// 🔹 Mapeo contrato backend -> contrato front
function mapContratoFromBackToFront(c: any): Contrato {
  return {
    id: c.id_contrato ?? c.id ?? 0,
    numero: `#${c.id_contrato ?? c.id ?? "?"}`,
    inquilino:
      c.inquilino?.nombre_completo ||
      c.inquilino?.nombre ||
      "Inquilino sin nombre",
    inicio: c.fecha_inicio,
    fin: c.fecha_fin,
    monto_mensual: Number(c.monto_mensual ?? 0),
    estado: mapEstadoBackToFront(c.estado),
  };
}

export async function getContratos(): Promise<Contrato[]> {
  const url = `${API_URL}/contrato`;

  const res = await fetch(url, { cache: "no-store" });
  const text = await res.text();

  if (!res.ok) {
    throw new Error(`Error al obtener contratos: ${res.status} - ${text}`);
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

export async function crearContrato(dto: CrearContratoDto): Promise<void> {
  const res = await fetch(`${API_URL}/contrato`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });

  const text = await res.text();
  console.log("Status crear contrato:", res.status);
  console.log("Body crear contrato:", text);

  if (!res.ok) {
    throw new Error(`No se pudo crear contrato: ${res.status} - ${text}`);
  }
}
