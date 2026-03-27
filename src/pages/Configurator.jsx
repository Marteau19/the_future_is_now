import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, Leaf } from 'lucide-react'
import ProgressBar from '../components/ProgressBar'
import StepIndicator from '../components/StepIndicator'
import CoachMark from '../components/CoachMark'

const QUESTIONS = [
  {
    id: 'type',
    question: 'What type of property?',
    options: ['Primary Residence', 'Cottage or Seasonal', 'Small Commercial'],
  },
  {
    id: 'bedrooms',
    question: 'How many bedrooms (or equivalent users)?',
    options: ['1–2', '3–4', '5+'],
  },
  {
    id: 'soil',
    question: 'What do you know about your soil?',
    options: ['Unknown (need a test)', 'Sandy or Permeable', 'Clay or Dense', 'High water table'],
  },
]

const RESULT = {
  recommended: 'Ecoflo Compact Biofilter EC-5',
  reasons: [
    'Ideal for primary residences with 3–4 bedrooms',
    'Works in a wide range of soil conditions',
    'Uses 50% less space than traditional systems',
    'Energy-free, no mechanical components',
  ],
  filterType: 'Coconut husk (coco) — 100% natural and compostable',
  warrantyYears: 10,
}

export default function Configurator() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResult, setShowResult] = useState(false)

  function selectOption(questionId, option) {
    const next = { ...answers, [questionId]: option }
    setAnswers(next)
    if (step < QUESTIONS.length - 1) {
      setTimeout(() => setStep(s => s + 1), 200)
    } else {
      setTimeout(() => setShowResult(true), 300)
    }
  }

  const q = QUESTIONS[step]

  return (
    <div className="app-shell">
      <ProgressBar stage={1} />
      <CoachMark />

      <div className="px-5 pt-6 pb-24 page-enter">
        {!showResult ? (
          <>
            <StepIndicator total={QUESTIONS.length} current={step} />
            <h2 className="text-2xl font-bold mt-4 mb-6" style={{ color: 'var(--color-text)' }}>
              {q.question}
            </h2>

            <div id="question-cards" className="space-y-3">
              {q.options.map(opt => {
                const selected = answers[q.id] === opt
                return (
                  <button
                    key={opt}
                    onClick={() => selectOption(q.id, opt)}
                    className="w-full text-left px-4 py-4 rounded-card font-medium text-sm transition-all"
                    style={{
                      background: selected ? 'var(--color-brand-light)' : 'var(--color-surface)',
                      border: `2px solid ${selected ? 'var(--color-brand)' : 'var(--color-border)'}`,
                      color: 'var(--color-text)',
                    }}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
          </>
        ) : (
          <div id="result-cta" className="fade-in">
            {/* Hero */}
            <div
              className="rounded-card p-5 mb-5"
              style={{ background: 'var(--color-brand-light)', border: '1.5px solid var(--color-brand)' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Leaf size={18} style={{ color: 'var(--color-brand)' }} />
                <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--color-brand)' }}>
                  Your recommended system
                </span>
              </div>
              <h2 className="text-xl font-bold mt-1" style={{ color: 'var(--color-text)' }}>
                {RESULT.recommended}
              </h2>
              <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                Filter: {RESULT.filterType}
              </p>
              <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                Warranty: {RESULT.warrantyYears} years
              </p>
            </div>

            {/* Reasons */}
            <div className="space-y-2.5 mb-8">
              {RESULT.reasons.map(r => (
                <div key={r} className="flex items-start gap-2.5">
                  <CheckCircle size={16} style={{ color: 'var(--color-brand)', flexShrink: 0, marginTop: 2 }} />
                  <p className="text-sm" style={{ color: 'var(--color-text)' }}>{r}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('/account/create')}
              className="w-full py-4 rounded-card font-semibold text-white text-base"
              style={{ background: 'var(--color-brand)' }}
            >
              This is my system — Create my account
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
