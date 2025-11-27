export default function PrincipalHome() {
  const beneficios = [
    {
      titulo: "Gestión completa",
      desc: "Propiedades, pagos, contratos y más.",
    },
    {
      titulo: "Pagos seguros",
      desc: "Recibos automáticos y registro claro.",
    },
    {
      titulo: "Tickets y mantenimiento",
      desc: "Flujo claro entre inquilinos, técnicos y proveedores.",
    },
    {
      titulo: "Reportes en tiempo real",
      desc: "Estadísticas modernas y fáciles de leer.",
    },
  ];

  return (
    <div className="space-y-16">
      {/* HERO */}
      <section className="flex flex-col md:flex-row items-center gap-12">
        <div className="space-y-6 max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            La forma moderna de gestionar alquileres.
          </h1>

          <p className="text-slate-700 text-lg">
            Propietarios, inquilinos y técnicos conectados en un mismo sistema.
          </p>

          <div className="flex gap-4">
            <a
              href="/login"
              className="px-6 py-3 bg-brand-primary text-white rounded-md font-semibold hover:bg-emerald-600"
            >
              Iniciar sesión
            </a>

            <a
              href="/sobre-nosotros"
              className="px-6 py-3 border border-slate-300 text-slate-800 rounded-md font-semibold hover:bg-slate-100"
            >
              Conocer más
            </a>
          </div>
        </div>

        <div className="w-full h-72 rounded-xl bg-slate-200 shadow-md"></div>
      </section>

      {/* BENEFICIOS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {beneficios.map((b, i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-2"
          >
            <p className="text-lg font-semibold text-slate-900">{b.titulo}</p>
            <p className="text-slate-600">{b.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
