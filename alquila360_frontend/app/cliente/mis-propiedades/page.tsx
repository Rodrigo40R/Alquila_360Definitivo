"use client";

export default function ClienteMisPropiedadesPage() {
  const props = [
    { nombre: "Departamento Cala Cala", estado: "Reservada", fecha: "12 FEB" },
    { nombre: "Casa Tiquipaya", estado: "Rechazada", fecha: "22 ENE" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Mis propiedades</h1>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
        {props.map((p, i) => (
          <div key={i} className="flex justify-between border-b pb-3">
            <div>
              <p className="font-semibold">{p.nombre}</p>
              <p className="text-xs text-slate-500">Última actualización: {p.fecha}</p>
            </div>

            <span
              className={`px-3 py-1 text-xs rounded-full ${
                p.estado === "Reservada"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {p.estado}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
