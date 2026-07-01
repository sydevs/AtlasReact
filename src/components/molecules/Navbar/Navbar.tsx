import { type ComponentProps } from 'react'

import { ThemeSwitch } from './ThemeSwitch'
import { LanguageSelector } from './LanguageSelector'

import { siteConfig } from '@/config/site'
import { Link } from '@/components/atoms/Link'
import { Logo } from '@/components/atoms/Icons'

// Custom top bar built from primitives (no NextUI Navbar suite). Brand + desktop
// nav links on the left, theme/language actions on the right; the language
// selector collapses below `sm`, matching the previous responsive behavior. The
// old NextUI mobile menu was gated behind a commented-out toggle (never visible),
// so it's intentionally not carried over.
export type NavbarProps = ComponentProps<'nav'>

export const Navbar = ({ className, ...props }: NavbarProps) => {
  return (
    <nav className={`w-full bg-background ${className ?? ''}`} {...props}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-3">
          <Link className="flex items-center justify-start gap-1" color="foreground" href="/">
            <Logo />
            <p className="font-bold text-inherit">ATLAS</p>
          </Link>

          <div className="ml-2 hidden justify-start gap-4 lg:flex">
            {siteConfig.navItems.map((item) => (
              <Link
                key={item.href}
                className="data-[active=true]:text-primary data-[active=true]:font-medium"
                color="foreground"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeSwitch />
          <div className="hidden sm:flex">
            <LanguageSelector />
          </div>
        </div>
      </div>
    </nav>
  )
}
