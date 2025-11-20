export default function Select({ label, children, ...props }: any) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium">{label}</label>
      <select
        className="border border-gray-400 rounded-md px-3 py-2 w-full bg-white"
        {...props}
      >
        {children}
      </select>
    </div>
  );
}
