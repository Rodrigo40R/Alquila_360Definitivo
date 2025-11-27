"use client";

export default function ContactoPage() {
  return (
    <div className="space-y-12 max-w-3xl">
      <h1 className="text-4xl font-bold text-slate-900">Contacto</h1>

      <p className="text-slate-700 text-lg">
        Si deseas comunicarte con nosotros, podemos ayudarte por estos medios:
      </p>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <Item label="Teléfono" value="+591 700-00000" />
        <Item label="Email" value="contacto@alquila360.com" />
        <Item label="WhatsApp" value="+591 700-00000" />
        <Item label="Dirección" value="Cochabamba, Bolivia" />
      </div>

      <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md font-semibold">
        Enviar mensaje
      </button>
    </div>
  );
}

function Item({ label, value }: any) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-slate-600">{label}</span>
      <span className="font-semibold text-slate-900">{value}</span>
    </div>
  );
}
