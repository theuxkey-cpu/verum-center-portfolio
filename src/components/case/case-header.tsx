import Link from "next/link"

interface CaseHeaderProps {
  eyebrow: string
  title: string
  subtitle: string
  tags: { label: string; accent?: boolean }[]
}

export function CaseHeader({ eyebrow, title, subtitle, tags }: CaseHeaderProps) {
  return (
    <>
      <nav className="border-b border-border py-5">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground"
        >
          ← Back
        </Link>
      </nav>
      <header className="mb-[72px] border-b border-border pb-14 pt-12">
        <p className="mb-6 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.08em] text-muted-foreground before:block before:h-px before:w-5 before:bg-muted-foreground">
          {eyebrow}
        </p>
        <h1 className="mb-5 text-[clamp(28px,5vw,44px)] font-semibold leading-[1.15] tracking-[-0.02em]">
          {title}
        </h1>
        <p className="mb-9 max-w-[560px] text-[17px] leading-[1.6] text-muted-foreground">{subtitle}</p>
        <div className="flex flex-wrap gap-2.5">
          {tags.map((t) => (
            <span
              key={t.label}
              className={`rounded-full border px-3 py-[5px] text-[12px] font-medium tracking-[0.02em] ${
                t.accent
                  ? "border-[#3a3420] bg-[#1a1710] text-[var(--accent-dim)]"
                  : "border-[var(--tag-border)] bg-[var(--tag-bg)] text-muted-foreground"
              }`}
            >
              {t.label}
            </span>
          ))}
        </div>
      </header>
    </>
  )
}
