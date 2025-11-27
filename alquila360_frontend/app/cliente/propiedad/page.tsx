"use client";

export default function ClienteDetallePropiedadPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      {/* TÍTULO */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Departamento moderno en Cochabamba
        </h1>
        <p className="text-sm text-slate-600">
          Av. América · Cochabamba, Bolivia
        </p>
      </div>

      {/* GALERÍA */}
      <div className="grid grid-cols-3 gap-3 h-56">
        <div className="col-span-2 rounded-xl bg-slate-200"></div>
        <div className="rounded-xl bg-slate-200"></div>
        <div className="rounded-xl bg-slate-200"></div>
        <div className="rounded-xl bg-slate-200"></div>
      </div>

      {/* INFORMACIÓN */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-4">
        <p className="text-sm text-slate-700 leading-relaxed">
          Acogedor departamento de 2 dormitorios ideal para estudiantes o
          profesionales. Ubicado cerca de supermercados, transporte público y
          centros comerciales.
        </p>

        {/* Servicios */}
        <div>
          <p className="text-sm font-semibold text-slate-900 mb-2">
            Servicios incluidos
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700">
              Wifi
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700">
              Parqueo
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700">
              Seguridad 24/7
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700">
              Área de lavandería
            </span>
          </div>
        </div>

        {/* Mapa (placeholder) */}
        <div className="rounded-xl bg-slate-200 h-40 flex items-center justify-center text-sm text-slate-500">
          Mapa de la ubicación
        </div>

        {/* Precio + contacto */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-xl text-emerald-600 font-semibold">
            Bs. 2,500 / mes
          </p>

          <button className="px-4 py-2 rounded-md bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600">
            Solicitar información
          </button>
        </div>
      </div>
    </div>
  );
}
