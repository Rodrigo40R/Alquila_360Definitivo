"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CrearUsuarioAdmin() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [lugarReferencia, setLugarReferencia] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [celular, setCelular] = useState("");
  const [numeroReferencia, setNumeroReferencia] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log({
      nombre,
      apellido,
      lugarReferencia,
      fechaNacimiento,
      celular,
      numeroReferencia,
    });

    alert("Formulario demo enviado");
  }

  return (
    <div className="w-full flex justify-center">
      {/* CARD */}
      <div className="mt-8 w-full max-w-3xl rounded-2xl bg-slate-50 px-10 py-10 shadow-sm border border-slate-200">
        <h2 className="mb-8 text-2xl font-bold text-slate-900">
          Nuevo Usuario
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* NOMBRE / APELLIDO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm text-slate-700">Nombre</label>
              <input
                type="text"
                placeholder="Ingrese el nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-slate-700">Apellido</label>
              <input
                type="text"
                placeholder="Ingrese su apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* LUGAR DE REFERENCIA */}
          <div className="space-y-1">
            <label className="text-sm text-slate-700">Lugar de referencia</label>
            <input
              type="text"
              placeholder="Ingrese el lugar de referencia"
              value={lugarReferencia}
              onChange={(e) => setLugarReferencia(e.target.value)}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* FECHA NACIMIENTO / CELULAR */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm text-slate-700">
                Fecha de nacimiento
              </label>
              <input
                type="date"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-slate-700">Celular</label>
              <input
                type="tel"
                placeholder="Ingrese el celular"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* NÚMERO DE REFERENCIA */}
          <div className="space-y-1">
            <label className="text-sm text-slate-700">Número de referencia</label>
            <input
              type="text"
              placeholder="Ingrese el número"
              value={numeroReferencia}
              onChange={(e) => setNumeroReferencia(e.target.value)}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* BOTONES */}
          <div className="mt-4 flex items-center justify-end gap-6">
            <button
              type="button"
              onClick={() => router.push("/admin/usuarios")}
              className="text-sm text-slate-600 hover:text-slate-800 transition"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="rounded-md bg-emerald-500 px-6 py-2 text-sm font-semibold text-white shadow-md hover:bg-emerald-600 hover:shadow-lg transition"
            >
              Guardar y Generar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
