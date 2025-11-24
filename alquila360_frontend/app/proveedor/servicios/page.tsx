"use client";

export default function ServiciosProveedor() {
  const servicios = [
    {
      id: 1,
      tipo: "Plomería",
      propiedad: "Depto América",
      estado: "En progreso",
      fecha: "12/02/25",
    },
    {
      id: 2,
      tipo: "Electricidad",
      propiedad: "Casa Tiquipaya",
      estado: "Pendiente",
      fecha: "11/02/25",
    },
    {
      id: 3,
      tipo: "Carpintería",
      propiedad: "Garzonier Cala Cala",
      estado: "Pendiente",
      fecha: "09/02/25",
    },
  ];

  const color = (estado: string) => {
    if (estado === "En progreso") return "bg-blue-100 text-blue-700";
    if (estado === "Pendiente") return "bg-yellow-100 text-yellow-700";
    return "bg-emerald-100 text-emerald-700";
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Servicios asignados</h1>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        {servicios.map((s) => (
          <div
            key={s.id}
            className="grid grid-cols-5 border-b py-3 items-center last:border-none"
          >
            <p className="font-semibold">{s.tipo}</p>
            <p>{s.propiedad}</p>
            <span
              className={`px-3 py-1 rounded-full text-xs text-center ${color(s.estado)}`}
            >
              {s.estado}
            </span>
            <p className="text-slate-500">{s.fecha}</p>
            <a
              href={`/proveedor/servicios/${s.id}`}
              className="text-brand-primary underline text-sm"
            >
              Ver
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
