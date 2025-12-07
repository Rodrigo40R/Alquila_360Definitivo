"use client";

import { useState } from "react";

type Usuario = {
  id: number;
  nombre: string;
  rol: "Inquilino" | "Propietario" | "Técnico";
  email: string;
  propiedad: string;
  estado: "Activo" | "Inactivo";
};

const USUARIOS: Usuario[] = [
  {
    id: 1,
    nombre: "Carlos López",
    rol: "Inquilino",
    email: "carlos@example.com",
    propiedad: "Edificio Central 101",
    estado: "Activo",
  },
  {
    id: 2,
    nombre: "María Gómez",
    rol: "Propietario",
    email: "maria@example.com",
    propiedad: "Condominio Vista Verde",
    estado: "Activo",
  },
  {
    id: 3,
    nombre: "Pedro Ríos",
    rol: "Técnico",
    email: "pedro@example.com",
    propiedad: "—",
    estado: "Activo",
  },
];

const FILTROS = ["Todos", "Inquilinos", "Propietarios", "Técnicos"] as const;
type Filtro = (typeof FILTROS)[number];

export default function UsuariosAdminPage() {
  const [filtro, setFiltro] = useState<Filtro>("Todos");

  const usuariosFiltrados = USUARIOS.filter((u) => {
    if (filtro === "Todos") return true;
    if (filtro === "Inquilinos") return u.rol === "Inquilino";
    if (filtro === "Propietarios") return u.rol === "Propietario";
    if (filtro === "Técnicos") return u.rol === "Técnico";
    return true;
  });

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
              <th className="px-6 py-3">Propiedad</th>
            </tr>
          </thead>

          <tbody>
            {usuariosFiltrados.map((u, index) => (
              <tr
                key={u.id}
                className={index % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
              >
                <td className="px-6 py-3 font-medium text-slate-900">{u.nombre}</td>

                <td className="px-6 py-3 text-slate-600">{u.email}</td>

                <td className="px-6 py-3 text-slate-700">{u.rol}</td>

                <td className="px-6 py-3">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      u.estado === "Activo"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {u.estado}
                  </span>
                </td>

                <td className="px-6 py-3 text-slate-700">{u.propiedad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
