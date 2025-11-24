"use client";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useState } from "react";

export default function NuevoContratoPropietario() {
  const [propiedad, setPropiedad] = useState("");
  const [inquilino, setInquilino] = useState("");
  const [monto, setMonto] = useState("");
  const [inicio, setInicio] = useState("");
  const [fin, setFin] = useState("");

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-2xl font-bold text-slate-900">Nuevo contrato</h1>

      <Input label="Propiedad" value={propiedad} onChange={(e) => setPropiedad(e.target.value)} />
      <Input label="Inquilino" value={inquilino} onChange={(e) => setInquilino(e.target.value)} />
      <Input label="Monto mensual (Bs.)" value={monto} onChange={(e) => setMonto(e.target.value)} />
      <Input label="Fecha inicio" type="date" value={inicio} onChange={(e) => setInicio(e.target.value)} />
      <Input label="Fecha fin" type="date" value={fin} onChange={(e) => setFin(e.target.value)} />

      <Button variant="primary" className="w-full">
        Guardar contrato
      </Button>
    </div>
  );
}
