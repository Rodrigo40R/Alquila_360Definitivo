"use client";

import CardPro from "@/components/ui/CardPro";

export default function ProveedorDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-900">Panel del Proveedor</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CardPro titulo="Servicios asignados" valor="4" color="blue" />
        <CardPro titulo="Servicios completados" valor="22" color="emerald" />
        <CardPro titulo="Pendientes" valor="2" color="yellow" />
      </div>
    </div>
  );
}
