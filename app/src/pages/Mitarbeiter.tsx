import { Card } from '../components/ui/Card'
import { employees } from '../data/mockData'

const currency = (n: number) => n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })

export function Mitarbeiter() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Mitarbeiter</h1>
      <p className="mb-6 mt-1 text-sm text-slate-500">
        Stundensätze gelten ab Änderungsdatum — bereits gebuchte Stunden werden nicht rückwirkend neu bewertet.
      </p>

      <Card className="p-0">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Wochenkapazität</th>
              <th className="px-5 py-3 font-medium">Interner Kostensatz</th>
              <th className="px-5 py-3 font-medium">Verkaufspreis / Std.</th>
              <th className="px-5 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {employees.map((e) => (
              <tr key={e.id} className="border-b border-slate-50 last:border-0">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white ${e.color}`}>
                      {e.initials}
                    </div>
                    <span className="font-medium text-slate-800">{e.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-slate-500">{e.weeklyHours} h / Woche</td>
                <td className="px-5 py-3.5 text-slate-600">{currency(e.hourlyCostRate)} / h</td>
                <td className="px-5 py-3.5 text-slate-600">{currency(e.hourlySellRate)} / h</td>
                <td className="px-5 py-3.5 text-right">
                  <button className="text-xs font-medium text-brand-700 hover:underline">Bearbeiten</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <button className="mt-4 rounded-lg border border-dashed border-slate-300 px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-50">
        + Neuen Mitarbeiter anlegen
      </button>
    </div>
  )
}
