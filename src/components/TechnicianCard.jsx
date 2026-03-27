import { Star } from 'lucide-react'

export default function TechnicianCard({ name = 'Marc Bouchard', rating = 4.9, note }) {
  return (
    <div
      className="flex items-center gap-3 p-4 rounded-card"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Avatar placeholder */}
      <div
        className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
        style={{ background: 'var(--color-brand-muted)' }}
      >
        {name.split(' ').map(n => n[0]).join('')}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{name}</p>
        <div className="flex items-center gap-1 mt-0.5">
          <Star size={12} fill="var(--color-warning)" stroke="none" />
          <span className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>{rating}</span>
          <span className="text-xs" style={{ color: 'var(--color-text-disabled)' }}>· Certified technician</span>
        </div>
        {note && <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>{note}</p>}
      </div>
    </div>
  )
}
