"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/auth";

export default function EditarContratoPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const idContrato = params.id;

  // Estados simples
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Datos del formulario
  const [monto, setMonto] = useState("");
  const [inicio, setInicio] = useState("");
  const [fin, setFin] = useState("");
  
  // Datos informativos (Solo lectura)
  const [nombreInquilino, setNombreInquilino] = useState("");
  const [direccionPropiedad, setDireccionPropiedad] = useState("");

  // Token para peticiones
  const [token, setToken] = useState("");

  // 1. Cargar datos al entrar
  useEffect(() => {
    const user = getCurrentUser();

    // 🚩 CORRECCIÓN 1: Usar "propietario" en minúsculas para el rol
    if (!user || user.rol !== "propietario" || !user.id) {
      router.push("/login");
      return;
    }
    setToken(user.token);

    const fetchContrato = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
        
        // 🚩 CORRECCIÓN 2: El ID se utiliza en la ruta si fuera necesario el ID del usuario,
        // pero aquí solo necesitamos el ID del contrato.
        const res = await fetch(`${baseUrl}/contrato/${idContrato}`, {
          headers: { "Authorization": `Bearer ${user.token}` }
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "No se pudo cargar el contrato");
        }

        const data = await res.json();

        // Asignar valores (Manejo de fechas para input date: YYYY-MM-DD)
        setMonto(data.monto || data.monto_mensual || "");
        setInicio(data.fecha_inicio ? new Date(data.fecha_inicio).toISOString().split('T')[0] : "");
        setFin(data.fecha_fin ? new Date(data.fecha_fin).toISOString().split('T')[0] : "");
        
        // Asignar datos informativos
        setNombreInquilino(data.inquilino?.nombre || "Inquilino no encontrado");
        setDireccionPropiedad(data.propiedad?.direccion || "Propiedad no encontrada");

      } catch (err) {
        console.error(err);
        setError("Error al cargar la información del contrato. Verifica si el backend está corriendo.");
      } finally {
        setLoading(false);
      }
    };

    fetchContrato();
  }, [idContrato, router]);

  // 2. Manejar envío del formulario
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
      
      const res = await fetch(`${baseUrl}/contrato/${idContrato}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          monto_mensual: Number(monto), // Ajustado a posible nombre en DB
          fecha_inicio: inicio,
          fecha_fin: fin
        })
      });

      if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Error al actualizar");
      }

      router.push("/propietario/contratos"); 
      router.refresh();
      
    } catch (err: any) {
      console.error(err);
      setError(err.message || "No se pudo actualizar el contrato.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-slate-500">Cargando contrato...</div>;
  }

  return (
    <div className="space-y-6 max-w-xl p-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Editar contrato</h1>
        <p className="text-sm text-slate-500">Modifica los plazos y montos del alquiler.</p>
      </div>

      {error && <p className="text-sm text-red-500 bg-red-50 p-3 rounded-md border border-red-200">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        
        {/* Campos de Solo Lectura */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Propiedad
          </label>
          <input
            type="text"
            value={direccionPropiedad}
            readOnly
            className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 outline-none cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Inquilino
          </label>
          <input
            type="text"
            value={nombreInquilino}
            readOnly
            className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 outline-none cursor-not-allowed"
          />
        </div>

        <hr className="my-2" />

        {/* Campos Editables */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Monto Mensual (Bs)
          </label>
          <input
            type="number"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Fecha inicio
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
            Fecha fin
          </label>
          <input
            type="date"
            value={fin}
            onChange={(e) => setFin(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            disabled={saving}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600 disabled:opacity-70"
            disabled={saving}
          >
            {saving ? "Guardando..." : "Actualizar contrato"}
          </button>
        </div>
      </form>
    </div>
  );
}