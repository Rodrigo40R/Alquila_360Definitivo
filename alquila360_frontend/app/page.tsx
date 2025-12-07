"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f5f8fa]">
      {/* NAVBAR SUPERIOR */}
      <header className="w-full bg-white shadow-sm">
        <div className="flex h-20 items-center justify-between px-20">
          {/* LOGO COMPLETO */}
          <div className="flex items-center">
            <Image
              src="/logo-full.png" // 👈 logo completo
              alt="Alquila360"
              width={220}
              height={50}
              className="object-contain"
            />
          </div>

          <nav className="flex items-center gap-10 text-lg text-[#223344]">
            <Link href="/" className="transition hover:text-emerald-500">
              Inicio
            </Link>

            <Link
              href="/services"
              className="transition hover:text-emerald-500"
            >
              Servicios
            </Link>

            <Link
              href="/sobre-nosotros"
              className="transition hover:text-emerald-500"
            >
              Sobre nosotros
            </Link>

            <Link
              href="/contacto"
              className="transition hover:text-emerald-500"
            >
              Contacto
            </Link>

            <Link
              href="/login"
              className="rounded-full border border-emerald-500 px-6 py-2 text-emerald-600 transition hover:bg-emerald-500 hover:text-white"
            >
              Iniciar Sesión
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO PRINCIPAL */}
      <section
        id="inicio"
        className="grid grid-cols-2 items-center gap-16 px-20 py-24"
      >
        {/* LEFT CONTENT */}
        <div>
          <p className="mb-4 font-semibold tracking-[6px] text-emerald-600">
            PLATAFORMA PARA ALQUILERES
          </p>

          <h1 className="text-[56px] font-extrabold leading-tight text-[#0d1b2a]">
            Tu gestión de alquileres
            <br />
            simple y segura.
          </h1>

          <p className="mt-6 max-w-xl text-xl leading-relaxed text-gray-600">
            La plataforma integral para propietarios e inquilinos que te ayuda a
            optimizar tus procesos: contratos, pagos, mantenimiento y reportes
            en un solo lugar.
          </p>

          <div className="mt-10 flex gap-6">
            <Link
              href="/register"
              className="rounded-full bg-emerald-600 px-8 py-3 text-lg text-white shadow hover:bg-emerald-700 transition"
            >
              Empieza ahora
            </Link>

            <Link
              href="/servicios"
              className="rounded-full border border-gray-300 bg-white px-8 py-3 text-lg hover:bg-gray-100 transition"
            >
              Descubre más
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative h-[400px] w-full overflow-hidden rounded-3xl bg-white shadow-xl">
          <Image
            src="/hero-login.png"
            alt="Imagen principal Alquila360"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* TARJETAS DE SERVICIOS */}
      <section
        id="servicios"
        className="grid grid-cols-4 gap-10 px-20 pb-32"
      >
        {/* Card 1 */}
        <div className="rounded-2xl bg-white p-8 shadow transition hover:shadow-lg">
          <h3 className="mb-2 text-xl font-bold text-[#0d1b2a]">
            Gestión completa de propiedades
          </h3>
          <p className="text-gray-600">
            Controla contratos, pagos y mantenimiento desde un solo lugar.
          </p>
        </div>

        {/* Card 2 */}
        <div className="rounded-2xl bg-white p-8 shadow transition hover:shadow-lg">
          <h3 className="mb-2 text-xl font-bold text-[#0d1b2a]">
            Pagos rápidos y seguros
          </h3>
          <p className="text-gray-600">
            Acepta transferencias, QR o efectivo con recibos automáticos.
          </p>
        </div>

        {/* Card 3 */}
        <div className="rounded-2xl bg-white p-8 shadow transition hover:shadow-lg">
          <h3 className="mb-2 text-xl font-bold text-[#0d1b2a]">
            Reportes claros en tiempo real
          </h3>
          <p className="text-gray-600">
            Visualiza ingresos, morosidad y ocupación al instante.
          </p>
        </div>

        {/* Card 4 */}
        <div className="rounded-2xl bg-white p-8 shadow transition hover:shadow-lg">
          <h3 className="mb-2 text-xl font-bold text-[#0d1b2a]">
            Información segura y centralizada
          </h3>
          <p className="text-gray-600">
            Tus datos están protegidos y siempre disponibles cuando los
            necesitas.
          </p>
        </div>
      </section>
    </main>
  );
}
