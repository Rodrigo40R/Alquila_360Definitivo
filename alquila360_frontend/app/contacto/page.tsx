"use client";

import Image from "next/image";

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-6 text-sm md:text-base">
      <span className="text-slate-600">{label}</span>
      <span className="font-semibold text-slate-900 text-right">
        {value}
      </span>
    </div>
  );
}

export default function ContactoPage() {
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
              className="object-contain"
            />
          </div>

          {/* MENÚ */}
          <nav className="hidden gap-10 text-base text-[#303030] md:flex">
            <a href="/" className="hover:text-emerald-600">
              Inicio
            </a>
            <a href="/services" className="hover:text-emerald-600">
              Servicios
            </a>
            <a
              href="/contacto"
              className="font-semibold text-emerald-600"
            >
              Contacto
            </a>
            <a href="/sobre-nosotros" className="hover:text-emerald-600">
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
      <section className="mx-auto max-w-7xl px-8 py-16">
        <div className="grid gap-12 md:grid-cols-2">
          {/* COLUMNA IZQUIERDA: INFO DE CONTACTO */}
          <div>
            <h1 className="mb-4 text-4xl font-bold text-slate-900">
              Contacto
            </h1>
            <p className="mb-8 text-lg text-slate-700">
              Si deseas comunicarte con nosotros, podemos ayudarte por estos
              medios:
            </p>

            <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <Item label="Teléfono" value="+591 700-00000" />
              <Item label="Email" value="contacto@alquila360.com" />
              <Item label="WhatsApp" value="+591 700-00000" />
              <Item label="Dirección" value="Cochabamba, Bolivia" />
            </div>
          </div>

          {/* COLUMNA DERECHA: FORMULARIO SIMPLE */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">
              Envíanos un mensaje
            </h2>
            <p className="mb-6 text-sm text-slate-600">
              Déjanos tus datos y un breve mensaje, y nos pondremos en
              contacto contigo.
            </p>

            <form
              className="space-y-4"
              onSubmit={(e) => e.preventDefault()} // solo front por ahora
            >
              <div className="space-y-1 text-sm">
                <label className="font-medium text-slate-800">
                  Nombre
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  placeholder="Escribe tu nombre"
                />
              </div>

              <div className="space-y-1 text-sm">
                <label className="font-medium text-slate-800">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  placeholder="tucorreo@ejemplo.com"
                />
              </div>

              <div className="space-y-1 text-sm">
                <label className="font-medium text-slate-800">
                  Mensaje
                </label>
                <textarea
                  rows={4}
                  className="w-full resize-none rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  placeholder="Cuéntanos en qué podemos ayudarte"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-600"
              >
                Enviar mensaje
              </button>
            </form>
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
