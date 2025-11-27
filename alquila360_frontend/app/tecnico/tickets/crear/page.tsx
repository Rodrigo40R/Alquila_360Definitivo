"use client";

export default function CrearTicketPage() {
  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Crear Ticket</h1>
        <p className="text-sm text-slate-600">
          Registra un nuevo ticket de mantenimiento.
        </p>
      </div>

      <form className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div>
          <label className="text-sm text-slate-700 font-medium">
            Propiedad
          </label>
          <select className="w-full mt-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500">
            <option>Selecciona una propiedad</option>
            <option>Santa Fe 203</option>
            <option>Casa Brasil</option>
            <option>Cala Cala</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-slate-700 font-medium">
            Descripción del problema
          </label>
          <textarea
            rows={4}
            className="w-full mt-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500"
          ></textarea>
        </div>

        <div>
          <label className="text-sm text-slate-700 font-medium">
            Prioridad
          </label>
          <select className="w-full mt-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500">
            <option>Media</option>
            <option>Baja</option>
            <option>Alta</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full mt-4 px-4 py-2 rounded-md bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600"
        >
          Crear ticket
        </button>
      </form>
    </div>
  );
}
