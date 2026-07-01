import { Link } from '@/components/atoms/Link'
import { UpArrowIcon } from '@/components/atoms/Icons'

export interface ListHeaderProps {
  title: string
  backHref: string
}

/**
 * Sub-component of `List`: a centered title with an up-arrow back link, rendered
 * above a `List` to navigate up the country → region → area hierarchy.
 */
export function ListHeader({ title, backHref }: ListHeaderProps) {
  return (
    <h1 className="text-lg font-bold text-center p-2 flex flex-row items-center">
      <Link href={backHref}>
        <UpArrowIcon />
      </Link>
      <span className="flex-grow">{title}</span>
    </h1>
  )
}
