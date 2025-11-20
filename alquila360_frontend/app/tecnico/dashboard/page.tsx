export default function TecnicoDashboard() {
  const tareas = [
    { titulo: "Revisar fuga de agua", estado: "Pendiente" },
    { titulo: "Reparar llave", estado: "En proceso" },
    { titulo: "Cambio de foco", estado: "Completado" },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Panel del Técnico</h1>

      <h2 className="text-xl font-semibold mb-4">Tareas asignadas</h2>

      <div className="space-y-4">
        {tareas.map((t, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-between"
          >
            <p className="font-semibold">{t.titulo}</p>
            <p className="text-slate-400">{t.estado}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
