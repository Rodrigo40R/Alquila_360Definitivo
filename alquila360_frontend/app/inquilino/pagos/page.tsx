"use client";

import { useState, useEffect } from "react";
import { getDashboardInquilino, DashboardInquilino } from "@/app/services/inquilino-dashboard.services";
import { getHistorialPagos, PagoHistorialDto } from "@/app/services/user.services";

type Vista = "resumen" | "factura";

export default function InquilinoPagosPage() {
  const [vista, setVista] = useState<Vista>("resumen");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboard, setDashboard] = useState<DashboardInquilino | null>(null);
  const [historialPagos, setHistorialPagos] = useState<PagoHistorialDto[]>([]);
  const [pagoSeleccionado, setPagoSeleccionado] = useState<PagoHistorialDto | null>(null);

  // Cargar datos del dashboard al montar el componente
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getDashboardInquilino();
        setDashboard(data);
        
        // Cargar historial de pagos
        const historial = await getHistorialPagos();
        setHistorialPagos(historial);
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

  // Función para generar PDF simulado
  const generarPDFSimulado = () => {
    if (!pagoSeleccionado) return;

    const montoCuota = pagoSeleccionado.monto;
    const montoMulta = pagoSeleccionado.multa?.monto || 0;
    const montoTotal = montoCuota + montoMulta;

    // Crear un blob con texto simple
    const contenido = `
═══════════════════════════════════════
         FACTURA - ALQUILA 360
═══════════════════════════════════════

CONTRATO: #${pagoSeleccionado.id_contrato}
CUOTA: #${pagoSeleccionado.id_cuota}

FECHA DE VENCIMIENTO: ${formatearFecha(pagoSeleccionado.fecha_vencimiento)}
FECHA DE PAGO: ${formatearFecha(pagoSeleccionado.fecha_pago)}

───────────────────────────────────────
DETALLE DEL PAGO
───────────────────────────────────────

Alquiler mensual:          Bs ${montoCuota.toFixed(2)}
${montoMulta > 0 ? `Multa por mora:            Bs ${montoMulta.toFixed(2)}\n` : ''}
                          ─────────────
TOTAL PAGADO:              Bs ${montoTotal.toFixed(2)}

───────────────────────────────────────
Estado: ${pagoSeleccionado.estado}

═══════════════════════════════════════
Fecha de emisión: ${new Date().toLocaleDateString("es-BO")}
    `;

    const blob = new Blob([contenido], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `factura-cuota-${pagoSeleccionado.id_cuota}-${new Date().getTime()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    // Mostrar modal de éxito
    setShowSuccessModal(true);
  };

  // ───────────────────────────────────────────────
  // VISTA FACTURA
  // ───────────────────────────────────────────────
  if (vista === "factura") {
    if (!pagoSeleccionado) {
      return (
        <div className="h-full flex flex-col">
          <h1 className="text-2xl font-semibold text-slate-900 mb-6">Inquilino</h1>
          <div className="bg-slate-100 border border-slate-300 rounded-lg p-8 text-center">
            <p className="text-slate-600">No se ha seleccionado ningún pago para ver la factura.</p>
          </div>
        </div>
      );
    }

    const montoCuota = pagoSeleccionado.monto;
    const montoMulta = pagoSeleccionado.multa?.monto || 0;
    const montoTotal = montoCuota + montoMulta;

    return (
      <div className="h-full flex flex-col">
        <h1 className="text-2xl font-semibold text-slate-900 mb-6">Inquilino</h1>

        <div className="flex-1 bg-slate-100 rounded-xl p-4 overflow-auto">
          <div className="mx-auto max-w-4xl bg-white rounded-lg shadow border border-slate-200 p-8">
            <h2 className="text-xl font-bold mb-6">Vista Previa de Factura</h2>

            {/* Información de la factura */}
            <div className="space-y-6">
              <div className="border border-slate-200 rounded-lg p-6 bg-slate-50">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Información del Pago
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Contrato:</span>
                    <span className="font-semibold">#{pagoSeleccionado.id_contrato}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Cuota:</span>
                    <span className="font-semibold">#{pagoSeleccionado.id_cuota}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Fecha de vencimiento:</span>
                    <span className="font-semibold">{formatearFecha(pagoSeleccionado.fecha_vencimiento)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Fecha de pago:</span>
                    <span className="font-semibold">{formatearFecha(pagoSeleccionado.fecha_pago)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Estado:</span>
                    <span className="font-semibold text-green-700">{pagoSeleccionado.estado}</span>
                  </div>
                </div>
              </div>

              <div className="border border-blue-200 rounded-lg p-6 bg-blue-50">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">
                  Detalle del Pago
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Alquiler mensual:</span>
                    <span className="font-semibold">Bs {montoCuota.toFixed(2)}</span>
                  </div>
                  {montoMulta > 0 && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Multa por mora ({pagoSeleccionado.multa?.tipo}):</span>
                      <span className="font-semibold text-red-700">Bs {montoMulta.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-blue-300 text-base">
                    <span className="text-slate-900 font-bold">TOTAL PAGADO:</span>
                    <span className="font-bold text-blue-900">Bs {montoTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <button
            onClick={() => {
              setVista("resumen");
              setPagoSeleccionado(null);
            }}
            className="px-6 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition font-medium"
          >
            Volver
          </button>
          <button
            onClick={generarPDFSimulado}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-medium"
          >
            Generar Factura
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

          {/* HISTORIAL DE PAGOS */}
          <div className="w-full max-w-6xl">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Historial de Pagos</h2>
            
            {historialPagos.length === 0 ? (
              <div className="bg-slate-100 border border-slate-300 rounded-lg p-8 text-center">
                <p className="text-slate-600">No tienes pagos realizados aún</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-100 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Contrato</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Cuota</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Fecha Vencimiento</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Fecha Pago</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700 uppercase">Monto</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700 uppercase">Multa</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700 uppercase">Total</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {historialPagos.map((pago) => {
                      const montoMulta = pago.multa?.monto || 0;
                      const montoTotal = pago.monto + montoMulta;
                      
                      return (
                        <tr key={pago.id_cuota} className="hover:bg-slate-50 transition">
                          <td className="px-4 py-3 text-sm text-slate-700">#{pago.id_contrato}</td>
                          <td className="px-4 py-3 text-sm text-slate-700">#{pago.id_cuota}</td>
                          <td className="px-4 py-3 text-sm text-slate-700">{formatearFecha(pago.fecha_vencimiento)}</td>
                          <td className="px-4 py-3 text-sm text-slate-700">{formatearFecha(pago.fecha_pago)}</td>
                          <td className="px-4 py-3 text-sm text-slate-700 text-right">Bs {pago.monto.toFixed(2)}</td>
                          <td className="px-4 py-3 text-sm text-red-700 text-right">
                            {montoMulta > 0 ? `Bs ${montoMulta.toFixed(2)}` : '-'}
                          </td>
                          <td className="px-4 py-3 text-sm font-semibold text-slate-900 text-right">Bs {montoTotal.toFixed(2)}</td>
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => {
                                setPagoSeleccionado(pago);
                                setVista("factura");
                              }}
                              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-lg transition font-medium"
                            >
                              Ver Factura
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
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
