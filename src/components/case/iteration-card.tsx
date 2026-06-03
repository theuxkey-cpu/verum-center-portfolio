export function IterationCard({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-4 rounded-xl border border-border bg-card p-6">
      <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--accent-dim)]">
        {number}
      </p>
      <h3 className="mb-3 text-base font-semibold tracking-[-0.01em] text-foreground">{title}</h3>
      <div className="text-[14px] leading-[1.6] text-[#b0b0b0] [&>p+p]:mt-2.5">{children}</div>
    </div>
  )
}
