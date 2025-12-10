"use client";

import { useEffect, useState, FormEvent } from "react";
import { getCurrentUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function ConfiguracionPropietario() {
  const router = useRouter();
  
  // Estados para datos del formulario (SOLO NOMBRE Y CORREO)
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
  });

  // Estados de interfaz
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Propiedades directas y limpias
  const [userId, setUserId] = useState<number | null>(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const user = getCurrentUser();

    // 1. Verificación de sesión y rol
    if (!user || user.rol !== "propietario" || !user.id) { 
      router.push("/login");
      return;
    }

    const id = user.id;
    const currentToken = user.token; 
    
    setToken(currentToken);
    setUserId(id);

    async function cargarDatos(id: number, currentToken: string) {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
        
        const res = await fetch(`${baseUrl}/users/${id}`, {
          headers: {
            Authorization: `Bearer ${currentToken}`, 
          },
        });

        if (!res.ok) throw new Error("Error al obtener datos del usuario");

        const data = await res.json();

        // 🚨 CAMBIO AQUÍ: Solo capturamos nombre y correo
        setFormData({
          nombre: data.nombre ?? "",
          correo: data.correo ?? "",
        });
      } catch (error) {
        console.error("Error cargando usuario:", error);
        setMessage({ type: 'error', text: "No se pudo cargar la información." });
      } finally {
        setLoading(false);
      }
    }

    cargarDatos(id, currentToken); 
  }, [router]);

  // Manejador de cambios en inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setMessage(null);
    setSaving(true);

    if (!userId || !token) {
        setSaving(false);
        setMessage({ type: 'error', text: "Error de sesión. Intenta recargar la página." });
        return;
    }
    
    // 🚨 NOTA: formData solo contiene nombre y correo, que es lo que se enviará en el PATCH.
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

      const res = await fetch(`${baseUrl}/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "No se pudo actualizar");
      }

      setMessage({ type: 'success', text: "Datos actualizados correctamente." });
    } catch (error: any) {
      console.error("Error al actualizar:", error);
      setMessage({ type: 'error', text: error.message || "Hubo un error al actualizar tu perfil." });
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="p-6 text-slate-500">Cargando configuración...</div>;

  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Configuración de cuenta
        </h1>
        <p className="text-sm text-slate-600">
          Actualiza tus datos personales y credenciales.
        </p>
      </div>

      {/* Mensajes de Feedback */}
      {message && (
        <div className={`p-3 rounded-md text-sm border ${
          message.type === 'success' 
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
            : 'bg-red-50 text-red-700 border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Nombre completo
          </label>
          <input
            name="nombre"
            type="text"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Correo electrónico
          </label>
          <input
            name="correo"
            type="email"
            value={formData.correo}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            required
          />
        </div>

        {/* ❌ SECCIÓN DE TELÉFONO ELIMINADA ❌ */}

        <div className="pt-3 flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 rounded-md border border-slate-300 text-sm hover:bg-slate-50"
            onClick={() => router.back()}
            disabled={saving}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 disabled:opacity-70"
            disabled={saving}
          >
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </form>
    </div>
  );
}