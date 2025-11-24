"use client";

type Props = {
  titulo?: string;
  children: any;
  onClose: () => void;
};

export default function Modal({ titulo, children, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 shadow-xl w-full max-w-md space-y-4">
        {titulo && <h2 className="text-xl font-semibold text-slate-900">{titulo}</h2>}
        <div>{children}</div>

        <div className="text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-md text-sm font-semibold"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
