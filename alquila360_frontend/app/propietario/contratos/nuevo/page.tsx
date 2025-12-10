"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";
import { getCurrentUser } from "@/lib/auth";

export default function NuevoContratoPropietario() {
  const router = useRouter();

  // Estados
  const [idPropiedad, setIdPropiedad] = useState("");
  const [idInquilino, setIdInquilino] = useState("");
  const [monto, setMonto] = useState("");
  const [inicio, setInicio] = useState("");
  const [fin, setFin] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState("");
  const [idPropietario, setIdPropietario] = useState<number | null>(null);

  // Obtener sesión
  useEffect(() => {
    const user = getCurrentUser();
    
    // 🚩 CORRECCIÓN 1: Usar "propietario" en minúsculas para la comparación de rol.
    if (!user || user.rol !== "propietario" || !user.id) {
      router.push("/login");
      return;
    }
    
    setToken(user.token);
    // 🚩 CORRECCIÓN 2: Usamos la propiedad 'id' directamente del objeto CurrentUser.
    setIdPropietario(user.id);
    
  }, [router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validaciones simples
    if (!idPropiedad || !idInquilino || !monto || !inicio || !fin) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    
    if (!idPropietario) {
        setError("Error de autenticación. Por favor, reinicia la sesión.");
        return;
    }

    try {
      setSaving(true);
      const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

      const res = await fetch(`${baseUrl}/contrato`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          id_propiedad: Number(idPropiedad),
          id_inquilino: Number(idInquilino),
          id_propietario: idPropietario, 
          monto_mensual: Number(monto),
          fecha_inicio: inicio,
          fecha_fin: fin,
          estado: "VIGENTE"
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al crear el contrato");
      }

      router.push("/propietario/contratos");
      router.refresh();

    } catch (err: any) {
      console.error(err);
      setError(err.message || "No se pudo guardar el contrato. Verifica los IDs.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-xl p-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Nuevo contrato</h1>
        <p className="text-sm text-slate-500">Crea una nueva relación de alquiler.</p>
      </div>

      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              ID Propiedad
            </label>
            <input
              type="number"
              value={idPropiedad}
              onChange={(e) => setIdPropiedad(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Ej. 10"
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
              onChange={(e) => setIdInquilino(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Ej. 5"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Monto mensual (Bs.)
          </label>
          <input
            type="number"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Ej. 2500"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Fecha inicio
            </label>
            <input
              type="date"
              value={inicio}
              onChange={(e) => setInicio(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Fecha fin
            </label>
            <input
              type="date"
              value={fin}
              onChange={(e) => setFin(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600 disabled:opacity-70"
          >
            {saving ? "Guardando..." : "Guardar contrato"}
          </button>
        </div>
      </form>
    </div>
  );
}