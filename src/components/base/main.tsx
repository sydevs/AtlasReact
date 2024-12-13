import { useBreakpoint } from "@/config/responsive";

type Props = {
  children: React.ReactNode;
  width?: number | undefined;
}

export function Main({
  width = 400,
  children
} : Props) {
  const { isMd } = useBreakpoint("md");
  const { isLg } = useBreakpoint("lg");

  return (
    <main
      className={`
        flex flex-col md:max-lg:flex-grow
        pointer-events-auto overflow-y-scroll
        md:max-lg:bg-background
        md:shadow-md
        lg:m-16
        relative
      `}
      style={isMd && { width: isLg ? width : 400 } || {}}
    >
      {children}
    </main>
  );
}
