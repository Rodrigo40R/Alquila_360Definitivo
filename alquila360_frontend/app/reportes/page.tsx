"use client";
import Shell from "@/components/Shell";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const dBars = [
  { name:"Apto.101", v:28 }, { name:"Apto.203", v:22 },
  { name:"Apto.301", v:15 }, { name:"Apto.402", v:14 },
];

const dLine = [
  { m:"May", v:5 }, { m:"Jul", v:12 }, { m:"Sep", v:13 }, { m:"Nov", v:19 },
];

const dDonut = [{name:"Ocupadas", v:82}, {name:"Disponibles", v:18}];
const COLORS = ["#34D5C6","#f6d365"];

export default function Page() {
  return (
    <Shell title="Reportes">
      <h1 className="text-4xl font-bold mb-6">Reportes</h1>

      <div className="mb-4 flex items-center gap-3">
        <div className="btn btn-ghost">Fecha: Hoy</div>
        <div className="btn btn-ghost">Propiedad: Seleccionar</div>
        <button className="btn bg-green-500 text-white">Generar PDF</button>
        <button className="btn bg-emerald-400 text-white">Excel</button>
      </div>

      <div className="card border border-slate-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Morosidad */}
          <div className="card p-4 border border-slate-200">
            <h3 className="font-semibold mb-2">Morosidad</h3>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dBars}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="v" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Ingresos (línea) */}
          <div className="card p-4 border border-slate-200">
            <h3 className="font-semibold mb-2">Ingresos</h3>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dLine}>
                  <XAxis dataKey="m" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="v" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Ocupación (dona) */}
          <div className="card p-4 border border-slate-200">
            <h3 className="font-semibold mb-2">Ocupación</h3>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={dDonut} dataKey="v" innerRadius={45} outerRadius={70}>
                    {dDonut.map((entry, idx) => (<Cell key={idx} fill={COLORS[idx % COLORS.length]} />))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 space-y-1 text-sm">
              <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full" style={{background:COLORS[0]}}/> Unidades ocupadas</div>
              <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full" style={{background:COLORS[1]}}/> Unidades disponibles</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-4 border border-slate-200">
          <h3 className="font-semibold mb-2">Ingresos</h3>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dLine}>
                <XAxis dataKey="m" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="v" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-4 border border-slate-200">
          <h3 className="font-semibold mb-3">Tickets resueltos</h3>
          <table className="w-full text-sm">
            <thead><tr className="text-slate-500"><th className="text-left">Técnico</th><th>Total</th><th>Fontaieria</th></tr></thead>
            <tbody>
              <tr><td>Luis</td><td className="text-center">6</td><td className="text-center">4</td></tr>
              <tr><td>Carios</td><td className="text-center">4</td><td className="text-center">1</td></tr>
              <tr><td>—</td><td className="text-center">1</td><td className="text-center">0</td></tr>
            </tbody>
          </table>
        </div>

        <div className="card p-4 border border-slate-200">
          <h3 className="font-semibold mb-2">Ocupación</h3>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dDonut} dataKey="v" innerRadius={40} outerRadius={60}>
                  {dDonut.map((e,i)=><Cell key={i} fill={COLORS[i%COLORS.length]} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Shell>
  );
}
