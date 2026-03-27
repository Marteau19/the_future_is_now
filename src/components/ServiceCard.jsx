export default function ServiceCard({ icon: Icon, title, description, price, recommended, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-4 rounded-card transition-all"
      style={{
        background: selected ? 'var(--color-brand-light)' : 'var(--color-surface)',
        border: `2px solid ${selected ? 'var(--color-brand)' : 'var(--color-border)'}`,
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ background: selected ? 'var(--color-brand)' : 'var(--color-surface-alt)' }}
        >
          <Icon size={20} strokeWidth={1.5} color={selected ? '#fff' : 'var(--color-text-secondary)'} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{title}</span>
            {recommended && (
              <span
                className="px-2 py-0.5 rounded-full text-xs font-semibold"
                style={{ background: 'var(--color-brand)', color: '#fff' }}
              >
                Recommended
              </span>
            )}
          </div>
          <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>{description}</p>
        </div>
        {price && (
          <span className="text-sm font-semibold flex-shrink-0" style={{ color: 'var(--color-text)' }}>
            ${price}
          </span>
        )}
      </div>
    </button>
  )
}
