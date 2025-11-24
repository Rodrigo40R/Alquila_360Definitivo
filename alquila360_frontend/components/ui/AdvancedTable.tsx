"use client";

import { useState } from "react";

export default function AdvancedTable({ data }: any) {
  const [filtro, setFiltro] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const filtrados = data
    .filter((d: any) =>
      d.nombre.toLowerCase().includes(filtro.toLowerCase())
    )
    .sort((a: any, b: any) =>
      sortAsc
        ? a.nombre.localeCompare(b.nombre)
        : b.nombre.localeCompare(a.nombre)
    );

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="flex justify-between">
        <input
          className="border border-slate-300 px-3 py-2 rounded-md text-sm"
          placeholder="Filtrar por nombre..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        <button
          onClick={() => setSortAsc(!sortAsc)}
          className="px-3 py-2 bg-slate-200 rounded-md text-sm"
        >
          Ordenar {sortAsc ? "↓" : "↑"}
        </button>
      </div>

      {/* Tabla */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        {filtrados.map((d: any, i: number) => (
          <div key={i} className="flex justify-between border-b py-3">
            <span>{d.nombre}</span>
            <span className="text-slate-600">{d.valor}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
