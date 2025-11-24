"use client";

export default function AsignarTecnicoPage() {
  const ticket = {
    id: "#03",
    propiedad: "Santa Fe 203",
    problema: "Fuga en la ducha",
  };

  const tecnicos = [
    { id: 1, nombre: "Pedro Gómez" },
    { id: 2, nombre: "Luis Ramos" },
    { id: 3, nombre: "Juan Ortega" },
  ];

  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Asignar técnico al ticket {ticket.id}
        </h1>
        <p className="text-sm text-slate-600">{ticket.problema}</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
        <p className="font-medium text-slate-900">
          Propiedad: {ticket.propiedad}
        </p>

        <label className="text-sm text-slate-700">Seleccionar técnico</label>

        <select className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm">
          <option>Seleccione un técnico</option>
          {tecnicos.map((t) => (
            <option key={t.id}>{t.nombre}</option>
          ))}
        </select>

        <button className="w-full bg-emerald-500 text-white py-2 rounded-md text-sm font-semibold hover:bg-emerald-600">
          Asignar técnico
        </button>
      </div>
    </div>
  );
}
