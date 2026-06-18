import type { StoryDefault } from '@ladle/react'

import {
  SearchIcon,
  CloseIcon,
  ShareIcon,
  UpArrowIcon,
  DownArrowIcon,
  RightArrowIcon,
  Logo,
  CalendarIcon,
  LocationIcon,
  CallIcon,
  LanguageIcon,
  EventIcon,
  SocialIcon,
} from '@/components/atoms'

export default { title: 'Atoms / Icons' } satisfies StoryDefault

const ICONS = [
  { name: 'SearchIcon', Icon: SearchIcon },
  { name: 'CloseIcon', Icon: CloseIcon },
  { name: 'ShareIcon', Icon: ShareIcon },
  { name: 'UpArrowIcon', Icon: UpArrowIcon },
  { name: 'DownArrowIcon', Icon: DownArrowIcon },
  { name: 'RightArrowIcon', Icon: RightArrowIcon },
  { name: 'Logo', Icon: Logo },
  { name: 'CalendarIcon', Icon: CalendarIcon },
  { name: 'LocationIcon', Icon: LocationIcon },
  { name: 'CallIcon', Icon: CallIcon },
  { name: 'LanguageIcon', Icon: LanguageIcon },
  { name: 'EventIcon', Icon: EventIcon },
]

const SOCIAL_PLATFORMS = ['email', 'facebook', 'youtube']

export const Gallery = () => (
  <div className="flex flex-wrap gap-6">
    {ICONS.map(({ name, Icon }) => (
      <div key={name} className="flex w-20 flex-col items-center gap-2 text-center">
        <Icon size={28} />
        <span className="text-tiny text-default-500">{name}</span>
      </div>
    ))}
  </div>
)

export const Socials = () => (
  <div className="flex flex-wrap gap-6">
    {SOCIAL_PLATFORMS.map((platform) => (
      <div key={platform} className="flex w-20 flex-col items-center gap-2 text-center">
        <SocialIcon platform={platform} size={28} />
        <span className="text-tiny text-default-500">{platform}</span>
      </div>
    ))}
  </div>
)
