"use client";

import CardPro from "@/components/ui/CardPro";

export default function ReportesAdmin() {
  const stats = [
    { titulo: "Usuarios totales", valor: 128, color: "slate" },
    { titulo: "Propiedades activas", valor: 63, color: "blue" },
    { titulo: "Tickets del mes", valor: 41, color: "emerald" },
  ];

  const ingresos = [
    { mes: "Enero", total: "Bs. 28,500" },
    { mes: "Febrero", total: "Bs. 31,200" },
    { mes: "Marzo", total: "Bs. 30,900" },
  ];

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-slate-900">Reportes generales</h1>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <CardPro
            key={i}
            titulo={s.titulo}
            valor={s.valor}
            color={s.color as any} // YA NO ROMPE
          />
        ))}
      </div>

      {/* Ingresos Mensuales */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <p className="text-lg font-semibold text-slate-900">Ingresos por mes</p>

        {ingresos.map((i, idx) => (
          <div
            key={idx}
            className="flex justify-between border-b pb-3 last:border-0"
          >
            <span>{i.mes}</span>
            <span className="font-bold text-emerald-600">{i.total}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
