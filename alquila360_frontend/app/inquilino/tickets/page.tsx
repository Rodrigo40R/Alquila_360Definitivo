export default function InquilinoTickets() {
  const tickets = [
    { titulo: "Grifo con fuga", estado: "Pendiente", fecha: "Hoy" },
    { titulo: "Ventana rota", estado: "En revisión", fecha: "Ayer" },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Mis Tickets</h1>

      <div className="space-y-4">
        {tickets.map((t, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-between"
          >
            <div>
              <p className="font-semibold">{t.titulo}</p>
              <p className="text-xs text-slate-400">{t.fecha}</p>
            </div>
            <p className="font-semibold">{t.estado}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
