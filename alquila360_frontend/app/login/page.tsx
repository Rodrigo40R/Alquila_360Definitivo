"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type Rol = "" | "Administrador" | "Propietario" | "Inquilino" | "Técnico";

export default function LoginPage() {
  const router = useRouter();

  const [rol, setRol] = useState<Rol>("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!rol || !correo || !password) {
      setError("Completa todos los campos.");
      return;
    }

    // Aquí solo redirigimos según el rol (sin validación real de credenciales)
    switch (rol) {
      case "Administrador":
        router.push("/admin/dashboard");
        break;
      case "Propietario":
        router.push("/propietario/dashboard");
        break;
      case "Inquilino":
        router.push("/inquilino/dashboard");
        break;
      case "Técnico":
        router.push("/tecnico/dashboard");
        break;
      default:
        setError("Selecciona un rol válido.");
        break;
    }
  };

  const handleRegisterClick = () => {
    router.push("/register");
  };

  return (
    <div className="min-h-screen bg-[#2d3035] flex flex-col">
      {/* Barra superior */}
      <header className="w-full bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            {/* Logo izquierdo */}
            <Image
              src="/logo.svg" // usa aquí tu logo principal
              alt="Alquila360"
              width={44}
              height={44}
            />
            <span className="text-lg font-semibold tracking-wide text-[#111827]">
              ALQUILA360
            </span>
            <span className="ml-1 text-sm text-gray-400 align-middle">
              | Login ADMI
            </span>
          </div>

          <nav className="hidden gap-8 text-sm font-medium text-gray-600 md:flex">
            <button className="hover:text-[#00b894]">Inicio</button>
            <button className="hover:text-[#00b894]">Servicios</button>
            <button className="hover:text-[#00b894]">Contacto</button>
            <button className="hover:text-[#00b894]">Sobre nosotros</button>
          </nav>

          <button
            onClick={() => router.push("/login")}
            className="hidden rounded-full border border-[#00b894] px-5 py-1.5 text-sm font-semibold text-[#00b894] hover:bg-[#00b894] hover:text-white md:inline-block"
          >
            Iniciar Sesión
          </button>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex flex-1 items-center justify-center bg-[#3a3e44] px-4 py-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:flex-row">
          {/* Lado izquierdo con ilustración y texto */}
          <section className="flex flex-1 items-center justify-center">
            <div className="max-w-md text-white">
              <div className="relative mb-10 h-72 w-full">
                {/* Ilustración grande */}
                <Image
                  src="/hero-login.svg" // pon aquí tu ilustración de login
                  alt="Gestión de alquileres"
                  fill
                  className="object-contain"
                />
              </div>

              <h2 className="mb-3 text-3xl font-semibold">
                Tu gestión de alquileres
                <br />
                más simple y segura
              </h2>
              <p className="text-sm text-gray-200">
                Controla contratos, pagos, mantenimiento y reportes en un solo
                lugar. Diseñado para administradores, propietarios e inquilinos.
              </p>
            </div>
          </section>

          {/* Tarjeta de inicio de sesión */}
          <section className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-lg rounded-3xl bg-[#f5f5f5] px-10 py-10 shadow-lg">
              <div className="mb-8 text-center">
                <div className="mx-auto mb-4 h-12 w-12">
                  <Image
                    src="/logo-icon.jpg" // icono pequeño si lo tienes; si no, usa /logo.svg
                    alt="Icono Alquila360"
                    width={48}
                    height={48}
                    className="mx-auto"
                  />
                </div>
                <h1 className="text-3xl font-bold text-[#111827]">
                  Inicio de Sesión
                </h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Rol */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Selecciona un rol
                  </label>
                  <select
                    value={rol}
                    onChange={(e) => setRol(e.target.value as Rol)}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 shadow-sm outline-none transition focus:border-[#00b894] focus:ring-2 focus:ring-[#00b894]/40"
                  >
                    <option value="">Selecciona un rol</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Propietario">Propietario</option>
                    <option value="Inquilino">Inquilino</option>
                    <option value="Técnico">Técnico</option>
                  </select>
                </div>

                {/* Correo */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Correo
                  </label>
                  <input
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    placeholder="Ingresa tu correo"
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 shadow-sm outline-none transition focus:border-[#00b894] focus:ring-2 focus:ring-[#00b894]/40"
                  />
                </div>

                {/* Contraseña */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 shadow-sm outline-none transition focus:border-[#00b894] focus:ring-2 focus:ring-[#00b894]/40"
                  />
                </div>

                {/* Error */}
                {error && (
                  <p className="text-sm font-medium text-red-500">{error}</p>
                )}

                {/* Links inferiores */}
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <button
                    type="button"
                    className="hover:text-[#00b894]"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                  <div className="flex items-center gap-1">
                    <span>¿No tienes una cuenta?</span>
                    <button
                      type="button"
                      onClick={handleRegisterClick}
                      className="font-semibold text-[#00b894] hover:underline"
                    >
                      REGISTRARME
                    </button>
                  </div>
                </div>

                {/* Botón principal */}
                <button
                  type="submit"
                  className="mt-3 w-full rounded-full bg-[#00b894] py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#00a381] focus:outline-none focus:ring-2 focus:ring-[#00b894]/60"
                >
                  Iniciar Sesión
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>

      {/* Footer inferior fino opcional */}
      <footer className="w-full bg-[#e5e7eb] py-2 text-center text-xs text-gray-600">
        © 2025 Alquila360 – Gestión integral de alquileres
      </footer>
    </div>
  );
}
