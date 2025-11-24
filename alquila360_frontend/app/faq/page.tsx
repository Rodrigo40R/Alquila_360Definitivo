export default function FAQPage() {
  const items = [
    {
      q: "¿Cómo puedo reportar un problema?",
      a: "Desde tu panel de inquilino, selecciona Tickets → Crear ticket.",
    },
    {
      q: "¿Cómo funciona la reserva de propiedades?",
      a: "Desde la sección de explorar, selecciona la propiedad → Reservar.",
    },
    {
      q: "¿Cómo contactar soporte?",
      a: "Desde el menú superior → Soporte.",
    },
  ];

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-3xl font-bold text-slate-900">Preguntas frecuentes</h1>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        {items.map((i, idx) => (
          <div key={idx} className="border-b pb-3">
            <p className="font-semibold text-slate-900">{i.q}</p>
            <p className="text-sm text-slate-700 mt-1">{i.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
