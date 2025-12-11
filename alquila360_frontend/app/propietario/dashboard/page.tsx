"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default function PropietarioDashboardPage() {
  const router = useRouter();
  
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    ingresoTotal: 0,
    propiedadesCount: 0,
    contratosCount: 0,
    morosidad: 0 
  });
  
  const [contratos, setContratos] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = getCurrentUser();

      if (!user || user.rol !== "propietario" || !user.id) {
        router.push("/login");
        return;
      }
      
      const userId = user.id;

      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
        const headers = { "Authorization": `Bearer ${user.token}` };

        const [resProp, resCont] = await Promise.all([
          fetch(`${baseUrl}/propiedades/propietario/${userId}`, { headers }),
          fetch(`${baseUrl}/contrato/propietario/${userId}`, { headers })
        ]);
        
        const propiedades = resProp.ok ? await resProp.json() : [];
        const listaContratos = resCont.ok ? await resCont.json() : [];

        const contratosActivos = listaContratos.filter((c: any) => c.estado === "VIGENTE" || !c.estado);

        const ingresoTotal = contratosActivos.reduce((acc: number, curr: any) => {
            return acc + Number(curr.monto_mensual || curr.monto || 0);
        }, 0);

        setStats({
          ingresoTotal,
          propiedadesCount: propiedades.length,
          contratosCount: listaContratos.length, // 👈 CONTRATOS TOTALES
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
  

  const itemsFiltrados = contratos.filter((c) =>
    filtroEstado === "Todos" ? true : (c.estado || "VIGENTE") === filtroEstado
  );


  if (loading) {
    return <div className="p-10 text-slate-500">Cargando tablero...</div>;
  }

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold text-slate-900 mb-6">Dashboard</h1>

      {/* TARJETAS RESUMEN */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        
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

        {/* 👇 NUEVA TARJETA – CONTRATOS TOTALES */}
        <div
          onClick={() => router.push("/propietario/contratos")}
          className="rounded-xl bg-white shadow p-6 text-center border border-slate-200 cursor-pointer hover:bg-slate-50 transition"
        >
          <p className="font-semibold text-slate-700">Contratos Totales</p>
          <p className="text-3xl font-bold mt-2">{stats.contratosCount}</p>
          <p className="text-xs mt-1 text-blue-600 font-semibold">
            Ver contratos →
          </p>
        </div>

        <div
          onClick={() => router.push("/propietario/propiedades")}
          className="rounded-xl bg-white shadow p-6 text-center border border-slate-200 cursor-pointer hover:bg-slate-50 transition"
        >
          <p className="font-semibold text-slate-700">Propiedades Totales</p>
          <p className="text-3xl font-bold mt-2">{stats.propiedadesCount}</p>
          <p className="text-xs mt-1 text-emerald-600 font-semibold">
            Ver propiedades →
          </p>
        </div>
      </div>

      {/* TABLA DE CONTRATOS */}
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

          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm bg-white"
          >
            <option value="Todos">Todos los estados</option>
            <option value="VIGENTE">Vigente</option>
            <option value="FINALIZADO">Finalizado</option>
          </select>

          <button 
            className="rounded-md border px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 ml-auto"
            onClick={() => router.push("/propietario/reportes")}
          >
            Ver Reportes
          </button>
        </div>

        {/* TABLA */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-slate-600 text-sm bg-slate-50/50">
                <th className="py-3 px-2"># Contrato</th>
                {/* ❌ PROPIEDAD ELIMINADA */}
                <th className="px-2">Inquilino</th>
                <th className="px-2">Monto</th>
                <th className="px-2">Estado</th>
                <th className="px-2">Fin contrato</th>
              </tr>
            </thead>

            <tbody className="text-sm">
              {itemsFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    No hay contratos registrados.
                  </td>
                </tr>
              ) : (
                itemsFiltrados.map((c: any) => (
                  <tr key={c.id_contrato} className="border-b hover:bg-slate-50">
                    <td className="py-3 px-2 font-medium text-slate-700">
                      #{c.id_contrato}
                    </td>

                    <td className="px-2">
                      {c.inquilino?.nombre || "Sin inquilino"}
                    </td>

                    <td className="px-2 font-medium text-emerald-600">
                      Bs. {c.monto_mensual}
                    </td>

                    <td className="px-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                        ${
                          c.estado === "FINALIZADO"
                            ? "bg-slate-100 text-slate-600"
                            : "bg-emerald-100 text-emerald-700"
                        }`}>
                        {c.estado || "VIGENTE"}
                      </span>
                    </td>

                    <td className="px-2 text-slate-500">
                      {c.fecha_fin
                        ? new Date(c.fecha_fin).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
