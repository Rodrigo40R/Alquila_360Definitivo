"use client";

export default function UserPage() {
  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Perfil de usuario
        </h1>
        <p className="text-sm text-slate-600">
          Información general del usuario en la plataforma.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex flex-col items-center gap-3">
          <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center text-xl font-semibold text-slate-500">
            U
          </div>
          <div className="text-center space-y-1">
            <p className="text-base font-semibold text-slate-900">
              Usuario de ejemplo
            </p>
            <p className="text-sm text-slate-600">Rol: Administrador</p>
          </div>
        </div>

        <div className="pt-2 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Correo:</span>
            <span className="text-slate-800">usuario@example.com</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Estado:</span>
            <span className="text-emerald-700 font-semibold">Activo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
