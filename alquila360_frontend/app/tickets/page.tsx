import Shell from "@/components/Shell";
import Image from "next/image";

function Col({ title, children }:{title:string; children:React.ReactNode}) {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Card({ children }:{children:React.ReactNode}) {
  return <div className="card p-4 border border-slate-200">{children}</div>;
}

export default function Page() {
  return (
    <Shell title="Contrato">
      <h1 className="text-4xl font-bold mb-6">Tickets de Mantenimiento</h1>
      <div className="mb-6">
        <button className="btn bg-green-500 text-white">+ Crear ticket</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Col title="Pendiente">
          <Card>
            <div className="badge bg-yellow-100 text-yellow-700 mb-2">Prioridad</div>
            <p className="mb-3">Cerradura de la puerta no funciona y es difícil de abrir</p>
            <div className="text-slate-600 mb-3">📷 2</div>
            <button className="btn w-full bg-black text-white">Asignar Tecnico</button>
          </Card>
        </Col>

        <Col title="En proceso">
          <Card>
            <div className="badge bg-yellow-100 text-yellow-700 mb-2">Prioridad</div>
            <p className="mb-3">Fuga de agua en el lavabo del baño principal</p>
            <div className="mb-3 overflow-hidden rounded-xl border">
              <Image src="/hero-login.svg" alt="img" width={600} height={350} />
            </div>
            <div className="text-right font-semibold">$750</div>
            <button className="btn w-full bg-green-500 text-white mt-3">Actualizar Estado</button>
          </Card>
        </Col>

        <Col title="Finalizado">
          <Card>
            <div className="badge bg-green-100 text-green-700 mb-2">PriorIdad</div>
            <p className="mb-3">Se ha pintado y reparado el muro dañado</p>
            <div className="mb-3 overflow-hidden rounded-xl border">
              <Image src="/hero-login.svg" alt="img" width={600} height={350} />
            </div>
            <div className="text-slate-600 mb-3">📷 2</div>
            <button className="btn w-full bg-black text-white">Actualizar Estado</button>
          </Card>
        </Col>
      </div>
    </Shell>
  );
}
