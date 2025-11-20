export default function ClienteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      <aside className="w-60 bg-green-700 text-white p-6">
        <h2 className="text-xl font-bold mb-6">CLIENTE</h2>

        <ul className="space-y-3">
          <li><a href="/cliente" className="hover:underline">Inicio</a></li>
          <li><a href="/cliente/explorar" className="hover:underline">Explorar</a></li>
        </ul>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
