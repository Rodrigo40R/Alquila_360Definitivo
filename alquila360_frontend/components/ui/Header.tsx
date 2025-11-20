export default function Header() {
  return (
    <header className="w-full bg-white shadow h-16 flex items-center justify-between px-8">
      <div className="flex items-center gap-2">
        <img src="/logo.png" className="h-9" />
        <span className="font-bold text-xl">ALQUILA360</span>
      </div>

      <a href="/login" className="text-primary font-semibold">
        Iniciar Sesión
      </a>
    </header>
  );
}
