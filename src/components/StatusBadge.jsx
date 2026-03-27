const STYLES = {
  healthy:  { bg: 'var(--color-brand-light)',  text: 'var(--color-brand)',   label: 'Healthy'  },
  warning:  { bg: '#FEF3C7',                   text: 'var(--color-warning)', label: 'Attention'  },
  critical: { bg: '#FEE2E2',                   text: 'var(--color-danger)',  label: 'Critical' },
}

export default function StatusBadge({ status }) {
  const s = STYLES[status] || STYLES.healthy
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: s.bg, color: s.text }}
    >
      {s.label}
    </span>
  )
}
