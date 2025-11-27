"use client";

import { useState } from "react";

export default function SearchBar({ placeholder = "Buscar..." }: any) {
  const [query, setQuery] = useState("");

  return (
    <div className="w-full">
      <input
        className="w-full border border-slate-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
