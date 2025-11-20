"use client";
import RoleSelect from "./RoleSelect";
export default function LoginCard() {
  return (
    <div className="card w-full max-w-md p-6">
      <h2 className="text-center text-lg font-semibold mb-6">Inicio de Sesion</h2>
      <div className="space-y-2 mb-4"><RoleSelect /></div>
      <div className="space-y-2 mb-6">
        <label className="text-sm font-medium">Ingresa tu contraseña</label>
        <input type="password" placeholder="Escribe aquí tu contraseña" className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3"/>
        <a href="#" className="text-sm underline">¿Olvidaste tu contraseña?</a>
      </div>
      <div className="space-y-3">
        <a href="/principal" className="btn btn-primary block text-center">iniciar sesión</a>
        <a href="/registro" className="btn block text-center bg-[color-mix(in_oklab,white,var(--color-brand)15%)] text-[--color-brand]">Registrarse</a>
      </div>
    </div>
  );
}
