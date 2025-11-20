export default function InquilinoPerfil() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Mi Perfil</h1>

      <div className="space-y-6">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <p className="text-slate-400 text-sm">Nombre</p>
          <p className="text-lg font-semibold">Juan Pérez</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <p className="text-slate-400 text-sm">Correo</p>
          <p className="text-lg font-semibold">juanperez@gmail.com</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <p className="text-slate-400 text-sm">Teléfono</p>
          <p className="text-lg font-semibold">+591 70000000</p>
        </div>
      </div>
    </main>
  );
}
