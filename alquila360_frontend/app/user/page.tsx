<<<<<<< HEAD
// app/user/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Rol = "administrador" | "propietario" | "inquilino" | "tecnico";

const roles: { id: Rol; label: string; image: string }[] = [
  { id: "administrador", label: "Administrador", image: "/rol-admin.png" },
  { id: "propietario", label: "Propietario", image: "/rol-propietario.png" },
  { id: "inquilino", label: "Inquilino", image: "/rol-inquilino.png" },
  { id: "tecnico", label: "Técnico", image: "/rol-tecnico.png" },
];

export default function LoginPage() {
  const [rolSeleccionado, setRolSeleccionado] = useState<Rol>("propietario");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Navegación por rol (ajusta rutas si quieres otras)
    if (rolSeleccionado === "propietario") {
      router.push("/principal");
    } else if (rolSeleccionado === "administrador") {
      router.push("/admin/dashboard"); // puedes crear estos después
    } else if (rolSeleccionado === "inquilino") {
      router.push("/inquilino/dashboard");
    } else {
      router.push("/tecnico/dashboard");
=======
"use client";

<<<<<<< HEAD
export default function UserPage() {
  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Perfil de usuario
        </h1>
        <p className="text-sm text-slate-600">
          Información general del usuario en la plataforma.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex flex-col items-center gap-3">
          <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center text-xl font-semibold text-slate-500">
            U
          </div>
          <div className="text-center space-y-1">
            <p className="text-base font-semibold text-slate-900">
              Usuario de ejemplo
            </p>
            <p className="text-sm text-slate-600">Rol: Administrador</p>
=======
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { loginUser } from "@/lib/auth"; // lo seguimos usando para guardar sesión simulada
import { login, RolFront, TipoUsuarioBack } from "../services/auth.services";

// Definimos los roles con el tipo correcto
const ROLES: { id: RolFront; label: string }[] = [
  { id: "propietario", label: "Propietario" },
  { id: "inquilino", label: "Inquilino" },
  { id: "tecnico", label: "Técnico" },
];

// Mapeo rol del front -> tipo_usuario que espera el backend
function mapRolToTipoUsuario(rol: RolFront): TipoUsuarioBack {
  switch (rol) {
    case "administrador":
      return "ADMINISTRADOR";
    case "propietario":
      return "PROPIETARIO";
    case "inquilino":
      return "INQUILINO";
    case "tecnico":
      return "TECNICO";
  }
}

export default function LoginPage() {
  const [rol, setRol] = useState<RolFront>("propietario");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const tipo_usuario = mapRolToTipoUsuario(rol);

      console.log("➡️ Enviando login al backend", {
        correo,
        password,
        tipo_usuario,
      });

      const { access_token, user } = await login({
        correo,
        password,
        tipo_usuario,
      });

      console.log("⬅️ Backend respondió:", { access_token, user });

      // (Opcional) guarda el token
      // localStorage.setItem("token", access_token);

      // Mantienes tu sesión simulada por ahora
      loginUser(rol, correo);

      // Redirecciona según rol
      const destino =
        rol === "propietario"
          ? "/propietario/dashboard"
          : rol === "inquilino"
          ? "/inquilino/dashboard"
          : "/tecnico/dashboard";

      router.push(destino);
    } catch (err: any) {
      console.error("❌ Error en login", err);
      setError("Credenciales inválidas o usuario no encontrado");
    } finally {
      setLoading(false);
>>>>>>> origin/alquila_360_frontend-sebastian
    }
  }

  return (
<<<<<<< HEAD
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-16 pt-16 lg:flex-row lg:items-center">
        {/* Lado izquierdo: texto + imagen grande */}
        <div className="flex-1">
          <p className="text-xs font-semibold tracking-[0.25em] text-teal-500">
            INICIO DE SESIÓN
          </p>
          <h1 className="mt-3 text-3xl font-semibold">Ingresa a ALQUILA360</h1>
          <p className="mt-3 text-sm text-slate-600">
            Selecciona tu rol para acceder al panel correspondiente: administrador,
            propietario, inquilino o técnico.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            {roles.map((rol) => (
              <button
                key={rol.id}
                type="button"
                onClick={() => setRolSeleccionado(rol.id)}
                className={`flex w-40 flex-col items-center rounded-2xl border px-3 py-3 text-xs ${
                  rolSeleccionado === rol.id
                    ? "border-teal-500 bg-teal-50"
                    : "border-slate-200 bg-white hover:border-teal-400"
                }`}
              >
                <div className="mb-2 h-14 w-14 rounded-full bg-slate-200" />
                {/* Aquí podrías usar <Image src={rol.image} ... /> */}
                <span className="font-semibold text-slate-700">{rol.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Lado derecho: formulario */}
        <div className="flex-1">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-2xl bg-white p-8 shadow-sm"
          >
            <div className="space-y-1 text-sm">
              <label className="block text-slate-700">Correo electrónico</label>
              <input
                type="email"
                required
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1 text-sm">
              <label className="block text-slate-700">Contraseña</label>
              <input
                type="password"
                required
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full rounded-full bg-teal-500 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600"
            >
              Iniciar sesión como{" "}
              {roles.find((r) => r.id === rolSeleccionado)?.label ?? "Propietario"}
            </button>

            <p className="mt-2 text-center text-xs text-slate-500">
              ¿No tienes una cuenta?{" "}
              <a href="/registro" className="font-semibold text-teal-600">
                Registrarme
              </a>
            </p>
          </form>
        </div>
      </section>
    </main>
=======
    <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
        {/* HEADER */}
        <div className="mb-6 text-center space-y-1">
          <p className="text-xs font-semibold tracking-[0.25em] text-emerald-400 uppercase">
            ALQUILA360
          </p>
          <h1 className="text-2xl font-bold">Iniciar sesión</h1>
          <p className="text-xs text-slate-300">
            Accede a tu cuenta según tu rol en la plataforma.
          </p>
        </div>

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* EMAIL */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-200">
              Correo electrónico
            </label>
            <input
              type="email"
              required
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
              placeholder="tucorreo@ejemplo.com"
            />
>>>>>>> master
          </div>

<<<<<<< HEAD
        <div className="pt-2 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Correo:</span>
            <span className="text-slate-800">usuario@example.com</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Estado:</span>
            <span className="text-emerald-700 font-semibold">Activo</span>
          </div>
        </div>
      </div>
    </div>
=======
          {/* PASSWORD */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-200">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
              placeholder="••••••••"
            />
          </div>

          {/* ROLES */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-slate-200">
              ¿Cómo quieres entrar?
            </p>

            <div className="grid grid-cols-3 gap-2 text-xs">
              {ROLES.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRol(r.id)}
                  className={`rounded-xl border px-2 py-2 ${
                    rol === r.id
                      ? "border-emerald-400 bg-emerald-500/10 text-emerald-200"
                      : "border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-400">{error}</p>
          )}

          {/* BOTÓN SUBMIT */}
          <Button type="submit" size="md" className="w-full mt-2" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        {/* FOOTER */}
        <p className="mt-4 text-center text-xs text-slate-300">
          ¿Aún no tienes cuenta?{" "}
          <Link
            href="/registro"
            className="font-medium text-emerald-400 hover:text-emerald-300"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </main>
>>>>>>> master
>>>>>>> origin/alquila_360_frontend-sebastian
  );
}
