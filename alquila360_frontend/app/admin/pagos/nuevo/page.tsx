"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { registrarPago } from "@/app/services/pagos.services";

export default function NuevoPagoPage() {
  const router = useRouter();

  const [idCuota, setIdCuota] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const [monto, setMonto] = useState("");
  const [fechaPago, setFechaPago] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const idCuotaNum = Number(idCuota);
    const montoNum = Number(monto);

    if (isNaN(idCuotaNum) || isNaN(montoNum)) {
      setError("El ID de cuota y el monto deben ser numéricos.");
      return;
    }

    try {
      setSaving(true);

      await registrarPago({
        fecha_pago: fechaPago,
        metodo_pago: metodoPago,
        monto: montoNum,
        id_cuota: idCuotaNum,
      });

      router.push("/admin/pagos");
    } catch (err) {
      console.error(err);
      setError("No se pudo registrar el pago.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="px-6 py-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h1 className="text-xl font-bold text-slate-900">Registrar pago</h1>
        <p className="text-sm text-slate-500">
          Completa los datos para registrar un nuevo pago de un inquilino.
        </p>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              ID Cuota
            </label>
            <input
              type="text"
              value={idCuota}
              onChange={(e) => setIdCuota(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Ej. 1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Método de pago
            </label>
            <input
              type="text"
              value={metodoPago}
              onChange={(e) => setMetodoPago(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Ej. Efectivo, Transferencia..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Monto (Bs)
            </label>
            <input
              type="text"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Ej. 2500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Fecha de pago
            </label>
            <input
              type="date"
              value={fechaPago}
              onChange={(e) => setFechaPago(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.push("/admin/pagos")}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              disabled={saving}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-600 disabled:opacity-60"
              disabled={saving}
            >
              {saving ? "Guardando..." : "Registrar pago"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
