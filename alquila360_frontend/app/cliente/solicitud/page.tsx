"use client";

export default function ClienteSolicitudPage() {
  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Solicitar información
        </h1>
        <p className="text-sm text-slate-600">
          Completa tus datos y te contactaremos pronto.
        </p>
      </div>

      <form className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Nombre completo
          </label>
          <input
            type="text"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Correo electrónico
          </label>
          <input
            type="email"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Mensaje
          </label>
          <textarea
            rows={4}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 rounded-md bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600"
        >
          Enviar solicitud
        </button>
      </form>
    </div>
  );
}
