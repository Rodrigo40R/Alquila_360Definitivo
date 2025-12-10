"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, FormEvent } from "react";
import { getCurrentUser } from "@/lib/auth";

export default function CrearPropiedadPage() {
  const router = useRouter();

  // Estados del formulario
  const [descripcion, setDescripcion] = useState(""); // Mapeado a "Nombre/Descripción"
  const [direccion, setDireccion] = useState("");
  const [precio, setPrecio] = useState("");
  
  // Estados de UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [idPropietario, setIdPropietario] = useState<number | null>(null);
  const [token, setToken] = useState("");

  // 1. Verificar sesión al cargar
  useEffect(() => {
    const user = getCurrentUser();
    
    // 🚩 CORRECCIÓN 1: Usar "propietario" en minúsculas y verificar user.id
    if (!user || user.rol !== "propietario" || !user.id) {
      router.push("/login");
      return;
    }
    
    setToken(user.token);
    // 🚩 CORRECCIÓN 2: Usar directamente la propiedad user.id
    setIdPropietario(user.id);
    
  }, [router]);

  // 2. Enviar datos al Backend
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!descripcion || !direccion || !precio) {
      setError("Todos los campos son obligatorios.");
      setLoading(false);
      return;
    }
    
    if (!idPropietario) {
        setError("Error de autenticación. ID de propietario no encontrado.");
        setLoading(false);
        return;
    }

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

      const res = await fetch(`${baseUrl}/propiedades`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          descripcion,      // En tu DTO, esto cubre el nombre/título
          direccion,
          precio: Number(precio),
          id_propietario: idPropietario
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al registrar la propiedad");
      }

      // Redirigir al listado tras éxito
      router.push("/propietario/propiedades");
      router.refresh();

    } catch (err: any) {
      console.error(err);
      setError(err.message || "No se pudo crear la propiedad. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-xl p-6">
      <h1 className="text-2xl font-bold text-slate-900">Nueva propiedad</h1>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Nombre / Descripción
          </label>
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Ej. Departamento Av. América"
            required
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
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Ej. Av. América 1234"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Precio mensual (Bs)
          </label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Ej. 2500"
            required
          />
        </div>

        {/* Campo extra visual (No se envía si no está en el DTO, o se concatena a descripción) */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Notas adicionales (Opcional)
          </label>
          <input
            type="text"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Ej. Wifi, parqueo, etc..."
          />
          <p className="text-xs text-slate-400 mt-1">Este campo es solo informativo por ahora.</p>
        </div>

        <div className="pt-2 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600 disabled:opacity-70"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrar propiedad"}
          </button>
        </div>
      </form>
    </div>
  );
}