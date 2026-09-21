import { Badge } from '../components/ui/Badge'
import { Card, CardHeader } from '../components/ui/Card'
import { invoices, projects, type InvoiceStatus } from '../data/mockData'

const statusLabel: Record<InvoiceStatus, string> = {
  entwurf: 'Entwurf',
  versendet: 'Versendet',
  mahnung_1: 'Mahnstufe 1',
  mahnung_2: 'Mahnstufe 2',
  mahnung_3: 'Mahnstufe 3',
  bezahlt: 'Bezahlt',
}
const statusTone: Record<InvoiceStatus, 'neutral' | 'blue' | 'amber' | 'red' | 'green'> = {
  entwurf: 'neutral',
  versendet: 'blue',
  mahnung_1: 'amber',
  mahnung_2: 'amber',
  mahnung_3: 'red',
  bezahlt: 'green',
}

const currency = (n: number) => n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })

export function Rechnungen() {
  const overdue = invoices.filter((i) => i.status.startsWith('mahnung'))

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Angebote &amp; Rechnungen</h1>
      <p className="mb-6 mt-1 text-sm text-slate-500">Löst Lexware ab: Angebotserstellung, Rechnungsstellung und automatisches Mahnwesen an einem Ort.</p>

      {overdue.length > 0 && (
        <Card className="mb-6 border-rose-200 bg-rose-50 dark:border-rose-900 dark:bg-rose-950/30">
          <CardHeader title="Mahnwesen — Zahlungsverzug" subtitle="Automatisch anhand Fälligkeitsdatum und Bankabgleich eskaliert" />
          <ul className="space-y-2">
            {overdue.map((inv) => {
              const project = projects.find((p) => p.id === inv.projectId)!
              return (
                <li key={inv.id} className="flex items-center justify-between rounded-lg bg-white px-3.5 py-2.5 text-sm dark:bg-slate-900">
                  <span>
                    #{project.number} · {project.customerName} — {currency(inv.amount)}, fällig seit {inv.dueOn}
                  </span>
                  <div className="flex items-center gap-2">
                    <Badge tone={statusTone[inv.status]}>{statusLabel[inv.status]}</Badge>
                    <button className="rounded-md bg-rose-600 px-3 py-1 text-xs font-medium text-white hover:bg-rose-700">
                      Nächste Mahnstufe senden
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        </Card>
      )}

      <Card className="p-0">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400 dark:border-slate-800">
              <th className="px-5 py-3 font-medium">Projekt</th>
              <th className="px-5 py-3 font-medium">Betrag</th>
              <th className="px-5 py-3 font-medium">Versendet</th>
              <th className="px-5 py-3 font-medium">Fällig</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => {
              const project = projects.find((p) => p.id === inv.projectId)!
              return (
                <tr key={inv.id} className="border-b border-slate-50 last:border-0 dark:border-slate-800">
                  <td className="px-5 py-3.5 font-medium text-slate-800 dark:text-slate-100">
                    #{project.number} · {project.customerName}
                  </td>
                  <td className="px-5 py-3.5 text-slate-600 dark:text-slate-300">{currency(inv.amount)}</td>
                  <td className="px-5 py-3.5 text-slate-500">{inv.issuedOn}</td>
                  <td className="px-5 py-3.5 text-slate-500">{inv.dueOn}</td>
                  <td className="px-5 py-3.5">
                    <Badge tone={statusTone[inv.status]}>{statusLabel[inv.status]}</Badge>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
