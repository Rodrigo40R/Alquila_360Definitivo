export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-white mt-20 py-10 text-center">
      <p className="text-brand-primary font-bold text-lg">ALQUILA360</p>
      <p className="text-slate-500 text-sm mt-2">
        Plataforma integral para la gestión de alquileres.
      </p>
      <p className="text-slate-400 text-xs mt-3">
        © {new Date().getFullYear()} Todos los derechos reservados.
      </p>
    </footer>
  );
}
