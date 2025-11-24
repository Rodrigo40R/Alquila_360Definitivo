export default function ConfirmacionReservaCliente() {
  return (
    <div className="space-y-8 max-w-xl">
      <h1 className="text-3xl font-bold text-emerald-600">¡Reserva enviada!</h1>

      <p className="text-slate-700 text-lg leading-relaxed">
        Tu solicitud fue enviada con éxito.  
        El propietario revisará tu información y te confirmará la reserva.
      </p>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-2">
        <p className="text-sm text-slate-500">¿Qué sucede ahora?</p>

        <ul className="list-disc pl-6 text-slate-700 space-y-2 text-sm">
          <li>El propietario recibe tu solicitud.</li>
          <li>Revisará tus datos y la disponibilidad.</li>
          <li>Podrás ver el estado en tu sección “Mis Reservas”.</li>
        </ul>
      </div>

      <a
        href="/cliente/reservas"
        className="px-4 py-2 bg-brand-primary text-white rounded-md inline-block"
      >
        Ir a Mis Reservas
      </a>
    </div>
  );
}
