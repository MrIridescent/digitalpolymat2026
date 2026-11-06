import Image from 'next/image'
import { organizationFor } from '@/lib/organizations'

type OrgLogoProps = {
  /** Organization name exactly as it appears in the profile data. */
  name: string
  /** Height of the tile in pixels. Wordmarks get a wider tile. */
  size?: number
  className?: string
}

/**
 * A small identity plate for an organization.
 *
 * The tile is decorative by default: every use site already prints the
 * organization's name beside it, so repeating the name for screen readers
 * would only add noise. Unknown organizations fall back to a monogram rather
 * than a broken image.
 */
export function OrgLogo({ name, size = 40, className = '' }: OrgLogoProps) {
  const org = organizationFor(name)
  const wide = org.shape === 'wide'
  const width = wide ? Math.round(size * 1.85) : size
  const padding = org.bleed ? 0 : Math.max(2, Math.round(size * 0.1))
  const radius = Math.max(5, Math.round(size * 0.2))

  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden bg-white ring-1 ring-black/10 ${className}`}
      style={{
        width,
        height: size,
        borderRadius: radius,
      }}
      title={org.name}
    >
      {org.src ? (
        <Image
          src={org.src}
          alt=""
          width={width}
          height={size}
          unoptimized
          className="h-full w-full object-contain"
          style={{ padding }}
        />
      ) : (
        <span
          className="flex h-full w-full items-center justify-center overflow-hidden font-mono font-semibold leading-none tracking-tight text-[#101218]"
          style={{
            padding,
            fontSize: Math.round(
              size *
                (org.monogram.length > 2
                  ? 0.3
                  : org.monogram.length === 2
                    ? 0.42
                    : 0.5)
            ),
          }}
        >
          {org.monogram}
        </span>
      )}
    </span>
  )
}
