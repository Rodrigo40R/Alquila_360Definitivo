"use client";

import { useEffect } from "react";

type Props = {
  mensaje: string;
  tipo?: "success" | "error" | "info";
  onClose: () => void;
};

export default function Toast({ mensaje, tipo = "info", onClose }: Props) {
  const estilos = {
    success: "bg-emerald-500",
    error: "bg-red-500",
    info: "bg-slate-600",
  };

  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`px-5 py-3 text-white rounded-md shadow-xl ${estilos[tipo]}`}>
        {mensaje}
      </div>
    </div>
  );
}
