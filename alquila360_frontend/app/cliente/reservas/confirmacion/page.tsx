"use client";

export default function ConfirmacionReservaPage() {
  return (
    <div className="space-y-8 max-w-xl">
      <h1 className="text-3xl font-bold text-emerald-600">
        ¡Reserva enviada!
      </h1>

      <p className="text-slate-700 text-lg">
        Tu solicitud de reserva fue enviada correctamente.  
        El propietario revisará y te notificará la confirmación.
      </p>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="font-semibold text-slate-900 mb-2">¿Qué sigue?</p>
        <ul className="text-slate-700 space-y-2 text-sm">
          <li>• El propietario revisa los datos</li>
          <li>• Si acepta, verás el estado en la sección “Mis Reservas”</li>
          <li>• También recibirás la actualización en tu panel</li>
        </ul>
      </div>
    </div>
  );
}
