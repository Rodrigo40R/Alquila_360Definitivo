"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { getUsers, type User } from "@/app/services/user.services";

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
    }, []);

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
        <a href="/admin/usuarios/nuevo">
          <button
            type="button"
            className="rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-emerald-600 hover:shadow-xl transition-all"
          >
            + Registrar Nuevo Usuario
          </button>
        </a>
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

      {/* TABLA SIN ACCIONES */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold text-slate-500">
            <tr>
              <th className="px-6 py-3">Nombre</th>
              <th className="px-6 py-3">Correo</th>
              <th className="px-6 py-3">Rol principal</th>
              <th className="px-6 py-3">Estado</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
