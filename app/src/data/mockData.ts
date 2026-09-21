export type ProjectStatus = 'aktiv' | 'wartet_auf_kunde' | 'standby' | 'abgeschlossen'
export type TaskStatus = 'offen' | 'in_bearbeitung' | 'erledigt'
export type MilestoneStatus = 'offen' | 'erreicht' | 'rechnung_gestellt' | 'bezahlt'
export type InvoiceStatus = 'entwurf' | 'versendet' | 'mahnung_1' | 'mahnung_2' | 'mahnung_3' | 'bezahlt'

export interface Employee {
  id: string
  name: string
  initials: string
  color: string
  hourlyCostRate: number
  hourlySellRate: number
  weeklyHours: number
}

export interface SubTask {
  id: string
  projectId: string
  title: string
  assigneeId: string
  milestoneId: string
  budgetHours: number
  usedHours: number
  status: TaskStatus
}

export interface Milestone {
  id: string
  projectId: string
  title: string
  invoicePercent: number
  status: MilestoneStatus
}

export interface Invoice {
  id: string
  projectId: string
  milestoneId: string
  amount: number
  status: InvoiceStatus
  issuedOn: string
  dueOn: string
}

export interface Project {
  id: string
  number: string
  customerName: string
  title: string
  status: ProjectStatus
  offerAmount: number
  budgetHours: number
  lastActivity: string
  nextFollowUp?: string
  notes?: string
}

export const employees: Employee[] = [
  { id: 'e1', name: 'Selin Aydın', initials: 'SA', color: 'bg-violet-500', hourlyCostRate: 45, hourlySellRate: 95, weeklyHours: 40 },
  { id: 'e2', name: 'Jonas Weber', initials: 'JW', color: 'bg-sky-500', hourlyCostRate: 38, hourlySellRate: 85, weeklyHours: 32 },
  { id: 'e3', name: 'Büşra Kaya', initials: 'BK', color: 'bg-brand-500', hourlyCostRate: 42, hourlySellRate: 90, weeklyHours: 40 },
  { id: 'e4', name: 'Steffi Bauer', initials: 'SB', color: 'bg-amber-500', hourlyCostRate: 30, hourlySellRate: 75, weeklyHours: 24 },
  { id: 'e5', name: 'Mehmet Öztürk', initials: 'MÖ', color: 'bg-rose-500', hourlyCostRate: 40, hourlySellRate: 88, weeklyHours: 40 },
]

export const projects: Project[] = [
  {
    id: 'p260',
    number: '260',
    customerName: 'Bauherr Krüger',
    title: 'Wärmeschutznachweis Mehrfamilienhaus, Lindenstr. 12',
    status: 'aktiv',
    offerAmount: 18500,
    budgetHours: 210,
    lastActivity: '2026-09-18',
  },
  {
    id: 'p244',
    number: '244',
    customerName: 'Immobilien Nordlicht GmbH',
    title: 'Energetische Sanierungsplanung, Wohnpark Eiche',
    status: 'wartet_auf_kunde',
    offerAmount: 32000,
    budgetHours: 340,
    lastActivity: '2026-06-02',
    nextFollowUp: '2026-09-22',
    notes: 'Wartet seit 3,5 Monaten auf Bestandspläne des Bauherrn.',
  },
  {
    id: 'p251',
    number: '251',
    customerName: 'Familie Thalmann',
    title: 'Wärmeschutznachweis Einfamilienhaus',
    status: 'abgeschlossen',
    offerAmount: 6400,
    budgetHours: 62,
    lastActivity: '2026-08-11',
  },
  {
    id: 'p238',
    number: '238',
    customerName: 'Wohnbau Alpenrand AG',
    title: 'Gebäudesimulation + BAFA-Förderantrag, 20 WE',
    status: 'aktiv',
    offerAmount: 45200,
    budgetHours: 480,
    lastActivity: '2026-09-19',
  },
  {
    id: 'p219',
    number: '219',
    customerName: 'Herr Demirtaş',
    title: 'Wärmeschutznachweis Doppelhaushälfte',
    status: 'standby',
    offerAmount: 5200,
    budgetHours: 50,
    lastActivity: '2026-04-30',
    nextFollowUp: '2026-09-25',
    notes: 'Kunde meldet sich seit Monaten nicht zurück – Anruf nötig.',
  },
  {
    id: 'p255',
    number: '255',
    customerName: 'Gemeinde Bergheim',
    title: 'Energieeffizienzkonzept Rathaus-Sanierung',
    status: 'aktiv',
    offerAmount: 21000,
    budgetHours: 230,
    lastActivity: '2026-09-15',
  },
]

export const milestones: Milestone[] = [
  { id: 'm260-1', projectId: 'p260', title: 'Gebäudemodell erstellt', invoicePercent: 30, status: 'bezahlt' },
  { id: 'm260-2', projectId: 'p260', title: 'Wärmeschutzberechnung + Bericht', invoicePercent: 40, status: 'rechnung_gestellt' },
  { id: 'm260-3', projectId: 'p260', title: 'Schlussdokumentation', invoicePercent: 30, status: 'offen' },

  { id: 'm244-1', projectId: 'p244', title: 'Bestandsaufnahme', invoicePercent: 25, status: 'bezahlt' },
  { id: 'm244-2', projectId: 'p244', title: 'Sanierungskonzept', invoicePercent: 45, status: 'offen' },
  { id: 'm244-3', projectId: 'p244', title: 'Umsetzungsbegleitung', invoicePercent: 30, status: 'offen' },

  { id: 'm238-1', projectId: 'p238', title: 'Gebäudesimulation Modell', invoicePercent: 35, status: 'erreicht' },
  { id: 'm238-2', projectId: 'p238', title: 'BAFA-Antrag eingereicht', invoicePercent: 35, status: 'offen' },
  { id: 'm238-3', projectId: 'p238', title: 'Förderbescheid + Abschluss', invoicePercent: 30, status: 'offen' },

  { id: 'm255-1', projectId: 'p255', title: 'Ist-Analyse Gebäudebestand', invoicePercent: 30, status: 'erreicht' },
  { id: 'm255-2', projectId: 'p255', title: 'Maßnahmenkatalog', invoicePercent: 40, status: 'in_bearbeitung' as MilestoneStatus },
  { id: 'm255-3', projectId: 'p255', title: 'Abschlussbericht', invoicePercent: 30, status: 'offen' },

  { id: 'm251-1', projectId: 'p251', title: 'Wärmeschutznachweis komplett', invoicePercent: 100, status: 'bezahlt' },
  { id: 'm219-1', projectId: 'p219', title: 'Erstaufnahme abgeschlossen', invoicePercent: 100, status: 'bezahlt' },
]

export const tasks: SubTask[] = [
  {
    id: 't1',
    projectId: 'p260',
    title: 'Gebäudemodell (3D) aufbauen',
    assigneeId: 'e1',
    milestoneId: 'm260-2',
    budgetHours: 40,
    usedHours: 40,
    status: 'erledigt',
  },
  {
    id: 't2',
    projectId: 'p260',
    title: 'U-Werte / Bauteile erfassen',
    assigneeId: 'e1',
    milestoneId: 'm260-2',
    budgetHours: 20,
    usedHours: 22,
    status: 'erledigt',
  },
  {
    id: 't3',
    projectId: 'p260',
    title: 'Wärmeschutzberechnung DIN 4108',
    assigneeId: 'e3',
    milestoneId: 'm260-2',
    budgetHours: 30,
    usedHours: 18,
    status: 'in_bearbeitung',
  },
  {
    id: 't4',
    projectId: 'p260',
    title: 'Bericht + Prüfung erstellen',
    assigneeId: 'e3',
    milestoneId: 'm260-2',
    budgetHours: 20,
    usedHours: 0,
    status: 'offen',
  },
  {
    id: 't5',
    projectId: 'p260',
    title: 'Schlussdokumentation zusammenstellen',
    assigneeId: 'e1',
    milestoneId: 'm260-3',
    budgetHours: 15,
    usedHours: 0,
    status: 'offen',
  },

  {
    id: 't6',
    projectId: 'p238',
    title: 'Gebäudesimulation Modell erstellen',
    assigneeId: 'e5',
    milestoneId: 'm238-1',
    budgetHours: 60,
    usedHours: 58,
    status: 'erledigt',
  },
  {
    id: 't7',
    projectId: 'p238',
    title: 'BAFA-Vollmacht einholen',
    assigneeId: 'e2',
    milestoneId: 'm238-2',
    budgetHours: 4,
    usedHours: 4,
    status: 'erledigt',
  },
  {
    id: 't8',
    projectId: 'p238',
    title: 'Förderantrag ausarbeiten',
    assigneeId: 'e2',
    milestoneId: 'm238-2',
    budgetHours: 35,
    usedHours: 21,
    status: 'in_bearbeitung',
  },

  {
    id: 't9',
    projectId: 'p255',
    title: 'Bestandsdaten erfassen',
    assigneeId: 'e4',
    milestoneId: 'm255-1',
    budgetHours: 25,
    usedHours: 27,
    status: 'erledigt',
  },
  {
    id: 't10',
    projectId: 'p255',
    title: 'Maßnahmenkatalog erarbeiten',
    assigneeId: 'e4',
    milestoneId: 'm255-2',
    budgetHours: 45,
    usedHours: 30,
    status: 'in_bearbeitung',
  },

  {
    id: 't11',
    projectId: 'p244',
    title: 'Bestandsaufnahme vor Ort',
    assigneeId: 'e2',
    milestoneId: 'm244-1',
    budgetHours: 32,
    usedHours: 34,
    status: 'erledigt',
  },
  {
    id: 't12',
    projectId: 'p251',
    title: 'Wärmeschutzberechnung',
    assigneeId: 'e3',
    milestoneId: 'm251-1',
    budgetHours: 40,
    usedHours: 41,
    status: 'erledigt',
  },
  {
    id: 't13',
    projectId: 'p251',
    title: 'Bericht erstellen',
    assigneeId: 'e3',
    milestoneId: 'm251-1',
    budgetHours: 15,
    usedHours: 16,
    status: 'erledigt',
  },
  {
    id: 't14',
    projectId: 'p219',
    title: 'Erstaufnahme Gebäudedaten',
    assigneeId: 'e4',
    milestoneId: 'm219-1',
    budgetHours: 10,
    usedHours: 10,
    status: 'erledigt',
  },
]

export const invoices: Invoice[] = [
  { id: 'i1', projectId: 'p260', milestoneId: 'm260-1', amount: 5550, status: 'bezahlt', issuedOn: '2026-06-10', dueOn: '2026-06-24' },
  { id: 'i2', projectId: 'p260', milestoneId: 'm260-2', amount: 7400, status: 'mahnung_1', issuedOn: '2026-08-20', dueOn: '2026-09-03' },
  { id: 'i3', projectId: 'p244', milestoneId: 'm244-1', amount: 8000, status: 'versendet', issuedOn: '2026-09-05', dueOn: '2026-09-19' },
  { id: 'i4', projectId: 'p251', milestoneId: 'm260-1', amount: 6400, status: 'bezahlt', issuedOn: '2026-08-11', dueOn: '2026-08-25' },
  { id: 'i5', projectId: 'p219', milestoneId: 'm260-1', amount: 5200, status: 'mahnung_3', issuedOn: '2026-05-02', dueOn: '2026-05-16' },
]

export type AbsenceType = 'urlaub' | 'krank' | 'sonderurlaub'

export interface Absence {
  id: string
  employeeId: string
  from: string
  to: string
  type: AbsenceType
}

export const absences: Absence[] = [
  { id: 'a1', employeeId: 'e1', from: '2026-09-28', to: '2026-10-02', type: 'urlaub' },
  { id: 'a2', employeeId: 'e3', from: '2026-09-22', to: '2026-09-22', type: 'krank' },
  { id: 'a3', employeeId: 'e5', from: '2026-10-05', to: '2026-10-09', type: 'urlaub' },
]

export function remainingHours(employeeId: string) {
  return tasks
    .filter((t) => t.assigneeId === employeeId && t.status !== 'erledigt')
    .reduce((sum, t) => sum + Math.max(0, t.budgetHours - t.usedHours), 0)
}

export function projectProgress(projectId: string) {
  const ms = milestones.filter((m) => m.projectId === projectId)
  const done = ms.filter((m) => m.status === 'rechnung_gestellt' || m.status === 'bezahlt' || m.status === 'erreicht').length
  return { done, total: ms.length }
}

export function projectHours(projectId: string) {
  const ts = tasks.filter((t) => t.projectId === projectId)
  const used = ts.reduce((sum, t) => sum + t.usedHours, 0)
  const budget = ts.reduce((sum, t) => sum + t.budgetHours, 0)
  return { used, budget }
}

export function projectMargin(project: Project) {
  const ts = tasks.filter((t) => t.projectId === project.id)
  const cost = ts.reduce((sum, t) => {
    const emp = employees.find((e) => e.id === t.assigneeId)
    return sum + t.usedHours * (emp?.hourlyCostRate ?? 0)
  }, 0)
  const margin = project.offerAmount - cost
  const marginPercent = project.offerAmount > 0 ? Math.round((margin / project.offerAmount) * 100) : 0
  return { cost, margin, marginPercent }
}
