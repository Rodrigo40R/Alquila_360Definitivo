"use client";

import { useRouter, useParams } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";
import { getUsers } from "../../../services/user.services";

interface Tecnico {
  id_usuario: number;
  nombre: string;
  apellido?: string;
}

export default function AsignarTecnicoPage() {
  const router = useRouter();
  const params = useParams();
  const ticketId = params.id as string;

  const [tecnicos, setTecnicos] = useState<Tecnico[]>([]);
  const [tecnicoSeleccionado, setTecnicoSeleccionado] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingTecnicos, setLoadingTecnicos] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar técnicos del sistema
  useEffect(() => {
    async function cargarTecnicos() {
      try {
        setLoadingTecnicos(true);
        const usuarios = await getUsers();
        // Filtrar solo técnicos
        const tecnicosList = usuarios.filter(
          (u: any) => u.tipo_usuario === "TECNICO"
        );
        setTecnicos(tecnicosList);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los técnicos.");
      } finally {
        setLoadingTecnicos(false);
      }
    }

    cargarTecnicos();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!tecnicoSeleccionado) {
      setError("Debes seleccionar un técnico.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Llamar al endpoint PATCH /tickets/:id con el id del técnico y cambiar estado
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/tickets/${ticketId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_tecnico: Number(tecnicoSeleccionado),
            estado: "En proceso",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("No se pudo asignar el técnico.");
      }

      router.push("/admin/mantenimiento");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error al asignar el técnico.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingTecnicos) {
    return (
      <div className="px-6 py-6">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <p className="text-sm text-slate-500">Cargando técnicos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h1 className="text-xl font-bold text-slate-900">
          Asignar técnico al ticket #{ticketId}
        </h1>
        <p className="text-sm text-slate-500">
          Selecciona un técnico para asignar a esta solicitud de mantenimiento.
        </p>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Ticket ID
            </label>
            <input
              type="text"
              value={ticketId}
              disabled
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-slate-50 text-slate-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Seleccionar técnico
            </label>
            <select
              value={tecnicoSeleccionado}
              onChange={(e) => setTecnicoSeleccionado(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
              required
            >
              <option value="">-- Selecciona un técnico --</option>
              {tecnicos.map((tec) => (
                <option key={tec.id_usuario} value={tec.id_usuario}>
                  {tec.nombre} {tec.apellido || ""}
                </option>
              ))}
            </select>
          </div>

          {tecnicos.length === 0 && (
            <p className="text-sm text-amber-600 bg-amber-50 border border-amber-100 rounded-md px-3 py-2">
              No hay técnicos disponibles en el sistema.
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.push("/admin/mantenimiento")}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              disabled={loading}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-600 disabled:opacity-70"
              disabled={loading || tecnicos.length === 0}
            >
              {loading ? "Asignando..." : "Asignar técnico"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

