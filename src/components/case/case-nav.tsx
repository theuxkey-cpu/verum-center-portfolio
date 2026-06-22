import Link from "next/link"

const CASES = [
  { href: "/cases/verum-center", label: "VerumCenter" },
  { href: "/cases/verum-global-vs-vsg", label: "First Build → Rebuilt" },
  { href: "/cases/verum-supply", label: "FlowOps" },
  { href: "/cases/pneustore", label: "B2C Tire Platform" },
]

interface CaseNavProps {
  current: string
}

export function CaseNav({ current }: CaseNavProps) {
  const idx = CASES.findIndex((c) => c.href === current)
  const prev = idx > 0 ? CASES[idx - 1] : null
  const next = idx < CASES.length - 1 ? CASES[idx + 1] : null

  return (
    <nav aria-label="Case navigation" className="flex items-start justify-between">
      {prev ? (
        <Link href={prev.href} className="group flex flex-col gap-1">
          <span className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground">Previous</span>
          <span className="text-[14px] font-medium text-foreground transition-colors group-hover:text-[var(--accent-dim)]">
            ← {prev.label}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={next.href} className="group flex flex-col items-end gap-1">
          <span className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground">Next</span>
          <span className="text-[14px] font-medium text-foreground transition-colors group-hover:text-[var(--accent-dim)]">
            {next.label} →
          </span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  )
}
