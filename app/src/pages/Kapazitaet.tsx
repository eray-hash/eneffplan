import { Card, CardHeader } from '../components/ui/Card'
import { ProgressBar } from '../components/ui/ProgressBar'
import { employees, remainingHours } from '../data/mockData'

function weeklyProjection(weeklyHours: number, committedHours: number, weeks: number) {
  let remaining = committedHours
  const result: { free: number; booked: number }[] = []
  for (let i = 0; i < weeks; i++) {
    const booked = Math.min(weeklyHours, remaining)
    result.push({ booked, free: weeklyHours - booked })
    remaining -= booked
  }
  return result
}

export function Kapazitaet() {
  const rows = employees.map((e) => {
    const committed = remainingHours(e.id)
    const weeksOfBacklog = e.weeklyHours > 0 ? Math.ceil(committed / e.weeklyHours) : 0
    const projection = weeklyProjection(e.weeklyHours, committed, 4)
    return { employee: e, committed, weeksOfBacklog, projection }
  })

  const freeThisWeekTotal = rows.reduce((sum, r) => sum + r.projection[0].free, 0)
  const capacityTotal = employees.reduce((sum, e) => sum + e.weeklyHours, 0)

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Kapazitätsplanung</h1>
      <p className="mb-6 mt-1 text-sm text-slate-500">
        Wie stark ist das Team durch bestehende Projekte gebunden — und wie viele Stunden sind noch frei für neue Anfragen?
      </p>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <div className="text-xs font-medium text-slate-500">Team-Kapazität / Woche</div>
          <div className="mt-2 text-2xl font-semibold text-slate-900">{capacityTotal}h</div>
        </Card>
        <Card>
          <div className="text-xs font-medium text-slate-500">Freie Stunden diese Woche</div>
          <div className="mt-2 text-2xl font-semibold text-brand-600">{freeThisWeekTotal}h</div>
          <div className="mt-1 text-xs text-slate-400">für neue Projekte verfügbar</div>
        </Card>
        <Card>
          <div className="text-xs font-medium text-slate-500">Größter Rückstau</div>
          <div className="mt-2 text-2xl font-semibold text-amber-600">{Math.max(...rows.map((r) => r.weeksOfBacklog))} Wo.</div>
          <div className="mt-1 text-xs text-slate-400">längste Vorlaufzeit bis frei</div>
        </Card>
      </div>

      <Card className="p-0">
        <div className="p-5 pb-0">
          <CardHeader title="Auslastung je Mitarbeiter" subtitle="Gebuchte Stunden = offene + in Bearbeitung befindliche Aufgaben (Restaufwand)" />
        </div>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
              <th className="px-5 py-3 font-medium">Mitarbeiter</th>
              <th className="px-5 py-3 font-medium">Kapazität/Woche</th>
              <th className="px-5 py-3 font-medium">Gebuchter Restaufwand</th>
              <th className="px-5 py-3 font-medium">Rückstau</th>
              <th className="px-5 py-3 font-medium">Nächste 4 Wochen</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ employee: e, committed, weeksOfBacklog, projection }) => (
              <tr key={e.id} className="border-b border-slate-50 last:border-0">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white ${e.color}`}>
                      {e.initials}
                    </div>
                    <span className="font-medium text-slate-800">{e.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-slate-600">{e.weeklyHours}h</td>
                <td className="px-5 py-3.5 text-slate-600">{committed}h</td>
                <td className="px-5 py-3.5">
                  <span className={weeksOfBacklog > 3 ? 'font-medium text-rose-600' : weeksOfBacklog > 1 ? 'font-medium text-amber-600' : 'text-slate-500'}>
                    {weeksOfBacklog === 0 ? 'frei' : `${weeksOfBacklog} Woche${weeksOfBacklog > 1 ? 'n' : ''}`}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1.5">
                    {projection.map((w, i) => (
                      <div key={i} className="w-14">
                        <ProgressBar value={(w.booked / e.weeklyHours) * 100} tone={w.free === 0 ? 'red' : w.booked === 0 ? 'green' : 'amber'} />
                        <div className="mt-0.5 text-center text-[10px] text-slate-400">{w.free}h frei</div>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
