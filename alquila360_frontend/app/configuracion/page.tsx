import Shell from "@/components/Shell";

export default function Page() {
  return (
    <Shell title="Configuracion">
      <div className="mx-auto max-w-xl">
        <div className="card border border-slate-200 p-8">
          <div className="mx-auto mb-6 h-16 w-16 rounded-full border-2 border-slate-900 flex items-center justify-center">
            <div className="h-8 w-8 rounded-full border-2 border-slate-900" />
          </div>
          <div className="space-y-1 text-slate-700">
            <div><b>Nombre:</b> Juanito Perez</div>
            <div><b>Rol:</b> Administrador</div>
            <div><b>Correo electronico:</b> juanito.pz@mail.com</div>
            <div><b>numero de celular:</b> +591 63902234</div>
            <div><b>numero de referencia:</b> +591 76322345</div>
          </div>
          <div className="mt-6 text-right">
            <button className="btn btn-ghost">Editar</button>
          </div>
        </div>
      </div>
    </Shell>
  );
}
