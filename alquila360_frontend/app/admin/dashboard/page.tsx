// app/admin/dashboard/page.tsx
import Card from "@/components/ui/Card";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">
          Panel de administración
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Visión general de usuarios, roles y actividad reciente.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <div className="rounded-xl bg-slate-900/70 p-4 text-sm">
            <p className="text-xs text-slate-400">Usuarios registrados</p>
            <p className="mt-1 text-2xl font-bold">48</p>
          </div>
        </Card>
        <Card>
          <div className="rounded-xl bg-slate-900/70 p-4 text-sm">
            <p className="text-xs text-slate-400">Propietarios</p>
            <p className="mt-1 text-2xl font-bold">16</p>
          </div>
        </Card>
        <Card>
          <div className="rounded-xl bg-slate-900/70 p-4 text-sm">
            <p className="text-xs text-slate-400">Inquilinos</p>
            <p className="mt-1 text-2xl font-bold">29</p>
          </div>
        </Card>
      </section>
    </div>
  );
}
