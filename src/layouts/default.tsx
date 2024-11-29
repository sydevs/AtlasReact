import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hasNavbar = true;

  return (
    <>
      <div className="fixed w-screen h-screen z-50 pointer-events-none">
        {hasNavbar && <Navbar />}
        <main className='container w-sm m-auto'>
          {children}
        </main>
      </div>
    </>
  );
}
