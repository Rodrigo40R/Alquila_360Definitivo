// components/SuccessModal.tsx
"use client";

interface Props {
  open: boolean;
  message: string;
  onClose: () => void;
  buttonLabel?: string;
}

export default function SuccessModal({
  open,
  message,
  onClose,
  buttonLabel = "Ok",
}: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <span className="material-icons text-3xl text-green-500">check</span>
        </div>
        <p className="mb-6 text-center text-sm text-gray-700">{message}</p>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="rounded-md bg-teal-500 px-6 py-2 text-sm font-semibold text-white hover:bg-teal-600"
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
