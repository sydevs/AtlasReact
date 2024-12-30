import { useBreakpoint } from "@/config/responsive";

type Props = {
  children: React.ReactNode;
  mapWindow?: number;
  footerHeight?: number;
  width?: number | undefined;
}

export function Main({
  width = 400,
  mapWindow,
  footerHeight = 300,
  children
} : Props) {
  const { isMd } = useBreakpoint("md");
  const { isLg } = useBreakpoint("lg");

  return (
    <main
      id='main'
      className={`
        flex flex-col flex-grow lg:flex-grow-0
        pointer-events-auto md:overflow-y-scroll
        md:max-lg:bg-background
        md:shadow-md
        lg:m-16
        relative
      `}
      style={
        isMd ? 
          { width: isLg ? width : 400 } : 
          { marginTop: mapWindow ? `${mapWindow}px` : `calc(100dvh - ${footerHeight}px)` }}
    >
      {children}
      <div className="flex-grow bg-white"></div>
    </main>
  );
}
