export default function PerfilProveedor() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Perfil del Proveedor</h1>

      <div className="bg-white shadow-md rounded-xl p-6 max-w-xl">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Nombre completo
          </label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="Ej: Mario Gutiérrez"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
            placeholder="ejemplo@mail.com"
          />
        </div>

        <button
          type="button"
          className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg transition-colors shadow-sm"
        >
          Guardar cambios
        </button>
      </div>
    </div>
  );
}
