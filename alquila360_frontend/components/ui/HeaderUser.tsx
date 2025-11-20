export default function HeaderUser() {
  return (
    <header className="w-full bg-white shadow h-16 flex items-center justify-between px-8">
      <img src="/logo.png" className="h-10" />

      <div className="flex items-center gap-6">
        <img src="/icon-bell.png" className="h-6 cursor-pointer" />
        <img src="/icon-user.png" className="h-8 cursor-pointer" />
      </div>
    </header>
  );
}
