// app/page.tsx
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-50">
      {/* barra superior simple */}
      <header className="border-b border-slate-700 bg-slate-900/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-baseline gap-2 font-semibold tracking-wide">
            <span className="text-sm text-emerald-400">A360</span>
            <span>ALQUILA360</span>
          </div>

          <nav className="hidden gap-6 text-sm md:flex">
            <Link href="#servicios" className="hover:text-emerald-300">
              Servicios
            </Link>
            <Link href="#sobre-nosotros" className="hover:text-emerald-300">
              Sobre nosotros
            </Link>
            <Link href="#contacto" className="hover:text-emerald-300">
              Contacto
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Iniciar sesión
              </Button>
            </Link>
            <Link href="/registro">
              <Button size="sm">Empieza ahora</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-center">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
              Plataforma para alquileres
            </p>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Tu gestión de alquileres simple y segura.
            </h1>
            <p className="max-w-xl text-slate-200">
              La plataforma integral para propietarios e inquilinos que te ayuda a
              optimizar tus procesos: contratos, pagos, mantenimiento y reportes en un
              solo lugar.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/registro">
                <Button size="lg">Empieza ahora</Button>
              </Link>
              <Link href="#servicios">
                <Button variant="ghost" size="lg">
                  Descubre más
                </Button>
              </Link>
            </div>
          </div>

          {/* Tarjeta para la futura imagen */}
          <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6 text-sm text-slate-300 shadow-xl">
            <p className="mb-1 font-semibold text-emerald-300">Vista previa</p>
            <p>
              Aquí va la imagen de dos personas usando la tablet.
              <br />
              Colócala en <code className="text-xs text-emerald-300">/public</code> y
              reemplaza este bloque por un{" "}
              <code className="text-xs text-emerald-300">&lt;Image /&gt;</code>.
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN SERVICIOS */}
      <section
        id="servicios"
        className="border-b border-slate-800 bg-slate-950 py-16"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold mb-8">Nuestros servicios</h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="font-semibold mb-2">
                Gestión completa de propiedades
              </h3>
              <p className="text-sm text-slate-300">
                Controla contratos, pagos y mantenimiento desde un solo lugar.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="font-semibold mb-2">Pagos rápidos y seguros</h3>
              <p className="text-sm text-slate-300">
                Acepta transferencias, QR o efectivo con recibos automáticos.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="font-semibold mb-2">Reportes claros en tiempo real</h3>
              <p className="text-sm text-slate-300">
                Visualiza ingresos, morosidad y ocupación al instante.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="font-semibold mb-2">Seguridad y confianza</h3>
              <p className="text-sm text-slate-300">
                Tu información y pagos están protegidos con cifrado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE NOSOTROS */}
      <section
        id="sobre-nosotros"
        className="border-b border-slate-800 bg-slate-950 py-16"
      >
        <div className="mx-auto max-w-6xl px-4 space-y-4">
          <h2 className="text-2xl font-bold">Sobre nosotros</h2>
          <p className="max-w-3xl text-sm text-slate-300">
            Alquila360 nace para digitalizar el proceso de alquiler de propiedades,
            conectando propietarios, inquilinos y técnicos en una sola plataforma.
            Nuestro objetivo es simplificar la administración y brindar confianza a
            ambas partes con una herramienta accesible y profesional.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="contacto"
        className="border-t border-slate-800 bg-slate-950 py-6 text-xs text-slate-400"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 md:flex-row md:items-center md:justify-between">
          <p>
            © 2025 Alquila360 — Gestión integral de alquileres
          </p>
          <p>
            Contáctanos +591 76782341 · 4454323
          </p>
        </div>
      </footer>
    </main>
  );
}
