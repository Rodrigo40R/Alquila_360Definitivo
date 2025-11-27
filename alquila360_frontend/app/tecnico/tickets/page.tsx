"use client";

export default function TicketsTecnico() {
  const tickets = [
    {
      id: "#101",
      propiedad: "Depto América",
      descripcion: "Fuga de agua bajo el lavamanos",
      estado: "En progreso",
      fecha: "12/02/2025",
    },
    {
      id: "#102",
      propiedad: "Casa Tiquipaya",
      descripcion: "Corto circuito en enchufe",
      estado: "Pendiente",
      fecha: "10/02/2025",
    },
    {
      id: "#103",
      propiedad: "Garzonier Cala Cala",
      descripcion: "Puerta dañada",
      estado: "Pendiente",
      fecha: "09/02/2025",
    },
  ];

  const color = (e: string) => {
    if (e === "En progreso") return "bg-blue-100 text-blue-700";
    if (e === "Pendiente") return "bg-yellow-100 text-yellow-700";
    return "bg-emerald-100 text-emerald-700";
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Tickets asignados</h1>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        {tickets.map((t) => (
          <div
            key={t.id}
            className="grid grid-cols-4 items-center border-b py-3 last:border-none"
          >
            <p className="font-semibold">{t.id}</p>
            <p>{t.propiedad}</p>
            <span className={`px-3 py-1 rounded-full text-xs text-center ${color(t.estado)}`}>
              {t.estado}
            </span>
            <a
              href={`/tecnico/tickets/${t.id}`}
              className="text-brand-primary underline text-sm"
            >
              Ver más
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
