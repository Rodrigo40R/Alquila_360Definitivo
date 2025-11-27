"use client";

import CardPro from "@/components/ui/CardPro";

export default function TecnicoDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-900">Panel del Técnico</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CardPro titulo="Tickets asignados" valor="5" />
        <CardPro titulo="Tickets en proceso" valor="2" color="blue" />
        <CardPro titulo="Tickets resueltos" valor="18" color="emerald" />
      </div>
    </div>
  );
}
