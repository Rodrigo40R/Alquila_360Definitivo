export default function SidebarPropietario() {
  return (
    <aside className="w-64 bg-[var(--propietario)] text-white min-h-screen p-6">
      <div className="text-xl font-bold mb-6">Propietario</div>

      <nav className="flex flex-col gap-4 text-lg">
        <a href="/propietario/dashboard" className="hover:text-teal-300">Dashboard</a>
        <a href="/propietario/tickets" className="hover:text-teal-300">Mantenimiento</a>
        <a href="/propietario/propiedades" className="hover:text-teal-300">Propiedades</a>
        <a href="/propietario/pagos" className="hover:text-teal-300">Pagos</a>
        <a href="/propietario/reportes" className="hover:text-teal-300">Reportes</a>
        <a href="/propietario/contratos" className="hover:text-teal-300">Contratos</a>
        <a href="/propietario/usuarios" className="hover:text-teal-300">Usuarios</a>
        <a href="/propietario/configuracion" className="hover:text-teal-300">Configuración</a>
        <a href="/propietario/perfil" className="hover:text-teal-300">Perfil</a>
      </nav>
    </aside>
  );
}
