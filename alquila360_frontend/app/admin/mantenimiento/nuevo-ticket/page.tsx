"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import {
  createTicket,
  type Prioridad,
} from "../../../services/ticket.services";

export default function NuevoTicketPage() {
  const router = useRouter();

  const [propiedad, setPropiedad] = useState(""); // ID inquilino (provisional)
  const [tipo, setTipo] = useState("");           // descripción
  const [prioridad, setPrioridad] = useState<Prioridad>("Media");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!propiedad.trim() || !tipo.trim()) {
      setError("Propiedad de y tipo de problema son obligatorios.");
      return;
    }

    const idInquilino = Number(propiedad.trim());

    if (Number.isNaN(idInquilino)) {
      setError(
        "Por ahora, en 'Propiedad de' escribe el ID numérico del inquilino (ej: 4)."
      );
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await createTicket({
        descripcion: tipo,   // va a dto.descripcion
        prioridad,
        idInquilino,
      });

      router.push("/admin/tickets");
    } catch (err: any) {
      const raw = err?.response?.data ?? err;

      // log sin console.error para que Next no saque pantalla roja
      console.log("Error creando ticket (completo):", err);

      let mensaje = "No se pudo registrar el ticket.";

      if (typeof raw === "string") {
        mensaje = raw;
      } else if (typeof raw?.message === "string") {
        mensaje = raw.message;
      } else if (Array.isArray(raw?.message)) {
        mensaje = raw.message.join(" | ");
      }

      setError(mensaje);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h1 className="text-xl font-bold text-slate-900">Nuevo ticket</h1>
        <p className="text-sm text-slate-500">
          Registra una nueva solicitud de mantenimiento.
        </p>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Propiedad de
            </label>
            <input
              type="text"
              value={propiedad}
              onChange={(e) => setPropiedad(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Ej. 4 (ID del inquilino)"
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
              placeholder="Ej. Fuga de gas, corte de luz…"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Prioridad
            </label>
            <select
              value={prioridad}
              onChange={(e) =>
                setPrioridad(e.target.value as Prioridad)
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
              disabled={loading}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-600 disabled:opacity-70"
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar ticket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
