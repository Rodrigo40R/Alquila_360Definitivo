"use client";

import { useRouter } from "next/navigation";

type EstadoPago = "Completado" | "Pendiente" | "Atrasado";

type Pago = {
  id: number;
  propiedad: string;
  inquilino: string;
  monto: string;
  fecha: string;
  estado: EstadoPago;
};

const pagos: Pago[] = [
  {
    id: 1,
    propiedad: "Departamento - Av. América",
    inquilino: "Carlos López",
    monto: "Bs. 2,500",
    fecha: "05/02/2025",
    estado: "Completado",
  },
  {
    id: 2,
    propiedad: "Casa - Tiquipaya",
    inquilino: "María Gómez",
    monto: "Bs. 3,800",
    fecha: "01/02/2025",
    estado: "Pendiente",
  },
  {
    id: 3,
    propiedad: "Garzonier - Cala Cala",
    inquilino: "José Ramírez",
    monto: "Bs. 1,500",
    fecha: "28/01/2025",
    estado: "Atrasado",
  },
];

function pillEstado(estado: EstadoPago) {
  if (estado === "Completado") {
    return "bg-emerald-100 text-emerald-700 border border-emerald-200";
  }
  if (estado === "Pendiente") {
    return "bg-amber-100 text-amber-700 border border-amber-200";
  }
  return "bg-red-100 text-red-700 border border-red-200";
}

export default function AdminPagosPage() {
  const router = useRouter();

  return (
    <div className="px-6 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pagos y finanzas</h1>
          <p className="text-sm text-slate-500">
            Visualiza y controla el estado de los pagos registrados.
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/admin/pagos/nuevo")}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-600"
        >
          <span className="text-lg leading-none">＋</span>
          Registrar pago
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 px-6 py-3 flex items-center justify-between">
          <p className="text-sm font-medium text-slate-700">
            Pagos de inquilinos
          </p>
          <p className="text-xs text-slate-400">
            {pagos.length} pagos registrados
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
              <tr>
                <th className="px-6 py-3 text-left">Propiedad</th>
                <th className="px-6 py-3 text-left">Inquilino</th>
                <th className="px-6 py-3 text-left">Monto</th>
                <th className="px-6 py-3 text-left">Fecha</th>
                <th className="px-6 py-3 text-left">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pagos.map((pago) => (
                <tr key={pago.id} className="hover:bg-slate-50/80">
                  <td className="px-6 py-4 text-slate-900">{pago.propiedad}</td>
                  <td className="px-6 py-4 text-slate-700">{pago.inquilino}</td>
                  <td className="px-6 py-4 text-emerald-600 font-semibold">
                    {pago.monto}
                  </td>
                  <td className="px-6 py-4 text-slate-600">{pago.fecha}</td>
                  <td className="px-6 py-4">
                    <span
                      className={
                        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold " +
                        pillEstado(pago.estado)
                      }
                    >
                      {pago.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
