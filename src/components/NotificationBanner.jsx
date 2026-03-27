import { useState } from 'react'
import { Info, AlertTriangle, AlertCircle, X } from 'lucide-react'

const TYPES = {
  info:     { icon: Info,          bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE' },
  warning:  { icon: AlertTriangle, bg: '#FFFBEB', text: '#92400E', border: '#FDE68A' },
  critical: { icon: AlertCircle,   bg: '#FEF2F2', text: '#991B1B', border: '#FECACA' },
}

export default function NotificationBanner({ type = 'info', message, dismissible = true }) {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  const { icon: Icon, bg, text, border } = TYPES[type]

  return (
    <div
      className="flex items-start gap-3 p-3 rounded-card fade-in"
      style={{ background: bg, border: `1px solid ${border}` }}
    >
      <Icon size={16} style={{ color: text, flexShrink: 0, marginTop: 2 }} />
      <p className="flex-1 text-sm" style={{ color: text }}>{message}</p>
      {dismissible && (
        <button onClick={() => setDismissed(true)}>
          <X size={16} style={{ color: text }} />
        </button>
      )}
    </div>
  )
}
