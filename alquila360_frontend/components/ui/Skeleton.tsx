export default function SkeletonCard() {
  return (
    <div className="animate-pulse space-y-3 border border-slate-200 p-4 rounded-xl">
      <div className="h-5 w-1/2 bg-slate-200 rounded-md"></div>
      <div className="h-4 w-3/4 bg-slate-200 rounded-md"></div>
      <div className="h-4 w-2/3 bg-slate-200 rounded-md"></div>
    </div>
  );
}
