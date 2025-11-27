"use client";

import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f5f8fa]">

      {/* NAVBAR SUPERIOR */}
      <header className="w-full flex items-center justify-between px-20 py-6 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <Image src="/logo-icon.png" alt="Logo Alquila360" width={40} height={40} />
          <Image src="/logo-text.png" alt="Texto Alquila360" width={160} height={40} />

        </div>

        <nav className="flex items-center gap-10 text-[#223344] text-lg">
          <a href="#inicio" className="hover:text-emerald-500 transition">Inicio</a>
          <a href="#servicios" className="hover:text-emerald-500 transition">Servicios</a>
          <a href="#sobre-nosotros" className="hover:text-emerald-500 transition">Sobre nosotros</a>
          <a href="#contacto" className="hover:text-emerald-500 transition">Contacto</a>

          <a
            href="/login"
            className="px-6 py-2 border border-emerald-500 text-emerald-600 rounded-full hover:bg-emerald-500 hover:text-white transition"
          >
            Iniciar Sesión
          </a>
        </nav>
      </header>

      {/* HERO PRINCIPAL */}
      <section className="py-24 px-20 grid grid-cols-2 gap-16 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          <p className="tracking-[6px] text-emerald-600 font-semibold mb-4">
            PLATAFORMA PARA ALQUILERES
          </p>

          <h1 className="text-[56px] font-extrabold leading-tight text-[#0d1b2a]">
            Tu gestión de alquileres<br />
            simple y segura.
          </h1>

          <p className="mt-6 text-xl text-gray-600 leading-relaxed max-w-xl">
            La plataforma integral para propietarios e inquilinos que te ayuda a optimizar tus 
            procesos: contratos, pagos, mantenimiento y reportes en un solo lugar.
          </p>

          <div className="flex gap-6 mt-10">
            <a
              href="/register"
              className="px-8 py-3 bg-emerald-600 text-white rounded-full text-lg shadow hover:bg-emerald-700 transition"
            >
              Empieza ahora
            </a>

            <a
              href="#servicios"
              className="px-8 py-3 bg-white border border-gray-300 rounded-full text-lg hover:bg-gray-100 transition"
            >
              Descubre más
            </a>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative w-full h-[400px] bg-white rounded-3xl shadow-xl overflow-hidden">
          <Image
            src="/hero-login.png"
            alt="Imagen principal Alquila360"
            fill
            className="object-cover"
          />
        </div>

      </section>

      {/* TARJETAS DE SERVICIOS */}
      <section className="px-20 grid grid-cols-4 gap-10 pb-32">

        {/* Card 1 */}
        <div className="p-8 bg-white rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="font-bold text-xl text-[#0d1b2a] mb-2">
            Gestión completa de propiedades
          </h3>
          <p className="text-gray-600">
            Controla contratos, pagos y mantenimiento desde un solo lugar.
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-8 bg-white rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="font-bold text-xl text-[#0d1b2a] mb-2">
            Pagos rápidos y seguros
          </h3>
          <p className="text-gray-600">
            Acepta transferencias, QR o efectivo con recibos automáticos.
          </p>
        </div>

        {/* Card 3 */}
        <div className="p-8 bg-white rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="font-bold text-xl text-[#0d1b2a] mb-2">
            Reportes claros en tiempo real
          </h3>
          <p className="text-gray-600">
            Visualiza ingresos, morosidad y ocupación al instante.
          </p>
        </div>

        {/* Card 4 */}
        <div className="p-8 bg-white rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="font-bold text-xl text-[#0d1b2a] mb-2">
            Información segura y centralizada
          </h3>
          <p className="text-gray-600">
            Tus datos están protegidos y siempre disponibles cuando los necesitas.
          </p>
        </div>

      </section>
    </main>
  );
}