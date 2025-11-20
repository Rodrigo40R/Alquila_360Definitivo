export default function SidebarInquilino() {
  return (
    <aside className="w-64 bg-[var(--inquilino)] text-white min-h-screen p-6">
      <div className="text-xl font-bold mb-6">Inquilino</div>

      <nav className="flex flex-col gap-4 text-lg">
        <a href="/inquilino/dashboard" className="hover:text-gray-100">Dashboard</a>
        <a href="/inquilino/pagos" className="hover:text-gray-100">Pagos</a>
        <a href="/inquilino/propiedades" className="hover:text-gray-100">Propiedades</a>
        <a href="/inquilino/tickets" className="hover:text-gray-100">Tickets</a>
        <a href="/inquilino/perfil" className="hover:text-gray-100">Perfil</a>
      </nav>
    </aside>
  );
}
