"use client";

export default function DetalleUsuarioAdmin() {
  const usuario = {
    id: 1,
    nombre: "Mateo Vargas",
    correo: "mateo@gmail.com",
    rol: "Propietario",
    telefono: "+591 70000000",
  };

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-2xl font-bold text-slate-900">
        Usuario: {usuario.nombre}
      </h1>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
        <p className="flex justify-between">
          <span className="text-slate-500">Correo:</span>
          <span className="font-medium">{usuario.correo}</span>
        </p>

        <p className="flex justify-between">
          <span className="text-slate-500">Rol:</span>
          <span className="font-medium">{usuario.rol}</span>
        </p>

        <p className="flex justify-between">
          <span className="text-slate-500">Teléfono:</span>
          <span className="font-medium">{usuario.telefono}</span>
        </p>
      </div>
    </div>
  );
}
