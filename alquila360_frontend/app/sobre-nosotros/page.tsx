export default function SobreNosotros() {
  return (
    <div className="space-y-10 max-w-3xl">
      <h1 className="text-4xl font-bold text-slate-900">Sobre ALQUILA360</h1>

      <p className="text-slate-700 leading-relaxed text-lg">
        Somos una plataforma diseñada para facilitar la gestión de alquileres y
        conectar propietarios, inquilinos, técnicos y proveedores en un entorno
        seguro, moderno y eficiente.
      </p>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <p className="text-xl font-semibold text-slate-900">
          Nuestra misión
        </p>
        <p className="text-slate-700">
          Simplificar procesos de alquiler y brindar herramientas digitales que
          permitan gestionar propiedades de forma clara y eficiente.
        </p>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <p className="text-xl font-semibold text-slate-900">Nuestros valores</p>

        <ul className="space-y-2 text-slate-700">
          <li>• Transparencia</li>
          <li>• Seguridad</li>
          <li>• Rapidez</li>
          <li>• Organización</li>
          <li>• Tecnología moderna</li>
        </ul>
      </section>
    </div>
  );
}
