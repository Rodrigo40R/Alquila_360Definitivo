"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { crearContrato } from "@/app/services/contratos.services";

export default function NuevoContratoPage() {
  const router = useRouter();

  // Solo visual, no se manda al back (por ahora)
  const [propiedadTexto, setPropiedadTexto] = useState("");

  const [idPropietario, setIdPropietario] = useState<number>(1); // pon un default válido
  const [idInquilino, setIdInquilino] = useState<number>(1);     // idem
  const [montoMensual, setMontoMensual] = useState<number>(2000);
  const [inicio, setInicio] = useState("");
  const [fin, setFin] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setSaving(true);

      await crearContrato({
        fecha_inicio: inicio,
        fecha_fin: fin,
        monto_mensual: Number(montoMensual),
        estado: "VIGENTE",
        id_propietario: Number(idPropietario),
        id_inquilino: Number(idInquilino),
      });

      router.push("/admin/contratos");
    } catch (err) {
      console.error(err);
      setError("No se pudo registrar el contrato.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="px-6 py-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h1 className="text-xl font-bold text-slate-900">Nuevo contrato</h1>
        <p className="text-sm text-slate-500">
          Completa los datos para registrar un nuevo contrato.
        </p>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo decorativo: no va al backend, solo para que el admin escriba algo */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Dirección / Propiedad (solo visual)
            </label>
            <input
              type="text"
              value={propiedadTexto}
              onChange={(e) => setPropiedadTexto(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Ej. Av. Waldo Ballivián #123"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                ID Propietario
              </label>
              <input
                type="number"
                value={idPropietario}
                onChange={(e) => setIdPropietario(Number(e.target.value))}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                ID Inquilino
              </label>
              <input
                type="number"
                value={idInquilino}
                onChange={(e) => setIdInquilino(Number(e.target.value))}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Monto mensual
              </label>
              <input
                type="number"
                value={montoMensual}
                onChange={(e) => setMontoMensual(Number(e.target.value))}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Fecha de inicio
              </label>
              <input
                type="date"
                value={inicio}
                onChange={(e) => setInicio(e.target.value)}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Fecha de fin
              </label>
              <input
                type="date"
                value={fin}
                onChange={(e) => setFin(e.target.value)}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.push("/admin/contratos")}
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
              {saving ? "Guardando..." : "Guardar contrato"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
