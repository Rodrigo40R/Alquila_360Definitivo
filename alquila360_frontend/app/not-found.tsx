export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center">
      <h1 className="text-7xl font-bold text-slate-900 mb-4">404</h1>
      <p className="text-slate-600 mb-8 text-lg">
        La página que buscas no existe o fue movida.
      </p>
      <a
        href="/principal"
        className="px-6 py-3 bg-emerald-500 text-white rounded-md font-semibold hover:bg-emerald-600"
      >
        Volver al inicio
      </a>
    </div>
  );
}
