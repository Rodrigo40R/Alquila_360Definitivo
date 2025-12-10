"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

// Definimos la interfaz según lo que suele devolver NestJS con TypeORM
interface Contrato {
  id_contrato: number;
  monto_mensual: string | number;
  fecha_inicio: string;
  fecha_fin: string;
  estado: string;
  // Relaciones (pueden venir anidadas)
  propiedad?: {
    direccion: string;
  };
  inquilino?: {
    nombre: string;
    apellido?: string; // Por si viene separado
  };
}

export default function ContratosPropietarioPage() {
  const router = useRouter(); // Añadir router para redirección
  const [contratos, setContratos] = useState<Contrato[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContratos = async () => {
      const user = getCurrentUser();
      
      // 🚩 CORRECCIÓN 1: Usar "propietario" en minúsculas y verificar user.id
      if (!user || user.rol !== "propietario" || !user.id) {
        router.push("/login"); // Redirigir si no hay sesión válida
        return;
      }
      
      const userId = user.id; // 🚩 CORRECCIÓN 2: Usar directamente la propiedad user.id
      
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

        // Usamos el userId limpio y numérico en la URL
        const res = await fetch(`${baseUrl}/contrato/propietario/${userId}`, {
          headers: {
            "Authorization": `Bearer ${user.token}`,
          },
        });

        if (!res.ok) {
          // Intentamos leer el mensaje de error del backend para un debug más fácil
          const errorDetail = await res.text();
          throw new Error(`Error ${res.status}: ${errorDetail}`);
        }

        const data = await res.json();
        setContratos(data);
      } catch (err: any) {
        console.error("Error al cargar contratos:", err);
        setError(`No se pudieron cargar los contratos: ${err.message || 'Error desconocido'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchContratos();
  }, [router]);

  // Función auxiliar para formatear fechas (YYYY-MM-DD -> DD/MM/YYYY)
  const formatDate = (isoDate: string) => {
    if (!isoDate) return "-";
    const date = new Date(isoDate);
    return date.toLocaleDateString("es-ES"); // Formato local
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Contratos</h1>
          <p className="text-sm text-slate-500">Gestiona tus alquileres vigentes.</p>
        </div>

        <Link
          href="/propietario/contratos/nuevo"
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md text-sm font-semibold transition-colors"
        >
          Nuevo contrato
        </Link>
      </div>

      {loading && <div className="text-slate-500">Cargando contratos...</div>}
      {error && <div className="text-red-500 bg-red-50 p-3 rounded-md border border-red-200">{error}</div>}

      {!loading && !error && contratos.length === 0 && (
        <div className="text-slate-500 bg-slate-50 p-6 rounded-xl border border-slate-200 text-center">
          No tienes contratos registrados.
        </div>
      )}

      {!loading && contratos.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          
          {/* Encabezado de la tabla (Opcional, pero recomendado para claridad) */}
          <div className="grid grid-cols-5 bg-slate-50 py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <div>Propiedad</div>
            <div>Inquilino</div>
            <div>Monto</div>
            <div>Fechas</div>
            <div className="text-right">Acciones</div>
          </div>

          <div className="divide-y divide-slate-100">
            {contratos.map((c) => (
              <div
                key={c.id_contrato}
                className="grid grid-cols-5 py-4 px-6 text-sm items-center hover:bg-slate-50/50 transition-colors"
              >
                <p className="font-medium text-slate-900 truncate pr-2">
                  {c.propiedad?.direccion || "Propiedad desconocida"}
                </p>
                
                <p className="text-slate-600 truncate pr-2">
                  {c.inquilino?.nombre || "Sin inquilino"}
                </p>
                
                <p className="text-emerald-600 font-medium">
                  Bs. {c.monto_mensual}
                </p>
                
                <div className="text-slate-500 text-xs space-y-1">
                  <p>In: {formatDate(c.fecha_inicio)}</p>
                  <p>Fin: {formatDate(c.fecha_fin)}</p>
                </div>

                <div className="text-right">
                  {/* Enlazamos a la página de edición creada anteriormente */}
                  <Link
                    href={`/propietario/contratos/${c.id_contrato}`}
                    className="text-emerald-600 hover:text-emerald-700 font-medium underline decoration-2 underline-offset-2"
                  >
                    Editar
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}