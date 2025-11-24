type Props = {
  tipo: "success" | "error" | "warning";
  mensaje: string;
};

export default function Alert({ tipo, mensaje }: Props) {
  const estilos = {
    success: "bg-emerald-100 text-emerald-700",
    error: "bg-red-100 text-red-700",
    warning: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className={`px-4 py-2 rounded-md text-sm ${estilos[tipo]}`}>
      {mensaje}
    </div>
  );
}
