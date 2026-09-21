import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '../components/ui/Badge'
import { Card } from '../components/ui/Card'
import { ProgressBar } from '../components/ui/ProgressBar'
import { projectHours, projectProgress, projects, type ProjectStatus } from '../data/mockData'

const statusLabel: Record<ProjectStatus, string> = {
  aktiv: 'Aktiv',
  wartet_auf_kunde: 'Wartet auf Kunde',
  standby: 'Stillstand',
  abgeschlossen: 'Abgeschlossen',
}

const statusTone: Record<ProjectStatus, 'green' | 'amber' | 'red' | 'neutral'> = {
  aktiv: 'green',
  wartet_auf_kunde: 'amber',
  standby: 'red',
  abgeschlossen: 'neutral',
}

const filters: { key: 'alle' | ProjectStatus; label: string }[] = [
  { key: 'alle', label: 'Alle' },
  { key: 'aktiv', label: 'Aktiv' },
  { key: 'wartet_auf_kunde', label: 'Wartet auf Kunde' },
  { key: 'standby', label: 'Stillstand' },
  { key: 'abgeschlossen', label: 'Abgeschlossen' },
]

export function Projekte() {
  const [filter, setFilter] = useState<'alle' | ProjectStatus>('alle')
  const visible = filter === 'alle' ? projects : projects.filter((p) => p.status === filter)

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Projekte</h1>
      <p className="mb-6 mt-1 text-sm text-slate-500">
        Alle Kundenprojekte an einem Ort — statt verteilt über Excel, Crewmeister und OneDrive.
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
              filter === f.key
                ? 'bg-brand-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <Card className="p-0">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400 dark:border-slate-800">
              <th className="px-5 py-3 font-medium">Projekt</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Meilensteine</th>
              <th className="px-5 py-3 font-medium">Stunden</th>
              <th className="px-5 py-3 font-medium">Letzte Aktivität</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((p) => {
              const progress = projectProgress(p.id)
              const hours = projectHours(p.id)
              const hoursPercent = hours.budget > 0 ? Math.round((hours.used / hours.budget) * 100) : 0
              return (
                <tr key={p.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50">
                  <td className="px-5 py-3.5">
                    <Link to={`/projekte/${p.id}`} className="font-medium text-slate-800 hover:text-brand-700 dark:text-slate-100">
                      #{p.number} · {p.customerName}
                    </Link>
                    <div className="text-xs text-slate-400">{p.title}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge tone={statusTone[p.status]}>{statusLabel[p.status]}</Badge>
                  </td>
                  <td className="px-5 py-3.5 text-slate-600 dark:text-slate-300">
                    {progress.done} / {progress.total}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-20">
                        <ProgressBar value={hoursPercent} tone={hoursPercent > 100 ? 'red' : 'blue'} />
                      </div>
                      <span className="text-xs text-slate-500">{hoursPercent}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-slate-500">{p.lastActivity}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
