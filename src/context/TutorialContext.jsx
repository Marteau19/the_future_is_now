import { createContext, useContext, useState } from 'react'
import { useJourney } from './JourneyContext'
import { TUTORIAL_STEPS } from '../data/tutorial'

const TutorialContext = createContext(null)

export function TutorialProvider({ children }) {
  const { currentStage, tutorialSeen, markTutorialSeen } = useJourney()
  const [stepIndex, setStepIndex] = useState(0)
  const [dismissed, setDismissed] = useState(false)

  const steps = TUTORIAL_STEPS[currentStage] || []
  const isSeen = tutorialSeen[currentStage]
  const isActive = !isSeen && !dismissed && steps.length > 0
  const currentStep = isActive ? steps[stepIndex] : null

  function next() {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1)
    } else {
      markTutorialSeen(currentStage)
      setStepIndex(0)
    }
  }

  function skip() {
    setDismissed(true)
    markTutorialSeen(currentStage)
    setStepIndex(0)
  }

  function resetForStage() {
    setStepIndex(0)
    setDismissed(false)
  }

  return (
    <TutorialContext.Provider value={{ currentStep, isActive, next, skip, resetForStage }}>
      {children}
    </TutorialContext.Provider>
  )
}

export function useTutorial() {
  const ctx = useContext(TutorialContext)
  if (!ctx) throw new Error('useTutorial must be used within TutorialProvider')
  return ctx
}
