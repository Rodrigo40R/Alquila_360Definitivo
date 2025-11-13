import Shell from "@/components/Shell";

function Stat({ title, value, sub }:{title:string; value:string; sub:string}) {
  return (
    <div className="card p-5 border border-slate-200">
      <h3 className="font-semibold mb-2">{title}</h3>
      <div className="text-3xl font-extrabold">{value}</div>
      <div className="text-slate-500">{sub}</div>
    </div>
  );
}

export default function Page() {
  return (
    <Shell title="Principal">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <Stat title="Morosidad total" value="76,000" sub="327 atrasos" />
        <Stat title="Ingresos" value="120,000" sub="500 al día" />
        <div className="card p-5 border border-slate-200">
          <h3 className="font-semibold mb-2">Ocupación</h3>
          <div className="text-3xl font-extrabold">82%</div>
          <div className="text-slate-500">164 propiedades ocupadas</div>
        </div>
        <div className="card p-5 border border-slate-200">
          <h3 className="font-semibold mb-2">Tickets</h3>
          <div className="text-slate-700">20 nuevos tickets</div>
          <div className="text-slate-700">40 en progreso</div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <button className="btn btn-primary">Nuevo Contrato</button>
        <button className="btn btn-ghost">Registrar Pago</button>
        <button className="btn btn-ghost">Nuevo Ticket</button>
        <button className="btn btn-ghost">Generar Reporte</button>
      </div>
    </Shell>
  );
}
