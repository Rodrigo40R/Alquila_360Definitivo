"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RegisterPage() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [acepto, setAcepto] = useState(false);
  const [rol, setRol] = useState<Rol>("propietario");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null); // 👈 mensaje bonito

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!nombre || !correo || !password || !confirmar) {
      setError("Completa todos los campos.");
      return;
    }

    if (password !== confirmar) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (!acepto) {
      setError("Debes aceptar términos y condiciones.");
      return;
    }

    alert("Cuenta creada con éxito");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#0E1E25] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl px-10 py-12">
        
        {/* LOGO + TEXTO CENTRADOS */}
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/logo-icon.png"
            alt="Logo Alquila360"
            width={48}
            height={48}
          />
          <Image
            src="/logo-text.png"
            alt="Texto Alquila360"
            width={170}
            height={40}
            className="mt-2"
          />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
          Crea tu cuenta ALQUILA360
        </h2>
        <p className="text-center text-gray-500 mt-2">
          Únete a la plataforma y simplifica tu gestión de alquileres.
        </p>

        <form onSubmit={handleRegister} className="space-y-4 mt-6">
          <input
            type="text"
            placeholder="Nombre Completo"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <input
            type="email"
            placeholder="Correo Electrónico"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirmar Contraseña"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
          />

          <label className="flex items-start gap-2 text-sm text-gray-600 mt-2">
            <input
              type="checkbox"
              className="mt-1"
              checked={acepto}
              onChange={(e) => setAcepto(e.target.checked)}
            />
            <span>
              He leído y acepto los{" "}
              <span className="text-emerald-600 font-semibold">
                Términos y Condiciones
              </span>{" "}
              y la{" "}
              <span className="text-emerald-600 font-semibold">
                Política de Privacidad
              </span>
              .
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg text-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? "Creando cuenta..." : "Registrarse"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6 text-sm">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="text-emerald-600 font-semibold">
            INICIAR SESIÓN
          </a>
        </p>
      </div>
    </div>
  );
}

