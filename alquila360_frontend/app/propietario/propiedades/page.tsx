"use client";

import { useParams } from "next/navigation";

export default function DetallePropiedad() {
  const { id } = useParams();

  // Datos simulados (después puedes reemplazar con API)
  const propiedad = {
    nombre: "Departamento - Av. América",
    direccion: "Cochabamba, Bolivia",
    precio: "Bs. 2,500 / mes",
    descripcion:
      "Hermoso departamento ubicado en zona estratégica, cerca de supermercados, farmacias y transporte público.",
    imagen:
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
    habitaciones: 2,
    banos: 1,
    superficie: "85 m²",
    estado: "Alquilado",
  };

  return (
    <div className="space-y-6">
      {/* FOTO PRINCIPAL */}
      <div className="h-64 w-full rounded-xl overflow-hidden border border-slate-800">
        <img
          src={propiedad.imagen}
          alt={propiedad.nombre}
          className="w-full h-full object-cover"
        />
      </div>

      {/* INFO */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-100">
          {propiedad.nombre}
        </h1>
        <p className="text-slate-400">{propiedad.direccion}</p>
      </div>

      <span
        className={`px-4 py-1 text-xs font-semibold rounded-full ${
          propiedad.estado === "Alquilado"
            ? "bg-red-500/20 text-red-400"
            : "bg-emerald-500/20 text-emerald-400"
        }`}
      >
        {propiedad.estado}
      </span>

      {/* DETALLES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
          <p className="text-sm text-slate-400">Precio</p>
          <h2 className="text-xl font-bold text-emerald-400">
            {propiedad.precio}
          </h2>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
          <p className="text-sm text-slate-400">Habitaciones</p>
          <h2 className="text-xl font-bold text-slate-200">
            {propiedad.habitaciones}
          </h2>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
          <p className="text-sm text-slate-400">Superficie</p>
          <h2 className="text-xl font-bold text-slate-200">
            {propiedad.superficie}
          </h2>
        </div>
      </div>

      <p className="text-slate-300 leading-relaxed">{propiedad.descripcion}</p>
    </div>
  );
}
