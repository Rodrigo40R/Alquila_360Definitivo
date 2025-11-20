export default function SidebarTecnico() {
  return (
    <aside className="w-64 bg-[var(--tecnico)] text-black min-h-screen p-6">
      <div className="text-xl font-bold mb-6">Técnico</div>

      <nav className="flex flex-col gap-4 text-lg">
        <a href="/tecnico/dashboard" className="hover:text-white">Dashboard</a>
        <a href="/tecnico/tickets" className="hover:text-white">Tickets</a>
        <a href="/tecnico/propiedades" className="hover:text-white">Propiedades</a>
        <a href="/tecnico/perfil" className="hover:text-white">Perfil</a>
      </nav>
    </aside>
  );
}
