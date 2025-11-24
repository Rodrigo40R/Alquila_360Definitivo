"use client";

import { useRouter } from "next/navigation";

type PageProps = {
  params: {
    id: string;
  };
};

type DetallePropiedad = {
  nombre: string;
  direccion: string;
  ciudad: string;
  inquilino: string;
  estado: "Disponible" | "Ocupado";
  descripcion: string;
};

// clave string para no pelear con 1 | 2 | 3
const propiedadesDetalle: Record<string, DetallePropiedad> = {
  "1": {
    nombre: "Depto - Av. América",
    direccion: "Av. América 123",
    ciudad: "Cochabamba",
    inquilino: "Carlos López",
    estado: "Ocupado",
    descripcion:
      "Departamento amplio y luminoso, ideal para profesionales. Incluye parqueo y baulera.",
  },
  "2": {
    nombre: "Casa - Tiquipaya",
    direccion: "Calle Aurora 456",
    ciudad: "Tiquipaya",
    inquilino: "María Gómez",
    estado: "Ocupado",
    descripcion:
      "Casa familiar con jardín grande, zona tranquila y de fácil acceso.",
  },
  "3": {
    nombre: "Garzonier - Cala Cala",
    direccion: "Cala Cala 23",
    ciudad: "Cochabamba",
    inquilino: "Sin inquilino",
    estado: "Disponible",
    descripcion:
      "Garzonier cómodo, ideal para estudiantes o parejas jóvenes. Actualmente sin inquilino.",
  },
};

export default function DetallePropiedadPage({ params }: PageProps) {
  const router = useRouter();

  // ahora es string -> string, sin casteos raros
  const data = propiedadesDetalle[params.id];

  if (!data) {
    return (
      <div className="px-6 py-6">
        <div className="max-w-xl mx-auto rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-lg font-semibold text-red-700">
            Propiedad no encontrada
          </p>
          <p className="mt-1 text-sm text-red-600">
            Verifica el enlace o vuelve al listado.
          </p>
          <button
            type="button"
            onClick={() => router.push("app/propietario/propiedades")}
            className="mt-4 rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
          >
            Volver a mis propiedades
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-6">
      <div className="max-w-3xl mx-auto space-y-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 hover:underline"
        >
          ← Volver a mis propiedades
        </button>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {data.nombre}
              </h1>
              <p className="text-sm text-slate-600">{data.direccion}</p>
              <p className="text-sm text-slate-500">{data.ciudad}</p>
            </div>

            <div className="space-y-1 text-sm">
              <p className="text-slate-500">
                Estado:{" "}
                <span
                  className={
                    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold " +
                    (data.estado === "Disponible"
                      ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                      : "bg-sky-100 text-sky-700 border border-sky-200")
                  }
                >
                  {data.estado}
                </span>
              </p>
              <p className="text-slate-500">
                Inquilino:{" "}
                <span className="font-semibold text-slate-800">
                  {data.inquilino}
                </span>
              </p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <h2 className="text-sm font-semibold text-slate-800 mb-1">
              Descripción
            </h2>
            <p className="text-sm text-slate-600">{data.descripcion}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
