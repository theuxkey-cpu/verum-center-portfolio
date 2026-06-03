export function MetricsGrid({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="my-7 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-[10px] border border-border bg-card px-[22px] py-5"
        >
          <div className="mb-1.5 text-[28px] font-bold leading-none tracking-[-0.02em] text-[var(--accent-warm)]">
            {item.value}
          </div>
          <div className="text-[12px] leading-[1.4] text-muted-foreground">{item.label}</div>
        </div>
      ))}
    </div>
  )
}
