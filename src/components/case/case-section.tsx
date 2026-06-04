function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

export function CaseSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section id={slugify(title)} data-section={title} className="mb-[72px]">
      <h2 className="mb-8 border-b border-border pb-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  )
}
