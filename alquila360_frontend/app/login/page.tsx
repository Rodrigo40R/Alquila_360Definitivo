"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser, type Rol } from "@/lib/auth";
import { login as loginApi, type TipoUsuarioBack } from "../services/auth.services";

type RolFront = "" | "Administrador" | "Propietario" | "Inquilino" | "Técnico";

const ROLES: { id: RolFront; label: string }[] = [
  { id: "", label: "Selecciona un rol" },
  { id: "Administrador", label: "Administrador" },
  { id: "Propietario", label: "Propietario" },
  { id: "Inquilino", label: "Inquilino" },
  { id: "Técnico", label: "Técnico" },
];

// UI → tipo Rol (minúsculas) para auth.ts
function mapRolFrontToRol(rol: RolFront): Rol {
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
      return "propietario";
  }
}

// UI → tipo_usuario mayúsculas para el backend
function mapRolFrontToTipoUsuario(rol: RolFront): TipoUsuarioBack {
  switch (rol) {
    case "Administrador":
      return "ADMINISTRADOR";
    case "Propietario":
      return "PROPIETARIO";
    case "Inquilino":
      return "INQUILINO";
    case "Técnico":
      return "TECNICO";
    default:
      return "PROPIETARIO";
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
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!rol || !correo || !password) {
      setErrorMsg("Completa todos los campos.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const rolBack = mapRolFrontToRol(rol);
      const tipo_usuario = mapRolFrontToTipoUsuario(rol);

      const { access_token } = await loginApi({
        correo,
        password,
        tipo_usuario,
      });

      // guarda sesión en localStorage (rol + correo + token)
      loginUser(rolBack, correo, access_token);

      router.push(rutaDashboardPorRol(rol));
    } catch (error: any) {
      console.error(error);
      setErrorMsg(
        error?.message || "Error al iniciar sesión. Verifica tus datos."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#1f2933] text-slate-900">
      {/* NAVBAR SUPERIOR CON LOGO COMPLETO */}
      <header className="w-full bg-white shadow-sm">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-8">
          {/* LOGO COMPLETO */}
          <div className="flex items-center">
            <Image
              src="/logo-full.png"
              alt="Alquila360"
              width={220}
              height={50}
              className="object-contain"
            />
          </div>

          {/* MENÚ SUPERIOR */}
          <nav className="hidden gap-8 text-sm text-slate-700 md:flex">
            <Link href="/" className="hover:text-emerald-600">
              Inicio
            </Link>
            <Link href="/services" className="hover:text-emerald-600">
              Servicios
            </Link>
            <Link href="/contacto" className="hover:text-emerald-600">
              Contacto
            </Link>
            <Link href="/sobre-nosotros" className="hover:text-emerald-600">
              Sobre nosotros
            </Link>
          </nav>

          {/* Aquí tiene sentido que este botón te lleve a la landing o no haga nada,
              pero lo dejo igual que antes para no romper tu UX */}
          <button className="rounded-full border border-emerald-500 px-5 py-2 text-sm font-semibold text-emerald-600 hover:bg-emerald-50">
            Iniciar Sesión
          </button>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 py-12 lg:flex-row">
          {/* Columna izquierda */}
          <div className="flex-1 text-white">
            <div className="relative mb-8 h-80 w-full overflow-hidden rounded-xl">
              <Image
                src="/login-illustration.png"
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

          {/* FORMULARIO DE LOGIN */}
          <div className="flex-1">
            <div className="mx-auto w-full max-w-md rounded-3xl bg-[#f6f6f6] px-10 py-10 shadow-lg">
              <div className="mb-6 flex items-center justify-center gap-3">
                <Image
                  src="/logo-icon.png"
                  alt="Alquila360 logo"
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

                {/* ERROR */}
                {errorMsg && (
                  <p className="text-xs text-red-500 text-center">
                    {errorMsg}
                  </p>
                )}

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
        © 2025 Alquila 360 – Gestión integral de alquileres · Contáctanos +591
        76782341 · 4454323
      </footer>
    </div>
  );
}
