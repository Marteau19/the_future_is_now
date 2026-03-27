export default function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between mb-1">
      <div>
        <h1 className="font-bold text-2xl leading-tight" style={{ color: 'var(--color-text)' }}>{title}</h1>
        {subtitle && (
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  )
}
