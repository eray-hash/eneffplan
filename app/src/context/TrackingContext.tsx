import { createContext, useContext, useState, type ReactNode } from 'react'

export type ClockState = 'gestoppt' | 'laeuft' | 'pause'

interface TrackingContextValue {
  clockState: ClockState
  activeTaskId: string | null
  clockIn: () => void
  clockOut: () => void
  togglePause: () => void
  setActiveTask: (taskId: string | null) => void
}

const TrackingContext = createContext<TrackingContextValue | undefined>(undefined)

export function TrackingProvider({ children }: { children: ReactNode }) {
  const [clockState, setClockState] = useState<ClockState>('gestoppt')
  const [activeTaskId, setActiveTaskIdState] = useState<string | null>(null)

  const clockIn = () => {
    setClockState('laeuft')
    setActiveTaskIdState(null) // Standard: Zeit läuft zunächst auf "Intern", bis eine Aufgabe aktiv gezogen wird
  }
  const clockOut = () => {
    setClockState('gestoppt')
    setActiveTaskIdState(null)
  }
  const togglePause = () => setClockState((s) => (s === 'pause' ? 'laeuft' : 'pause'))
  const setActiveTask = (taskId: string | null) => setActiveTaskIdState(taskId)

  return (
    <TrackingContext.Provider value={{ clockState, activeTaskId, clockIn, clockOut, togglePause, setActiveTask }}>
      {children}
    </TrackingContext.Provider>
  )
}

export function useTracking() {
  const ctx = useContext(TrackingContext)
  if (!ctx) throw new Error('useTracking must be used within TrackingProvider')
  return ctx
}
