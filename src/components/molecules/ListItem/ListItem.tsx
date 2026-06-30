import { Link } from '@nextui-org/react'

import { RightArrowIcon } from '@/components/atoms/Icons'

export interface ListItemProps {
  label: string
  subtitle?: string | null
  count: number
  href: string
  children?: React.ReactNode
}

export function ListItem({ label, subtitle, count, href, children }: ListItemProps) {
  return (
    <Link
      className="px-6 block text-inherit transition-colors hover:bg-primary-10 dark:hover:bg-default-100"
      href={href}
    >
      <li className="py-5 flex flex-row items-center font-semibold border-b border-divider">
        {children}
        <div className="text-lg flex-grow">
          <div>{label}</div>
          {subtitle && <div className="text-md font-light mt-0.5">{subtitle}</div>}
        </div>
        <div className="text-right mr-1">{count}</div>
        <RightArrowIcon className="text-xl" />
      </li>
    </Link>
  )
}
