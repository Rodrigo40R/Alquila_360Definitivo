type CardColor = "emerald" | "blue" | "red" | "yellow" | "slate";

type Props = {
  titulo: string;
  valor: string | number;
  color?: CardColor;
};

export default function CardPro({ titulo, valor, color = "emerald" }: Props) {
  const colors: Record<CardColor, string> = {
    emerald: "text-emerald-600",
    blue: "text-blue-600",
    red: "text-red-600",
    yellow: "text-yellow-600",
    slate: "text-slate-800",
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-1">
      <p className="text-sm text-slate-500">{titulo}</p>
      <p className={`text-3xl font-bold ${colors[color]}`}>{valor}</p>
    </div>
  );
}
