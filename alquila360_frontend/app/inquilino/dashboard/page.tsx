"use client";

import React, { useState } from "react";

export default function InquilinoDashboardPage() {
  const [showForm, setShowForm] = useState(false);

  // Datos de ejemplo (luego los puedes traer del backend)
  const proximaCuota = {
    monto: 850,
    venceEnDias: 5,
    fecha: "22 de Noviembre de 2025",
    alquiler: 750,
    gastosComunes: 100,
    multaMora: 0,
  };

  const cuotaVencida = {
    monto: 935,
    diasMora: 31,
    fecha: "15 de Octubre de 2025",
    alquiler: 750,
    gastosComunes: 100,
    multaMora: 85,
  };

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
            <h2 className="text-xl font-bold mb-6">Pagar</h2>

            <form className="space-y-5 text-sm text-slate-800">
              {/* Nombre de la factura */}
              <div className="space-y-1">
                <label className="block font-medium">Nombre de la factura</label>
                <input
                  type="text"
                  placeholder="Ingrese el nombre"
                  className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* NIT */}
              <div className="space-y-1">
                <label className="block font-medium">Número de NIT</label>
                <input
                  type="text"
                  placeholder="Ingrese el NIT"
                  className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Fecha + Método de pago */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-medium">
                    Fecha de adquisición
                  </label>
                  <input
                    type="date"
                    defaultValue="2025-08-17"
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-medium">Método de pago</label>
                  <select className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option>Seleccione una opción</option>
                    <option>Transferencia bancaria</option>
                    <option>Tarjeta de crédito</option>
                    <option>Efectivo</option>
                  </select>
                </div>
              </div>

              {/* Cuotas pendientes */}
              <div className="space-y-1">
                <label className="block font-medium">Cuotas Pendientes</label>
                <input
                  type="number"
                  placeholder="Ingrese el monto"
                  className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
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
                  type="submit"
                  className="px-5 py-2 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
                >
                  Guardar y Pagar
                </button>
              </div>
            </form>
          </div>
        </section>
      ) : (
        /* SI showForm ES false → MUESTRO LAS TARJETAS */
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tarjeta izquierda */}
          <article className="bg-[#f9a64a] rounded-3xl p-6 shadow-lg flex flex-col justify-between">
            <div className="space-y-2 text-center text-white">
              <p className="text-xl font-extrabold">¡ATENCIÓN!</p>
              <p className="font-semibold">
                Vence en {proximaCuota.venceEnDias} días
              </p>
            </div>

            <div className="bg-white rounded-2xl mt-4 p-6 space-y-3 text-slate-800">
              <p className="text-4xl font-bold text-center">
                ${" "}
                {proximaCuota.monto.toLocaleString("es-BO", {
                  minimumFractionDigits: 0,
                })}
              </p>
              <p className="text-center text-sm text-slate-600">
                {proximaCuota.fecha}
              </p>

              <div className="border-t border-slate-300 pt-4 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Alquiler de Propiedad:</span>
                  <span>${proximaCuota.alquiler}</span>
                </div>
                <div className="flex justify-between">
                  <span>Gastos Comunes / Mantenimiento:</span>
                  <span>${proximaCuota.gastosComunes}</span>
                </div>
                <div className="flex justify-between">
                  <span>Multas por Mora:</span>
                  <span>
                    ${proximaCuota.multaMora}{" "}
                    {proximaCuota.multaMora === 0 && "(N/A)"}
                  </span>
                </div>
              </div>

              <button
                className="mt-4 w-full bg-[#169c92] hover:bg-[#12857c] text-white font-semibold py-2.5 rounded-lg"
                onClick={() => setShowForm(true)}
              >
                Pagar Cuota
              </button>
            </div>
          </article>

          {/* Tarjeta derecha */}
          <article className="bg-[#e65b4f] rounded-3xl p-6 shadow-lg flex flex-col justify-between">
            <div className="space-y-2 text-center text-white">
              <p className="text-xl font-extrabold">¡CUOTA VENCIDA!</p>
              <p className="font-semibold">
                {cuotaVencida.diasMora} días de mora
              </p>
            </div>

            <div className="bg-white rounded-2xl mt-4 p-6 space-y-3 text-slate-800">
              <p className="text-4xl font-bold text-center">
                $
                {cuotaVencida.monto.toLocaleString("es-BO", {
                  minimumFractionDigits: 0,
                })}
              </p>
              <p className="text-center text-sm text-slate-600">
                {cuotaVencida.fecha}
              </p>

              <ul className="border-t border-slate-300 pt-4 space-y-1 text-sm list-disc list-inside">
                <li>Alquiler de Propiedad: ${cuotaVencida.alquiler}</li>
                <li>
                  Gastos Comunes / Mantenimiento: $
                  {cuotaVencida.gastosComunes}
                </li>
                <li>
                  Multa por Pago Tardío (10%): ${cuotaVencida.multaMora}
                </li>
              </ul>

              <button
                className="mt-4 w-full bg-[#e65b4f] hover:bg-[#c8483d] text-white font-semibold py-2.5 rounded-lg"
                onClick={() => setShowForm(true)}
              >
                Pagar Cuota
              </button>
            </div>
          </article>
        </section>
      )}

      <footer className="mt-6 text-center text-xs text-slate-500">
        © 2025 Alquila 360 – Gestión integral de alquileres
      </footer>
    </div>
  );
}
