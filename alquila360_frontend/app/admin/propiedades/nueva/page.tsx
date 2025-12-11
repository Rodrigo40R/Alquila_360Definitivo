"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function NuevaPropiedadPage() {
  const router = useRouter();

  const [direccion, setDireccion] = useState("");
  const [tipo, setTipo] = useState("");
  const [idPropietario, setIdPropietario] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!direccion.trim() || !tipo.trim()) {
      setError("La dirección y el tipo son obligatorios.");
      return;
    }

    const idPropNum = Number(idPropietario);
    if (!idPropietario || isNaN(idPropNum)) {
      setError("El ID del propietario debe ser un número.");
      return;
    }

    try {
      setSaving(true);

      const body = {
        direccion: direccion.trim(),
        tipo: tipo.trim(),
        estado: "DISPONIBLE",   // 👈 SE ENVÍA AUTOMÁTICAMENTE
        id_propietario: idPropNum,
      };

      const res = await fetch(`${API_URL}/propiedades`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const text = await res.text();
      console.log("Status crear propiedad:", res.status);
      console.log("Body crear propiedad:", text);

      if (!res.ok) {
        throw new Error(`No se pudo crear la propiedad: ${res.status} - ${text}`);
      }

      router.push("/admin/propiedades");
      router.refresh();
    } catch (err: any) {
      console.error("Error al registrar propiedad:", err);
      setError(
        err?.message || "No se pudo registrar la propiedad. Revisa la consola."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="px-6 py-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h1 className="text-xl font-bold text-slate-900">Registrar propiedad</h1>
        <p className="text-sm text-slate-500">
          Completa la información de la nueva propiedad.
        </p>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* DIRECCIÓN */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Dirección
            </label>
            <input
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Ej. Av. América #123"
              required
            />
          </div>

          {/* TIPO */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Tipo
            </label>
            <input
              type="text"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Departamento, casa, garzonier…"
              required
            />
          </div>

          {/* ID PROPIETARIO */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              ID Propietario
            </label>
            <input
              type="number"
              value={idPropietario}
              onChange={(e) => setIdPropietario(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Ej. 7"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.push("/admin/propiedades")}
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
              {saving ? "Guardando..." : "Guardar propiedad"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
