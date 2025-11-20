// components/ui/Card.tsx
import type { ReactNode } from "react";

type CardTone = "default" | "success" | "warning" | "danger";

export interface CardProps {
  // OPCIONALES para usos antiguos
  title?: string;
  value?: string | number;
  color?: CardTone;
  // Nuevo: usamos Card como wrapper
  children?: ReactNode;
}

/**
 * Card genérico:
 * - Si se pasa `children`, se renderiza tal cual el contenido.
 * - Si NO hay `children`, muestra un layout simple con title / value.
 */
export default function Card({
  title,
  value,
  color = "default",
  children,
}: CardProps) {
  const toneClass: Record<CardTone, string> = {
    default: "border-slate-800 bg-slate-900/70",
    success: "border-emerald-500/40 bg-emerald-500/5",
    warning: "border-amber-500/40 bg-amber-500/5",
    danger: "border-red-500/40 bg-red-500/5",
  };

  return (
    <div
      className={`rounded-xl border p-4 text-sm text-slate-50 ${toneClass[color]}`}
    >
      {/* Si hay children, damos control total al llamador */}
      {children ? (
        children
      ) : (
        <div className="space-y-1">
          {title && (
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              {title}
            </p>
          )}
          {value !== undefined && (
            <p className="text-2xl font-bold leading-tight">{value}</p>
          )}
        </div>
      )}
    </div>
  );
}
