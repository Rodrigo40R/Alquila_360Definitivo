"use client";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useState } from "react";

export default function ReservarPropiedadPage() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fecha, setFecha] = useState("");

  const enviar = () => {
    if (!nombre || !telefono || !fecha) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    window.location.href = "/cliente/propiedad/1/confirmacion";
  };

  return (
    <div className="space-y-8 max-w-xl">
      <h1 className="text-2xl font-bold text-slate-900">Solicitud de reserva</h1>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <Input label="Nombre completo" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <Input label="Número de teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        <Input type="date" label="Fecha deseada" value={fecha} onChange={(e) => setFecha(e.target.value)} />

        {/* <Button onClick={enviar} variant="primary" className="w-full">
          Enviar solicitud
        </Button> */}
      </div>
    </div>
  );
}
