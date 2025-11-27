// components/ui/Badge.tsx
import React from "react";

type Props = React.HTMLAttributes<HTMLSpanElement>;

export default function Badge({ className = "", ...rest }: Props) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}
      {...rest}
    />
  );
}

