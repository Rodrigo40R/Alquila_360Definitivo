"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function NuevoTicketAdminPage() {
  const router = useRouter();
  const [titulo, setTitulo] = useState("");
  const [propiedad, setPropiedad] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // aquí iría el POST real a tu API
    console.log({
      titulo,
      propiedad,
      descripcion,
    });

    // por ahora solo volvemos a la lista de mantenimiento
    router.push("/admin/mantenimiento");
  };

  return (
    <div className="flex flex-col gap-6 p-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Nuevo ticket de mantenimiento
        </h1>
        <p className="text-sm text-slate-500">
          Registra un nuevo ticket para dar seguimiento al mantenimiento.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl space-y-5 rounded-xl bg-white p-6 shadow-sm"
      >
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Título del ticket
          </label>
          <input
            required
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            placeholder="Ej: Fuga de agua en cocina"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Propiedad
          </label>
          <input
            required
            value={propiedad}
            onChange={(e) => setPropiedad(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            placeholder="Ej: Depto - Av. América"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Descripción
          </label>
          <textarea
            required
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            rows={4}
            placeholder="Describe el problema que se debe atender…"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-emerald-700"
          >
            Guardar ticket
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/mantenimiento")}
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
