"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function NuevoTicketPage() {
  const router = useRouter();
  const [propiedad, setPropiedad] = useState("");
  const [tipo, setTipo] = useState("");
  const [prioridad, setPrioridad] = useState<"Alta" | "Media" | "Baja">("Media");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("Ticket registrado (simulado).");
    router.push("/admin/tickets");
  };

  return (
    <div className="px-6 py-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h1 className="text-xl font-bold text-slate-900">Nuevo ticket</h1>
        <p className="text-sm text-slate-500">
          Registra una nueva solicitud de mantenimiento.
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
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Tipo de problema
            </label>
            <input
              type="text"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Ej. Fuga de agua, luz, gas…"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Prioridad
            </label>
            <select
              value={prioridad}
              onChange={(e) =>
                setPrioridad(e.target.value as "Alta" | "Media" | "Baja")
              }
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
            >
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.push("/admin/tickets")}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
            >
              Guardar ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
