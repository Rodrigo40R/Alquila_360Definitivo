import Sidebar from "@/components/ui/Sidebar";

export default function PrincipalPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar
        roleLabel="Administrador"
        items={[
          { href: "/principal", label: "Inicio" },
          { href: "/admin/dashboard", label: "Dashboard" },
          { href: "/admin/pagos", label: "Pagos" },
        ]}
      />

      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </main>
    </div>
  );
}
