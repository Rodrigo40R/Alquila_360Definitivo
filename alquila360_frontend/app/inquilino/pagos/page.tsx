export default function InquilinoPagos() {
  const pagos = [
    { monto: "$350", fecha: "Hoy", metodo: "Transferencia" },
    { monto: "$350", fecha: "Hace 1 mes", metodo: "QR" },
    { monto: "$350", fecha: "Hace 2 meses", metodo: "Efectivo" },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Historial de Pagos</h1>

      <div className="space-y-4">
        {pagos.map((p, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-between"
          >
            <div>
              <p className="font-semibold">{p.monto}</p>
              <p className="text-xs text-slate-400">{p.fecha}</p>
            </div>
            <p className="font-semibold">{p.metodo}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
