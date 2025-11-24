"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser, type Rol } from "@/lib/auth";

type RolFront = "" | "Administrador" | "Propietario" | "Inquilino" | "Técnico";

const ROLES: { id: RolFront; label: string }[] = [
  { id: "", label: "Selecciona un rol" },
  { id: "Administrador", label: "Administrador" },
  { id: "Propietario", label: "Propietario" },
  { id: "Inquilino", label: "Inquilino" },
  { id: "Técnico", label: "Técnico" },
];

// Mapea el texto del select (RolFront) al tipo Rol que usa auth.ts
function mapRolToTipoUsuario(rol: RolFront): Rol {
  switch (rol) {
    case "Administrador":
      return "administrador";
    case "Propietario":
      return "propietario";
    case "Inquilino":
      return "inquilino";
    case "Técnico":
      return "tecnico";
    default:
      // valor por defecto, no debería llegar aquí si validas antes
      return "propietario";
  }
}

function rutaDashboardPorRol(rol: RolFront): string {
  switch (rol) {
    case "Administrador":
      return "/admin/dashboard";
    case "Propietario":
      return "/propietario/dashboard";
    case "Inquilino":
      return "/inquilino/dashboard";
    case "Técnico":
      return "/tecnico/dashboard";
    default:
      return "/";
  }
}

export default function LoginPage() {
  const router = useRouter();

  const [rol, setRol] = useState<RolFront>("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!rol || !correo || !password) {
      alert("Completa todos los campos.");
      return;
    }

    setLoading(true);
    try {
      // Por ahora el “login” sólo guarda rol+email en localStorage
      const rolBack = mapRolToTipoUsuario(rol);
      loginUser(rolBack, correo);

      // Redirigir al dashboard según el rol
      router.push(rutaDashboardPorRol(rol));
    } catch (error) {
      console.error(error);
      alert("Error al iniciar sesión. Verifica tus datos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#1f2933] text-slate-900 flex flex-col">
      {/* NAVBAR SUPERIOR */}
      <header className="w-full bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2">
            <Image
              src="/logo-icon.jpg"
              alt="Alquila360 logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <Image
              src="/logo-text.jpg"
              alt="Alquila360"
              width={140}
              height={32}
            />
          </div>

          <nav className="hidden gap-8 text-sm text-slate-700 md:flex">
            <a href="#" className="hover:text-emerald-600">
              Inicio
            </a>
            <a href="#" className="hover:text-emerald-600">
              Servicios
            </a>
            <a href="#" className="hover:text-emerald-600">
              Contacto
            </a>
            <a href="#" className="hover:text-emerald-600">
              Sobre nosotros
            </a>
          </nav>

          <button className="rounded-full border border-emerald-500 px-5 py-2 text-sm font-semibold text-emerald-600 hover:bg-emerald-50">
            Iniciar Sesión
          </button>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL (igual al diseño: izquierda imagen, derecha formulario) */}
      <main className="flex-1">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 py-12 lg:flex-row">
          {/* Columna izquierda: imagen + texto */}
          <div className="flex-1 text-white">
            <div className="relative mb-8 h-80 w-full overflow-hidden rounded-xl bg-slate-800">
              <Image
                src="/hero-login.svg"
                alt="Gestión de alquileres"
                fill
                className="object-cover"
              />
            </div>
            <h2 className="mb-3 text-3xl font-semibold">
              Tu gestión de alquileres
              <br />
              Más simple y segura
            </h2>
            <p className="text-sm text-slate-200">
              Administra contratos, pagos, propiedades y tickets de
              mantenimiento desde una sola plataforma.
            </p>
          </div>

          {/* Columna derecha: tarjeta de login */}
          <div className="flex-1">
            <div className="mx-auto w-full max-w-md rounded-3xl bg-[#f6f6f6] px-10 py-10 shadow-lg">
              <div className="mb-6 flex items-center justify-center gap-3">
                <Image
                  src="/logo.svg"
                  alt="Alquila360"
                  width={40}
                  height={40}
                />
                <h1 className="text-3xl font-semibold text-slate-900">
                  Inicio de Sesión
                </h1>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* ROL */}
                <div className="space-y-1 text-sm">
                  <label className="font-medium text-slate-800">
                    Selecciona un rol
                  </label>
                  <select
                    value={rol}
                    onChange={(e) => setRol(e.target.value as RolFront)}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  >
                    {ROLES.map((r) => (
                      <option key={r.label} value={r.id}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* CORREO */}
                <div className="space-y-1 text-sm">
                  <label className="font-medium text-slate-800">Correo</label>
                  <input
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    placeholder="Ingresa tu correo"
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                {/* CONTRASEÑA */}
                <div className="space-y-1 text-sm">
                  <label className="font-medium text-slate-800">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <button type="button" className="hover:text-emerald-600">
                    ¿Olvidaste tu contraseña?
                  </button>

                  <Link
                    href="/register"
                    className="font-semibold text-emerald-600 hover:underline"
                  >
                    Registrarme
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 w-full rounded-full bg-emerald-500 px-4 py-2 text-center text-sm font-semibold text-white shadow-md hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Iniciando..." : "Iniciar sesión"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-slate-800 bg-[#1f2933] py-3 text-center text-xs text-slate-300">
        © 2025 Alquila 360 – Gestión integral de alquileres · Contáctanos
        +591 76782341 · 4454323
      </footer>
    </div>
  );
}
