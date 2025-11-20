// app/services/page.tsx
export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-5xl px-6 pb-16 pt-16">
        <h1 className="text-3xl font-semibold">Nuestros Servicios</h1>
        <p className="mt-2 text-sm text-slate-600">
          La plataforma integral para propietarios e inquilinos que te ayuda a
          optimizar tus procesos.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold">Gestión completa de propiedades</h2>
            <p className="mt-3 text-xs text-slate-600">
              Registra propiedades, inquilinos y contratos de forma centralizada.
              Visualiza el estado de cada inmueble y organiza la información clave
              en segundos.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold">Pagos rápidos y seguros</h2>
            <p className="mt-3 text-xs text-slate-600">
              Genera recibos automáticos, registra pagos en efectivo y lleva el
              control de transferencias o cobros por QR sin perder ningún detalle.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold">Reportes claros en tiempo real</h2>
            <p className="mt-3 text-xs text-slate-600">
              Analiza ingresos, morosidad y ocupación de tus propiedades con
              gráficos simples que resumen la información más importante.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold">Seguridad y confianza</h2>
            <p className="mt-3 text-xs text-slate-600">
              Toda la información se guarda de forma segura, con accesos por rol
              para propietarios, inquilinos y técnicos.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
