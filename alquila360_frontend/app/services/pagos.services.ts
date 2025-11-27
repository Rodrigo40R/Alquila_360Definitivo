// app/services/pagos.services.ts

export type EstadoPago = "Completado" | "Pendiente" | "Atrasado";

export type Pago = {
  id: number;
  propiedad: string;
  inquilino: string;
  monto: number;
  fecha: string;
  estado: EstadoPago;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// 👈 Tu controlador es @Controller('pagos')
const ENDPOINT_PAGOS = "/pagos";

function mapEstadoBackToFront(estadoBack: string): EstadoPago {
  const normalizado = (estadoBack || "").toUpperCase();

  if (normalizado === "PAGADO" || normalizado === "COMPLETADO") {
    return "Completado";
  }
  if (normalizado === "PENDIENTE") {
    return "Pendiente";
  }
  // VENCIDO, ATRASADO, etc. o vacío
  return "Atrasado";
}

// Ajusta estos accesos según cómo tengas tu entidad Pago y sus relaciones
function mapPagoFromBackToFront(p: any): Pago {
  const estadoRaw =
    p.estado || p.estado_pago || p.cuota?.estado || "";

  return {
    id: p.id_pago ?? p.id ?? 0,
    propiedad:
      p.cuota?.contrato?.propiedad?.direccion ||
      p.cuota?.contrato?.propietario?.direccion ||
      "Propiedad sin nombre",
    inquilino:
      p.cuota?.contrato?.inquilino?.nombre_completo ||
      p.cuota?.contrato?.inquilino?.nombre ||
      "Inquilino sin nombre",
    monto: Number(p.monto ?? 0),
    fecha: p.fecha_pago || p.fecha || "",
    estado: mapEstadoBackToFront(estadoRaw),
  };
}

// GET /pagos
export async function getPagos(): Promise<Pago[]> {
  const url = `${API_URL}${ENDPOINT_PAGOS}`;

  const res = await fetch(url, { cache: "no-store" });
  const text = await res.text();

  if (!res.ok) {
    throw new Error(`Error al obtener pagos: ${res.status} - ${text}`);
  }

  const data = JSON.parse(text);
  return Array.isArray(data) ? data.map(mapPagoFromBackToFront) : [];
}

// 👉 alineado con tu CreatePagoDto
export type CrearPagoDto = {
  fecha_pago: string;
  metodo_pago: string;
  monto: number;
  id_cuota: number;
};

// POST /pagos
export async function registrarPago(dto: CrearPagoDto): Promise<void> {
  const res = await fetch(`${API_URL}${ENDPOINT_PAGOS}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });

  const text = await res.text();
  console.log("Status registrar pago:", res.status);
  console.log("Body registrar pago:", text);

  if (!res.ok) {
    throw new Error(`No se pudo registrar el pago: ${res.status} - ${text}`);
  }
}
