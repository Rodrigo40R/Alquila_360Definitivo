"use client";

import { useEffect, useState } from "react";
import {
  getInquilinoDashboard,
  type DashboardInquilino,
} from "@/app/services/user.services";
import { pagarCuota } from "@/app/services/cuota.services";
import { getCurrentUser } from "@/lib/auth";

// "2026-02-12" -> "12 FEB"
function formatFechaCorta(iso: string) {
  const date = new Date(iso);
  const dia = date.getDate().toString().padStart(2, "0");
  const mes = date.toLocaleString("es-ES", { month: "short" }).toUpperCase();
  return `${dia} ${mes}`;
}

// Devuelve textos tipo "Hoy", "Hace 1 mes", etc.
function formatFechaRelativa(iso: string) {
  const fecha = new Date(iso);
  const hoy = new Date();

  const diffMs = hoy.getTime() - fecha.getTime();
  const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDias === 0) return "Hoy";
  if (diffDias === 1) return "Hace 1 día";
  if (diffDias < 30) return `Hace ${diffDias} días`;

  const diffMeses = Math.floor(diffDias / 30);
  if (diffMeses === 1) return "Hace 1 mes";
  return `Hace ${diffMeses} meses`;
}

export default function DashboardInquilinoPage() {
  const [dashboard, setDashboard] = useState<DashboardInquilino | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [cuotaAPagar, setCuotaAPagar] = useState<number | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [pagando, setPagando] = useState(false);

  useEffect(() => {
    async function cargarDashboard() {
      try {
        setLoading(true);

        const user = getCurrentUser();
        console.log("👤 Usuario en sesión (dashboard):", user);

        if (!user) {
          console.error("❌ No hay usuario en sesión");
          setError("No hay usuario en sesión. Inicia sesión nuevamente.");
          return;
        }

        if (!user.id) {
          console.error("❌ Usuario sin ID:", user);
          setError(
            "El usuario en sesión no tiene un id válido (revisa el payload del JWT en la consola)."
          );
          return;
        }

        console.log("📡 Llamando a getInquilinoDashboard con ID:", user.id);
        const data = await getInquilinoDashboard(user.id);
        console.log("✅ Datos del dashboard recibidos:", data);
        
        setDashboard(data);
      } catch (err: any) {
        console.error("❌ Error al cargar dashboard:", err);
        setError("No se pudo cargar el panel del inquilino.");
      } finally {
        setLoading(false);
        console.log("✔️ Carga del dashboard finalizada");
      }
    }

    cargarDashboard();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Panel del Inquilino
        </h1>
        <p>Cargando...</p>
      </div>
    );
  }

  if (error || !dashboard) {
    return (
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Panel del Inquilino
        </h1>
        <p className="text-red-500">{error ?? "Error al cargar datos"}</p>
      </div>
    );
  }

  // Extraer cuotas del dashboard
  const cuotaVencida = dashboard.cuotas[0];
  const proximaCuota = dashboard.cuotas[1];

  // Calcular días para vencimiento
  const calcularDiasHasta = (fecha: string): number => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const vencimiento = new Date(fecha);
    vencimiento.setHours(0, 0, 0, 0);
    const diferencia = vencimiento.getTime() - hoy.getTime();
    return Math.floor(diferencia / (1000 * 60 * 60 * 24));
  };

  // Calcular días de mora
  const calcularDiasMora = (fecha: string): number => {
    const hoy = new Date();
    const vencimiento = new Date(fecha);
    const diferencia = hoy.getTime() - vencimiento.getTime();
    return Math.ceil(diferencia / (1000 * 60 * 60 * 24));
  };

  // Manejar pago de cuota
  const handlePagarCuota = async () => {
    if (!cuotaAPagar) return;

    try {
      setPagando(true);
      await pagarCuota(cuotaAPagar);
      
      // Recargar dashboard
      const user = getCurrentUser();
      if (user?.id) {
        const data = await getInquilinoDashboard(user.id);
        setDashboard(data);
      }
      
      setShowConfirmModal(false);
      setShowSuccessModal(true);
      setCuotaAPagar(null);
    } catch (err: any) {
      console.error(err);
      setError("Error al procesar el pago. Intenta nuevamente.");
      setShowConfirmModal(false);
    } finally {
      setPagando(false);
    }
  };

  // Formatear datos para las tarjetas
  const proximaCuotaData = proximaCuota ? {
    id_cuota: proximaCuota.id_cuota,
    venceEnDias: calcularDiasHasta(proximaCuota.fecha_vencimiento),
    monto: proximaCuota.monto,
    fecha: new Date(proximaCuota.fecha_vencimiento).toLocaleDateString("es-BO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    alquiler: proximaCuota.alquilerPropiedad,
    gastosComunes: 0,
    multaMora: proximaCuota.multa?.monto || 0,
  } : null;

  const cuotaVencidaData = cuotaVencida ? {
    id_cuota: cuotaVencida.id_cuota,
    diasMora: calcularDiasMora(cuotaVencida.fecha_vencimiento),
    monto: cuotaVencida.monto,
    montoConMulta: cuotaVencida.monto + (cuotaVencida.multa?.monto || 0),
    fecha: new Date(cuotaVencida.fecha_vencimiento).toLocaleDateString("es-BO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    alquiler: cuotaVencida.alquilerPropiedad,
    gastosComunes: 0,
    multaMora: cuotaVencida.multa?.monto || 0,
  } : null;

  return (
    <div className="flex flex-col gap-8">
      {/* TÍTULO */}
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Inquilino</h1>
      </header>

      {/* SI showForm ES true → MUESTRO EL FORMULARIO */}
      {showForm ? (
        <section className="flex justify-center">
          <div className="w-full max-w-3xl bg-[#f3f3f3] rounded-3xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold mb-6">Pagar Cuota</h2>

            <form className="space-y-5 text-sm text-slate-800">
              {/* Información de la cuota a pagar */}
              <div className="bg-white rounded-lg p-6 border border-slate-200">
                <h3 className="font-semibold text-base mb-4">
                  Resumen de la Cuota
                </h3>
                
                {/* Mostrar cuota vencida o próxima según cual se esté pagando */}
                {cuotaAPagar === cuotaVencidaData?.id_cuota && cuotaVencidaData ? (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Estado:</span>
                      <span className="font-semibold text-red-600">Vencida</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Fecha de vencimiento:</span>
                      <span className="font-medium">{cuotaVencidaData.fecha}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Días de mora:</span>
                      <span className="font-medium text-red-600">{cuotaVencidaData.diasMora} días</span>
                    </div>
                    <div className="border-t border-slate-200 pt-2 mt-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Alquiler:</span>
                        <span>${cuotaVencidaData.alquiler}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Multa por mora:</span>
                        <span className="text-red-600">${cuotaVencidaData.multaMora}</span>
                      </div>
                    </div>
                    <div className="flex justify-between border-t border-slate-300 pt-2 mt-2">
                      <span className="font-semibold">Total a pagar:</span>
                      <span className="text-2xl font-bold text-slate-900">
                        ${cuotaVencidaData.montoConMulta.toLocaleString("es-BO")}
                      </span>
                    </div>
                  </div>
                ) : cuotaAPagar === proximaCuotaData?.id_cuota && proximaCuotaData ? (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Estado:</span>
                      <span className="font-semibold text-emerald-600">Pendiente</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Fecha de vencimiento:</span>
                      <span className="font-medium">{proximaCuotaData.fecha}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Vence en:</span>
                      <span className="font-medium">{proximaCuotaData.venceEnDias} días</span>
                    </div>
                    <div className="border-t border-slate-200 pt-2 mt-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Alquiler:</span>
                        <span>${proximaCuotaData.alquiler}</span>
                      </div>
                    </div>
                    <div className="flex justify-between border-t border-slate-300 pt-2 mt-2">
                      <span className="font-semibold">Total a pagar:</span>
                      <span className="text-2xl font-bold text-slate-900">
                        ${proximaCuotaData.monto.toLocaleString("es-BO")}
                      </span>
                    </div>
                  </div>
                ) : null}
              </div>
              

              {/* Método de pago */}
              <div className="space-y-1">
                <label className="block font-medium">Método de pago</label>
                <select className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option>Tarjeta de crédito/débito</option>
                </select>
              </div>

              {/* Número de tarjeta (simulado) */}
              <div className="space-y-1">
                <label className="block font-medium">Número de tarjeta</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Nombre en la tarjeta */}
              <div className="space-y-1">
                <label className="block font-medium">Nombre en la tarjeta</label>
                <input
                  type="text"
                  placeholder="Nombre completo"
                  className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Fecha de expiración y CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-medium">Fecha de expiración</label>
                  <input
                    type="text"
                    placeholder="MM/AA"
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-medium">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Botones */}
              <div className="flex justify-end gap-4 pt-4 text-sm">
                <button
                  type="button"
                  className="text-slate-600 hover:text-slate-800"
                  onClick={() => setShowForm(false)}
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setShowConfirmModal(true);
                  }}
                  className="px-5 py-2 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
                >
                  Confirmar Pago
                </button>
              </div>
            </form>
          </div>
        </section>
      ) : (
        /* SI showForm ES false → MUESTRO LAS TARJETAS */
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tarjeta izquierda - Próxima cuota */}
          {proximaCuotaData ? (
            <article className="bg-[#f9a64a] rounded-3xl p-6 shadow-lg flex flex-col justify-between">
              <div className="space-y-2 text-center text-white">
                <p className="text-xl font-extrabold">¡ATENCIÓN!</p>
                <p className="font-semibold">
                  Vence en {proximaCuotaData.venceEnDias} días
                </p>
              </div>

              <div className="bg-white rounded-2xl mt-4 p-6 space-y-3 text-slate-800">
                <p className="text-4xl font-bold text-center">
                  ${" "}
                  {proximaCuotaData.monto.toLocaleString("es-BO", {
                    minimumFractionDigits: 0,
                  })}
                </p>
                <p className="text-center text-sm text-slate-600">
                  {proximaCuotaData.fecha}
                </p>

                <div className="border-t border-slate-300 pt-4 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Alquiler de Propiedad:</span>
                    <span>${proximaCuotaData.alquiler}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gastos Comunes / Mantenimiento:</span>
                    <span>${proximaCuotaData.gastosComunes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Multas por Mora:</span>
                    <span>
                      ${proximaCuotaData.multaMora}{" "}
                      {proximaCuotaData.multaMora === 0 && "(N/A)"}
                    </span>
                  </div>
                </div>

                <button
                  className="mt-4 w-full bg-[#169c92] hover:bg-[#12857c] text-white font-semibold py-2.5 rounded-lg"
                  onClick={() => {
                    setCuotaAPagar(proximaCuotaData.id_cuota);
                    setShowForm(true);
                  }}
                >
                  Pagar Cuota
                </button>
              </div>
            </article>
          ) : (
            <article className="bg-slate-200 rounded-3xl p-6 shadow-lg flex items-center justify-center">
              <p className="text-slate-700 font-medium">No hay próxima cuota</p>
            </article>
          )}

          {/* Tarjeta derecha - Cuota vencida */}
          {cuotaVencidaData ? (
            <article className="bg-[#e65b4f] rounded-3xl p-6 shadow-lg flex flex-col justify-between">
              <div className="space-y-2 text-center text-white">
                <p className="text-xl font-extrabold">¡CUOTA VENCIDA!</p>
                <p className="font-semibold">
                  {cuotaVencidaData.diasMora} días de mora
                </p>
              </div>

              <div className="bg-white rounded-2xl mt-4 p-6 space-y-3 text-slate-800">
                <p className="text-4xl font-bold text-center">
                  $
                  {cuotaVencidaData.montoConMulta.toLocaleString("es-BO", {
                    minimumFractionDigits: 0,
                  })}
                </p>
                <p className="text-center text-sm text-slate-600">
                  {cuotaVencidaData.fecha}
                </p>

                <ul className="border-t border-slate-300 pt-4 space-y-1 text-sm list-disc list-inside">
                  <li>Alquiler de Propiedad: ${cuotaVencidaData.alquiler}</li>
                  <li>
                    Gastos Comunes / Mantenimiento: $
                    {cuotaVencidaData.gastosComunes}
                  </li>
                  <li>
                    Multa por Pago Tardío: ${cuotaVencidaData.multaMora}
                  </li>
                </ul>

                <button
                  className="mt-4 w-full bg-[#e65b4f] hover:bg-[#c8483d] text-white font-semibold py-2.5 rounded-lg"
                  onClick={() => {
                    setCuotaAPagar(cuotaVencidaData.id_cuota);
                    setShowForm(true);
                  }}
                >
                  Pagar Cuota
                </button>
              </div>
            </article>
          ) : (
            <article className="bg-slate-200 rounded-3xl p-6 shadow-lg flex items-center justify-center">
              <p className="text-slate-700 font-medium">No hay cuotas vencidas</p>
            </article>
          )}
        </section>
      )}

      <footer className="mt-6 text-center text-xs text-slate-500">
        © 2025 Alquila 360 – Gestión integral de alquileres
      </footer>

      {/* Modal de confirmación */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
              <span className="text-3xl">⚠️</span>
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              ¿Confirmar pago de cuota?
            </h3>

            <p className="text-center text-sm text-slate-700">
              Estás a punto de marcar esta cuota como pagada. Esta acción actualizará el estado de la cuota.
            </p>

            <div className="flex gap-4 w-full">
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  setCuotaAPagar(null);
                }}
                disabled={pagando}
                className="flex-1 px-6 py-2 rounded-full border border-slate-300 text-sm font-medium hover:bg-slate-100 disabled:opacity-50"
              >
                Cancelar
              </button>

              <button
                onClick={handlePagarCuota}
                disabled={pagando}
                className="flex-1 px-6 py-2 rounded-full bg-[#00A68B] hover:bg-[#009076] text-white text-sm font-semibold disabled:opacity-50"
              >
                {pagando ? "Procesando..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de éxito */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
              <span className="text-3xl">✅</span>
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              ¡Pago registrado!
            </h3>

            <p className="text-center text-sm text-slate-700">
              La cuota ha sido marcada como pagada exitosamente.
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
    </div>
  );
}
