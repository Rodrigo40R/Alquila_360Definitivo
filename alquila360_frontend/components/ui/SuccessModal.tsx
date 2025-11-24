"use client";

type SuccessModalProps = {
  mensaje: string;
  onClose: () => void;
};

export default function SuccessModal({ mensaje, onClose }: SuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg text-center space-y-4">
        <div className="mx-auto h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xl">
          ✓
        </div>

        <p className="text-slate-900 text-sm font-medium">{mensaje}</p>

        <button
          onClick={onClose}
          className="w-full px-4 py-2 rounded-md bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
