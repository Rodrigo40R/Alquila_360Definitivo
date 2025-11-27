"use client";

import { useState } from "react";

export default function SubirImagenPage() {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-2xl font-bold text-slate-900">Subir Imagen</h1>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="border border-slate-300 rounded-md px-3 py-2 w-full text-sm"
        />

        {preview && (
          <div className="mt-4">
            <p className="text-sm text-slate-600 mb-2">Vista previa:</p>
            <img
              src={preview}
              className="rounded-xl border border-slate-200"
            />
          </div>
        )}
      </div>
    </div>
  );
}
