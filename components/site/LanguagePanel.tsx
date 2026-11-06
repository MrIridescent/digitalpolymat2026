import { Languages } from 'lucide-react'
import { languages } from '@/lib/profile'
import { cn } from '@/lib/utils'

export function LanguagePanel({
  compact = false,
  tone = 'dark',
}: {
  compact?: boolean
  tone?: 'dark' | 'light'
}) {
  const light = tone === 'light'

  return (
    <div className={light ? 'rounded-2xl border border-black/10 bg-white/60 p-6 sm:p-7' : 'glass-panel p-6 sm:p-7'}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className={cn(
              'font-mono text-[0.6rem] uppercase tracking-[0.16em]',
              light ? 'text-[#6b6d74]' : 'text-white/35'
            )}
          >
            Languages
          </p>
          <h3
            className={cn(
              'mt-2 text-lg font-semibold',
              light ? 'text-[#15161a]' : 'text-white'
            )}
          >
            Six languages, honestly levelled
          </h3>
        </div>
        <span
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-xl border',
            light
              ? 'border-black/10 bg-white text-[#15161a]'
              : 'border-white/10 bg-white/5 text-white/70'
          )}
        >
          <Languages className="h-4 w-4" strokeWidth={1.7} />
        </span>
      </div>

      <div className="mt-4">
        {languages.map((language) => (
          <div
            key={language.name}
            className="language-pill"
            style={light ? { borderColor: 'rgba(0, 0, 0, 0.1)' } : undefined}
          >
            <div className="min-w-0">
              <p
                className={cn(
                  'text-sm font-medium',
                  light ? 'text-[#15161a]' : 'text-white'
                )}
              >
                {language.name}
              </p>
              {!compact && (
                <p
                  className={cn(
                    'mt-0.5 text-xs leading-relaxed',
                    light ? 'text-[#5d5f66]' : 'text-white/40'
                  )}
                >
                  {language.note}
                </p>
              )}
            </div>
            <span
              className={cn(
                'shrink-0 font-mono text-[0.58rem] uppercase tracking-[0.12em]',
                light ? 'text-[#6b6d74]' : 'text-white/35'
              )}
            >
              {language.level}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
