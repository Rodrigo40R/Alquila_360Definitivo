"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function NuevaPropiedadPropietarioPage() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [inquilino, setInquilino] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("Propiedad registrada (simulado).");
    router.push("/propietario/propiedades");
  };

  return (
    <div className="px-6 py-6">
      <div className="max-w-2xl mx-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <h1 className="text-xl font-bold text-slate-900">Nueva propiedad</h1>
        <p className="text-sm text-slate-500">
          Completa los datos para agregar una nueva propiedad a tu portafolio.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nombre de la propiedad
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Ej. Depto - Av. América"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Dirección
            </label>
            <input
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Ej. Av. América 123"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Inquilino (opcional)
            </label>
            <input
              type="text"
              value={inquilino}
              onChange={(e) => setInquilino(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Nombre del inquilino o deja vacío"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.push("/propietario/propiedades")}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
            >
              Guardar propiedad
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
