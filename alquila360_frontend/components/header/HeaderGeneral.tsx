// components/header/HeaderGeneral.tsx
'use client';

import Link from 'next/link';
import React from 'react';

export interface HeaderGeneralProps {
  roleLabel?: string;
}

export function HeaderGeneral({ roleLabel = 'Usuario' }: HeaderGeneralProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b bg-white px-6">
      <div className="flex items-center gap-2">
        <Link href="/principal" className="text-lg font-semibold text-[#00b8b0]">
          ALQUILA360
        </Link>
        <span className="text-sm text-gray-500">| {roleLabel}</span>
      </div>

      <div className="flex items-center gap-4">
        <button
          aria-label="Notificaciones"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300"
        >
          🔔
        </button>
        <button
          aria-label="Perfil"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300"
        >
          👤
        </button>
      </div>
    </header>
  );
}

export default HeaderGeneral;
