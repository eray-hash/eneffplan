import { Card, CardHeader } from '../components/ui/Card'
import { projectMargin, projects } from '../data/mockData'

const currency = (n: number) => n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })

export function Controlling() {
  const totalOffer = projects.reduce((sum, p) => sum + p.offerAmount, 0)
  const totalCost = projects.reduce((sum, p) => sum + projectMargin(p).cost, 0)
  const totalMargin = totalOffer - totalCost

  const pipeline = [
    { quartal: 'Q4 2026', amount: 42000 },
    { quartal: 'Q1 2027', amount: 61000 },
    { quartal: 'Q2 2027', amount: 38000 },
  ]
  const maxPipeline = Math.max(...pipeline.map((p) => p.amount))

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Controlling</h1>
      <p className="mb-6 mt-1 text-sm text-slate-500">Ersetzt die zwei Excel-Tabellen — Kosten, Marge und Pipeline auf einen Blick.</p>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <div className="text-xs font-medium text-slate-500">Angebotsvolumen (alle Projekte)</div>
          <div className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{currency(totalOffer)}</div>
        </Card>
        <Card>
          <div className="text-xs font-medium text-slate-500">Interne Kosten (bisher)</div>
          <div className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{currency(totalCost)}</div>
        </Card>
        <Card>
          <div className="text-xs font-medium text-slate-500">Marge (bisher)</div>
          <div className="mt-2 text-2xl font-semibold text-brand-600">{currency(totalMargin)}</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Marge je Projekt" />
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-slate-400">
                <th className="pb-2 font-medium">Projekt</th>
                <th className="pb-2 font-medium">Angebot</th>
                <th className="pb-2 font-medium">Kosten</th>
                <th className="pb-2 font-medium">Marge</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => {
                const m = projectMargin(p)
                return (
                  <tr key={p.id} className="border-t border-slate-50 dark:border-slate-800">
                    <td className="py-2 text-slate-700 dark:text-slate-200">#{p.number}</td>
                    <td className="py-2 text-slate-500">{currency(p.offerAmount)}</td>
                    <td className="py-2 text-slate-500">{currency(m.cost)}</td>
                    <td className={`py-2 font-medium ${m.marginPercent >= 20 ? 'text-brand-600' : 'text-amber-600'}`}>{m.marginPercent}%</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Card>

        <Card>
          <CardHeader title="Erwartete Einnahmen-Pipeline" subtitle="Anhand geplanter Meilenstein-Termine, für Liquiditätsplanung" />
          <div className="space-y-4">
            {pipeline.map((p) => (
              <div key={p.quartal}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-300">{p.quartal}</span>
                  <span className="font-medium text-slate-800 dark:text-slate-100">{currency(p.amount)}</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div className="h-full rounded-full bg-brand-500" style={{ width: `${(p.amount / maxPipeline) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-400">Beispieldaten im Mockup — im echten System aus Meilenstein-Fälligkeiten berechnet.</p>
        </Card>
      </div>
    </div>
  )
}
