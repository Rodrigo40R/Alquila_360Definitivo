"use client";

import React, { useState } from "react";
import { SuccessPdfModal } from "@/components/ui/SuccessPdfModal";

export default function PropietarioDashboardPage() {
  const [showPdfModal, setShowPdfModal] = useState(false);

  // Simulación de generación PDF
  const handleDownloadPdf = () => {
    // Aquí va tu lógica real para crear/exportar PDF
    // Ej: await generarPdfReporte();
    setShowPdfModal(true);
  };

  return (
    <div className="p-6">

      {/* =============================
          TITULO
      ============================== */}
      <h1 className="text-3xl font-bold text-slate-900 mb-6">
        Dahsboard
      </h1>

      {/* =============================
          TARJETAS RESUMEN
      ============================== */}
      <div className="grid grid-cols-4 gap-4 mb-8">

        <div className="rounded-xl bg-white shadow p-6 text-center border border-slate-200">
          <p className="font-semibold text-slate-700">Ingreso Total Mes</p>
          <p className="text-3xl font-bold mt-2">$12.33</p>
        </div>

        <div className="rounded-xl bg-white shadow p-6 text-center border border-slate-200">
          <p className="font-semibold text-slate-700">Morosidad pendiente</p>
          <p className="text-3xl font-bold mt-2">$12.11</p>
        </div>

        <div className="rounded-xl bg-white shadow p-6 text-center border border-slate-200">
          <p className="font-semibold text-slate-700">% de ocupación</p>
          <p className="text-3xl font-bold mt-2">90%</p>
        </div>

        <div className="rounded-xl bg-white shadow p-6 text-center border border-slate-200">
          <p className="font-semibold text-slate-700">Propiedades disponibles</p>
          <p className="text-3xl font-bold mt-2">2</p>
        </div>

      </div>

      {/* =============================
          TABLA DE MOROSOS / REPORTES
      ============================== */}
      <div className="rounded-xl bg-white shadow p-6 border border-slate-200 mb-10">

        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Ingresos vs Morosidad (últimos meses)
        </h2>

        <div className="w-full h-40 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 mb-6">
          [ Aquí va tu gráfico real ]
        </div>

        {/* BOTONES DE FILTROS */}
        <div className="flex gap-3 mb-6">
          <button className="rounded-md border px-4 py-2 text-sm">Rango de fecha</button>
          <button className="rounded-md border px-4 py-2 text-sm">Selección de propiedad</button>
          <button className="rounded-md border px-4 py-2 text-sm">Estado de pago</button>
          <button className="rounded-md border px-4 py-2 text-sm">Generar reporte</button>
          <button 
            onClick={handleDownloadPdf}
            className="rounded-md bg-slate-800 text-white px-4 py-2 text-sm hover:bg-slate-900"
          >
            Descargar PDF
          </button>
        </div>

        {/* TABLA */}
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-slate-600">
              <th className="py-2">#</th>
              <th>Título</th>
              <th>Propiedad</th>
              <th>Inquilino</th>
              <th>Prioridad</th>
              <th>Estado</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-3">#305</td>
              <td>Contrato #305 por vencer</td>
              <td>Depto - Av. América</td>
              <td>Carlos López</td>
              <td>Alta</td>
              <td>En proceso</td>
              <td>24/11/2025</td>
            </tr>
            <tr className="border-b">
              <td className="py-3">#412</td>
              <td>Cambio de cerradura puerta principal</td>
              <td>Casa - Tiquipaya</td>
              <td>María Gómez</td>
              <td>Media</td>
              <td>Abierto</td>
              <td>22/11/2025</td>
            </tr>
            <tr>
              <td className="py-3">#333</td>
              <td>Pintura fachada</td>
              <td>Garzonier - Cala Cala</td>
              <td>Carlos López</td>
              <td>Baja</td>
              <td>Cerrado</td>
              <td>10/11/2025</td>
            </tr>
          </tbody>
        </table>

      </div>

      {/* MODAL PDF */}
      <SuccessPdfModal 
        open={showPdfModal}
        onClose={() => setShowPdfModal(false)}
      />

    </div>
  );
}
