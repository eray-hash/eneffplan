import { Link, useParams } from 'react-router-dom'
import { Badge } from '../components/ui/Badge'
import { Card, CardHeader } from '../components/ui/Card'
import { ProgressBar } from '../components/ui/ProgressBar'
import { useRole } from '../context/RoleContext'
import { employees, invoices, milestones, projectHours, projectMargin, projects, tasks, type MilestoneStatus, type TaskStatus } from '../data/mockData'

const milestoneStatusLabel: Record<MilestoneStatus, string> = {
  offen: 'Offen',
  erreicht: 'Erreicht — Rechnung fällig',
  rechnung_gestellt: 'Rechnung gestellt',
  bezahlt: 'Bezahlt',
}
const milestoneTone: Record<MilestoneStatus, 'neutral' | 'green' | 'blue' | 'amber'> = {
  offen: 'neutral',
  erreicht: 'amber',
  rechnung_gestellt: 'blue',
  bezahlt: 'green',
}
const taskStatusLabel: Record<TaskStatus, string> = { offen: 'Offen', in_bearbeitung: 'In Bearbeitung', erledigt: 'Erledigt' }

const currency = (n: number) => n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })

export function ProjektDetail() {
  const { id } = useParams()
  const { role } = useRole()
  const project = projects.find((p) => p.id === id)

  if (!project) {
    return (
      <div>
        <p className="text-sm text-slate-500">Projekt nicht gefunden.</p>
        <Link to="/projekte" className="text-sm text-brand-700">
          Zurück zur Übersicht
        </Link>
      </div>
    )
  }

  const projectMilestones = milestones.filter((m) => m.projectId === project.id)
  const hours = projectHours(project.id)
  const hoursPercent = hours.budget > 0 ? Math.round((hours.used / hours.budget) * 100) : 0
  const margin = projectMargin(project)
  const projectInvoices = invoices.filter((i) => i.projectId === project.id)

  return (
    <div>
      <Link to="/projekte" className="text-sm text-slate-400 hover:text-slate-600">
        ← Zurück zur Projektübersicht
      </Link>
      <div className="mt-2 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            #{project.number} · {project.customerName}
          </h1>
          <p className="mt-1 text-sm text-slate-500">{project.title}</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-400">Angebotssumme</div>
          <div className="text-lg font-semibold text-slate-800 dark:text-slate-100">{currency(project.offerAmount)}</div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader title="Meilensteine" subtitle="Bei Abschluss aller Aufgaben eines Meilensteins wird die Teilrechnung automatisch vorgeschlagen" />
            <ul className="space-y-3">
              {projectMilestones.map((m) => {
                const milestoneTasks = tasks.filter((t) => t.milestoneId === m.id)
                const allDone = milestoneTasks.length > 0 && milestoneTasks.every((t) => t.status === 'erledigt')
                return (
                  <li key={m.id} className="rounded-lg border border-slate-100 p-3.5 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-slate-800 dark:text-slate-100">{m.title}</div>
                      <Badge tone={milestoneTone[m.status]}>{milestoneStatusLabel[m.status]}</Badge>
                    </div>
                    <div className="mt-1 text-xs text-slate-400">{m.invoicePercent}% der Angebotssumme = {currency((project.offerAmount * m.invoicePercent) / 100)}</div>
                    <ul className="mt-3 space-y-2">
                      {milestoneTasks.map((t) => {
                        const assignee = employees.find((e) => e.id === t.assigneeId)!
                        return (
                          <li key={t.id} className="flex items-center gap-3 text-sm">
                            <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white ${assignee.color}`}>
                              {assignee.initials}
                            </div>
                            <span className="flex-1 text-slate-600 dark:text-slate-300">{t.title}</span>
                            <span className="w-24 shrink-0 text-right text-xs text-slate-400">
                              {t.usedHours}h / {t.budgetHours}h
                            </span>
                            <Badge tone={t.status === 'erledigt' ? 'green' : t.status === 'in_bearbeitung' ? 'blue' : 'neutral'}>
                              {taskStatusLabel[t.status]}
                            </Badge>
                          </li>
                        )
                      })}
                    </ul>
                    {allDone && m.status !== 'bezahlt' && m.status !== 'rechnung_gestellt' && (
                      <button className="mt-3 w-full rounded-md bg-brand-600 py-2 text-xs font-medium text-white hover:bg-brand-700">
                        Alle Aufgaben erledigt — Rechnung freigeben ({m.invoicePercent}%)
                      </button>
                    )}
                  </li>
                )
              })}
            </ul>
          </Card>

          <Card>
            <CardHeader title="Rechnungen zu diesem Projekt" />
            {projectInvoices.length === 0 ? (
              <p className="text-sm text-slate-400">Noch keine Rechnung gestellt.</p>
            ) : (
              <ul className="space-y-2">
                {projectInvoices.map((inv) => (
                  <li key={inv.id} className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2 text-sm dark:border-slate-800">
                    <span className="text-slate-600 dark:text-slate-300">{currency(inv.amount)} · fällig {inv.dueOn}</span>
                    <Badge tone={inv.status === 'bezahlt' ? 'green' : inv.status.startsWith('mahnung') ? 'red' : 'blue'}>
                      {inv.status === 'bezahlt' ? 'Bezahlt' : inv.status === 'versendet' ? 'Versendet' : `Mahnstufe ${inv.status.split('_')[1]}`}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader title="Stundenbudget" />
            <ProgressBar value={hoursPercent} tone={hoursPercent > 100 ? 'red' : 'blue'} />
            <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {hours.used}h verbraucht von {hours.budget}h Budget ({hoursPercent}%)
            </div>
          </Card>

          {role === 'geschaeftsfuehrung' && (
            <Card>
              <CardHeader title="Kosten &amp; Marge" subtitle="Nur für Geschäftsführung/Buchhaltung sichtbar" />
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-slate-500">Angebotssumme</dt>
                  <dd className="font-medium text-slate-800 dark:text-slate-100">{currency(project.offerAmount)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Interne Kosten (bisher)</dt>
                  <dd className="font-medium text-slate-800 dark:text-slate-100">{currency(margin.cost)}</dd>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-2 dark:border-slate-800">
                  <dt className="text-slate-500">Marge</dt>
                  <dd className={`font-semibold ${margin.marginPercent >= 20 ? 'text-brand-600' : 'text-amber-600'}`}>
                    {currency(margin.margin)} ({margin.marginPercent}%)
                  </dd>
                </div>
              </dl>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
