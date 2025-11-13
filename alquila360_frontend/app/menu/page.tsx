import Shell from "@/components/Shell";

export default function Page() {
  const items = [
    { t: "Graficos" }, { t: "Página de Contratos" }, { t: "Página de Pagos" },
    { t: "Página Tickets" }, { t: "Página Reportes" }, { t: "Gestión de Usuarios" },
  ];
  return (
    <Shell title="Menu">
      <div className="w-[270px] space-y-3">
        {items.map((x, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3">
            <div className="w-5 h-5 rounded-sm bg-slate-900" />
            <span>{x.t}</span>
          </div>
        ))}
      </div>
    </Shell>
  );
}
