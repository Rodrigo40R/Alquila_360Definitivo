"use client";

export default function InquilinoPerfilPage() {
  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Mi perfil</h1>
        <p className="text-sm text-slate-600">
          Información básica del inquilino.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center text-xl font-semibold text-slate-500">
            CL
          </div>
          <div className="space-y-1 text-center">
            <p className="text-base font-semibold text-slate-900">
              Carlos López
            </p>
            <p className="text-sm text-slate-600">Inquilino</p>
          </div>

          <div className="w-full mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Correo:</span>
              <span className="text-slate-800">carlos@example.com</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Teléfono:</span>
              <span className="text-slate-800">+591 70000000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Propiedad:</span>
              <span className="text-slate-800">Casa Brasil</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
