"use client";

import { useState } from "react";

type Estado = "En proceso" | "Pendiente" | "Asignar";

type Propiedad = {
  id: number;
  nombre: string;
  direccion: string;
  inquilino: string;
  estado: Estado;
};

const PROPIEDADES: Propiedad[] = [
  {
    id: 1,
    nombre: "320 Calle Prado",
    direccion: "Zona Centro",
    inquilino: "Antonio Pérez",
    estado: "En proceso",
  },
  {
    id: 2,
    nombre: "117 Calle Valle",
    direccion: "Zona Norte",
    inquilino: "Laura Díaz",
    estado: "En proceso",
  },
  {
    id: 3,
    nombre: "206 Avenida Sur",
    direccion: "Tiquipaya",
    inquilino: "Lucas Martínez",
    estado: "En proceso",
  },
  {
    id: 4,
    nombre: "320 Calle Prado",
    direccion: "Zona Centro",
    inquilino: "Antonio Pérez",
    estado: "Pendiente",
  },
  {
    id: 5,
    nombre: "117 Calle Valle",
    direccion: "Zona Norte",
    inquilino: "Laura Díaz",
    estado: "Pendiente",
  },
  {
    id: 6,
    nombre: "206 Avenida Sur",
    direccion: "Tiquipaya",
    inquilino: "Lucas Martínez",
    estado: "Asignar",
  },
];

const TABS = ["Todas", "En proceso", "Pendientes", "Asignar"] as const;
type Tab = (typeof TABS)[number];

export default function PropietarioPropiedadesPage() {
  const [tabActiva, setTabActiva] = useState<Tab>("Todas");
  const [busqueda, setBusqueda] = useState("");

  const propiedadesFiltradas = PROPIEDADES.filter((p) => {
    // filtro por tab
    if (tabActiva === "En proceso" && p.estado !== "En proceso") return false;
    if (tabActiva === "Pendientes" && p.estado !== "Pendiente") return false;
    if (tabActiva === "Asignar" && p.estado !== "Asignar") return false;

    // filtro por texto
    const texto = `${p.nombre} ${p.direccion} ${p.inquilino}`.toLowerCase();
    return texto.includes(busqueda.toLowerCase());
  });

  return (
    <div className="flex flex-col gap-6">
      {/* TÍTULO */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Mantenimiento</h1>
        <p className="text-sm text-slate-500">
          Consulta el estado de los tickets de tus propiedades.
        </p>
      </div>

      {/* BUSCADOR */}
      <div className="max-w-md">
        <input
          type="text"
          placeholder="Buscar propiedad..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full rounded-full border border-slate-300 px-4 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      {/* TABS / FILTROS */}
      <div className="inline-flex items-center gap-6 rounded-full bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600">
        {TABS.map((tab) => {
          const active = tabActiva === tab;

          return (
            <button
              key={tab}
              type="button"
              onClick={() => setTabActiva(tab)}
              className={
                active
                  ? "rounded-full bg-emerald-600 px-5 py-1.5 text-white shadow"
                  : "px-5 py-1.5 rounded-full hover:text-emerald-700"
              }
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* LISTA DE PROPIEDADES */}
      <div className="mt-2 space-y-3">
        {propiedadesFiltradas.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm hover:shadow-md transition"
          >
            {/* Info principal */}
            <div>
              <p className="font-semibold text-slate-900">{p.nombre}</p>
              <p className="text-xs text-slate-500">{p.direccion}</p>
              <p className="text-xs text-slate-500">Inquilino: {p.inquilino}</p>
            </div>

            {/* Estado */}
            <span
              className={
                "inline-flex items-center rounded-full px-4 py-1 text-xs font-semibold " +
                (p.estado === "En proceso"
                  ? "bg-amber-100 text-amber-800"
                  : p.estado === "Pendiente"
                  ? "bg-rose-100 text-rose-700"
                  : "bg-slate-100 text-slate-700")
              }
            >
              {p.estado}
            </span>
          </div>
        ))}

        {propiedadesFiltradas.length === 0 && (
          <p className="mt-4 text-sm text-slate-500">
            No se encontraron propiedades para este filtro.
          </p>
        )}
      </div>
    </div>
  );
}
