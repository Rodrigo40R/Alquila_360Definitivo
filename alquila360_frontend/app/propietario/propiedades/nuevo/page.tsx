"use client";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useState } from "react";

export default function NuevaPropiedad() {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [tipo, setTipo] = useState("Departamento");
  const [precio, setPrecio] = useState("");

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-2xl font-bold text-slate-900">Nueva propiedad</h1>

      <Input label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <Input label="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} />

      <div className="space-y-1">
        <label className="text-sm text-slate-600">Tipo</label>
        <select
          className="border border-slate-300 rounded-md px-3 py-2 text-sm"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option>Departamento</option>
          <option>Casa</option>
          <option>Garzonier</option>
        </select>
      </div>

      <Input
        label="Precio mensual (Bs.)"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
      />

      <Button variant="primary" className="w-full">
        Guardar propiedad
      </Button>
    </div>
  );
}
