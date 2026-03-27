const STAGE_LABELS = {
  1: 'Find My System',
  2: 'Create Account',
  3: 'Soil Analysis',
  4: 'Review & Approve',
  5: 'Schedule Install',
  6: 'Installation',
}

export default function ProgressBar({ stage }) {
  const label = STAGE_LABELS[stage] || ''
  const pct = Math.round((stage / 6) * 100)

  return (
    <div
      className="sticky top-0 z-30 px-4 pt-3 pb-2"
      style={{ background: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)' }}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
          Step {stage} of 6
        </span>
        <span className="text-xs font-medium" style={{ color: 'var(--color-brand)' }}>
          {label}
        </span>
      </div>
      <div className="h-1 rounded-full" style={{ background: 'var(--color-border)' }}>
        <div
          className="h-1 rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: 'var(--color-brand)' }}
        />
      </div>
    </div>
  )
}
