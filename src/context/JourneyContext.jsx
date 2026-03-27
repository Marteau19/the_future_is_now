import { createContext, useContext, useState, useEffect } from 'react'

const JourneyContext = createContext(null)

export function JourneyProvider({ children }) {
  const [currentStage, setCurrentStage] = useState(1)
  const [hasSystem, setHasSystem] = useState(false)
  const [tutorialSeen, setTutorialSeen] = useState({})

  // Load persisted state on mount
  useEffect(() => {
    const storedHasSystem = localStorage.getItem('ecoflo_hasSystem')
    const storedTutorial = localStorage.getItem('ecoflo_tutorialSeen')
    const storedStage = localStorage.getItem('ecoflo_currentStage')

    if (storedHasSystem === 'true') setHasSystem(true)
    if (storedTutorial) setTutorialSeen(JSON.parse(storedTutorial))
    if (storedStage) setCurrentStage(parseInt(storedStage, 10))
  }, [])

  function advanceStage(stage) {
    const next = stage || currentStage + 1
    setCurrentStage(next)
    localStorage.setItem('ecoflo_currentStage', String(next))
  }

  function completeInstallation() {
    setHasSystem(true)
    localStorage.setItem('ecoflo_hasSystem', 'true')
    advanceStage(7)
  }

  function markTutorialSeen(stage) {
    const updated = { ...tutorialSeen, [stage]: true }
    setTutorialSeen(updated)
    localStorage.setItem('ecoflo_tutorialSeen', JSON.stringify(updated))
  }

  function resetDemo() {
    localStorage.clear()
    setCurrentStage(1)
    setHasSystem(false)
    setTutorialSeen({})
  }

  return (
    <JourneyContext.Provider value={{
      currentStage,
      hasSystem,
      tutorialSeen,
      advanceStage,
      completeInstallation,
      markTutorialSeen,
      resetDemo,
    }}>
      {children}
    </JourneyContext.Provider>
  )
}

export function useJourney() {
  const ctx = useContext(JourneyContext)
  if (!ctx) throw new Error('useJourney must be used within JourneyProvider')
  return ctx
}
