"use client";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function ConfiguracionAdminPage() {
  return (
    <div className="space-y-10 max-w-2xl">
      <h1 className="text-3xl font-bold text-slate-900">Configuración del sistema</h1>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
        <Input label="Nombre del sistema" defaultValue="ALQUILA360" />

        <Input label="Correo de soporte" defaultValue="soporte@alquila360.com" />

        <Input label="Teléfono de soporte" defaultValue="+591 70000000" />

        <Button variant="primary" className="w-full">
          Guardar cambios
        </Button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <p className="text-lg font-semibold">Gestión de roles</p>

        <div className="flex justify-between items-center border-b pb-3">
          <span>Admin</span>
          <span className="text-slate-500">Acceso total</span>
        </div>

        <div className="flex justify-between items-center border-b pb-3">
          <span>Propietario</span>
          <span className="text-slate-500">Propiedades, pagos, tickets</span>
        </div>

        <div className="flex justify-between items-center border-b pb-3">
          <span>Inquilino</span>
          <span className="text-slate-500">Tickets, reservas, pagos</span>
        </div>

        <div className="flex justify-between items-center border-b pb-3">
          <span>Técnico</span>
          <span className="text-slate-500">Tickets asignados</span>
        </div>

        <div className="flex justify-between items-center pb-3">
          <span>Proveedor</span>
          <span className="text-slate-500">Servicios asignados</span>
        </div>
      </div>
    </div>
  );
}
