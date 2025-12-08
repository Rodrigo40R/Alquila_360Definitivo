"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SuccessPdfModal } from "@/components/ui/SuccessPdfModal";

export default function PropietarioDashboardPage() {
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const router = useRouter();

  // Simulación tabla de tickets
  const tickets = [
    {
      id: "#305",
      titulo: "Contrato #305 por vencer",
      propiedad: "Depto - Av. América",
      inquilino: "Carlos López",
      prioridad: "Alta",
      estado: "En proceso",
      fecha: "24/11/2025",
    },
    {
      id: "#412",
      titulo: "Cambio de cerradura puerta principal",
      propiedad: "Casa - Tiquipaya",
      inquilino: "María Gómez",
      prioridad: "Media",
      estado: "Abierto",
      fecha: "22/11/2025",
    },
    {
      id: "#333",
      titulo: "Pintura fachada",
      propiedad: "Garzonier - Cala Cala",
      inquilino: "Carlos López",
      prioridad: "Baja",
      estado: "Cerrado",
      fecha: "10/11/2025",
    },
  ];

  const ticketsFiltrados = tickets.filter((t) =>
    filtroEstado === "Todos" ? true : t.estado === filtroEstado
  );

  // Modal PDF
  const handleDownloadPdf = () => {
    setShowPdfModal(true);
  };

  return (
    <div className="p-6">
      {/* TITULO */}
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Dashboard</h1>

      {/* TARJETAS RESUMEN */}
      <div className="grid grid-cols-4 gap-4 mb-10">
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

        {/* TARJETA QUE VA A /propietario/propiedades */}
        <div
          onClick={() => router.push("/propietario/propiedades")}
          className="rounded-xl bg-white shadow p-6 text-center border border-slate-200 cursor-pointer hover:bg-slate-50 hover:shadow-md transition"
        >
          <p className="font-semibold text-slate-700">Propiedades disponibles</p>
          <p className="text-3xl font-bold mt-2">2</p>
          <p className="text-xs mt-1 text-emerald-600 font-semibold">
            Ver propiedades →
          </p>
        </div>
      </div>

      {/* BLOQUE DE MOROSOS / REPORTES */}
      <div className="rounded-xl bg-white shadow p-6 border border-slate-200 mb-10">

        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Morosidad e Ingresos
        </h2>


        {/* FILTROS */}
        <div className="flex gap-3 mb-6">

          {/* ✔ ESTE ES EL BOTÓN QUE DEBE IR A /propietario/propiedades */}
          <button
            onClick={() => router.push("/propietario/propiedades")}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50"
          >
            Selección de propiedad
          </button>

          {/* FILTRO ESTADO DE PAGO */}
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm bg-white"
          >
            <option value="Todos">Estado de pago</option>
            <option value="En proceso">En proceso</option>
            <option value="Abierto">Abierto</option>
            <option value="Cerrado">Cerrado</option>
          </select>

          <button className="rounded-md border px-4 py-2 text-sm">
            Generar reporte
          </button>

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
            {ticketsFiltrados.map((t) => (
              <tr key={t.id} className="border-b">
                <td className="py-3">{t.id}</td>
                <td>{t.titulo}</td>
                <td>{t.propiedad}</td>
                <td>{t.inquilino}</td>
                <td>{t.prioridad}</td>
                <td>{t.estado}</td>
                <td>{t.fecha}</td>
              </tr>
            ))}
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
