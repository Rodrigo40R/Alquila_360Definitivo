"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";

const ROLES = [
  { id: "propietario", label: "Propietario" },
  { id: "inquilino", label: "Inquilino" },
  { id: "tecnico", label: "Técnico" },
];

export default function RegistroPage() {
  const [rol, setRol] = useState<string>("propietario");
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // Registro simulado → te mando al login
    router.push("/login");
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
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
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
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
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
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
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
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
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

          <Button type="submit" size="md" className="w-full mt-2">
            Crear cuenta
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
