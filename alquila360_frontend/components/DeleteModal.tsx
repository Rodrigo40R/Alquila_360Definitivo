"use client";

type Props = {
  texto: string;
  onDelete: () => void;
  onCancel: () => void;
};

export default function DeleteModal({ texto, onDelete, onCancel }: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl space-y-4 w-full max-w-sm">
        <p className="text-sm text-slate-900 text-center">{texto}</p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md border border-slate-300 text-sm hover:bg-slate-100"
          >
            Cancelar
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 rounded-md bg-red-500 text-white text-sm font-semibold hover:bg-red-600"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
