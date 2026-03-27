export default function HealthRing({ score = 92, size = 140 }) {
  const r = (size - 16) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (score / 100) * circ

  const color = score >= 75 ? 'var(--color-brand)'
    : score >= 50 ? 'var(--color-warning)'
    : 'var(--color-danger)'

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={8}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-bold" style={{ fontSize: '1.75rem', color, lineHeight: 1 }}>{score}</span>
        <span className="text-xs font-medium mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>/100</span>
      </div>
    </div>
  )
}
