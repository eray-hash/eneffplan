import { useState } from 'react'
import { Badge } from '../components/ui/Badge'
import { Card, CardHeader } from '../components/ui/Card'
import { employees, projects, tasks } from '../data/mockData'

type ClockState = 'gestoppt' | 'laeuft' | 'pause'

export function Zeiterfassung() {
  const me = employees[0]
  const myTasks = tasks.filter((t) => t.assigneeId === me.id && t.status !== 'erledigt')
  const [state, setState] = useState<ClockState>('gestoppt')
  const [activeTaskId, setActiveTaskId] = useState<string | null>(myTasks[0]?.id ?? null)

  const stateLabel: Record<ClockState, string> = { gestoppt: 'Nicht eingestempelt', laeuft: 'Aktiv', pause: 'Pause' }
  const stateTone: Record<ClockState, 'neutral' | 'green' | 'amber'> = { gestoppt: 'neutral', laeuft: 'green', pause: 'amber' }

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Zeiterfassung</h1>
      <p className="mb-6 mt-1 text-sm text-slate-500">Ein-/Ausstempeln, Pausen und Projektzuordnung an einem Ort.</p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-medium text-slate-500">Status</div>
              <div className="mt-1 flex items-center gap-2">
                <Badge tone={stateTone[state]}>{stateLabel[state]}</Badge>
                {state !== 'gestoppt' && <span className="text-sm text-slate-400">seit 08:42</span>}
              </div>
            </div>
            <div className="flex gap-2">
              {state === 'gestoppt' && (
                <button onClick={() => setState('laeuft')} className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">
                  Einstempeln
                </button>
              )}
              {state === 'laeuft' && (
                <>
                  <button onClick={() => setState('pause')} className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600">
                    Pause
                  </button>
                  <button onClick={() => setState('gestoppt')} className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200">
                    Ausstempeln
                  </button>
                </>
              )}
              {state === 'pause' && (
                <button onClick={() => setState('laeuft')} className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">
                  Fortsetzen
                </button>
              )}
            </div>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-5 dark:border-slate-800">
            <div className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">Woran arbeitest du gerade?</div>
            <div className="space-y-2">
              {myTasks.map((t) => {
                const project = projects.find((p) => p.id === t.projectId)!
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTaskId(t.id)}
                    className={`flex w-full items-center justify-between rounded-lg border px-3.5 py-2.5 text-left text-sm transition-colors ${
                      activeTaskId === t.id
                        ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20'
                        : 'border-slate-100 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <span>
                      <span className="font-medium text-slate-800 dark:text-slate-100">{t.title}</span>
                      <span className="ml-2 text-xs text-slate-400">
                        #{project.number} · {project.customerName}
                      </span>
                    </span>
                    <span className="text-xs text-slate-400">
                      {t.usedHours}h / {t.budgetHours}h
                    </span>
                  </button>
                )
              })}
              <button className="flex w-full items-center justify-between rounded-lg border border-dashed border-slate-200 px-3.5 py-2.5 text-left text-sm text-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/50">
                Interne Zeit (Meeting, Pause, Verwaltung) buchen
              </button>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="Heute" />
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span className="text-slate-500">Gebucht</span>
              <span className="font-medium text-slate-800 dark:text-slate-100">3,5 h</span>
            </li>
            <li className="flex justify-between">
              <span className="text-slate-500">Pause</span>
              <span className="font-medium text-slate-800 dark:text-slate-100">0,5 h</span>
            </li>
            <li className="flex justify-between border-t border-slate-100 pt-2 dark:border-slate-800">
              <span className="text-slate-500">Tagesziel</span>
              <span className="font-medium text-slate-800 dark:text-slate-100">8 h</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
