"use client";

import { useRouter } from "next/navigation";

type Propiedad = {
  id: number;
  nombre: string;
  direccion: string;
  inquilino: string;
};

const propiedades: Propiedad[] = [
  {
    id: 1,
    nombre: "Depto - Av. América",
    direccion: "Av. América 123",
    inquilino: "Carlos López",
  },
  {
    id: 2,
    nombre: "Casa - Tiquipaya",
    direccion: "Calle Aurora 456",
    inquilino: "María Gómez",
  },
  {
    id: 3,
    nombre: "Garzonier - Cala Cala",
    direccion: "Cala Cala 23",
    inquilino: "Sin inquilino",
  },
];

export default function PropietarioPropiedadesPage() {
  const router = useRouter();

  const irANuevaPropiedad = () => {
    // RUTA CORRECTA PARA TU PROYECTO
    router.push("/propietario/propiedades/nueva");
  };

  const irADetalle = (id: number) => {
    router.push(`/propietario/propiedades/${id}`);
  };

  return (
    <div className="px-6 py-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Mis propiedades</h1>

        <button
          type="button"
          onClick={irANuevaPropiedad}
          className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-600"
        >
          Nueva propiedad
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {propiedades.map((p, idx) => (
          <div
            key={p.id}
            className={`flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-4 ${
              idx !== propiedades.length - 1 ? "border-b border-slate-100" : ""
            }`}
          >
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-900">
                {p.nombre}
              </p>
              <p className="text-sm text-slate-600">{p.direccion}</p>
              <p className="text-sm text-slate-500">
                Inquilino:{" "}
                <span className="font-medium text-slate-700">
                  {p.inquilino}
                </span>
              </p>
            </div>

            <button
              type="button"
              onClick={() => irADetalle(p.id)}
              className="mt-3 sm:mt-0 text-sm font-semibold text-emerald-600 hover:text-emerald-700 hover:underline"
            >
              Ver más
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
