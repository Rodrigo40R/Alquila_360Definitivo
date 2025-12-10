"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/auth";

type PageProps = {
  params: {
    id: string;
  };
};

type DetallePropiedad = {
  id_propiedad: number;
  descripcion: string; // Usado como "Nombre"
  direccion: string;
  precio: number;
  ciudad?: string; // Si no viene del back, lo manejamos opcional
  estado?: string; // VIGENTE, DISPONIBLE, OCUPADO
  // Relaciones posibles
  contratos?: any[]; 
};

export default function DetallePropiedadPage({ params }: PageProps) {
  const router = useRouter();
  const idPropiedad = params.id;

  const [propiedad, setPropiedad] = useState<DetallePropiedad | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar datos
  useEffect(() => {
    const fetchDetalle = async () => {
      const user = getCurrentUser();

      // 🚩 CORRECCIÓN 1: Verificar la existencia y el ID limpio de la sesión
      if (!user || !user.id) {
        router.push("/login");
        return;
      }
      
      // console.log("objeto USER completo:", user); // Se remueve el console.log para producción

      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
        
        const res = await fetch(`${baseUrl}/propiedades/${idPropiedad}`, {
          headers: { "Authorization": `Bearer ${user.token}` }
        });

        if (!res.ok) {
          if (res.status === 404) setError("Propiedad no encontrada");
          // Si el servidor devuelve 403 (No autorizado, ej: no es tu propiedad), podemos ser más específicos
          else setError(`Error al cargar la propiedad: ${res.statusText}`); 
          return;
        }

        const data = await res.json();
        setPropiedad(data);
      } catch (err) {
        console.error(err);
        setError("Error de conexión");
      } finally {
        setLoading(false);
      }
    };

    fetchDetalle();
  }, [idPropiedad, router]);

  // Si hay error o no existe
  if (error) {
    return (
      <div className="px-6 py-6">
        <div className="max-w-xl mx-auto rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-lg font-semibold text-red-700">{error}</p>
          <p className="mt-1 text-sm text-red-600">Verifica el enlace o vuelve al listado.</p>
          <button
            type="button"
            onClick={() => router.push("/propietario/propiedades")}
            className="mt-4 rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
          >
            Volver a mis propiedades
          </button>
        </div>
      </div>
    );
  }

  if (loading) return <div className="p-6 text-slate-500">Cargando detalle...</div>;
  if (!propiedad) return null;

  // Lógica para determinar el estado visual
  const estadoVisual = propiedad.estado || "Disponible"; // Usamos el estado del backend o asumimos disponible

  return (
    <div className="px-6 py-6">
      <div className="max-w-3xl mx-auto space-y-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 hover:underline"
        >
          ← Volver atrás
        </button>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {propiedad.descripcion}
              </h1>
              <p className="text-sm text-slate-600 mt-1">{propiedad.direccion}</p>
              <p className="text-sm text-slate-500">{propiedad.ciudad || "Cochabamba"}</p>
            </div>

            <div className="space-y-2 text-sm min-w-[200px] sm:text-right">
              <div>
                 <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold 
                    ${estadoVisual === "Disponible" 
                        ? "bg-emerald-100 text-emerald-700 border border-emerald-200" 
                        : "bg-sky-100 text-sky-700 border border-sky-200"}`}
                 >
                    {estadoVisual}
                 </span>
              </div>
              
              <div className="text-slate-500">
                Precio: <span className="font-semibold text-slate-800">Bs. {propiedad.precio}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <h2 className="text-sm font-semibold text-slate-800 mb-1">
              Detalles
            </h2>
            <p className="text-sm text-slate-600">
              {propiedad.descripcion || "Sin descripción adicional."}
            </p>
          </div>

          {/* Botón de Editar rápido */}
          <div className="pt-2 flex justify-end">
            <button
                onClick={() => router.push(`/propietario/propiedades/${propiedad.id_propiedad}`)}
                className="text-sm font-medium text-emerald-600 hover:text-emerald-700 underline"
            >
                Editar información
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}