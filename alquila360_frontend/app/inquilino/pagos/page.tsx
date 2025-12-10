"use client";

import { useState, useEffect } from "react";
import { getDashboardInquilino, DashboardInquilino } from "@/app/services/inquilino-dashboard.services";

type Vista = "resumen" | "factura";

export default function InquilinoPagosPage() {
  const [vista, setVista] = useState<Vista>("resumen");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboard, setDashboard] = useState<DashboardInquilino | null>(null);

  // Cargar datos del dashboard al montar el componente
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getDashboardInquilino();
        setDashboard(data);
      } catch (err: any) {
        setError(err.message || "Error al cargar los pagos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // Extraer cuotas del array
  const cuotaVencida = dashboard?.cuotas?.[0] || null;
  const proximaCuota = dashboard?.cuotas?.[1] || null;

  // Función auxiliar para calcular días hasta vencimiento
  const calcularDiasHasta = (fecha: string): number => {
    const hoy = new Date();
    const vencimiento = new Date(fecha);
    const diferencia = vencimiento.getTime() - hoy.getTime();
    return Math.ceil(diferencia / (1000 * 60 * 60 * 24));
  };

  // Función auxiliar para calcular días de mora
  const calcularDiasMora = (fecha: string): number => {
    const hoy = new Date();
    const vencimiento = new Date(fecha);
    const diferencia = hoy.getTime() - vencimiento.getTime();
    return Math.ceil(diferencia / (1000 * 60 * 60 * 24));
  };

  // Formatear fecha
  const formatearFecha = (fecha: string): string => {
    return new Date(fecha).toLocaleDateString("es-BO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // ───────────────────────────────────────────────
  // VISTA FACTURA
  // ───────────────────────────────────────────────
  if (vista === "factura") {
    return (
      <div className="h-full flex flex-col">
        <h1 className="text-2xl font-semibold text-slate-900 mb-6">Inquilino</h1>

        <div className="flex-1 bg-slate-100 rounded-xl p-4 overflow-auto">
          <div className="mx-auto max-w-4xl bg-white rounded-lg shadow border border-slate-200 p-8">
            <h2 className="text-xl font-bold mb-4">Factura</h2>

            <p className="text-sm text-slate-700">
              Aquí irá el PDF o la vista previa real cuando el backend lo genere, Hola adro.
            </p>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setVista("resumen")}
            className="px-6 py-2 rounded-full border border-slate-300 text-sm font-medium hover:bg-slate-100"
          >
            Volver a pagos
          </button>
        </div>
      </div>
    );
  }

  // ───────────────────────────────────────────────
  // VISTA RESUMEN
  // ───────────────────────────────────────────────
  if (loading) {
    return (
      <div className="h-full flex flex-col">
        <h1 className="text-2xl font-semibold text-slate-900 mb-8">Inquilino</h1>
        <div className="flex justify-center items-center py-12">
          <div className="text-slate-600">Cargando pagos...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex flex-col">
        <h1 className="text-2xl font-semibold text-slate-900 mb-8">Inquilino</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 font-medium">Error</p>
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  // Si no hay cuotas
  if (!proximaCuota && !cuotaVencida) {
    return (
      <div className="h-full flex flex-col">
        <h1 className="text-2xl font-semibold text-slate-900 mb-8">Inquilino</h1>
        <div className="bg-slate-100 border border-slate-300 rounded-lg p-8 text-center">
          <p className="text-slate-700 font-medium">No hay cuotas registradas</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="h-full flex flex-col">
        <h1 className="text-2xl font-semibold text-slate-900 mb-8">Inquilino</h1>

        {/* CONTENEDOR CENTRADO */}
        <div className="flex flex-col items-center gap-12">

          {/* TARJETAS DE CUOTAS CENTRADAS */}
          <div className="flex flex-wrap justify-center gap-12 w-full">

            {/* TARJETA 1 (Próxima cuota) */}
            {proximaCuota ? (
              <div className="w-full max-w-sm bg-[#FFE1B8] rounded-xl shadow p-6">
                <p className="text-center font-bold text-lg text-white mb-3">
                  ¡ATENCIÓN!
                  <br />
                  <span className="text-sm">Vence en {calcularDiasHasta(proximaCuota.fecha_vencimiento)} días</span>
                </p>

                <div className="bg-white rounded-lg px-6 py-5 text-sm text-slate-800">
                  <p className="text-center text-3xl font-bold mb-2">${proximaCuota.monto.toLocaleString()}</p>
                  <p className="text-center text-xs text-slate-500 mb-4">
                    {formatearFecha(proximaCuota.fecha_vencimiento)}
                  </p>

                  <div className="flex justify-between border-b border-dashed pb-1 mb-1 text-xs">
                    <span>Alquiler de Propiedad:</span>
                    <span>${proximaCuota.alquilerPropiedad.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-xs">
                    <span>Multas por Mora:</span>
                    <span>${proximaCuota.multa?.monto ?? 0} (N/A)</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-sm bg-slate-200 rounded-xl shadow p-6 flex items-center justify-center">
                <p className="text-slate-700 font-medium">No hay próxima cuota</p>
              </div>
            )}

            {/* TARJETA 2 (Cuota vencida) */}
            {cuotaVencida ? (
              <div className="w-full max-w-sm bg-[#F76C5E] rounded-xl shadow p-6">
                <p className="text-center font-bold text-lg text-white mb-3">
                  ¡CUOTA VENCIDA!
                  <br />
                  <span className="text-sm">{calcularDiasMora(cuotaVencida.fecha_vencimiento)} días de Mora</span>
                </p>

                <div className="bg-white rounded-lg px-6 py-5 text-sm text-slate-800">
                  <p className="text-center text-3xl font-bold mb-2">${(cuotaVencida.monto + (cuotaVencida.multa?.monto ?? 0)).toLocaleString()}</p>
                  <p className="text-center text-xs text-slate-500 mb-4">
                    {formatearFecha(cuotaVencida.fecha_vencimiento)}
                  </p>

                  <ul className="list-disc list-inside text-xs space-y-1">
                    <li>Alquiler de Propiedad: ${cuotaVencida.alquilerPropiedad.toLocaleString()}</li>
                    {cuotaVencida.multa && (
                      <li>Multa {cuotaVencida.multa.tipo}: ${cuotaVencida.multa.monto.toLocaleString()}</li>
                    )}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-sm bg-slate-200 rounded-xl shadow p-6 flex items-center justify-center">
                <p className="text-slate-700 font-medium">No hay cuotas vencidas</p>
              </div>
            )}

          </div>

          {/* BOTONES FACTURAS */}
          <div className="flex justify-center gap-10 mt-4">
            <button
              onClick={() => setVista("factura")}
              className="px-12 py-3 rounded-full bg-[#00A68B] hover:bg-[#009076] text-white text-sm font-semibold shadow"
            >
              Facturas
            </button>

            <button
              onClick={() => setShowSuccessModal(true)}
              className="px-12 py-3 rounded-full bg-[#E34848] hover:bg-[#d13a3a] text-white text-sm font-semibold shadow"
            >
              Generar Facturas
            </button>
          </div>

        </div>
      </div>

      {/* MODAL DE ÉXITO */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
              <span className="text-3xl">✅</span>
            </div>

            <p className="text-center text-sm text-slate-700">
              Se generó con éxito las facturas y el PDF.  
              <br />
              Puedes verlo en tus descargas.
            </p>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="px-10 py-2 rounded-full bg-[#00A68B] hover:bg-[#009076] text-white text-sm font-semibold"
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </>
  );
}
