interface BeforeAfterProps {
  before: string
  after: string
  afterLabel?: string
}

export function BeforeAfter({ before, after, afterLabel = "Direction" }: BeforeAfterProps) {
  return (
    <div className="my-6 grid grid-cols-2 gap-3 max-sm:grid-cols-1">
      <div className="rounded-[10px] border border-[var(--before-border)] bg-[var(--before-bg)] p-[18px]">
        <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--before-label)]">Before</p>
        <p className="text-[13px] text-muted-foreground">{before}</p>
      </div>
      <div className="rounded-[10px] border border-[var(--after-border)] bg-[var(--after-bg)] p-[18px]">
        <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--after-label)]">{afterLabel}</p>
        <p className="text-[13px] text-muted-foreground">{after}</p>
      </div>
    </div>
  )
}
