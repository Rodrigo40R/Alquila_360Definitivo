export default function SuccessModal({ message, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center w-[400px]">
        <img src="/check.png" className="h-16 mx-auto mb-4" />
        <p className="text-lg mb-4">{message}</p>

        <button
          onClick={onClose}
          className="bg-red-500 text-white px-6 py-2 rounded font-semibold"
        >
          OK
        </button>
      </div>
    </div>
  );
}
