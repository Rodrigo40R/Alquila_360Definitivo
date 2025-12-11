type Props = {
  label: string;
  type?: string;
  value?: any;
  defaultValue?: any;
  placeholder?: string;
  onChange?: (e: any) => void;
  required?: boolean;
};

export default function Input({
  label,
  type = "text",
  value,
  defaultValue,
  placeholder,
  onChange,
  required = false,
}: Props) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-slate-600">{label}</label>

      <input
        type={type}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2"
      />
    </div>
  );
}
