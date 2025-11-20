// components/Header.tsx
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Header() {
  return (
    <header className="w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="text-lg font-semibold tracking-tight">
          <span className="text-emerald-400">ALQUILA</span>
          <span className="text-slate-50">360</span>
        </Link>

        {/* Navegación principal */}
        <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
          <Link href="#servicios" className="hover:text-emerald-400">
            Servicios
          </Link>
          <Link href="#contacto" className="hover:text-emerald-400">
            Contacto
          </Link>
          <Link href="#sobre-nosotros" className="hover:text-emerald-400">
            Sobre nosotros
          </Link>
        </nav>

        {/* Botón iniciar sesión */}
        <div className="flex items-center gap-2">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Iniciar sesión
            </Button>
          </Link>
          <Link href="/registro">
            <Button size="sm">Registrarse</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
