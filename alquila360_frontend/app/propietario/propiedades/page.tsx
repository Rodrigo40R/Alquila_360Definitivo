"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";

// Definición basada en la respuesta del backend
type PropiedadBackend = {
  id_propiedad: number;
  descripcion: string; // Usado como nombre
  direccion: string;
  precio: number;
  estado?: string; 
  inquilinoNombre?: string; 
};

const TABS = ["Todas", "Disponible", "Ocupado"] as const;
type Tab = (typeof TABS)[number];

export default function PropietarioPropiedadesPage() {
  const router = useRouter();
  const [propiedades, setPropiedades] = useState<PropiedadBackend[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [tabActiva, setTabActiva] = useState<Tab>("Todas");
  const [busqueda, setBusqueda] = useState("");

  // 1. Cargar Propiedades
  useEffect(() => {
    const fetchPropiedades = async () => {
      const user = getCurrentUser();

      // 🚩 CORRECCIÓN 1: Usar "propietario" en minúsculas y verificar user.id
      if (!user || user.rol !== "propietario" || !user.id) {
        router.push("/login");
        return;
      }

      // 🚩 CORRECCIÓN 2: Usar directamente la propiedad user.id
      const userId = user.id;

      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

        const res = await fetch(`${baseUrl}/propiedades/propietario/${userId}`, {
          headers: { "Authorization": `Bearer ${user.token}` }
        });

        if (res.ok) {
          const data = await res.json();
          setPropiedades(data);
        } else {
          // Capturamos error para debug
          const errorDetail = await res.text();
          console.error(`Error al cargar propiedades (${res.status}):`, errorDetail);
        }
      } catch (error) {
        console.error("Error de conexión:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPropiedades();
  }, [router]);

  // 2. Lógica de Filtrado
  const propiedadesFiltradas = propiedades.filter((p) => {
    // Normalizar estado
    const estadoReal = (p.estado || "Disponible").toUpperCase(); 

    // Filtro por Tab
    if (tabActiva !== "Todas") {
      const tabEstado = tabActiva.toUpperCase();
      if (estadoReal !== tabEstado) return false;
    }

    // Filtro por Buscador
    const texto = `${p.descripcion} ${p.direccion}`.toLowerCase();
    return texto.includes(busqueda.toLowerCase());
  });

  if (loading) {
    return <div className="p-6 text-slate-500">Cargando propiedades...</div>;
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* CABECERA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Mis Propiedades</h1>
          <p className="text-sm text-slate-500">
            Gestiona tu cartera de inmuebles.
          </p>
        </div>
        <Link
          href="/propietario/propiedades/nuevo"
          className="inline-flex justify-center items-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 shadow-sm"
        >
          + Nueva Propiedad
        </Link>
      </div>

      {/* BUSCADOR */}
      <div className="max-w-md">
        <input
          type="text"
          placeholder="Buscar por dirección o nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full rounded-full border border-slate-300 px-4 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      {/* TABS / FILTROS */}
      <div className="inline-flex items-center gap-2 overflow-x-auto pb-2">
        {TABS.map((tab) => {
          const active = tabActiva === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setTabActiva(tab)}
              className={
                active
                  ? "rounded-full bg-emerald-600 px-5 py-1.5 text-sm font-medium text-white shadow transition-colors"
                  : "rounded-full bg-slate-100 px-5 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-200 hover:text-emerald-700 transition-colors"
              }
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* LISTA DE PROPIEDADES */}
      <div className="grid grid-cols-1 gap-4">
        {propiedadesFiltradas.length === 0 ? (
          <div className="text-center py-10 rounded-xl border border-slate-200 border-dashed bg-slate-50">
            <p className="text-slate-500">No se encontraron propiedades.</p>
          </div>
        ) : (
          propiedadesFiltradas.map((p) => {
             // Determinar color del badge (normalizando el estado)
             const estadoUpper = (p.estado || "Disponible").toUpperCase();
             const esOcupado = estadoUpper === "OCUPADO";
             
             return (
              <div
                key={p.id_propiedad}
                onClick={() => router.push(`/propietario/propiedades/${p.id_propiedad}/detalle`)}
                className="cursor-pointer group flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-emerald-200 transition"
              >
                {/* Info principal */}
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {p.descripcion}
                  </h3>
                  <p className="text-sm text-slate-500 flex items-center gap-1">
                    📍 {p.direccion}
                  </p>
                  <p className="text-sm font-medium text-slate-700">
                    Bs. {p.precio} <span className="text-xs font-normal text-slate-400">/ mes</span>
                  </p>
                </div>

                {/* Estado y Acciones visuales */}
                <div className="mt-3 sm:mt-0 flex items-center gap-4">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold 
                      ${esOcupado 
                        ? "bg-sky-100 text-sky-700 border border-sky-200" 
                        : "bg-emerald-100 text-emerald-700 border border-emerald-200"
                      }`}
                  >
                    {estadoUpper}
                  </span>
                  
                  <span className="text-slate-300 text-xl hidden sm:block">›</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}