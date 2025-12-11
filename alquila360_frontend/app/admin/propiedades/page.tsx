"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// ----------------------
// Tipos
// ----------------------
type PropiedadBack = {
  id_propiedad: number;
  direccion: string;
  tipo: string;
  estado: string;
  propietario?: {
    id_usuario: number;
    nombre?: string;
    nombre_completo?: string;
  };
};

type PropiedadRow = {
  id: number;
  direccion: string;
  tipo: string;
  estado: string;
  propietario: string;
};

// ----------------------
// API URL
// ----------------------
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// ----------------------
// Mapper back → front
// ----------------------
function mapFromBack(p: PropiedadBack): PropiedadRow {
  const propietarioNombre =
    p.propietario?.nombre_completo ||
    p.propietario?.nombre ||
    (p.propietario
      ? `Propietario #${p.propietario.id_usuario}`
      : "Sin propietario");

  return {
    id: p.id_propiedad,
    direccion: p.direccion,
    tipo: p.tipo,
    estado: p.estado,
    propietario: propietarioNombre,
  };
}

// ----------------------
// Estilo visual para estado
// ----------------------
function pillEstadoClase(estado: string) {
  const norm = (estado || "").toUpperCase();

  if (norm === "DISPONIBLE" || norm === "LIBRE") {
    return "bg-emerald-100 text-emerald-700 border border-emerald-200";
  }

  if (norm === "OCUPADA" || norm === "OCUPADO") {
    return "bg-sky-100 text-sky-700 border border-sky-200";
  }

  return "bg-slate-100 text-slate-700 border border-slate-200";
}

export default function AdminPropiedadesPage() {
  const router = useRouter();

  const [propiedades, setPropiedades] = useState<PropiedadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ----------------------
  // Fetch propiedades
  // ----------------------
  useEffect(() => {
    async function cargarPropiedades() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_URL}/propiedades`, {
          cache: "no-store",
        });

        const text = await res.text();

        if (!res.ok) {
          throw new Error(
            `Error al obtener propiedades: ${res.status} - ${text}`
          );
        }

        const data: PropiedadBack[] = JSON.parse(text);
        const rows = Array.isArray(data) ? data.map(mapFromBack) : [];
        setPropiedades(rows);
      } catch (err: any) {
        console.error("Error cargando propiedades:", err);
        setError(err?.message || "No se pudieron cargar las propiedades.");
      } finally {
        setLoading(false);
      }
    }

    cargarPropiedades();
  }, []);

  // ----------------------
  // Render
  // ----------------------
  return (
    <div className="px-6 py-6 space-y-8">
      {/* HEADER */}
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

      {/* ESTADOS CARGA / ERROR */}
      {loading && <p className="text-sm text-slate-500">Cargando propiedades...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* TABLA */}
      {!loading && !error && (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-slate-100 px-6 py-3 flex items-center justify-between">
            <p className="text-sm font-medium text-slate-700">Listado de propiedades</p>
            <p className="text-xs text-slate-400">{propiedades.length} propiedades registradas</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wide">
                <tr>
                  <th className="px-6 py-3 text-left">ID</th>
                  <th className="px-6 py-3 text-left">Dirección</th>
                  <th className="px-6 py-3 text-left">Tipo</th>
                  <th className="px-6 py-3 text-left">Propietario</th>
                  <th className="px-6 py-3 text-left">Estado</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {propiedades.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80">
                    <td className="px-6 py-3 text-slate-700 font-medium">#{p.id}</td>
                    <td className="px-6 py-3 text-slate-900">{p.direccion}</td>
                    <td className="px-6 py-3 text-slate-700">{p.tipo}</td>
                    <td className="px-6 py-3 text-slate-700">{p.propietario}</td>
                    <td className="px-6 py-3">
                      <span
                        className={
                          "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold " +
                          pillEstadoClase(p.estado)
                        }
                      >
                        {p.estado}
                      </span>
                    </td>
                  </tr>
                ))}

                {propiedades.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-6 text-center text-sm text-slate-400">
                      No hay propiedades registradas todavía.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
