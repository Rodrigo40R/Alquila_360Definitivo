"use client";

import React from "react";

type SuccessPdfModalProps = {
  open: boolean;
  onClose: () => void;
};

export function SuccessPdfModal({ open, onClose }: SuccessPdfModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      {/* tarjeta central */}
      <div className="w-full max-w-xl rounded-2xl bg-white px-10 py-10 shadow-2xl">
        {/* icono */}
        <div className="mb-6 flex items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
            <svg
              className="h-12 w-12 text-emerald-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 12.75 11.25 15 15 9.75" />
              <circle cx="12" cy="12" r="9" />
            </svg>
          </div>
        </div>

        {/* texto */}
        <p className="mb-2 text-center text-base font-medium text-slate-900">
          Se guardó con éxito y se generó el PDF.
        </p>
        <p className="mb-8 text-center text-sm text-slate-500">
          Puedes verlo en la carpeta de descargas de tu navegador.
        </p>

        {/* botón OK */}
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="inline-flex min-w-[140px] items-center justify-center rounded-full bg-emerald-500 px-10 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}
