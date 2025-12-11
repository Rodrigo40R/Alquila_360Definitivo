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
  const [estadoCuenta, setEstadoCuenta] = useState("Activo");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
        setEstadoCuenta(data.estado_cuenta);
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

    // Validar contraseñas si se ingresó alguna
    if (password || confirmPassword) {
      if (password !== confirmPassword) {
        setError("Las contraseñas no coinciden");
        setSaving(false);
        return;
      }
      if (password.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres");
        setSaving(false);
        return;
      }
    }

    try {
      const updateData: any = {
        nombre,
        correo,
        tipo_usuario: rol,
        estado_cuenta: estadoCuenta,
      };

      // Solo incluir password si se ingresó uno nuevo
      if (password) {
        updateData.password = password;
      }

      await updateUser(id, updateData);

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
          required
        />

        <Input
          label="Correo electrónico"
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />

        <div className="space-y-1">
          <label className="text-sm text-slate-600">Rol</label>
          <select
            className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            required
          >
            <option value="INQUILINO">Inquilino</option>
            <option value="PROPIETARIO">Propietario</option>
            <option value="TECNICO">Técnico</option>
            <option value="ADMINISTRADOR">Admin</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm text-slate-600">Estado de cuenta</label>
          <select
            className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm"
            value={estadoCuenta}
            onChange={(e) => setEstadoCuenta(e.target.value)}
            required
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
            <option value="Suspendido">Suspendido</option>
          </select>
        </div>

        <div className="border-t border-slate-200 pt-4 mt-6">
          <p className="text-sm text-slate-600 mb-3">
            Cambiar contraseña (opcional)
          </p>

          <Input
            label="Nueva contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Dejar vacío para mantener la actual"
          />

          <Input
            label="Confirmar contraseña"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repetir la nueva contraseña"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-emerald-600 text-white hover:bg-emerald-700 py-2 rounded-full text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {saving ? "Actualizando..." : "Actualizar Usuario"}
        </button>
      </form>
    </div>
  );
}
