"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";
import { getCurrentUser } from "@/lib/auth";

export default function NuevaPropiedadPage() {
  const router = useRouter();

  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [tipo, setTipo] = useState("Departamento"); // <- Ya se captura desde el select
  const [precio, setPrecio] = useState("");

  // ESTADOS AÑADIDOS POR REQUERIMIENTO DEL DTO DEL BACKEND
  const [estadoInicial, setEstadoInicial] = useState("DISPONIBLE"); // Asumimos disponible al crear

  // Estados de control
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState("");
  const [idPropietario, setIdPropietario] = useState<number | null>(null);

  // 1. Obtener sesión al cargar (Se mantiene igual)
  useEffect(() => {
    const user = getCurrentUser();
    
    if (!user || user.rol !== "propietario" || !user.id) {
      router.push("/login");
      return;
    }
    
    setToken(user.token);
    setIdPropietario(user.id);
    
  }, [router]);

  // 2. Enviar datos al Backend (CORREGIDO)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validación
    if (!nombre || !direccion || !precio) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    
    if (!idPropietario) {
        setError("Error de autenticación. ID de propietario no encontrado.");
        return;
    }

    try {
      setSaving(true);
      const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

      // Concatenamos Tipo + Nombre en 'descripcion' si no tienes columna 'tipo'
      const descripcionFinal = `${tipo} - ${nombre}`;

      const res = await fetch(`${baseUrl}/propiedades`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          descripcion: descripcionFinal, 
          direccion,
          precio: Number(precio),
          id_propietario: idPropietario,
          
          // 🚨 CAMPOS REQUERIDOS POR EL BACKEND AÑADIDOS:
          tipo: tipo,
          estado: estadoInicial // Enviamos el estado por defecto
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        // Muestra el mensaje de error del backend para mejor debug
        throw new Error(errorData.message || "Error al registrar la propiedad"); 
      }

      router.push("/propietario/propiedades");
      router.refresh();

    } catch (err: any) {
      console.error(err);
      setError(err.message || "No se pudo guardar la propiedad.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-xl p-6">
      <h1 className="text-2xl font-bold text-slate-900">Nueva propiedad</h1>

      {error && (
        <div className="p-3 bg-red-50 text-red-600 border border-red-200 rounded-md text-sm">
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
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Ej. Torre Azul 4B"
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
            placeholder="Ej. Av. América 123"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Tipo
          </label>
          <select
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
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
            placeholder="2500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600 disabled:opacity-70 transition-colors"
        >
          {saving ? "Guardando..." : "Guardar propiedad"}
        </button>
      </form>
    </div>
  );
}