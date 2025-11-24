"use client";

export default function ClienteConfiguracionPage() {
  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Configuración de cuenta
        </h1>
        <p className="text-sm text-slate-600">
          Actualiza tus datos y credenciales.
        </p>
      </div>

      <form className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Nombre completo
          </label>
          <input
            type="text"
            defaultValue="Cliente de ejemplo"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Correo electrónico
          </label>
          <input
            type="email"
            defaultValue="cliente@example.com"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Teléfono
          </label>
          <input
            type="tel"
            defaultValue="+591 70000000"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500"
          />
        </div>

        <hr className="my-3" />

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Contraseña actual
          </label>
          <input
            type="password"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
              Nueva contraseña
            </label>
            <input
              type="password"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
              Confirmar contraseña
            </label>
            <input
              type="password"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="pt-3 flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 rounded-md border border-slate-300 text-sm hover:bg-slate-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600"
          >
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
}
