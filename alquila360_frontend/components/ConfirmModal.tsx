"use client";

type ConfirmModalProps = {
  texto: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  texto,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg space-y-4">
        <p className="text-center text-slate-900 text-sm font-medium">
          {texto}
        </p>

        <div className="flex justify-end gap-2 text-sm">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md border border-slate-300 hover:bg-slate-50"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-emerald-500 text-white font-semibold hover:bg-emerald-600"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
