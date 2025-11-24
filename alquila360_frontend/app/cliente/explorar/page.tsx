"use client";

export default function ExploracionCliente() {
  const propiedades = [
    {
      id: 1,
      nombre: "Departamento moderno",
      precio: 2500,
      zona: "Av. América",
      img: "/img/depto1.jpg",
    },
    {
      id: 2,
      nombre: "Casa familiar",
      precio: 3800,
      zona: "Tiquipaya",
      img: "/img/casa1.jpg",
    },
    {
      id: 3,
      nombre: "Garzonier económico",
      precio: 1500,
      zona: "Cala Cala",
      img: "/img/garzo1.jpg",
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-900">Explorar propiedades</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {propiedades.map((p) => (
          <a
            key={p.id}
            href={`/cliente/propiedad/${p.id}`}
            className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden hover:shadow-lg transition"
          >
            <div className="h-40 bg-slate-200"></div>

            <div className="p-4 space-y-1">
              <p className="text-lg font-semibold">{p.nombre}</p>
              <p className="text-slate-500 text-sm">{p.zona}</p>
              <p className="text-brand-primary font-bold">Bs. {p.precio}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
