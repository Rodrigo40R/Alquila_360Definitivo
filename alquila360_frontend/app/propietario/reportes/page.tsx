"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";

export default function ReportesPropietario() {
  const router = useRouter();
  
  // Estados para las métricas
  const [stats, setStats] = useState({
    ingresos: 0,
    ocupadas: 0,
    totalPropiedades: 0,
    ticketsResueltos: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
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
        const headers = { "Authorization": `Bearer ${user.token}` };

        // Realizamos las 3 peticiones en paralelo para ser más eficientes
        const [resProps, resContratos, resTickets] = await Promise.all([
          fetch(`${baseUrl}/propiedades/propietario/${userId}`, { headers }),
          fetch(`${baseUrl}/contrato/propietario/${userId}`, { headers }),
          fetch(`${baseUrl}/tickets/propietario/${userId}`, { headers }) 
        ]);

        const propiedades = resProps.ok ? await resProps.json() : [];
        const contratos = resContratos.ok ? await resContratos.json() : [];
        const tickets = resTickets.ok ? await resTickets.json() : [];

        // --- CÁLCULOS ---

        // 1. Ingresos del mes (Suma de contratos vigentes)
        const contratosVigentes = contratos.filter((c: any) => !c.estado || c.estado === "VIGENTE");
        const ingresos = contratosVigentes.reduce((acc: number, curr: any) => acc + Number(curr.monto_mensual || 0), 0);

        // 2. Ocupación (Propiedades con contrato vigente vs Totales)
        const ocupadas = contratosVigentes.length; 
        const totalPropiedades = propiedades.length;

        // 3. Tickets Resueltos
        const ticketsResueltos = tickets.filter((t: any) => {
            const estado = t.estado?.toUpperCase();
            return estado === "CERRADO" || estado === "RESUELTO" || estado === "FINALIZADO";
        }).length;

        setStats({
          ingresos,
          ocupadas,
          totalPropiedades,
          ticketsResueltos
        });

      } catch (error) {
        console.error("Error calculando reportes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) {
    return <div className="p-8 text-slate-500">Generando reporte...</div>;
  }

  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Reportes Generales</h1>
        <p className="text-sm text-slate-500">Resumen de actividad.</p>
      </div>

      {/* GRID DE TARJETAS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Card 1: Ingresos */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
          <p className="text-sm font-medium text-slate-500">Ingresos del mes (Est.)</p>
          <p className="mt-2 text-3xl font-bold text-emerald-600">
            Bs. {stats.ingresos.toLocaleString()}
          </p>
        </div>

        {/* Card 2: Ocupación */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
          <p className="text-sm font-medium text-slate-500">Propiedades ocupadas</p>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-3xl font-bold text-slate-900">{stats.ocupadas}</p>
            <span className="text-sm text-slate-400">/ {stats.totalPropiedades}</span>
          </div>
        </div>

        {/* Card 3: Tickets */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
          <p className="text-sm font-medium text-slate-500">Tickets resueltos</p>
          <p className="mt-2 text-3xl font-bold text-sky-600">
            {stats.ticketsResueltos}
          </p>
        </div>
      </div>

      {/* Enlace de detalle REMOVIDO */}
      {/* <div className="pt-4">
        <Link
          href="/propietario/reportes/detalle" 
          className="inline-block px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors shadow-sm"
        >
          Ver reporte detallado
        </Link>
      </div> 
      */}
    </div>
  );
}