"use client";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function EditarContratoPropietario() {
  const contrato = {
    propiedad: "Depto - América",
    inquilino: "Carlos López",
    monto: "2500",
    inicio: "2025-01-01",
    fin: "2026-01-01",
  };

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-2xl font-bold text-slate-900">Editar contrato</h1>

      <Input label="Propiedad" defaultValue={contrato.propiedad} />
      <Input label="Inquilino" defaultValue={contrato.inquilino} />
      <Input label="Monto" defaultValue={contrato.monto} />
      <Input label="Fecha inicio" type="date" defaultValue={contrato.inicio} />
      <Input label="Fecha fin" type="date" defaultValue={contrato.fin} />

      <Button variant="primary" className="w-full">
        Actualizar contrato
      </Button>
    </div>
  );
}
