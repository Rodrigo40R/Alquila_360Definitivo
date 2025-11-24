export default function SoportePage() {
  return (
    <div className="space-y-10 max-w-3xl">
      <h1 className="text-3xl font-bold text-slate-900">Centro de ayuda</h1>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900 mb-3">¿Necesitas ayuda?</h2>
        <p className="text-slate-700">
          Nuestro equipo está listo para ayudarte con cualquier duda o problema.
        </p>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="font-semibold text-slate-900 mb-2">Contacto directo</h3>

        <ul className="space-y-2 text-slate-700">
          <li>📞 Teléfono: <strong>+591 700-00000</strong></li>
          <li>📧 Email: <strong>soporte@alquila360.com</strong></li>
          <li>💬 WhatsApp: <strong>+591 700-00000</strong></li>
        </ul>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="font-semibold text-slate-900 mb-3">Preguntas frecuentes</h3>
        <a href="/faq" className="text-emerald-600 hover:underline text-sm">
          Ver todas las preguntas
        </a>
      </section>
    </div>
  );
}
