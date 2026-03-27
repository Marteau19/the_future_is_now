export default function StepIndicator({ total, current }) {
  return (
    <div className="flex gap-2 justify-center py-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-300"
          style={{
            width: i === current ? '20px' : '6px',
            height: '6px',
            background: i <= current ? 'var(--color-brand)' : 'var(--color-border)',
          }}
        />
      ))}
    </div>
  )
}
