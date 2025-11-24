export default function Loading() {
  return (
    <div className="flex items-center gap-3 text-slate-600">
      <div className="h-4 w-4 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin"></div>
      Cargando...
    </div>
  );
}
