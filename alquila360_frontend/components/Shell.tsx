import Header from "./Header";
import Sidebar from "./Sidebar";
import SiteFooter from "./SiteFooter";

export default function Shell({ title, children }:{title:string, children:React.ReactNode}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header title={title} />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-6 grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          <Sidebar />
          <div>{children}</div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
