"use client";

import { useEffect, useState } from "react";
import CardPro from "@/components/ui/CardPro";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

type StatCards = {
  usuariosTotales: number;
  propiedadesActivas: number;
  ticketsTotales: number;
};

type IngresoMes = {
  mes: string;   // Ej: "Enero 2024"
  total: number;
};

function formatMonto(monto: number) {
  return `Bs. ${monto.toLocaleString("es-BO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

export default function ReportesAdmin() {
  const [stats, setStats] = useState<StatCards>({
    usuariosTotales: 0,
    propiedadesActivas: 0,
    ticketsTotales: 0,
  });

  const [ingresos, setIngresos] = useState<IngresoMes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargarReportes() {
      try {
        setLoading(true);
        setError(null);

        const [resUsers, resProps, resTickets, resPagos] = await Promise.all([
          fetch(`${API_URL}/users`, { cache: "no-store" }),          // ajusta si es /users
          fetch(`${API_URL}/propiedades`, { cache: "no-store" }),
          fetch(`${API_URL}/tickets`, { cache: "no-store" }),       // ajusta si tu ruta es otra
          fetch(`${API_URL}/pagos`, { cache: "no-store" }),
        ]);

        const [usersData, propsData, ticketsData, pagosData] =
          await Promise.all([
            resUsers.ok ? resUsers.json() : [],
            resProps.ok ? resProps.json() : [],
            resTickets.ok ? resTickets.json() : [],
            resPagos.ok ? resPagos.json() : [],
          ]);

        // 1) Usuarios que NO sean administradores
        const usuariosTotales = Array.isArray(usersData)
          ? usersData.filter((u: any) => {
              const rol = (u.tipo_usuario || u.rol || "").toUpperCase();
              // Ajusta este string según cómo guardes el rol en BD
              return rol !== "ADMIN" && rol !== "ADMINISTRADOR";
            }).length
          : 0;

        // 2) Propiedades activas
        const propiedadesActivas = Array.isArray(propsData)
          ? propsData.filter((p: any) => {
              const est = (p.estado || "").toUpperCase();
              return est !== "INACTIVA" && est !== "BAJA" && est !== "ELIMINADA";
            }).length
          : 0;

        // 3) Tickets TOTALES (sin filtro de mes)
        const ticketsTotales = Array.isArray(ticketsData)
          ? ticketsData.length
          : 0;

        // 4) Ingresos por mes (TODOS los años)
        const mapaIngresos = new Map<string, number>(); // key = "YYYY-M" (ej: "2024-0")

        if (Array.isArray(pagosData)) {
          pagosData.forEach((p: any) => {
            const fecha = p.fecha_pago || p.fecha || p.createdAt;
            const monto = Number(p.monto ?? 0);
            if (!fecha || isNaN(monto)) return;

            const d = new Date(fecha);
            const y = d.getFullYear();
            const m = d.getMonth(); // 0-11

            const key = `${y}-${m}`;
            const anterior = mapaIngresos.get(key) ?? 0;
            mapaIngresos.set(key, anterior + monto);
          });
        }

        // Convertimos el mapa en un array ordenado por año y mes
        const ingresosArray: IngresoMes[] = Array.from(mapaIngresos.entries())
          .sort((a, b) => {
            const [ay, am] = a[0].split("-").map(Number);
            const [by, bm] = b[0].split("-").map(Number);
            if (ay !== by) return ay - by;
            return am - bm;
          })
          .map(([key, total]) => {
            const [y, m] = key.split("-").map(Number);
            const mesNombre = new Date(y, m, 1).toLocaleString("es-ES", {
              month: "long",
            });
            const mes =
              mesNombre.charAt(0).toUpperCase() + mesNombre.slice(1) + ` ${y}`;
            return { mes, total };
          });

        setStats({
          usuariosTotales,
          propiedadesActivas,
          ticketsTotales,
        });
        setIngresos(ingresosArray);
      } catch (err: any) {
        console.error("Error cargando reportes:", err);
        setError(err?.message || "No se pudieron cargar los reportes.");
      } finally {
        setLoading(false);
      }
    }

    cargarReportes();
  }, []);

  const cards = [
    {
      titulo: "Usuarios totales",
      valor: stats.usuariosTotales,
      color: "slate",
    },
    {
      titulo: "Propiedades activas",
      valor: stats.propiedadesActivas,
      color: "blue",
    },
    {
      titulo: "Tickets totales",
      valor: stats.ticketsTotales,
      color: "emerald",
    },
  ];

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-slate-900">Reportes generales</h1>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

      {/* Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {cards.map((s, i) => (
          <CardPro
            key={i}
            titulo={s.titulo}
            valor={s.valor}
            color={s.color as any}
          />
        ))}
      </div>

      {/* Ingresos Mensuales */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <p className="text-lg font-semibold text-slate-900">Ingresos por mes</p>

        {loading && (
          <p className="text-sm text-slate-500">Calculando ingresos…</p>
        )}

        {!loading && ingresos.length === 0 && (
          <p className="text-sm text-slate-400">
            No hay pagos registrados.
          </p>
        )}

        {!loading &&
          ingresos.map((i, idx) => (
            <div
              key={idx}
              className="flex justify-between border-b pb-3 last:border-0"
            >
              <span>{i.mes}</span>
              <span className="font-bold text-emerald-600">
                {formatMonto(i.total)}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
