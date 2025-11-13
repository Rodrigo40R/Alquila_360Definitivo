import { Ic } from "./icons";
import AvatarMenu from "./AvatarMenu";

export default function Header({ title }: { title: string }) {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Ic.Logo />
          <span className="text-slate-700">| {title}</span>
        </div>
        <AvatarMenu />
      </div>
    </header>
  );
}
