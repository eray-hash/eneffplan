import { Link } from 'react-router-dom'
import { Badge } from '../components/ui/Badge'
import { Card, CardHeader } from '../components/ui/Card'
import { ProgressBar } from '../components/ui/ProgressBar'
import { useRole } from '../context/RoleContext'
import { useTracking } from '../context/TrackingContext'
import { employees, invoices, milestones, projects, tasks } from '../data/mockData'

const currency = (n: number) => n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })

function GeschaeftsfuehrungDashboard() {
  const activeProjects = projects.filter((p) => p.status === 'aktiv')
  const followUps = projects.filter((p) => p.nextFollowUp)
  const openInvoices = invoices.filter((i) => i.status !== 'bezahlt')
  const openInvoiceSum = openInvoices.reduce((sum, i) => sum + i.amount, 0)
  const dueMilestones = milestones.filter((m) => m.status === 'erreicht')

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <div className="text-xs font-medium text-slate-500">Aktive Projekte</div>
          <div className="mt-2 text-2xl font-semibold text-slate-900">{activeProjects.length}</div>
          <div className="mt-1 text-xs text-slate-400">von {projects.length} gesamt im Bestand</div>
        </Card>
        <Card>
          <div className="text-xs font-medium text-slate-500">Offene Rechnungen</div>
          <div className="mt-2 text-2xl font-semibold text-slate-900">{currency(openInvoiceSum)}</div>
          <div className="mt-1 text-xs text-slate-400">{openInvoices.length} Rechnung(en) unbezahlt</div>
        </Card>
        <Card>
          <div className="text-xs font-medium text-slate-500">Meilensteine bereit zur Abrechnung</div>
          <div className="mt-2 text-2xl font-semibold text-brand-600">{dueMilestones.length}</div>
          <div className="mt-1 text-xs text-slate-400">Aufgaben erledigt, Rechnung noch nicht gestellt</div>
        </Card>
        <Card>
          <div className="text-xs font-medium text-slate-500">Follow-up nötig</div>
          <div className="mt-2 text-2xl font-semibold text-amber-600">{followUps.length}</div>
          <div className="mt-1 text-xs text-slate-400">Projekte ohne Rückmeldung / Stillstand</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader
            title="Meilenstein erreicht — Rechnung fällig"
            subtitle="Automatisch erkannt, sobald alle Aufgaben eines Meilensteins erledigt sind"
          />
          <ul className="space-y-3">
            {dueMilestones.map((m) => {
              const project = projects.find((p) => p.id === m.projectId)!
              return (
                <li key={m.id} className="flex items-center justify-between rounded-lg bg-brand-50 px-3 py-2.5">
                  <div>
                    <div className="text-sm font-medium text-slate-800">
                      #{project.number} · {m.title}
                    </div>
                    <div className="text-xs text-slate-500">{project.customerName}</div>
                  </div>
                  <button className="rounded-md bg-brand-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-700">
                    Rechnung erstellen ({m.invoicePercent}%)
                  </button>
                </li>
              )
            })}
          </ul>
        </Card>

        <Card>
          <CardHeader title="Projekte mit Follow-up-Bedarf" subtitle="Wartet auf Kunde oder seit längerem inaktiv" />
          <ul className="space-y-3">
            {followUps.map((p) => (
              <li key={p.id} className="rounded-lg border border-slate-100 px-3 py-2.5">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-slate-800">
                    #{p.number} · {p.customerName}
                  </div>
                  <Badge tone={p.status === 'standby' ? 'red' : 'amber'}>
                    {p.status === 'standby' ? 'Stillstand' : 'Wartet auf Kunde'}
                  </Badge>
                </div>
                <div className="mt-1 text-xs text-slate-500">{p.notes}</div>
                <div className="mt-1 text-xs text-slate-400">Letzte Aktivität: {p.lastActivity}</div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card>
        <CardHeader title="Auslastung Team (diese Woche)" subtitle="Geplante Stunden je Mitarbeiter:in vs. Wochenkapazität" />
        <div className="space-y-3">
          {employees.map((e) => {
            const plannedTasks = tasks.filter((t) => t.assigneeId === e.id && t.status !== 'erledigt')
            const planned = plannedTasks.reduce((sum, t) => sum + (t.budgetHours - t.usedHours), 0)
            const percent = Math.min(100, Math.round((planned / e.weeklyHours) * 100))
            return (
              <div key={e.id} className="flex items-center gap-4">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${e.color}`}
                >
                  {e.initials}
                </div>
                <div className="w-36 shrink-0 text-sm text-slate-700">{e.name}</div>
                <div className="flex-1">
                  <ProgressBar value={percent} tone={percent > 90 ? 'red' : percent > 60 ? 'amber' : 'green'} />
                </div>
                <div className="w-24 shrink-0 text-right text-xs text-slate-500">
                  {planned}h / {e.weeklyHours}h
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}

function MitarbeiterDashboard() {
  const me = employees[0]
  const myTasks = tasks.filter((t) => t.assigneeId === me.id)
  const openTasks = myTasks.filter((t) => t.status !== 'erledigt')
  const { clockState, activeTaskId, clockIn } = useTracking()
  const activeTask = tasks.find((t) => t.id === activeTaskId)

  return (
    <div className="space-y-6">
      <Card className="bg-brand-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-brand-100">Guten Tag, {me.name.split(' ')[0]}</div>
            <div className="mt-1 text-lg font-semibold">
              {clockState === 'gestoppt'
                ? 'Du bist aktuell nicht eingestempelt'
                : activeTask
                  ? `Aktiv: ${activeTask.title}`
                  : 'Eingestempelt · bucht auf Intern'}
            </div>
          </div>
          {clockState === 'gestoppt' ? (
            <button onClick={clockIn} className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50">
              Einstempeln
            </button>
          ) : (
            <Link to="/kanban" className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50">
              Zum Kanban-Board
            </Link>
          )}
        </div>
      </Card>

      <Card>
        <CardHeader title="Meine offenen Aufgaben" subtitle="Stundenbudget statt Stundensätzen — Kosten/Marge siehst du hier nicht" />
        <ul className="space-y-3">
          {openTasks.map((t) => {
            const project = projects.find((p) => p.id === t.projectId)!
            const percent = Math.round((t.usedHours / t.budgetHours) * 100)
            return (
              <li key={t.id} className="rounded-lg border border-slate-100 px-3 py-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-slate-800">{t.title}</div>
                  <Badge tone={t.status === 'in_bearbeitung' ? 'blue' : 'neutral'}>
                    {t.status === 'in_bearbeitung' ? 'In Bearbeitung' : 'Offen'}
                  </Badge>
                </div>
                <div className="mt-0.5 text-xs text-slate-500">
                  #{project.number} · {project.title}
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex-1">
                    <ProgressBar value={percent} tone={percent > 100 ? 'red' : 'blue'} />
                  </div>
                  <div className="w-24 shrink-0 text-right text-xs text-slate-500">
                    {t.usedHours}h / {t.budgetHours}h
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </Card>
    </div>
  )
}

export function Dashboard() {
  const { role } = useRole()
  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
      <p className="mb-6 mt-1 text-sm text-slate-500">
        {role === 'geschaeftsfuehrung'
          ? 'Gesamtüberblick über alle Projekte, Kosten und offenen Punkte.'
          : 'Deine Aufgaben und dein Arbeitstag.'}
      </p>
      {role === 'geschaeftsfuehrung' ? <GeschaeftsfuehrungDashboard /> : <MitarbeiterDashboard />}
    </div>
  )
}
