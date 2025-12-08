"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { registerUser, Rol, TipoUsuarioBack } from "@/lib/auth";

const ROLES: { id: Rol; label: string }[] = [
  { id: "propietario", label: "Propietario" },
  { id: "inquilino", label: "Inquilino" },
  { id: "tecnico", label: "Técnico" },
];

function mapRolToTipoUsuario(rol: Rol): TipoUsuarioBack {
  switch (rol) {
    case "propietario":
      return "PROPIETARIO";
    case "inquilino":
      return "INQUILINO";
    case "tecnico":
      return "TECNICO";
    case "administrador":
      return "ADMINISTRADOR";
    default:
      return "PROPIETARIO";
  }
}

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

    setLoading(true);

    try {
      await registerUser({
        nombre,
        correo,
        password,
        tipo_usuario: mapRolToTipoUsuario(rol),
      });

      // 👇 Mensaje bonito en vez de alert
      setSuccess("Cuenta creada con éxito. Redirigiendo al inicio de sesión...");

      // 👇 Redirección automática en 2 segundos
      setTimeout(() => {
        router.push("/login");
      }, 2000);

      // Limpia errores
      setError(null);

    } catch (err: any) {
      setSuccess(null);
      setError(err?.message || "Error al crear la cuenta");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center bg-[#0E1E25] min-h-screen p-6">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl px-10 py-12">

        {/* LOGO */}
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
            A
          </div>
          <span className="ml-3 text-2xl font-bold text-gray-800">ALQUILA360</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
          Crea tu cuenta ALQUILA360
        </h2>
        <p className="text-center text-gray-500 mt-2">
          Únete a la plataforma y simplifica tu gestión de alquileres.
        </p>

        {/* MENSAJE DE ÉXITO */}
        {success && (
          <p className="text-center text-green-600 bg-green-100 border border-green-300 rounded-lg p-2 mb-4">
            {success}
          </p>
        )}

        {/* MENSAJE DE ERROR */}
        {error && (
          <p className="text-center text-red-600 bg-red-100 border border-red-300 rounded-lg p-2 mb-4">
            {error}
          </p>
        )}

        {/* FORMULARIO */}
        <form onSubmit={handleRegister} className="space-y-4">

          {/* ROL */}
          <select
            className="w-full p-3 rounded-lg border"
            value={rol}
            onChange={(e) => setRol(e.target.value as Rol)}
          >
            {ROLES.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </select>

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

