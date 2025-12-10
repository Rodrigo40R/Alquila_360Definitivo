"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import { SuccessPdfModal } from "@/components/ui/SuccessPdfModal"; // REMOVIDO
import { getCurrentUser } from "@/lib/auth";

export default function PropietarioDashboardPage() {
  const router = useRouter();
  
  // Estados de interfaz
  // const [showPdfModal, setShowPdfModal] = useState(false); // REMOVIDO
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [loading, setLoading] = useState(true);

  // Estados de datos
  const [stats, setStats] = useState({
    ingresoTotal: 0,
    ocupacion: 0,
    propiedadesCount: 0,
    morosidad: 0 
  });
  
  const [contratos, setContratos] = useState<any[]>([]);

  // CARGAR DATOS
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

        // Peticiones paralelas para eficiencia
        const [resProp, resCont] = await Promise.all([
          // 1. Obtener Propiedades (Para contar total)
          fetch(`${baseUrl}/propiedades/propietario/${userId}`, { headers }),
          // 2. Obtener Contratos (Para ingresos y ocupación)
          fetch(`${baseUrl}/contrato/propietario/${userId}`, { headers })
        ]);
        
        const propiedades = resProp.ok ? await resProp.json() : [];
        const listaContratos = resCont.ok ? await resCont.json() : [];

        // 3. Calcular Estadísticas
        const totalPropiedades = propiedades.length;
        const contratosActivos = listaContratos.filter((c: any) => c.estado === "VIGENTE" || !c.estado);
        
        // Sumar montos
        const ingresoTotal = contratosActivos.reduce((acc: number, curr: any) => {
            return acc + Number(curr.monto_mensual || curr.monto || 0);
        }, 0);

        // Calcular % Ocupación
        const ocupacion = totalPropiedades > 0 
          ? Math.round((contratosActivos.length / totalPropiedades) * 100) 
          : 0;

        setStats({
          ingresoTotal,
          ocupacion,
          propiedadesCount: totalPropiedades,
          morosidad: 0
        });

        setContratos(listaContratos);

      } catch (error) {
        console.error("Error cargando dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);
  
  // Filtrado de la tabla (usando contratos reales)
  const itemsFiltrados = contratos.filter((c) =>
    filtroEstado === "Todos" ? true : (c.estado || "VIGENTE") === filtroEstado
  );

  // handleDownloadPdf (REMOVIDO)
  // setShowPdfModal (REMOVIDO)

  if (loading) {
    return <div className="p-10 text-slate-500">Cargando tablero...</div>;
  }

  return (
    <div className="p-6">
      {/* TITULO */}
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Dashboard</h1>

      {/* TARJETAS RESUMEN CON DATOS REALES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        
        <div className="rounded-xl bg-white shadow p-6 text-center border border-slate-200">
          <p className="font-semibold text-slate-700">Ingreso Mensual Est.</p>
          <p className="text-3xl font-bold mt-2 text-emerald-600">
            Bs. {stats.ingresoTotal}
          </p>
        </div>

        <div className="rounded-xl bg-white shadow p-6 text-center border border-slate-200">
          <p className="font-semibold text-slate-700">Morosidad pendiente</p>
          <p className="text-3xl font-bold mt-2 text-red-500">
            Bs. {stats.morosidad}
          </p>
        </div>

        <div className="rounded-xl bg-white shadow p-6 text-center border border-slate-200">
          <p className="font-semibold text-slate-700">% de Ocupación</p>
          <p className="text-3xl font-bold mt-2 text-blue-600">
            {stats.ocupacion}%
          </p>
        </div>

        {/* TARJETA QUE VA A /propietario/propiedades */}
        <div
          onClick={() => router.push("/propietario/propiedades")}
          className="rounded-xl bg-white shadow p-6 text-center border border-slate-200 cursor-pointer hover:bg-slate-50 hover:shadow-md transition"
        >
          <p className="font-semibold text-slate-700">Propiedades totales</p>
          <p className="text-3xl font-bold mt-2">{stats.propiedadesCount}</p>
          <p className="text-xs mt-1 text-emerald-600 font-semibold">
            Ver propiedades →
          </p>
        </div>
      </div>

      {/* BLOQUE DE CONTRATOS / INGRESOS */}
      <div className="rounded-xl bg-white shadow p-6 border border-slate-200 mb-10">

        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Contratos y Estado de Alquileres
        </h2>

        {/* FILTROS */}
        <div className="flex flex-wrap gap-3 mb-6">

          <button
            onClick={() => router.push("/propietario/propiedades")}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50"
          >
            Gestionar Propiedades
          </button>

          {/* FILTRO ESTADO */}
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm bg-white outline-none"
          >
            <option value="Todos">Todos los estados</option>
            <option value="VIGENTE">Vigente</option>
            <option value="FINALIZADO">Finalizado</option>
          </select>

          <button 
            // Botón Generar Reporte (Ahora lleva a la sección de reportes)
            className="rounded-md border px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 ml-auto"
            onClick={() => router.push("/propietario/reportes")}
          >
            Ver Reportes
          </button>

          {/* Botón Descargar PDF REMOVIDO */}
        </div>

        {/* TABLA CONECTADA A CONTRATOS */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-slate-600 text-sm bg-slate-50/50">
                <th className="py-3 px-2"># Contrato</th>
                <th className="px-2">Propiedad</th>
                <th className="px-2">Inquilino</th>
                <th className="px-2">Monto</th>
                <th className="px-2">Estado</th>
                <th className="px-2">Fin contrato</th>
              </tr>
            </thead>

            <tbody className="text-sm">
              {itemsFiltrados.length === 0 ? (
                 <tr>
                   <td colSpan={6} className="py-8 text-center text-slate-400">
                     No hay contratos registrados.
                   </td>
                 </tr>
              ) : (
                itemsFiltrados.map((c: any) => (
                  <tr key={c.id_contrato} className="border-b hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-2 font-medium text-slate-700">#{c.id_contrato}</td>
                    <td className="px-2 truncate max-w-[200px]">{c.propiedad?.direccion || "Sin dirección"}</td>
                    <td className="px-2">{c.inquilino?.nombre || "Sin inquilino"}</td>
                    <td className="px-2 font-medium text-emerald-600">Bs. {c.monto_mensual}</td>
                    <td className="px-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                        ${c.estado === 'FINALIZADO' ? 'bg-slate-100 text-slate-600' : 'bg-emerald-100 text-emerald-700'}`}>
                        {c.estado || "VIGENTE"}
                      </span>
                    </td>
                    <td className="px-2 text-slate-500">
                      {c.fecha_fin ? new Date(c.fecha_fin).toLocaleDateString() : "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* MODAL PDF (REMOVIDO) */}
    </div>
  );
}