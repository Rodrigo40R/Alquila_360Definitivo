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
    }
  }

  return (
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
  );
}
