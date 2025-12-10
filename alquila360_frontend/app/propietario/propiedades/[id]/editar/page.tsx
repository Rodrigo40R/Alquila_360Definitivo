"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/auth";

export default function EditarPropiedadPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const idPropiedad = params.id;

  // Estados
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Datos del formulario (Mapeados a tu backend)
  const [descripcion, setDescripcion] = useState(""); // Usamos esto como "Nombre" o título
  const [direccion, setDireccion] = useState("");
  const [precio, setPrecio] = useState("");
  const [tipo, setTipo] = useState("Departamento"); // Opcional si tu backend lo soporta

  const [token, setToken] = useState("");

  // 1. Cargar datos
  useEffect(() => {
    const fetchPropiedad = async () => {
      const user = getCurrentUser();

      // 🚩 CORRECCIÓN 1: Usar "propietario" en minúsculas y verificar user.id
      if (!user || user.rol !== "propietario" || !user.id) {
        router.push("/login");
        return;
      }
      setToken(user.token); // Guardamos el token

      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
        const res = await fetch(`${baseUrl}/propiedades/${idPropiedad}`, {
          headers: { "Authorization": `Bearer ${user.token}` }
        });

        if (!res.ok) throw new Error("No se pudo cargar la propiedad");

        const data = await res.json();

        // Si la descripción contiene el tipo (Ej: "Casa - Tiquipaya"), podemos intentar separarlo aquí
        const fullDesc = data.descripcion || "";
        const parts = fullDesc.split(" - ");
        
        if (parts.length > 1 && parts[0] === data.tipo) { 
             setTipo(parts[0]);
             setDescripcion(parts.slice(1).join(" - ")); // El resto es el nombre
        } else {
            setDescripcion(fullDesc);
        }
        
        setDireccion(data.direccion || "");
        setPrecio(data.precio || "");
        // Si tu backend devuelve tipo, úsalo: setTipo(data.tipo || "Departamento");

      } catch (err) {
        console.error(err);
        setError("Error al cargar la propiedad.");
      } finally {
        setLoading(false);
      }
    };

    fetchPropiedad();
  }, [idPropiedad, router]);

  // 2. Guardar cambios
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
      
      // Enviamos el tipo concatenado a la descripción si el backend no tiene columna 'tipo'
      const descripcionFinal = `${tipo} - ${descripcion}`;

      const res = await fetch(`${baseUrl}/propiedades/${idPropiedad}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          descripcion: descripcionFinal,
          direccion,
          precio: Number(precio),
        })
      });

      if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Error al actualizar");
      }

      router.push("/propietario/propiedades");
      router.refresh();

    } catch (err: any) {
      console.error(err);
      setError(err.message || "No se pudo actualizar la propiedad.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6 text-slate-500">Cargando propiedad...</div>;

  return (
    <div className="space-y-6 max-w-xl p-6">
      <h1 className="text-2xl font-bold text-slate-900">Editar propiedad</h1>

      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Nombre
          </label>
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
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
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Tipo
          </label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          >
            <option value="Departamento">Departamento</option>
            <option value="Casa">Casa</option>
            <option value="Garzonier">Garzonier</option>
            <option value="Local Comercial">Local Comercial</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Precio mensual (Bs.)
          </label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
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
            {saving ? "Guardando..." : "Actualizar propiedad"}
          </button>
        </div>
      </form>
    </div>
  );
}