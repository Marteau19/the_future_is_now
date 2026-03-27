import { CheckCircle, Clock, Wrench } from 'lucide-react'

const ICONS = {
  installation: CheckCircle,
  maintenance:  Wrench,
  upcoming:     Clock,
}

const COLORS = {
  installation: 'var(--color-brand)',
  maintenance:  'var(--color-info)',
  upcoming:     'var(--color-text-disabled)',
}

export default function TimelineItem({ item, isLast }) {
  const Icon = ICONS[item.type] || CheckCircle
  const color = COLORS[item.type] || 'var(--color-brand)'

  return (
    <div className="flex gap-3">
      {/* Line */}
      <div className="flex flex-col items-center">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: item.type === 'upcoming' ? 'var(--color-surface-alt)' : 'var(--color-brand-light)' }}
        >
          <Icon size={16} style={{ color }} />
        </div>
        {!isLast && (
          <div className="w-px flex-1 mt-1" style={{ background: 'var(--color-border)', minHeight: '24px' }} />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-4">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{item.title}</p>
          <span className="text-xs" style={{ color: 'var(--color-text-disabled)' }}>
            {item.date}
          </span>
        </div>
        <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>{item.description}</p>
        {item.ref && (
          <span className="text-xs mt-1 inline-block" style={{ color: 'var(--color-brand)' }}>
            Ref: {item.ref}
          </span>
        )}
      </div>
    </div>
  )
}
