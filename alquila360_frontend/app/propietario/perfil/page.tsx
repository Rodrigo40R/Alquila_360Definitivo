"use client";

export default function PerfilPropietario() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Mi perfil</h1>
        <p className="text-sm text-slate-600">
          Información básica del propietario.
        </p>
      </div>

      <div className="max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center text-2xl font-semibold text-slate-500">
            JP
          </div>
          <div className="space-y-1 text-center">
            <p className="text-base font-semibold text-slate-900">
              Juanito Pérez
            </p>
            <p className="text-sm text-slate-600">Propietario</p>
          </div>

          <div className="w-full mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Correo:</span>
              <span className="text-slate-800">juanito@example.com</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Teléfono:</span>
              <span className="text-slate-800">+591 65789012</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Documento:</span>
              <span className="text-slate-800">CI 12345678</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
