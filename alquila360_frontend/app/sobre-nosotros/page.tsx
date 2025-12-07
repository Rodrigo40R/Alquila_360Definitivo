"use client";

import Image from "next/image";

export default function SobreNosotrosPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f7] text-[#111111]">
      {/* NAVBAR SUPERIOR */}
      <header className="w-full bg-white shadow-sm">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
          {/* LOGO COMPLETO */}
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
            <a href="/" className="hover:text-emerald-600">
              Inicio
            </a>
            <a href="/services" className="hover:text-emerald-600">
              Servicios
            </a>
            <a href="/contacto" className="hover:text-emerald-600">
              Contacto
            </a>
            <a
              href="/sobre-nosotros"
              className="font-semibold text-emerald-600"
            >
              Sobre nosotros
            </a>
          </nav>

          <a
            href="/login"
            className="rounded-full border border-emerald-500 px-6 py-2 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-500 hover:text-white"
          >
            Iniciar Sesión
          </a>
        </div>
      </header>

      {/* CONTENIDO */}
      <section className="mx-auto max-w-7xl px-10 py-16">
        <h1 className="mb-10 text-5xl font-bold">Sobre nosotros</h1>

        <div className="space-y-16">
          {/* BLOQUE 1: LOGO + TEXTO */}
          <div className="flex flex-col items-center gap-10 md:flex-row">
            {/* LOGO GRANDE */}
            <div className="flex-1 flex justify-center">
              <Image
                src="/logo-sobre.png" // pon aquí tu png del logo grande
                alt="Logo Alquila360"
                width={260}
                height={260}
              />
            </div>

            {/* TEXTO */}
            <div className="flex-1 text-base leading-relaxed">
              <p className="mb-2">
                <span className="font-bold">Alquila360</span> nace para
                digitalizar el proceso de alquiler de propiedades, conectando
                propietarios, inquilinos y técnicos en una sola plataforma.
              </p>
              <p>
                Nuestro objetivo es simplificar la administración y brindar
                confianza a ambas partes con una herramienta accesible y
                profesional.
              </p>
            </div>
          </div>

          {/* BLOQUE 2: TEXTO + MUÑEQUITOS */}
          <div className="flex flex-col items-center gap-10 md:flex-row">
            {/* TEXTO ABAJO (MISMO TEXTO) */}
            <div className="flex-1 text-base leading-relaxed">
              <p className="mb-2">
                <span className="font-bold">Alquila360</span> nace para
                digitalizar el proceso de alquiler de propiedades, conectando
                propietarios, inquilinos y técnicos en una sola plataforma.
              </p>
              <p>
                Nuestro objetivo es simplificar la administración y brindar
                confianza a ambas partes con una herramienta accesible y
                profesional.
              </p>
            </div>

            {/* IMAGEN MUÑEQUITOS */}
            <div className="flex-1 flex justify-center">
              <Image
                src="/team.png" // aquí va la imagen de los muñequitos
                alt="Equipo Alquila360"
                width={380}
                height={220}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t bg-[#1f2933] px-6 py-3 text-center text-xs text-gray-300">
        © 2025 Alquila 360 – Gestión integral de alquileres · Contáctanos +591
        76782341 · 4454323
      </footer>
    </main>
  );
}
