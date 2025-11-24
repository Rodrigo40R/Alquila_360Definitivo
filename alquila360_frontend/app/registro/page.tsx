"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { registerUser, Rol } from "@/lib/auth";

const ROLES: { id: Rol; label: string }[] = [
  { id: "propietario", label: "Propietario" },
  { id: "inquilino", label: "Inquilino" },
  { id: "tecnico", label: "Técnico" },
];

export default function RegistroPage() {
  const router = useRouter();

  // 🔹 Estados para los campos del formulario
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [confirmarContrasenia, setConfirmarContrasenia] = useState("");
  const [rol, setRol] = useState<Rol>("propietario");

  // 🔹 Estados para control de UI
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
  e.preventDefault();
  setError(null);

  if (contrasenia !== confirmarContrasenia) {
    setError("Las contraseñas no coinciden");
    return;
  }

  setLoading(true);

  try {
    await registerUser({
      nombre: nombreCompleto,          // 👈 ahora sí mandamos "nombre"
      correo,
      password: contrasenia,           // 👈 mapeamos "contrasenia" → "password"
      tipo_usuario: rol.toUpperCase(), // 👈 "propietario" → "PROPIETARIO"
    });

    router.push("/login");
  } catch (err: any) {
    setError(err.message ?? "Error al crear la cuenta");
  } finally {
    setLoading(false);
  }
}

  return (
    <main className="min-h-screen bg-white text-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-xl">
        <div className="mb-6 text-center space-y-1">
          <p className="text-xs font-semibold tracking-[0.25em] text-emerald-400 uppercase">
            ALQUILA360
          </p>
          <h1 className="text-2xl font-bold">Crear cuenta</h1>
          <p className="text-xs text-slate-300">
            Regístrate para gestionar contratos, pagos y reportes desde un solo
            lugar.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-800">
              Nombre completo
            </label>
            <input
              type="text"
              required
<<<<<<< HEAD
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
=======
              value={nombreCompleto}
              onChange={(e) => setNombreCompleto(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
>>>>>>> master
              placeholder="Tu nombre"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-800">
              Correo electrónico
            </label>
            <input
              type="email"
              required
<<<<<<< HEAD
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
=======
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
>>>>>>> master
              placeholder="tucorreo@ejemplo.com"
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1 space-y-1">
              <label className="text-xs font-medium text-slate-800">
                Contraseña
              </label>
              <input
                type="password"
                required
<<<<<<< HEAD
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
=======
                value={contrasenia}
                onChange={(e) => setContrasenia(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
>>>>>>> master
                placeholder="••••••••"
              />
            </div>
            <div className="flex-1 space-y-1">
              <label className="text-xs font-medium text-slate-800">
                Confirmar
              </label>
              <input
                type="password"
                required
<<<<<<< HEAD
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
=======
                value={confirmarContrasenia}
                onChange={(e) => setConfirmarContrasenia(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
>>>>>>> master
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-slate-800">
              ¿Qué rol tendrás en la plataforma?
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
                      : "border-slate-200 bg-white text-slate-300 hover:border-slate-500"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-400 bg-red-950/40 border border-red-800 rounded-xl px-3 py-2">
              {error}
            </p>
          )}

          <Button
            type="submit"
            size="md"
            className="w-full mt-2"
            disabled={loading}
          >
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </Button>
        </form>

        <p className="mt-4 text-center text-xs text-slate-300">
          ¿Ya tienes cuenta?{" "}
          <Link
            href="/login"
            className="font-medium text-emerald-400 hover:text-emerald-300"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  );
}
