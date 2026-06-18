import { Link } from '@nextui-org/react'

import { UpArrowIcon } from '@/components/atoms/Icons'

interface ListHeaderProps {
  title: string
  returnLink: string
}

export function ListHeader({ title, returnLink }: ListHeaderProps) {
  return (
    <h1 className="text-2xl font-bold text-center p-2 flex flex-row items-center">
      <Link className="text-3xl" href={returnLink}>
        <UpArrowIcon />
      </Link>
      <span className="flex-grow">{title}</span>
    </h1>
  )
}
