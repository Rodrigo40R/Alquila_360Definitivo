"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

// Definición de la estructura de datos que esperamos del backend
interface Pago {
  id_pago: number;
  monto_pagado: number;
  fecha_pago: string;
  estado: string; // "COMPLETADO", "PENDIENTE", etc.
  // Relaciones anidadas (Pago -> Cuota -> Contrato -> Propiedad/Inquilino)
  cuota?: {
    contrato?: {
      propiedad?: {
        direccion: string;
      };
      inquilino?: {
        nombre: string;
        apellido?: string;
      };
      // NECESITAMOS ESTE CAMPO para filtrar por propietario logueado
      id_propietario: number; 
    };
  };
}

export default function PagosPropietario() {
  const router = useRouter();
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPagos = async () => {
      const user = getCurrentUser();

      // Validación de sesión y rol
      if (!user || user.rol !== "propietario" || !user.id) {
        router.push("/login");
        return;
      }
      
      const userId = user.id; // ID limpio del propietario logueado

      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
        
        // 🚨 LLAMADA AL ENDPOINT GENERAL /pagos (Para evitar el 404)
        const res = await fetch(`${baseUrl}/pagos`, { 
          headers: { "Authorization": `Bearer ${user.token}` },
        });

        if (res.ok) {
          const allPagos: Pago[] = await res.json();
          
          // 🚨 FILTRADO EN EL FRONTEND
          const filteredPagos = allPagos.filter(pago => 
              // Aseguramos que el contrato exista y que su id_propietario coincida con el usuario logueado
              pago.cuota?.contrato?.id_propietario === userId
          );
          
          setPagos(filteredPagos);

        } else {
          console.error("Error al obtener pagos. Estado:", res.status);
          setPagos([]);
        }
      } catch (error) {
        console.error("Error de conexión:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPagos();
  }, [router]);

  // Función para formatear fecha (YYYY-MM-DD -> DD/MM/YYYY)
  const formatDate = (isoString: string) => {
    if (!isoString) return "-";
    return new Date(isoString).toLocaleDateString("es-ES");
  };

  if (loading) {
    return <div className="p-6 text-slate-500">Cargando historial de pagos...</div>;
  }

  return (
    <div className="space-y-6">
      {/* TÍTULO */}
      <h1 className="text-2xl font-bold text-slate-900">Historial de Pagos</h1>

      {/* TABLA */}
      <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Propiedad</th>
              <th className="px-4 py-3 text-left font-semibold">Inquilino</th>
              <th className="px-4 py-3 text-left font-semibold">Monto</th>
              <th className="px-4 py-3 text-left font-semibold">Fecha Pago</th>
              <th className="px-4 py-3 text-left font-semibold">Estado</th>
            </tr>
          </thead>

          <tbody>
            {pagos.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                  No se encontraron pagos registrados para tus propiedades.
                </td>
              </tr>
            ) : (
              pagos.map((pago) => {
                // Extracción segura de datos anidados
                const direccion = pago.cuota?.contrato?.propiedad?.direccion || "Propiedad desconocida";
                const inquilino = pago.cuota?.contrato?.inquilino?.nombre || "Inquilino desconocido";
                const estado = (pago.estado || "COMPLETADO").toUpperCase(); 

                return (
                  <tr
                    key={pago.id_pago}
                    className="border-t border-slate-200 hover:bg-slate-50 transition"
                  >
                    <td className="px-4 py-3 text-slate-700 font-medium truncate max-w-[200px]">
                      {direccion}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {inquilino}
                    </td>
                    <td className="px-4 py-3 text-emerald-600 font-bold">
                      Bs. {pago.monto_pagado}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {formatDate(pago.fecha_pago)}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          estado === "COMPLETADO" || estado === "PAGADO"
                            ? "bg-emerald-100 text-emerald-700"
                            : estado === "PENDIENTE"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {estado}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}