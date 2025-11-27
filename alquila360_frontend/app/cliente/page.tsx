"use client";

export default function ClienteExplorarPage() {
  const propiedades = [
    {
      id: 1,
      nombre: "Departamento moderno en Cochabamba",
      ubicacion: "Av. América",
      precio: "Bs. 2,500 / mes",
      tipo: "Departamento",
      dormitorios: 2,
    },
    {
      id: 2,
      nombre: "Casa familiar en Tiquipaya",
      ubicacion: "Zona Tiquipaya",
      precio: "Bs. 3,800 / mes",
      tipo: "Casa",
      dormitorios: 3,
    },
    {
      id: 3,
      nombre: "Garzonier en Cala Cala",
      ubicacion: "Cala Cala",
      precio: "Bs. 1,500 / mes",
      tipo: "Garzonier",
      dormitorios: 1,
    },
  ];

  const filtros = ["Todos", "Departamento", "Casa", "Garzonier"];

  return (
    <div className="space-y-6">
      {/* ENCABEZADO */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Explorar propiedades
        </h1>
        <p className="text-sm text-slate-600">
          Encuentra el lugar perfecto para alquilar.
        </p>
      </div>

      {/* FILTROS */}
      <div className="flex flex-wrap gap-2 text-xs">
        {filtros.map((f, idx) => (
          <button
            key={f}
            className={
              idx === 0
                ? "px-3 py-1.5 rounded-full bg-emerald-500 text-white font-semibold"
                : "px-3 py-1.5 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50"
            }
          >
            {f}
          </button>
        ))}
      </div>

      {/* LISTA DE PROPIEDADES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {propiedades.map((p) => (
          <div
            key={p.id}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-2"
          >
            <div className="h-36 rounded-lg bg-slate-200"></div>

            <p className="text-base font-semibold text-slate-900">{p.nombre}</p>
            <p className="text-sm text-slate-600">{p.ubicacion}</p>
            <p className="text-sm text-emerald-600 font-semibold">{p.precio}</p>

            <div className="flex gap-2 text-xs pt-1">
              <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-700">
                {p.tipo}
              </span>
              <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-700">
                {p.dormitorios} dorm
              </span>
            </div>

            <button className="w-full mt-2 px-3 py-2 rounded-md bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600">
              Ver detalles
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
