"use client";

import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function DetallePropiedadCliente() {
  const propiedad = {
    nombre: "Departamento moderno",
    precio: 2500,
    zona: "Av. América",
    descripcion:
      "Departamento moderno totalmente amoblado, ubicado en zona estratégica de Cochabamba.",
    habitaciones: 2,
    banos: 1,
    estado: "Disponible",
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="h-64 bg-slate-200 rounded-xl"></div>

      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-slate-900">{propiedad.nombre}</h1>

        <Badge color="emerald">{propiedad.estado}</Badge>

        <p className="text-slate-700">{propiedad.zona}</p>

        <p className="text-brand-primary text-2xl font-bold">
          Bs. {propiedad.precio} <span className="text-sm text-slate-600">/mes</span>
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
        <p className="text-lg font-semibold text-slate-900">Descripción</p>
        <p className="text-slate-700">{propiedad.descripcion}</p>

        <p className="text-sm text-slate-500">Habitaciones: {propiedad.habitaciones}</p>
        <p className="text-sm text-slate-500">Baños: {propiedad.banos}</p>
      </div>

      <a href="/cliente/propiedad/1/reservar">
        <Button variant="primary" className="w-full text-lg">
          Reservar esta propiedad
        </Button>
      </a>
    </div>
  );
}
