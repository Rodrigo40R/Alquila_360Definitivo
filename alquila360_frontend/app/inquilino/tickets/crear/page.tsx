"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function CrearTicketInquilino() {
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState<string | null>(null);

  const handleFile = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImagen(URL.createObjectURL(file));
  };

  const enviar = () => {
    if (!descripcion) {
      alert("La descripción es obligatoria.");
      return;
    }
    alert("Ticket enviado correctamente.");
  };

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-2xl font-bold text-slate-900">Nuevo Ticket</h1>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <Input
          label="Descripción del problema"
          placeholder="Ej: fuga de agua en el baño…"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        <div>
          <label className="block text-sm text-slate-700 font-medium mb-1">
            Imagen opcional
          </label>
          <input type="file" onChange={handleFile} />

          {imagen && (
            <img src={imagen} className="mt-4 h-40 rounded-lg border" />
          )}
        </div>

        <Button onClick={enviar}>Crear ticket</Button>
      </div>
    </div>
  );
}
