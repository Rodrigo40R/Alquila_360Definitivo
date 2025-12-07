"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type Propiedad = {
  id: number;
  nombre: string;
  tipo: string;
  ubicacion: string;
  estado: "Disponible" | "Ocupada";
  imagen: string;
};

const propiedades: Propiedad[] = [
  {
    id: 1,
    nombre: "Departamento - Av. América",
    tipo: "Departamento",
    ubicacion: "Cochabamba",
    estado: "Ocupada",
    imagen: "/departamento.png",
  },
  {
    id: 2,
    nombre: "Casa - Tiquipaya",
    tipo: "Casa",
    ubicacion: "Tiquipaya",
    estado: "Ocupada",
    imagen: "/propiedad-2.png",
  },
  {
    id: 3,
    nombre: "Garzonier - Cala Cala",
    tipo: "Garzonier",
    ubicacion: "Cala Cala",
    estado: "Disponible",
    imagen: "/garzonier.png",
  },
];

export default function AdminPropiedadesPage() {
  const router = useRouter();

  return (
    <div className="px-6 py-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Propiedades</h1>
          <p className="text-sm text-slate-500">
            Registro de propiedades administradas en el sistema.
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/admin/propiedades/nueva")}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-600"
        >
          <span className="text-lg leading-none">＋</span>
          Registrar propiedad
        </button>
      </div>

      {/* GRID DE PROPIEDADES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {propiedades.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer"
          >
            {/* IMAGEN */}
            <div className="relative h-48 w-full">
              <Image
                src={p.imagen}
                alt={p.nombre}
                fill
                className="object-cover"
              />
            </div>

            {/* INFO */}
            <div className="p-5 space-y-2">
              <p className="font-bold text-slate-900 text-lg">{p.nombre}</p>
              <p className="text-sm text-slate-600">{p.tipo}</p>
              <p className="text-sm text-slate-600">{p.ubicacion}</p>

              {/* ESTADO */}
              <span
                className={
                  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold mt-2 " +
                  (p.estado === "Disponible"
                    ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                    : "bg-sky-100 text-sky-700 border border-sky-200")
                }
              >
                {p.estado}
              </span>

              {/* BOTÓN extra opcional */}
              <button
                className="mt-3 w-full rounded-lg border border-slate-300 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
                onClick={() => router.push(`/admin/propiedades/${p.id}`)}
              >
                Ver detalles
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
