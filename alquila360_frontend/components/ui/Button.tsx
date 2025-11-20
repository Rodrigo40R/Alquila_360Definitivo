"use client";

import * as React from "react";

type Variant = "primary" | "ghost";
type Size = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const baseClasses =
  "inline-flex items-center justify-center rounded-full font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900";

const variantClasses: Record<Variant, string> = {
  primary: "bg-emerald-500 text-slate-900 hover:bg-emerald-400",
  ghost:
    "border border-slate-600 bg-transparent text-slate-50 hover:bg-slate-800/70",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-2.5 text-sm",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const finalClassName = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <button className={finalClassName} {...props} />;
}
