export default function InquilinoDashboard() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Panel del Inquilino</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <p className="text-slate-400 text-sm">Próximo pago</p>
          <h2 className="text-3xl font-bold mt-2">12 FEB</h2>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <p className="text-slate-400 text-sm">Monto mensual</p>
          <h2 className="text-3xl font-bold mt-2">$350</h2>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <p className="text-slate-400 text-sm">Tickets activos</p>
          <h2 className="text-3xl font-bold mt-2">2</h2>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-3">Últimos pagos</h2>

      <div className="space-y-3">
        {[
          { monto: "$350", fecha: "Hoy", estado: "Pagado" },
          { monto: "$350", fecha: "Hace 1 mes", estado: "Pagado" },
          { monto: "$350", fecha: "Hace 2 meses", estado: "Pagado" },
        ].map((p, i) => (
          <div
            key={i}
            className="flex justify-between p-4 rounded-xl bg-slate-900 border border-slate-800"
          >
            <div>
              <p className="font-medium">{p.monto}</p>
              <p className="text-xs text-slate-400">{p.fecha}</p>
            </div>
            <p className="font-semibold">{p.estado}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
