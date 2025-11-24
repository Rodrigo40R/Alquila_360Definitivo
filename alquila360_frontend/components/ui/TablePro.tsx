"use client";

import { useState } from "react";

type Props = {
  data: { nombre: string; valor: string }[];
  itemsPorPagina?: number;
};

export default function TablePro({ data, itemsPorPagina = 5 }: Props) {
  const [pagina, setPagina] = useState(1);

  const totalPaginas = Math.ceil(data.length / itemsPorPagina);

  const datosPagina = data.slice(
    (pagina - 1) * itemsPorPagina,
    pagina * itemsPorPagina
  );

  return (
    <div className="space-y-4">
      {/* Tabla */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        {datosPagina.map((item, i) => (
          <div key={i} className="flex justify-between border-b py-3">
            <span>{item.nombre}</span>
            <span className="text-slate-600">{item.valor}</span>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="flex items-center gap-3 justify-center">
        <button
          disabled={pagina === 1}
          onClick={() => setPagina(pagina - 1)}
          className="px-3 py-1 border rounded-md disabled:opacity-40"
        >
          Anterior
        </button>
        <span className="text-sm text-slate-700">
          Página {pagina} de {totalPaginas}
        </span>
        <button
          disabled={pagina === totalPaginas}
          onClick={() => setPagina(pagina + 1)}
          className="px-3 py-1 border rounded-md disabled:opacity-40"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
