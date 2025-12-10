"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";
import { getCurrentUser } from "@/lib/auth";

export default function NuevaPropiedadPropietarioPage() {
  const router = useRouter();

  // Estados del formulario
  const [descripcion, setDescripcion] = useState(""); 
  const [direccion, setDireccion] = useState("");
  const [precio, setPrecio] = useState("");

  // Estados de control
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [idPropietario, setIdPropietario] = useState<number | null>(null);
  const [token, setToken] = useState("");

  // 1. Obtener usuario al cargar
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

  // 2. Enviar al Backend
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validación básica
    if (!descripcion || !direccion || !precio) {
      setError("Por favor completa todos los campos obligatorios.");
      return;
    }
    
    if (!idPropietario) {
        setError("Error de autenticación. ID de propietario no encontrado.");
        return;
    }

    try {
      setSaving(true);
      const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

      const res = await fetch(`${baseUrl}/propiedades`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          descripcion,
          direccion,
          precio: Number(precio),
          id_propietario: idPropietario // ID limpio y numérico
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al registrar la propiedad");
      }

      router.push("/propietario/propiedades");
      router.refresh(); // Actualizar la lista al volver

    } catch (err: any) {
      console.error(err);
      setError(err.message || "No se pudo guardar la propiedad. Intenta nuevamente.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="px-6 py-6">
      <div className="max-w-2xl mx-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <h1 className="text-xl font-bold text-slate-900">Nueva propiedad</h1>
        <p className="text-sm text-slate-500">
          Completa los datos para agregar una nueva propiedad a tu portafolio.
        </p>

        {error && (
          <div className="p-3 bg-red-50 text-red-600 border border-red-200 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nombre / Descripción
            </label>
            <input
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Ej. Depto - Av. América"
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
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Ej. Av. América 123"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Precio Mensual (Bs)
            </label>
            <input
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Ej. 2500"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              disabled={saving}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-600 disabled:opacity-70"
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