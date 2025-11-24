"use client";

export default function ContratosPropietarioPage() {
  const contratos = [
    {
      id: 1,
      propiedad: "Depto - América",
      inquilino: "Carlos López",
      monto: "Bs. 2,500",
      fechaInicio: "01/01/2025",
      fechaFin: "01/01/2026",
    },
    {
      id: 2,
      propiedad: "Casa - Tiquipaya",
      inquilino: "María Gómez",
      monto: "Bs. 3,800",
      fechaInicio: "15/02/2025",
      fechaFin: "15/02/2026",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Contratos</h1>

        <a
          href="/propietario/contratos/nuevo"
          className="px-4 py-2 bg-brand-primary text-white rounded-md"
        >
          Nuevo contrato
        </a>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        {contratos.map((c) => (
          <div
            key={c.id}
            className="grid grid-cols-5 border-b last:border-none py-3 text-sm"
          >
            <p>{c.propiedad}</p>
            <p>{c.inquilino}</p>
            <p>{c.monto}</p>
            <p>{c.fechaInicio}</p>

            <a
              href={`/propietario/contratos/${c.id}/editar`}
              className="text-brand-primary underline"
            >
              Editar
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
