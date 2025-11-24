export default function ServicesPage() {
  const servicios = [
    {
      titulo: "Gestión completa de propiedades",
      desc: "Control total de tus propiedades, pagos, inquilinos y reportes.",
    },
    {
      titulo: "Pagos rápidos y seguros",
      desc: "Acepta transferencias, QR o efectivo con comprobantes automáticos.",
    },
    {
      titulo: "Reportes en tiempo real",
      desc: "Visualiza ingresos, contratos, tickets y estadísticas al instante.",
    },
    {
      titulo: "Soporte técnico integrado",
      desc: "Técnicos asignados para resolver cualquier incidencia.",
    },
  ];

  return (
    <div className="space-y-10 max-w-4xl">
      <h1 className="text-4xl font-bold text-slate-900">
        Nuestros Servicios
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {servicios.map((s, i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-2"
          >
            <p className="text-xl font-semibold text-slate-900">{s.titulo}</p>
            <p className="text-slate-600">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
