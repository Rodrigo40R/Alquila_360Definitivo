"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [acepto, setAcepto] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones mínimas
    if (!nombre || !correo || !password || !confirmar) {
      alert("Completa todos los campos.");
      return;
    }

    if (password !== confirmar) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    if (!acepto) {
      alert("Debes aceptar términos y condiciones.");
      return;
    }

    // Simulación de registro exitoso
    alert("Cuenta creada con éxito");

    // 🔥 REDIRECCIÓN INMEDIATA AL LOGIN
    router.push("/login");
  };

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

        <h2 className="text-center text-3xl font-bold text-gray-800">
          Crea tu cuenta ALQUILA360
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Únete a la plataforma y simplifica tu gestión de alquileres.
        </p>

        {/* FORMULARIO */}
        <form onSubmit={handleRegister} className="space-y-4">

          <input
            type="text"
            placeholder="Nombre Completo"
            className="w-full p-3 rounded-lg border"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <input
            type="email"
            placeholder="Correo Electrónico"
            className="w-full p-3 rounded-lg border"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-3 rounded-lg border"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirmar Contraseña"
            className="w-full p-3 rounded-lg border"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
          />

          {/* TÉRMINOS */}
          <label className="flex items-center text-sm text-gray-600 mt-2">
            <input
              type="checkbox"
              className="mr-2"
              checked={acepto}
              onChange={(e) => setAcepto(e.target.checked)}
            />
            He leído y acepto los <b className="text-emerald-600 ml-1">Términos y Condiciones</b> y la <b className="text-emerald-600 ml-1">Política de Privacidad</b>.
          </label>

          {/* BOTÓN */}
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg text-lg font-semibold transition"
          >
            Registrarse
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="text-emerald-600 font-semibold">
            INICIAR SESIÓN
          </a>
        </p>
      </div>
    </div>
  );
}
