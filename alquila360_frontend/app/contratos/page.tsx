import Shell from "@/components/Shell";

const rows = [
  { inq:"Ana Torres", prop:"Lucía Gómez", propiedad:"Apt. 101", monto:"$800", fecha:"01/04/2025 - 31/03/2026", estado:"Activo" },
  { inq:"Luis Martínez", prop:"Javier Rodri", propiedad:"Casa Verde", monto:"$1,200", fecha:"15/03/2024 - 15/03/2025", estado:"Renovar / Cancelar" },
  { inq:"Carla Ruiz", prop:"Ana Morales", propiedad:"Apt. 203", monto:"$750", fecha:"10/02/2023 - 09/02/2024", estado:"Finalizado" },
];

export default function Page() {
  return (
    <Shell title="Contrato">
      <h1 className="text-3xl font-bold mb-6">Contratos</h1>

      <div className="flex gap-3 mb-4">
        <button className="btn bg-red-600 text-white">Generar PDF</button>
        <button className="btn bg-green-500 text-white">Agregar contrato</button>
      </div>

      <div className="mb-4 flex gap-4 text-slate-600">
        <span>Estado. Seleccionar</span>
        <span>Propiedad. Seleccionar</span>
        <span>Fecha. Seleccionar</span>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Inquilino</th><th>Propietario</th><th>Propiedad</th><th>Monto</th><th>Fechas</th><th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r,i)=>(
            <tr key={i} className="rounded-xl">
              <td className="px-3 py-3">{r.inq}</td>
              <td className="px-3 py-3">{r.prop}</td>
              <td className="px-3 py-3">{r.propiedad}</td>
              <td className="px-3 py-3">{r.monto}</td>
              <td className="px-3 py-3">{r.fecha}</td>
              <td className="px-3 py-3">{r.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Shell>
  );
}
