export default function Avatar({ letra = "M" }: any) {
  return (
    <div className="bg-emerald-200 h-10 w-10 rounded-full flex items-center justify-center text-emerald-700 font-bold">
      {letra}
    </div>
  );
}
