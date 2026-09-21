export function ProgressBar({ value, tone = 'blue' }: { value: number; tone?: 'blue' | 'green' | 'amber' | 'red' }) {
  const clamped = Math.max(0, Math.min(100, value))
  const toneClasses = {
    blue: 'bg-sky-500',
    green: 'bg-brand-500',
    amber: 'bg-amber-500',
    red: 'bg-rose-500',
  }
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
      <div className={`h-full rounded-full ${toneClasses[tone]}`} style={{ width: `${clamped}%` }} />
    </div>
  )
}
