// app/sobre-nosotros/page.tsx
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto flex max-w-5xl flex-col gap-10 px-6 pb-16 pt-16 lg:flex-row lg:items-center">
        {/* Logo grande / imagen */}
        <div className="flex-1">
          <div className="flex h-48 w-48 items-center justify-center rounded-full bg-teal-100 text-4xl font-bold text-teal-600">
            A360
          </div>
        </div>

        {/* Texto */}
        <div className="flex-1">
          <h1 className="text-3xl font-semibold">Sobre nosotros</h1>
          <p className="mt-4 text-sm text-slate-600">
            Alquila360 nace para digitalizar el proceso de alquiler de propiedades,
            conectando propietarios, inquilinos y técnicos en una sola plataforma.
          </p>
          <p className="mt-3 text-sm text-slate-600">
            Nuestro objetivo es simplificar la administración y brindar confianza a
            ambas partes con una herramienta accesible y profesional. Queremos que
            el seguimiento de pagos, contratos y mantenimiento sea tan simple como
            revisar tu panel.
          </p>
        </div>
      </section>
    </main>
  );
}
