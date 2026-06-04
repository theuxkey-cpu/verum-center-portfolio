import Image from "next/image"
import Link from "next/link"
import { CaseSidebar } from "@/components/case/case-sidebar"

function CaseCard({
  href, company, type, title, description, tags,
}: {
  href: string; company: string; type: string; title: string
  description: string; tags: string[]
}) {
  return (
    <Link
      href={href}
      className="group relative block rounded-[14px] border border-[var(--tag-border)] bg-[var(--card)] p-7 transition-all hover:border-[#333] hover:bg-[#161616] hover:shadow-[0_8px_32px_-4px_oklch(0.77_0.038_65_/_0.08)] sm:p-8"
    >
      <span aria-hidden="true" className="absolute right-7 top-7 text-lg text-muted-foreground transition-transform group-hover:translate-x-[3px] group-hover:translate-y-[-3px]">↗</span>
      <div className="mb-4 flex flex-wrap items-center gap-2.5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">{company}</span>
        <span className="size-[3px] rounded-full bg-[var(--tag-border)]" />
        <span className="text-[11px] text-muted-foreground">{type}</span>
      </div>
      <h2 className="mb-2.5 text-xl font-semibold leading-[1.3] tracking-[-0.015em] text-foreground">{title}</h2>
      <p className="mb-5 text-sm leading-[1.6] text-muted-foreground">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <span key={t} className="rounded-full border border-[var(--tag-border)] bg-[var(--tag-bg)] px-2.5 py-1 text-[11px] font-medium text-muted-foreground">{t}</span>
        ))}
      </div>
    </Link>
  )
}

function ExpItem({ date, role, company, desc }: { date: string; role: string; company?: string; desc?: string }) {
  return (
    <div className="grid grid-cols-[140px_1fr] gap-6 border-b border-border py-6 last:border-b-0 last:pb-0 max-sm:grid-cols-1 max-sm:gap-1">
      <span className="pt-[3px] text-xs leading-[1.4] text-muted-foreground">{date}</span>
      <div>
        <p className="text-[15px] font-medium text-foreground">{role}</p>
        {company && <p className="text-[13px] text-muted-foreground">{company}</p>}
        {desc && <p className="mt-1 text-[13px] leading-[1.5] text-[#666]">{desc}</p>}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
    <CaseSidebar showBack={false} />
    <div className="mx-auto max-w-[760px] px-6">

      {/* Hero */}
      <div className="border-b border-border pb-20 pt-24 max-sm:pb-14 max-sm:pt-16">
        <div className="flex items-center justify-between gap-10 max-sm:flex-col max-sm:items-start max-sm:gap-8">
          <div className="flex-1 min-w-0">
            <div style={{ animation: "slide-up 0.5s ease both" }} className="mb-6 flex flex-wrap items-center gap-2.5">
              <p className="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">Product Designer</p>
              <span className="rounded-full border border-[#2a2518] bg-[#1a1610] px-2.5 py-1 text-[10px] font-medium text-[var(--accent-dim)]">↗ Design Engineer</span>
            </div>
            <h1 style={{ animation: "slide-up 0.6s ease both 0.1s" }} className="mb-6 text-[clamp(32px,6vw,52px)] font-semibold leading-[1.1] tracking-[-0.025em]">
              Hi, I&apos;m <span className="text-[var(--accent-dim)]">Keythe</span>.
            </h1>
            <p style={{ animation: "slide-up 0.6s ease both 0.22s" }} className="mb-9 max-w-[560px] text-base leading-[1.75] text-[#b0b0b0]">
              3+ years designing B2B and B2C digital products — UX research, design systems, and operational interfaces for SaaS and CRM platforms. Currently crossing into Design Engineering: shipping production interfaces in Next.js, using AI as an architectural reviewer, and deploying on Vercel.
            </p>
            <div style={{ animation: "slide-up 0.5s ease both 0.34s" }} className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent-warm)] px-5 py-2.5 text-sm font-medium text-[#0a0a0a] transition-opacity hover:opacity-80"
              >
                Let's talk
              </Link>
              <a
                href="https://linkedin.com/in/keytherueckert"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground transition-opacity hover:opacity-80"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>

          <div style={{ animation: "slide-up 0.6s ease both 0.15s" }} className="shrink-0 max-sm:self-start">
            <Image
              src="/profile.png"
              alt="Keythe Rueckert"
              width={128}
              height={128}
              priority
              className="rounded-full object-cover ring-1 ring-[var(--tag-border)]"
            />
          </div>
        </div>
      </div>

      {/* Featured Work */}
      <section id="featured-work" data-section="Featured Work" className="border-b border-border py-[72px] max-sm:py-14">
        <p className="mb-10 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground before:block before:h-px before:w-5 before:shrink-0 before:bg-[var(--accent-dim)] before:content-['']">Featured Work</p>
        <div className="flex flex-col gap-4">
          <CaseCard
            href="/cases/verum-center"
            company="Cantu Inc."
            type="Platform Design · Enterprise"
            title="Designing VerumCenter: A New Product Built to Unify Two Business Models Across Three Countries"
            description="VerumCenter didn't exist before this project. Led product design from discovery to handoff — consolidating retail and wholesale operations into a single platform for Brazil, USA, and Mexico."
            tags={["Product Strategy", "Platform Design", "3 Countries", "Retail + Wholesale"]}
          />
          <CaseCard
            href="/cases/verum-global-vs-vsg"
            company="Verum Sales Global"
            type="Design Engineering · B2B"
            title={'From "Ship It" to "Scale It": How Building the Same Product Twice Made Me a Better Designer and Engineer'}
            description="Built Verum Global, watched it accumulate inconsistency, then rebuilt it as VSG with a system-first approach. Covers component architecture, AI as design reviewer, and how a layout contract changes what you can ship without rework."
            tags={["Design Engineering", "System Design", "Next.js · shadcn/ui", "Before / After"]}
          />
          <CaseCard
            href="/cases/verum-supply"
            company="Cantu Inc."
            type="Supply Chain · Enterprise"
            title="Designing the Intelligence Layer of an Enterprise Supply Chain Platform"
            description="Built end-to-end UX for a supply chain platform that replaced spreadsheets and isolated SAP tools across four departments — sole designer from discovery through weekly production deploys."
            tags={["End-to-End Design", "Complex Data Tables", "Governance", "SAP Integration"]}
          />
          <CaseCard
            href="/cases/pneustore"
            company="Cantu Inc."
            type="B2C E-commerce · O2O"
            title="Three Research Workstreams That Diagnosed Why a Tire Platform Was Losing Customers"
            description="Led UX research across three interconnected failures in a B2C tire platform — using Clarity behavioral data (2.47M sessions) and NPS analysis to diagnose wrong-size purchases and broken vehicle-context search."
            tags={["UX Research", "Behavioral Data", "O2O / Omnichannel", "B2C"]}
          />
        </div>
      </section>

      {/* Lab */}
      <section id="lab" data-section="Lab" className="border-b border-border py-[72px] max-sm:py-14">
        <p className="mb-10 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground before:block before:h-px before:w-5 before:shrink-0 before:bg-[var(--accent-dim)] before:content-['']">Lab</p>
        <div className="flex flex-col gap-4">
          <Link
            href="/lab/cenarios"
            className="group relative block rounded-[14px] border border-[var(--tag-border)] bg-[var(--card)] p-7 transition-all hover:border-[#333] hover:bg-[#161616] hover:shadow-[0_8px_32px_-4px_oklch(0.77_0.038_65_/_0.08)] sm:p-8"
          >
            <span aria-hidden="true" className="absolute right-7 top-7 text-lg text-muted-foreground transition-transform group-hover:translate-x-[3px] group-hover:translate-y-[-3px]">↗</span>
            <div className="mb-4 flex flex-wrap items-center gap-2.5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Verum Sales Global</span>
              <span className="size-[3px] rounded-full bg-[var(--tag-border)]" />
              <span className="text-[11px] text-muted-foreground">Interactive Demo</span>
            </div>
            <h2 className="mb-2.5 text-xl font-semibold leading-[1.3] tracking-[-0.015em] text-foreground">UI Scenarios — Accounts Module</h2>
            <p className="mb-5 text-sm leading-[1.6] text-muted-foreground">
              Live demo of every UI state in the Accounts module: toasts, alerts, tooltips, confirmation modals, and inline errors — generated with the Scenario Generator tool and implemented in production.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Interactive", "Sonner Toasts", "Radix Dialogs", "VSG Design System"].map((t) => (
                <span key={t} className="rounded-full border border-[var(--tag-border)] bg-[var(--tag-bg)] px-2.5 py-1 text-[11px] font-medium text-muted-foreground">{t}</span>
              ))}
            </div>
          </Link>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" data-section="Experience" className="border-b border-border py-[72px] max-sm:py-14">
        <p className="mb-10 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground before:block before:h-px before:w-5 before:shrink-0 before:bg-[var(--accent-dim)] before:content-['']">Experience</p>
        <ExpItem date="Nov 2024 – Present" role="Product Designer" company="Cantu Inc." />
        <ExpItem date="Aug 2023 – Nov 2024" role="UX/UI Designer" company="Focusmonk" />
        <ExpItem date="Jan 2023 – Aug 2023" role="UX/UI Designer" company="Lize" />
      </section>

      {/* Education */}
      <section id="education" data-section="Education" className="py-[72px] max-sm:py-14">
        <p className="mb-10 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground before:block before:h-px before:w-5 before:shrink-0 before:bg-[var(--accent-dim)] before:content-['']">Education</p>
        <ExpItem date="2026 – Present" role="AI — ongoing focus" />
        <ExpItem date="2023 – 2024" role="MBA — UX Research, Research Ops & Design Leadership" company="Unifast & Toronto School of Management" desc="Innovation, AI, and UX with emphasis on research, usability, and data-driven product design." />
        <ExpItem date="2015 – 2018" role="Bachelor — Advertising & Marketing" desc="Strategy, consumer behavior and digital communication." />
      </section>

      {/* Footer */}
      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-border py-12">
        <p className="text-[13px] text-[#444]">Keythe Rueckert · Product Designer</p>
        <div className="flex gap-5">
          <a href="mailto:keytherueckert93@gmail.com" className="text-[13px] text-muted-foreground hover:text-foreground">Email</a>
          <a href="https://www.behance.net/keytheruec167d" target="_blank" rel="noopener noreferrer" className="text-[13px] text-muted-foreground hover:text-foreground">Behance</a>
          <a href="https://linkedin.com/in/keytherueckert" target="_blank" rel="noopener noreferrer" className="text-[13px] text-muted-foreground hover:text-foreground">LinkedIn</a>
        </div>
      </footer>

    </div>
    </>
  )
}
