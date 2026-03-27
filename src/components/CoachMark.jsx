import { useTutorial } from '../context/TutorialContext'

export default function CoachMark() {
  const { currentStep, isActive, next, skip } = useTutorial()

  if (!isActive || !currentStep) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 fade-in"
        style={{ background: 'var(--color-overlay)' }}
        onClick={skip}
      />

      {/* Bubble */}
      <div
        className="fixed z-50 fade-in"
        style={{
          bottom: '120px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '280px',
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          padding: '20px',
        }}
      >
        {/* Arrow */}
        <div
          style={{
            position: 'absolute',
            bottom: '-8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '8px solid #fff',
          }}
        />

        <p className="font-semibold text-base mb-1" style={{ color: 'var(--color-text)' }}>
          {currentStep.title}
        </p>
        <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>
          {currentStep.text}
        </p>

        <div className="flex items-center justify-between">
          <button
            onClick={skip}
            className="text-sm"
            style={{ color: 'var(--color-text-disabled)' }}
          >
            Skip
          </button>
          <button
            onClick={next}
            className="text-sm font-semibold px-5 py-2 rounded-full text-white"
            style={{ background: 'var(--color-brand)' }}
          >
            Got it
          </button>
        </div>
      </div>
    </>
  )
}
