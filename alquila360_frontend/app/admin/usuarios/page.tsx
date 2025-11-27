"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { getUsers, type User } from "@/app/services/user.services";

export default function UsuariosAdminPage() {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargarUsuarios() {
      try {
        setLoading(true);
        const data = await getUsers();
        setUsuarios(data);
      } catch (err: any) {
        console.error(err);
        setError("No se pudieron obtener los usuarios.");
      } finally {
        setLoading(false);
      }
    }

    cargarUsuarios();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Usuarios</h1>

        <Link href="/admin/usuarios/nuevo">
          <Button className="bg-emerald-600 text-white hover:bg-emerald-700 px-4 py-2 rounded-full">
            Nuevo usuario
          </Button>
        </Link>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        {loading && <p className="text-sm text-slate-500">Cargando usuarios...</p>}

        {error && <p className="text-sm text-red-500">{error}</p>}

        {!loading && !error && usuarios.length === 0 && (
          <p className="text-sm text-slate-500">No hay usuarios registrados.</p>
        )}

        {!loading &&
          !error &&
          usuarios.map((u) => (
            <div
              key={u.id_usuario}
              className="grid grid-cols-4 border-b py-3 items-center"
            >
              <p>{u.nombre}</p>
              <p className="text-slate-500">{u.correo}</p>
              <p className="text-slate-700">{u.tipo_usuario}</p>

              <Link
                href={`/admin/usuarios/${u.id_usuario}/editar`}
                className="text-emerald-600 hover:underline text-sm"
              >
                Editar
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
