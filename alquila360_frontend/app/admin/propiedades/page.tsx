"use client";

import { useRouter } from "next/navigation";

type Propiedad = {
  id: number;
  nombre: string;
  tipo: string;
  ubicacion: string;
  estado: "Disponible" | "Ocupada";
};

const propiedades: Propiedad[] = [
  {
    id: 1,
    nombre: "Departamento - Av. América",
    tipo: "Departamento",
    ubicacion: "Cochabamba",
    estado: "Ocupada",
  },
  {
    id: 2,
    nombre: "Casa - Tiquipaya",
    tipo: "Casa",
    ubicacion: "Tiquipaya",
    estado: "Ocupada",
  },
  {
    id: 3,
    nombre: "Garzonier - Cala Cala",
    tipo: "Garzonier",
    ubicacion: "Cala Cala",
    estado: "Disponible",
  },
];

export default function AdminPropiedadesPage() {
  const router = useRouter();

  return (
    <div className="px-6 py-6 space-y-6">
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

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 px-6 py-3 flex items-center justify-between">
          <p className="text-sm font-medium text-slate-700">
            Propiedades registradas
          </p>
          <p className="text-xs text-slate-400">
            {propiedades.length} propiedades en total
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
              <tr>
                <th className="px-6 py-3 text-left">Nombre</th>
                <th className="px-6 py-3 text-left">Tipo</th>
                <th className="px-6 py-3 text-left">Ubicación</th>
                <th className="px-6 py-3 text-left">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {propiedades.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80">
                  <td className="px-6 py-4 text-slate-900">{p.nombre}</td>
                  <td className="px-6 py-4 text-slate-700">{p.tipo}</td>
                  <td className="px-6 py-4 text-slate-700">{p.ubicacion}</td>
                  <td className="px-6 py-4">
                    <span
                      className={
                        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold " +
                        (p.estado === "Disponible"
                          ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                          : "bg-sky-100 text-sky-700 border border-sky-200")
                      }
                    >
                      {p.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
