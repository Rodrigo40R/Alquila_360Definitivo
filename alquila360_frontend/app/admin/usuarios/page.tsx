"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { getUsers, deleteUser, type User } from "@/app/services/user.services";

const FILTROS = ["Todos", "Inquilinos", "Propietarios", "Técnicos"] as const;
type Filtro = (typeof FILTROS)[number];

export default function UsuariosAdminPage() {
  const [filtro, setFiltro] = useState<Filtro>("Todos");
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const usuariosFiltrados = usuarios.filter((u) => {
    if (filtro === "Todos") return true;
    if (filtro === "Inquilinos") return u.tipo_usuario === "INQUILINO";
    if (filtro === "Propietarios") return u.tipo_usuario === "PROPIETARIO";
    if (filtro === "Técnicos") return u.tipo_usuario=== "TECNICO";
    return true;
  });

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
    <div className="space-y-8">
      {/* ENCABEZADO */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Gestión de Usuarios</h1>
          <p className="text-sm text-slate-500">
            Administra y organiza a los usuarios registrados.
          </p>
        </div>

        {/* BOTÓN FACHERO */}
        {/* <a href="/admin/usuarios/nuevo">
          <button
            type="button"
            className="rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-emerald-600 hover:shadow-xl transition-all"
          >
            + Registrar Nuevo Usuario
          </button>
        </a> */}
      </div>

      {/* FILTROS */}
      <div className="flex gap-3">
        {FILTROS.map((f) => {
          const activo = filtro === f;
          return (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                activo
                  ? "bg-indigo-600 text-white shadow"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* TABLA CON ACCIONES */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-500">Cargando usuarios...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold text-slate-500">
              <tr>
                <th className="px-6 py-3">Nombre</th>
                <th className="px-6 py-3">Correo</th>
                <th className="px-6 py-3">Rol principal</th>
                <th className="px-6 py-3">Estado</th>
                <th className="px-6 py-3 text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {usuariosFiltrados.map((u, index) => (
                <tr
                  key={u.id_usuario}
                  className={index % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
                >
                  <td className="px-6 py-3 font-medium text-slate-900">{u.nombre}</td>

                  <td className="px-6 py-3 text-slate-600">{u.correo}</td>

                  <td className="px-6 py-3 text-slate-700">{u.tipo_usuario}</td>

                  <td className="px-6 py-3">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        u.estado_cuenta === "Activo"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {u.estado_cuenta}
                    </span>
                  </td>

                  <td className="px-6 py-3">
                    <div className="flex items-center justify-center gap-2">
                      {/* BOTÓN EDITAR */}
                      <Link href={`/admin/usuarios/${u.id_usuario}/editar`}>
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition"
                          title="Editar usuario"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </button>
                      </Link>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
