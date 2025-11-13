import Shell from "@/components/Shell";

const rows = [
  { id:1201, inq:"Juan Pérez", prop:"Apto. 101", fecha:"10/5/2025", monto:"$500,00", estado:"Pagado" },
  { id:1202, inq:"Maria López", prop:"Apto. 301", fecha:"5/5/2025", monto:"$1.000,00", estado:"Ver recibo" },
  { id:1203, inq:"Carlos Sánchez", prop:"Apto. 204", fecha:"6/4/2025", monto:"$750,00", estado:"Pendiente" },
];

export default function Page() {
  return (
    <Shell title="Pagos">
      <h1 className="text-4xl font-bold mb-6">Pagos</h1>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="btn btn-ghost">Fecha: Hoy</div>
        <div className="btn btn-ghost">Inquilino: Seleccionar</div>
        <div className="btn btn-ghost">Propiedad: Seleccionar</div>
        <button className="btn bg-green-500 text-white">+ Registrar pago</button>
      </div>

      <table className="table">
        <thead>
          <tr><th>#</th><th>Inquilino</th><th>Propiedad</th><th>Fecha de pago</th><th>Monto</th><th>Estado</th></tr>
        </thead>
        <tbody>
          {rows.map((r)=>(
            <tr key={r.id}>
              <td className="px-3 py-3">{r.id}</td>
              <td className="px-3 py-3">{r.inq}</td>
              <td className="px-3 py-3">{r.prop}</td>
              <td className="px-3 py-3">{r.fecha}</td>
              <td className="px-3 py-3">{r.monto}</td>
              <td className="px-3 py-3">
                {r.estado === "Pagado" && <span className="badge bg-green-100 text-green-700">Pagado</span>}
                {r.estado === "Pendiente" && <span className="badge bg-yellow-100 text-yellow-700">Pendiente</span>}
                {r.estado === "Ver recibo" && <a className="text-[--color-brand] underline" href="#">Ver recibo</a>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn bg-green-600 text-white mt-6">VER RECIBO</button>
    </Shell>
  );
}
