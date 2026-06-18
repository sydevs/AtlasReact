import { lazy } from 'react'

/**
 * Lazily-loaded lightbox.
 *
 * `yet-another-react-lightbox` and its CSS are pulled in only when this chunk
 * loads — i.e. the first time a user opens a photo — so they stay out of the
 * initial bundle. Render it inside a `<Suspense>` boundary.
 */
export const Lightbox = lazy(() => import('./Lightbox').then((mod) => ({ default: mod.Lightbox })))

export type { LightboxProps, LightboxSlide } from './Lightbox'
