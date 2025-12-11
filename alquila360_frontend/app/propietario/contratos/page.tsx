"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

interface Contrato {
  id_contrato: number;
  monto_mensual: string | number;
  fecha_inicio: string;
  fecha_fin: string;
  estado: string;

  inquilino?: {
    nombre: string;
    apellido?: string;
  };
}

export default function ContratosPropietarioPage() {
  const router = useRouter();
  const [contratos, setContratos] = useState<Contrato[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContratos = async () => {
      const user = getCurrentUser();

      if (!user || user.rol !== "propietario" || !user.id) {
        router.push("/login");
        return;
      }

      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
        const res = await fetch(`${baseUrl}/contrato/propietario/${user.id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        if (!res.ok) {
          const err = await res.text();
          throw new Error(err);
        }

        const data = await res.json();
        setContratos(data);
      } catch (err: any) {
        setError(`No se pudieron cargar los contratos: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchContratos();
  }, [router]);

  const formatDate = (date: string) =>
    date ? new Date(date).toLocaleDateString("es-ES") : "-";

  const formatMonto = (m: string | number) =>
    `Bs. ${Number(m || 0).toFixed(2)}`;

  const formatEstado = (estado: string) => {
    const e = (estado || "").toUpperCase();
    return e === "VIGENTE" ? "Vigente" : "No vigente";
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-6">
      
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Contratos</h1>
          <p className="text-sm text-slate-500">Listado de contratos asociados a tus propiedades.</p>
        </div>

        <Link
          href="/propietario/contratos/nuevo"
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md text-sm font-semibold transition"
        >
          Nuevo contrato
        </Link>
      </div>

      {/* Estados de carga */}
      {loading && <div className="text-slate-500">Cargando contratos...</div>}

      {error && (
        <div className="text-red-500 bg-red-50 p-3 rounded-md border border-red-200">
          {error}
        </div>
      )}

      {!loading && contratos.length === 0 && (
        <div className="text-slate-500 bg-slate-50 p-6 rounded-xl border border-slate-200 text-center">
          No tienes contratos registrados.
        </div>
      )}

      {/* TABLA */}
      {!loading && contratos.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">

          {/* CABECERA */}
          <div className="grid grid-cols-4 bg-slate-50 py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <div>Inquilino</div>
            <div>Monto</div>
            <div>Fechas</div>
            <div>Estado</div>
          </div>

          <div className="divide-y divide-slate-100">
            {contratos.map((c) => (
              <div
                key={c.id_contrato}
                className="grid grid-cols-4 py-4 px-6 text-sm items-center hover:bg-slate-50 transition"
              >
                {/* INQUILINO */}
                <p className="text-slate-900 font-medium truncate pr-2">
                  {c.inquilino
                    ? `${c.inquilino.nombre} ${c.inquilino.apellido ?? ""}`
                    : "Sin inquilino"}
                </p>

                {/* MONTO */}
                <p className="text-emerald-600 font-semibold">
                  {formatMonto(c.monto_mensual)}
                </p>

                {/* FECHAS */}
                <div className="text-slate-500 text-xs space-y-1">
                  <p>Inicio: {formatDate(c.fecha_inicio)}</p>
                  <p>Fin: {formatDate(c.fecha_fin)}</p>
                </div>

                {/* ESTADO */}
                <p
                  className={`font-semibold ${
                    c.estado?.toUpperCase() === "VIGENTE"
                      ? "text-emerald-600"
                      : "text-slate-500"
                  }`}
                >
                  {formatEstado(c.estado)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
