"use client";

export default function ClientePerfilPage() {
  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Mi perfil</h1>
        <p className="text-sm text-slate-600">
          Información de tu cuenta como cliente/interesado.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex flex-col items-center gap-3">
          <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center text-xl font-semibold text-slate-500">
            CL
          </div>
          <div className="text-center space-y-1">
            <p className="text-base font-semibold text-slate-900">
              Cliente de ejemplo
            </p>
            <p className="text-sm text-slate-600">Usuario cliente</p>
          </div>
        </div>

        <div className="pt-2 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Correo:</span>
            <span className="text-slate-800">cliente@example.com</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Teléfono:</span>
            <span className="text-slate-800">+591 70000000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Interés principal:</span>
            <span className="text-slate-800">
              Alquiler de departamento en Cochabamba
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
