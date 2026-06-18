import { ScrollShadow } from '@nextui-org/react'

export function List({ children }: { children: React.ReactNode }) {
  return (
    <ScrollShadow>
      <ul className="overflow-y-auto scroll-p-0 scroll-m-0">{children}</ul>
    </ScrollShadow>
  )
}
