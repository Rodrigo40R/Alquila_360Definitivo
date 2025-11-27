"use client";

import { useState, useEffect } from "react";
import Input from "@/components/ui/Input";
import { useParams, useRouter } from "next/navigation";
import { getUserById, updateUser } from "@/app/services/user.services";

export default function EditarUsuarioAdmin() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [rol, setRol] = useState("INQUILINO");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargarUsuario() {
      try {
        const data = await getUserById(id);
        setNombre(data.nombre);
        setCorreo(data.correo);
        setRol(data.tipo_usuario);
      } catch (e) {
        setError("No se pudo cargar el usuario");
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    if (!Number.isNaN(id)) {
      cargarUsuario();
    }
  }, [id]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await updateUser(id, {
        nombre,
        correo,
        tipo_usuario: rol,
      });

      router.push("/admin/usuarios");
    } catch (e) {
      console.error(e);
      setError("No se pudo actualizar el usuario");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-sm text-slate-500">Cargando...</p>;

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-2xl font-bold text-slate-900">Editar usuario</h1>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      <form className="space-y-4" onSubmit={handleSave}>
        <Input
          label="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <Input
          label="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />

        <div className="space-y-1">
          <label className="text-sm text-slate-600">Rol</label>
          <select
            className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
          >
            <option value="INQUILINO">Inquilino</option>
            <option value="PROPIETARIO">Propietario</option>
            <option value="TECNICO">Técnico</option>
            <option value="ADMINISTRADOR">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-emerald-600 text-white hover:bg-emerald-700 py-2 rounded-full text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {saving ? "Actualizando..." : "Actualizar"}
        </button>
      </form>
    </div>
  );
}
