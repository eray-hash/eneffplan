import { useMemo, useState } from 'react'
import { Card, CardHeader } from '../components/ui/Card'
import { useRole } from '../context/RoleContext'
import { absences, employees, projects, tasks, type AbsenceType } from '../data/mockData'

const DAILY_CAPACITY = 8
const TODAY = new Date('2026-09-21')

const absenceLabel: Record<AbsenceType, string> = { urlaub: 'Urlaub', krank: 'Krank', sonderurlaub: 'Sonderurlaub' }
const absenceColor: Record<AbsenceType, string> = { urlaub: 'bg-sky-100 text-sky-700', krank: 'bg-rose-100 text-rose-700', sonderurlaub: 'bg-violet-100 text-violet-700' }
const taskColors = ['bg-brand-100 text-brand-800', 'bg-amber-100 text-amber-800', 'bg-slate-200 text-slate-700', 'bg-sky-100 text-sky-800', 'bg-violet-100 text-violet-800']

function nextWorkdays(from: Date, count: number) {
  const days: Date[] = []
  const d = new Date(from)
  while (days.length < count) {
    if (d.getDay() !== 0 && d.getDay() !== 6) days.push(new Date(d))
    d.setDate(d.getDate() + 1)
  }
  return days
}

function isoDate(d: Date) {
  return d.toISOString().slice(0, 10)
}

function buildSchedule(employeeId: string) {
  const workdays = nextWorkdays(TODAY, 10)
  const myAbsences = absences.filter((a) => a.employeeId === employeeId)
  const openTasks = tasks
    .filter((t) => t.assigneeId === employeeId && t.status !== 'erledigt')
    .map((t) => ({ ...t, remaining: Math.max(0, t.budgetHours - t.usedHours) }))
    .filter((t) => t.remaining > 0)
    // "In Bearbeitung" wird zuerst verplant, danach der Rest aus dem Backlog
    .sort((a, b) => (a.status === b.status ? 0 : a.status === 'in_bearbeitung' ? -1 : 1))

  const queue = openTasks.map((t) => ({ ...t }))
  const days = workdays.map((date) => {
    const iso = isoDate(date)
    const absence = myAbsences.find((a) => iso >= a.from && iso <= a.to)
    const blocks: { taskId: string; title: string; hours: number; projectNumber: string }[] = []
    let free = absence ? 0 : DAILY_CAPACITY

    while (free > 0 && queue.length > 0) {
      const current = queue[0]
      const take = Math.min(free, current.remaining)
      const project = projects.find((p) => p.id === current.projectId)!
      blocks.push({ taskId: current.id, title: current.title, hours: take, projectNumber: project.number })
      current.remaining -= take
      free -= take
      if (current.remaining <= 0) queue.shift()
    }

    return { date, iso, absence, blocks, freeHours: free }
  })

  return { days, unscheduledHours: queue.reduce((sum, t) => sum + t.remaining, 0) }
}

export function Kalender() {
  const { role } = useRole()
  const [employeeId, setEmployeeId] = useState(employees[0].id)
  const activeEmployeeId = role === 'mitarbeiter' ? employees[0].id : employeeId
  const { days, unscheduledHours } = useMemo(() => buildSchedule(activeEmployeeId), [activeEmployeeId])
  const employee = employees.find((e) => e.id === activeEmployeeId)!

  const taskColorMap = useMemo(() => {
    const ids = Array.from(new Set(days.flatMap((d) => d.blocks.map((b) => b.taskId))))
    return Object.fromEntries(ids.map((id, i) => [id, taskColors[i % taskColors.length]]))
  }, [days])

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Mein Kalender</h1>
      <p className="mb-6 mt-1 text-sm text-slate-500">
        Aufgaben, die du im Kanban-Board übernimmst, werden hier automatisch anhand ihres Stundenbudgets verplant ({DAILY_CAPACITY}h/Tag).
        Abwesenheiten blockieren den Tag komplett.
      </p>

      {role === 'geschaeftsfuehrung' && (
        <div className="mb-4 flex items-center gap-2">
          <label className="text-xs font-medium text-slate-500">Mitarbeiter:</label>
          <select
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-700"
          >
            {employees.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <Card>
        <CardHeader
          title={`${employee.name} — nächste zwei Wochen`}
          subtitle={unscheduledHours > 0 ? `${unscheduledHours}h passen nicht mehr in die nächsten zwei Wochen (Kapazität ausgeschöpft)` : 'Alle offenen Aufgaben passen in die nächsten zwei Wochen'}
        />
        <div className="grid grid-cols-5 gap-2">
          {days.map((day) => (
            <div key={day.iso} className="min-h-[160px] rounded-lg border border-slate-100 p-2">
              <div className="mb-2 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                {day.date.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit' })}
              </div>
              {day.absence ? (
                <div className={`rounded-md px-2 py-3 text-center text-xs font-medium ${absenceColor[day.absence.type]}`}>
                  {absenceLabel[day.absence.type]}
                </div>
              ) : (
                <div className="space-y-1">
                  {day.blocks.map((b, i) => (
                    <div key={`${b.taskId}-${i}`} className={`rounded-md px-2 py-1.5 text-[11px] leading-tight ${taskColorMap[b.taskId]}`}>
                      <div className="font-medium">{b.title}</div>
                      <div className="opacity-70">
                        #{b.projectNumber} · {b.hours}h
                      </div>
                    </div>
                  ))}
                  {day.freeHours > 0 && (
                    <div className="rounded-md border border-dashed border-slate-200 px-2 py-1.5 text-[11px] text-slate-400">
                      {day.freeHours}h frei
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
