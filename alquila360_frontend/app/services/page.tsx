"use client";

import Image from "next/image";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f7] text-[#1a1a1a]">
      {/* NAVBAR SUPERIOR */}
      <header className="w-full bg-white shadow-sm">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
          <div className="flex items-center">
            <Image
              src="/logo-full.png"
              alt="Alquila360"
              width={200}
              height={50}
            />
          </div>

          {/* MENÚ */}
          <nav className="flex gap-10 text-base text-[#303030]">
            <a href="/" className="hover:text-emerald-600">Inicio</a>
            <a href="/services" className="text-emerald-600 font-semibold">Servicios</a>
            <a href="/contacto" className="hover:text-emerald-600">Contacto</a>
            <a href="/sobre-nosotros" className="hover:text-emerald-600">Sobre nosotros</a>
          </nav>

          <a
            href="/login"
            className="rounded-full border border-emerald-500 px-6 py-2 text-emerald-600 transition hover:bg-emerald-500 hover:text-white"
          >
            Iniciar Sesión
          </a>
        </div>
      </header>

      {/* CONTENIDO */}
      <section className="mx-auto max-w-7xl px-8 py-16">
        <h1 className="text-5xl font-bold mb-4">Nuestros Servicios</h1>
        <p className="text-gray-600 mb-12 text-lg">
          La plataforma integral para propietarios e inquilinos que te ayuda a optimizar tus procesos
        </p>

        {/* TARJETAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* CARD 1 */}
          <div className="flex items-center gap-8 rounded-2xl bg-white shadow p-10 border border-gray-200">
            <Image
              src="/servicios-gestion.png"
              alt="Gestión de propiedades"
              width={150}
              height={150}
              className="rounded-xl"
            />

            <div>
              <h2 className="text-2xl font-bold mb-2">Gestión completa de propiedades</h2>
              <p className="text-gray-600">
                Controla contratos, pagos y mantenimiento desde un solo lugar.
              </p>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="flex items-center gap-8 rounded-2xl bg-white shadow p-10 border border-gray-200">
            <Image
              src="/servicios-pagos.png"
              alt="Pagos rápidos"
              width={150}
              height={150}
              className="rounded-xl"
            />

            <div>
              <h2 className="text-2xl font-bold mb-2">Pagos rápidos y seguros</h2>
              <p className="text-gray-600">
                Acepta transferencias, QR o efectivo con recibos automáticos.
              </p>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="flex items-center gap-8 rounded-2xl bg-white shadow p-10 border border-gray-200">
            <Image
              src="/servicios-reportes.png"
              alt="Reportes en tiempo real"
              width={150}
              height={150}
              className="rounded-xl"
            />

            <div>
              <h2 className="text-2xl font-bold mb-2">Reportes claros en tiempo real</h2>
              <p className="text-gray-600">
                Visualiza ingresos, morosidad y ocupación al instante.
              </p>
            </div>
          </div>

          {/* CARD 4 */}
          <div className="flex items-center gap-8 rounded-2xl bg-white shadow p-10 border border-gray-200">
            <Image
              src="/servicios-seguridad.png"
              alt="Seguridad y confianza"
              width={150}
              height={150}
              className="rounded-xl"
            />

            <div>
              <h2 className="text-2xl font-bold mb-2">Seguridad y confianza</h2>
              <p className="text-gray-600">
                Tu información y pagos están protegidos con cifrado.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t bg-[#1f2933] px-6 py-3 text-center text-xs text-gray-300">
        © 2025 Alquila 360 – Gestión integral de alquileres · Contacto +591 76782341
      </footer>
    </main>
  );
}
