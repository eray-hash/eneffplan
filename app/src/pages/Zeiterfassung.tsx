import { Link } from 'react-router-dom'
import { Badge } from '../components/ui/Badge'
import { Card, CardHeader } from '../components/ui/Card'
import { useTracking } from '../context/TrackingContext'
import { projects, tasks } from '../data/mockData'

export function Zeiterfassung() {
  const { clockState, activeTaskId, clockIn, clockOut, togglePause } = useTracking()
  const activeTask = tasks.find((t) => t.id === activeTaskId)
  const activeProject = activeTask ? projects.find((p) => p.id === activeTask.projectId) : undefined

  const stateLabel: Record<typeof clockState, string> = { gestoppt: 'Nicht eingestempelt', laeuft: 'Aktiv', pause: 'Pause' }
  const stateTone: Record<typeof clockState, 'neutral' | 'green' | 'amber'> = { gestoppt: 'neutral', laeuft: 'green', pause: 'amber' }

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Zeiterfassung</h1>
      <p className="mb-6 mt-1 text-sm text-slate-500">
        Ein-/Ausstempeln und Pausen. Welches Projekt gerade läuft, bestimmst du über das{' '}
        <Link to="/kanban" className="text-brand-700 underline">
          Kanban-Board
        </Link>
        .
      </p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-medium text-slate-500">Status</div>
              <div className="mt-1 flex items-center gap-2">
                <Badge tone={stateTone[clockState]}>{stateLabel[clockState]}</Badge>
                {clockState !== 'gestoppt' && <span className="text-sm text-slate-400">seit 08:42</span>}
              </div>
            </div>
            <div className="flex gap-2">
              {clockState === 'gestoppt' && (
                <button onClick={clockIn} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">
                  Einstempeln
                </button>
              )}
              {clockState === 'laeuft' && (
                <>
                  <button
                    onClick={togglePause}
                    className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600"
                  >
                    Pause
                  </button>
                  <button
                    onClick={clockOut}
                    className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-300"
                  >
                    Ausstempeln
                  </button>
                </>
              )}
              {clockState === 'pause' && (
                <button
                  onClick={togglePause}
                  className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
                >
                  Fortsetzen
                </button>
              )}
            </div>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-5">
            <div className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">Aktuell gebucht auf</div>
            {clockState === 'gestoppt' ? (
              <p className="text-sm text-slate-400">Noch nicht eingestempelt.</p>
            ) : activeTask && activeProject ? (
              <div className="flex items-center justify-between rounded-lg border border-brand-200 bg-brand-50 px-3.5 py-3">
                <div>
                  <div className="text-sm font-medium text-slate-800">{activeTask.title}</div>
                  <div className="text-xs text-slate-500">
                    #{activeProject.number} · {activeProject.customerName}
                  </div>
                </div>
                <Badge tone="green">● Läuft</Badge>
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-slate-200 px-3.5 py-3">
                <div className="text-sm font-medium text-slate-600">Intern (kein Projekt aktiv)</div>
                <p className="mt-1 text-xs text-slate-400">
                  Zeit läuft auf interne Kosten, solange keine Aufgabe im{' '}
                  <Link to="/kanban" className="text-brand-700 underline">
                    Kanban-Board
                  </Link>{' '}
                  auf "In Bearbeitung" liegt.
                </p>
              </div>
            )}
          </div>
        </Card>

        <Card>
          <CardHeader title="Heute" />
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span className="text-slate-500">Gebucht</span>
              <span className="font-medium text-slate-800">3,5 h</span>
            </li>
            <li className="flex justify-between">
              <span className="text-slate-500">Pause</span>
              <span className="font-medium text-slate-800">0,5 h</span>
            </li>
            <li className="flex justify-between border-t border-slate-100 pt-2">
              <span className="text-slate-500">Tagesziel</span>
              <span className="font-medium text-slate-800">8 h</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
