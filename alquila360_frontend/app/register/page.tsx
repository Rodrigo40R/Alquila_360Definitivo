"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { registerUser, type TipoUsuarioBack } from "../services/auth.services";

export default function RegisterPage() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [acepto, setAcepto] = useState(false);

  // 👇 usamos el tipo que entiende el backend
  const [rol, setRol] = useState<TipoUsuarioBack>("PROPIETARIO");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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

    try {
      setLoading(true);

      // 👇 AQUÍ se conecta al backend
      await registerUser({
        nombre,
        correo,
        password,
        tipo_usuario: rol, // PROPIETARIO | INQUILINO | TECNICO | ADMINISTRADOR
      });

      setSuccess("Cuenta creada con éxito");

      setTimeout(() => {
        router.push("/login");
      }, 800);
    } catch (err: any) {
      setError(err.message || "Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  }

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

        {/* MENSAJES DE ERROR / ÉXITO */}
        {error && (
          <div className="mt-4 mb-2 rounded-lg bg-red-100 text-red-700 px-4 py-2 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mt-4 mb-2 rounded-lg bg-emerald-100 text-emerald-700 px-4 py-2 text-sm">
            {success}
          </div>
        )}

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

          {/* SELECT ROL -> valores que tu backend entiende */}
          <select
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={rol}
            onChange={(e) => setRol(e.target.value as TipoUsuarioBack)}
          >
            <option value="PROPIETARIO">Propietario</option>
            <option value="INQUILINO">Inquilino</option>
            <option value="TECNICO">Técnico</option>
            {/* Si quieres permitir admins desde aquí: */}
            {/* <option value="ADMINISTRADOR">Administrador</option> */}
          </select>

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
