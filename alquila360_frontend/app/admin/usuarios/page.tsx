"use client";

import Button from "@/components/ui/Button";

export default function UsuariosAdminPage() {
  const usuarios = [
    {
      id: 1,
      nombre: "Carlos López",
      rol: "Inquilino",
      email: "carlos@example.com",
    },
    {
      id: 2,
      nombre: "María Gómez",
      rol: "Propietario",
      email: "maria@example.com",
    },
    {
      id: 3,
      nombre: "Pedro Ríos",
      rol: "Técnico",
      email: "pedro@example.com",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Usuarios</h1>

        <a href="/admin/usuarios/nuevo">
          <Button variant="primary">Nuevo usuario</Button>
        </a>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        {usuarios.map((u) => (
          <div
            key={u.id}
            className="grid grid-cols-4 border-b py-3 items-center"
          >
            <p>{u.nombre}</p>
            <p className="text-slate-500">{u.email}</p>
            <p className="text-slate-700">{u.rol}</p>

            <a
              href={`/admin/usuarios/${u.id}/editar`}
              className="text-brand-primary hover:underline text-sm"
            >
              Editar
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
