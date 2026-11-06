import { cn } from '@/lib/utils'

export type KineticIconName =
  | 'compass'
  | 'code'
  | 'workflow'
  | 'growth'
  | 'shield'
  | 'sparkles'
  | 'orbit'
  | 'layers'
  | 'wave'
  | 'arrow'

type KineticIconProps = {
  name: KineticIconName
  size?: number
  className?: string
  strokeWidth?: number
}

/**
 * Line icons with a small, continuous motion inside the SVG.
 *
 * The animation is pure CSS so the icons work in server components. The global
 * reduced-motion rule stops every keyframe for visitors who ask for it.
 */
export function KineticIcon({
  name,
  size = 24,
  className,
  strokeWidth = 1.5,
}: KineticIconProps) {
  const shared = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    className: cn('k-icon', className),
  }

  switch (name) {
    case 'compass':
    case 'orbit':
      return (
        <svg {...shared} className={cn(shared.className, 'k-icon--orbit')}>
          <circle cx="12" cy="12" r="9" opacity="0.45" />
          <g className="k-orbit-a" data-motion>
            <path d="M12 3.2 13.4 9 12 10.6 10.6 9Z" fill="currentColor" stroke="none" />
          </g>
          <g className="k-orbit-b" data-motion>
            <circle cx="12" cy="19.4" r="1.5" fill="currentColor" stroke="none" />
          </g>
          <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      )

    case 'code':
      return (
        <svg {...shared} className={cn(shared.className, 'k-icon--scan')}>
          <rect x="3" y="4.5" width="18" height="15" rx="2.5" opacity="0.45" />
          <path d="m8.2 9.4-2.6 2.6 2.6 2.6M15.8 9.4l2.6 2.6-2.6 2.6" />
          <path d="m13.2 8.6-2.4 6.8" opacity="0.7" />
          <line className="k-scan-line" x1="5.5" y1="12" x2="18.5" y2="12" />
        </svg>
      )

    case 'workflow':
    case 'layers':
      return (
        <svg {...shared} className={cn(shared.className, 'k-icon--layers')}>
          <path className="k-layer-3" d="M4 15.8 12 20l8-4.2" opacity="0.45" />
          <path className="k-layer-2" d="M4 11.6 12 15.8l8-4.2" opacity="0.7" />
          <path className="k-layer-1" d="M12 4 4 8.2l8 4.2 8-4.2Z" />
          <circle cx="12" cy="8.2" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      )

    case 'growth':
      return (
        <svg {...shared} className={cn(shared.className, 'k-icon--pulse')}>
          <path d="M4 19V5M4 19h16" opacity="0.45" />
          <path d="m7 15 4-4 3 2.6 4.5-6" />
          <path d="M15.4 7.6H19v3.6" />
          <circle cx="7" cy="15" r="1" fill="currentColor" stroke="none" />
        </svg>
      )

    case 'shield':
      return (
        <svg {...shared} className={cn(shared.className, 'k-icon--scan')}>
          <path d="M12 3.5 5 6.2v5.3c0 4.2 2.8 7.4 7 9 4.2-1.6 7-4.8 7-9V6.2Z" opacity="0.55" />
          <path d="m8.8 12.1 2.1 2.1 4.4-4.6" />
        </svg>
      )

    case 'sparkles':
      return (
        <svg {...shared} className={cn(shared.className, 'k-icon--pulse')}>
          <path d="M12 3.6c.5 3.5 1.8 4.8 5.4 5.4-3.6.6-4.9 1.9-5.4 5.4-.5-3.5-1.8-4.8-5.4-5.4 3.6-.6 4.9-1.9 5.4-5.4Z" />
          <path d="M18.4 14.2c.3 1.9 1 2.6 2.9 2.9-1.9.3-2.6 1-2.9 2.9-.3-1.9-1-2.6-2.9-2.9 1.9-.3 2.6-1 2.9-2.9Z" opacity="0.65" />
          <circle cx="7.4" cy="18.2" r="1.1" fill="currentColor" stroke="none" opacity="0.5" />
        </svg>
      )

    case 'wave':
      return (
        <svg {...shared} className={cn(shared.className, 'k-icon--draw')}>
          <path d="M2.5 12c2.2-4.4 4.4-4.4 6.6 0s4.4 4.4 6.6 0 4.4-4.4 5.8 0" />
        </svg>
      )

    case 'arrow':
      return (
        <svg {...shared} className={cn(shared.className, 'k-icon--float')}>
          <path d="M5 19 19 5M9.5 5H19v9.5" />
        </svg>
      )

    default:
      return (
        <svg {...shared}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      )
  }
}
