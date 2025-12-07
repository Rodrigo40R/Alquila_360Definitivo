"use client";

import { useState } from "react";

type Vista = "resumen" | "factura";

export default function InquilinoPagosPage() {
  const [vista, setVista] = useState<Vista>("resumen");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // ───────────────────────────────────────────────
  // VISTA FACTURA
  // ───────────────────────────────────────────────
  if (vista === "factura") {
    return (
      <div className="h-full flex flex-col">
        <h1 className="text-2xl font-semibold text-slate-900 mb-6">Inquilino</h1>

        <div className="flex-1 bg-slate-100 rounded-xl p-4 overflow-auto">
          <div className="mx-auto max-w-4xl bg-white rounded-lg shadow border border-slate-200 p-8">
            <h2 className="text-xl font-bold mb-4">Factura</h2>

            <p className="text-sm text-slate-700">
              Aquí irá el PDF o la vista previa real cuando el backend lo genere, Hola adro.
            </p>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setVista("resumen")}
            className="px-6 py-2 rounded-full border border-slate-300 text-sm font-medium hover:bg-slate-100"
          >
            Volver a pagos
          </button>
        </div>
      </div>
    );
  }

  // ───────────────────────────────────────────────
  // VISTA RESUMEN
  // ───────────────────────────────────────────────
  return (
    <>
      <div className="h-full flex flex-col">
        <h1 className="text-2xl font-semibold text-slate-900 mb-8">Inquilino</h1>

        {/* CONTENEDOR CENTRADO */}
        <div className="flex flex-col items-center gap-12">

          {/* TARJETAS DE CUOTAS CENTRADAS */}
          <div className="flex flex-wrap justify-center gap-12 w-full">

            {/* TARJETA 1 (Próxima cuota) */}
            <div className="w-full max-w-sm bg-[#FFE1B8] rounded-xl shadow p-6">
              <p className="text-center font-bold text-lg text-white mb-3">
                ¡ATENCIÓN!
                <br />
                <span className="text-sm">Vence en 5 días</span>
              </p>

              <div className="bg-white rounded-lg px-6 py-5 text-sm text-slate-800">
                <p className="text-center text-3xl font-bold mb-2">$ 850</p>
                <p className="text-center text-xs text-slate-500 mb-4">
                  22 de Noviembre de 2025
                </p>

                <div className="flex justify-between border-b border-dashed pb-1 mb-1 text-xs">
                  <span>Alquiler de Propiedad:</span>
                  <span>$ 750</span>
                </div>

                <div className="flex justify-between border-b border-dashed pb-1 mb-1 text-xs">
                  <span>Gastos Comunes / Mantenimiento:</span>
                  <span>$ 100</span>
                </div>

                <div className="flex justify-between text-xs">
                  <span>Multas por Mora:</span>
                  <span>$ 0 (N/A)</span>
                </div>
              </div>
            </div>

            {/* TARJETA 2 (Cuota vencida) */}
            <div className="w-full max-w-sm bg-[#F76C5E] rounded-xl shadow p-6">
              <p className="text-center font-bold text-lg text-white mb-3">
                ¡CUOTA VENCIDA!
                <br />
                <span className="text-sm">31 días de Mora</span>
              </p>

              <div className="bg-white rounded-lg px-6 py-5 text-sm text-slate-800">
                <p className="text-center text-3xl font-bold mb-2">$ 935</p>
                <p className="text-center text-xs text-slate-500 mb-4">
                  15 de Octubre de 2025
                </p>

                <ul className="list-disc list-inside text-xs space-y-1">
                  <li>Alquiler de Propiedad: $750</li>
                  <li>Gastos Comunes / Mantenimiento: $100</li>
                  <li>Multa por Pago Tardío (10%): $85</li>
                </ul>
              </div>
            </div>

          </div>

          {/* BOTONES FACTURAS */}
          <div className="flex justify-center gap-10 mt-4">
            <button
              onClick={() => setVista("factura")}
              className="px-12 py-3 rounded-full bg-[#00A68B] hover:bg-[#009076] text-white text-sm font-semibold shadow"
            >
              Facturas
            </button>

            <button
              onClick={() => setShowSuccessModal(true)}
              className="px-12 py-3 rounded-full bg-[#E34848] hover:bg-[#d13a3a] text-white text-sm font-semibold shadow"
            >
              Generar Facturas
            </button>
          </div>

        </div>
      </div>

      {/* MODAL DE ÉXITO */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
              <span className="text-3xl">✅</span>
            </div>

            <p className="text-center text-sm text-slate-700">
              Se generó con éxito las facturas y el PDF.  
              <br />
              Puedes verlo en tus descargas.
            </p>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="px-10 py-2 rounded-full bg-[#00A68B] hover:bg-[#009076] text-white text-sm font-semibold"
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </>
  );
}
