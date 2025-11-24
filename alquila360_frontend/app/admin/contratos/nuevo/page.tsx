"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function NuevoContratoPage() {
  const router = useRouter();

  const [propiedad, setPropiedad] = useState("");
  const [inquilino, setInquilino] = useState("");
  const [inicio, setInicio] = useState("");
  const [fin, setFin] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("Contrato registrado (simulado).");
    router.push("/admin/contratos");
  };

  return (
    <div className="px-6 py-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h1 className="text-xl font-bold text-slate-900">Nuevo contrato</h1>
        <p className="text-sm text-slate-500">
          Completa los datos para registrar un nuevo contrato.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Propiedad
            </label>
            <input
              type="text"
              value={propiedad}
              onChange={(e) => setPropiedad(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Ej. Departamento - Av. América"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Inquilino
            </label>
            <input
              type="text"
              value={inquilino}
              onChange={(e) => setInquilino(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Nombre del inquilino"
            />
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
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.push("/admin/contratos")}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
            >
              Guardar contrato
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
