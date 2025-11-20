export default function PropietarioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      <aside className="w-60 bg-purple-700 text-white p-6">
        <h2 className="text-xl font-bold mb-6">PROPIETARIO</h2>

        <ul className="space-y-3">
          <li><a href="/propietario" className="hover:underline">Dashboard</a></li>
          <li><a href="/propietario/propiedades" className="hover:underline">Mis propiedades</a></li>
          <li><a href="/propietario/reservas" className="hover:underline">Reservas</a></li>
        </ul>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
