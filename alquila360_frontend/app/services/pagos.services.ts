// app/services/pagos.services.ts

// Modelo que usa el front para mostrar pagos en la tabla
export type Pago = {
  id: number;
  metodo: string;
  monto: number;
  fecha: string; // texto ya formateado (yyyy-mm-dd)
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// 👈 Tu controlador Nest está montado como @Controller('pagos')
const ENDPOINT_PAGOS = "/pagos";

// Mapeo backend -> modelo de front
function mapPagoFromBackToFront(p: any): Pago {
  // Fecha de pago en formato yyyy-mm-dd
  const fechaPago = p.fecha_pago || p.fecha || null;
  const fechaTexto = fechaPago
    ? new Date(fechaPago).toISOString().slice(0, 10)
    : "";

  return {
    id: p.id_pago ?? p.id ?? 0,
    metodo: p.metodo_pago ?? "Sin método",
    monto: Number(p.monto ?? 0),
    fecha: fechaTexto,
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

// 👉 alineado con tu CreatePagoDto y entidad Pago
export type CrearPagoDto = {
  fecha_pago: string;
  metodo_pago: string;
  monto: number;
  id_cuota: number;
};

// POST /pagos
export async function registrarPago(dto: CrearPagoDto): Promise<void> {
  const url = `${API_URL}${ENDPOINT_PAGOS}`;

  const res = await fetch(url, {
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
