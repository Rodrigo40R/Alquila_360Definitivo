"use client";

import { useState } from "react";

type Item = {
  tipo: string;
  nombre: string;
  url: string;
};

type Props = {
  items: Item[];
};

export default function SearchGlobal({ items }: Props) {
  const [q, setQ] = useState("");

  const filtrados = items.filter((e) =>
    e.nombre.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <input
        className="w-full border border-slate-300 rounded-md px-4 py-2 text-sm"
        placeholder="Buscar en propiedades, tickets, usuarios..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      {q !== "" && (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          {filtrados.length === 0 ? (
            <p className="text-sm text-slate-500">No hay resultados.</p>
          ) : (
            filtrados.map((f, i) => (
              <a
                key={i}
                className="block border-b py-2 text-slate-700 hover:text-emerald-600"
                href={f.url}
              >
                <span className="font-semibold capitalize">{f.tipo}:</span>{" "}
                {f.nombre}
              </a>
            ))
          )}
        </div>
      )}
    </div>
  );
}
