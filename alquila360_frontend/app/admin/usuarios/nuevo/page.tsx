"use client";

import Input from "@/components/ui/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/app/services/user.services";

export default function CrearUsuarioAdmin() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [rol, setRol] = useState("INQUILINO");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createUser({
        nombre,
        correo,
        password,
        tipo_usuario: rol,
      });

      router.push("/admin/usuarios");
    } catch (err: any) {
      console.error(err);
      setError("No se pudo crear el usuario");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-2xl font-bold text-slate-900">Nuevo usuario</h1>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-200 px-3 py-2 rounded-md">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

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

        <Input
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          disabled={loading}
          className="w-full bg-emerald-600 text-white hover:bg-emerald-700 py-2 rounded-full text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Creando usuario..." : "Guardar usuario"}
        </button>
      </form>
    </div>
  );
}
