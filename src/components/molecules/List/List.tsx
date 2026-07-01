// A scrollable list wrapper. The surrounding Panel is the actual scroll
// container (`md:overflow-y-scroll`), so this is a plain styled `<ul>` — the
// NextUI ScrollShadow it replaced couldn't show edge fades in this layout
// (the `<ul>` never scrolls), so no shadow machinery is carried over.
export function List({ children }: { children: React.ReactNode }) {
  return <ul className="overflow-y-auto scroll-p-0 scroll-m-0">{children}</ul>
}
