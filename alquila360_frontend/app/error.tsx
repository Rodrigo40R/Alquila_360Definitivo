"use client";

export default function Error() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-5xl font-bold text-red-600">Error 500</h1>
      <p className="text-slate-700 mt-3 text-lg">
        Ocurrió un problema inesperado. Intenta nuevamente.
      </p>

      <a
        href="/principal"
        className="mt-6 px-6 py-3 bg-slate-800 text-white rounded-md hover:bg-slate-900"
      >
        Volver al inicio
      </a>
    </div>
  );
}
