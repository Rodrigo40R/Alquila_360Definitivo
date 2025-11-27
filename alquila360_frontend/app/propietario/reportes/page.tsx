"use client";

import CardPro from "@/components/ui/CardPro";

export default function ReportesPropietario() {
  const reportes = [
    {
      id: 1,
      titulo: "Ingresos del mes",
      valor: "Bs. 6,800",
    },
    {
      id: 2,
      titulo: "Propiedades ocupadas",
      valor: "2/3",
    },
    {
      id: 3,
      titulo: "Tickets resueltos",
      valor: "4",
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-slate-900">Reportes</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {reportes.map((r) => (
          <CardPro key={r.id} titulo={r.titulo} valor={r.valor} />
        ))}
      </div>

      <a
        href="/propietario/reportes/detalle"
        className="px-4 py-2 bg-brand-primary text-white rounded-md"
      >
        Ver reporte detallado
      </a>
    </div>
  );
}
