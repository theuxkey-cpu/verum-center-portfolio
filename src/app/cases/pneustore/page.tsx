import type { Metadata } from "next"
import { CaseHeader } from "@/components/case/case-header"
import { CaseNav } from "@/components/case/case-nav"
import { CaseSection } from "@/components/case/case-section"
import { PainList } from "@/components/case/pain-list"
import { MetricsGrid } from "@/components/case/metrics-grid"
import { IterationCard } from "@/components/case/iteration-card"

export const metadata: Metadata = {
  title: "PneuStore 360° — UX Research | Keythe Rueckert",
  description: "Three UX research workstreams that diagnosed why a tire e-commerce platform was losing customers — 2.47M sessions, NPS analysis, and O2O design direction.",
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-[15px] leading-[1.75] text-muted-foreground">{children}</p>
}

function StatRow({ items }: { items: { value: string; warn?: boolean; label: string }[] }) {
  return (
    <div className="my-6 grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-3">
      {items.map((item) => (
        <div key={item.label} className="rounded-[10px] border border-border bg-card px-5 py-[18px]">
          <div className={`mb-1.5 text-2xl font-bold leading-none tracking-[-0.02em] ${item.warn ? "text-[var(--note-warn-accent)]" : "text-[var(--accent-warm)]"}`}>
            {item.value}
          </div>
          <div className="text-[12px] leading-[1.4] text-muted-foreground">{item.label}</div>
        </div>
      ))}
    </div>
  )
}

function Verbatim({ children, cite }: { children: string; cite: string }) {
  return (
    <blockquote className="my-4 border-l-[3px] border-border py-3.5 pl-[18px] text-[14px] italic leading-[1.65] text-muted-foreground">
      {children}
      <cite className="mt-2 block text-[11px] not-italic tracking-[0.04em] text-muted-foreground">— {cite}</cite>
    </blockquote>
  )
}

function Callout({ children, warn }: { children: React.ReactNode; warn?: boolean }) {
  return (
    <div className={`my-6 rounded-lg border px-5 py-[18px] text-[14px] leading-[1.65] text-muted-foreground ${warn ? "border-[var(--note-warn-border)] border-l-[var(--note-warn-accent)] bg-[var(--note-warn-bg)] border-l-[3px]" : "border-[var(--note-info-border)] border-l-[var(--accent-dim)] bg-[var(--note-info-bg)] border-l-[3px]"}`}>
      {children}
    </div>
  )
}

function DataTable() {
  return (
    <table className="my-5 w-full border-collapse text-[13px]">
      <thead>
        <tr>
          <th className="border-b border-border pb-2.5 pl-3.5 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">Page</th>
          <th className="border-b border-border pb-2.5 pl-3.5 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">Rage Clicks</th>
        </tr>
      </thead>
      <tbody>
        {[
          { page: "/search", clicks: "23,661 🚨", bold: true },
          { page: "/ (Homepage)", clicks: "5,271" },
          { page: "/marca/michelin", clicks: "4,591" },
          { page: "PDP — product page", clicks: "4,116" },
          { page: "/checkout/pagamento", clicks: "2,273" },
        ].map((row) => (
          <tr key={row.page}>
            <td className={`border-b border-[var(--table-row-border)] py-2.5 pl-3.5 text-muted-foreground last:border-0 ${row.bold ? "font-semibold text-foreground" : ""}`}>{row.page}</td>
            <td className={`border-b border-[var(--table-row-border)] py-2.5 pl-3.5 text-muted-foreground last:border-0 ${row.bold ? "font-semibold text-foreground" : ""}`}>{row.clicks}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function PersonaGrid() {
  const personas = [
    { name: "Ricardo", desc: "App-native driver. Expects end-to-end flow — buys and books in one session." },
    { name: "Seu Manoel", desc: "Auto shop owner. Buys in bulk, needs invoice and fast confirmation." },
    { name: "Fabiana", desc: "Fleet manager. Multiple vehicles. SLA and audit trail matter more than price." },
    { name: "Enzo", desc: "Convenience-first. Will pay more to avoid friction. Drops immediately if flow feels incomplete." },
    { name: "Dona Neide", desc: "Digital novice. High anxiety. Needs reassurance at every step." },
    { name: "Julia", desc: "Small fleet. Researches carefully. Wrong purchase invisible in funnel data." },
  ]
  return (
    <div className="my-6 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
      {personas.map((p) => (
        <div key={p.name} className="rounded-[10px] border border-border bg-card px-[18px] py-4">
          <p className="mb-1 text-[13px] font-semibold text-foreground">{p.name}</p>
          <p className="text-[12px] leading-[1.5] text-muted-foreground">{p.desc}</p>
        </div>
      ))}
    </div>
  )
}

function Flow({ steps }: { steps: { label: string; danger?: boolean; highlight?: boolean }[] }) {
  return (
    <div className="my-5 flex flex-wrap items-center gap-2">
      {steps.map((step, i) => (
        <span key={i} className="flex items-center gap-2">
          <span className={`rounded-md border px-3 py-1.5 text-[12px] ${step.danger ? "border-[var(--before-border)] bg-[var(--before-bg)] text-[var(--before-label)]" : step.highlight ? "border-[var(--badge-warm-border)] bg-[var(--badge-warm-bg)] font-medium text-[var(--accent-dim)]" : "border-border bg-[var(--surface-2)] text-muted-foreground"}`}>
            {step.label}
          </span>
          {i < steps.length - 1 && <span className="text-[14px] text-muted-foreground">→</span>}
        </span>
      ))}
    </div>
  )
}

function SprintBlock({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="my-5 rounded-[10px] border border-border bg-card px-[22px] py-5">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">{label}</p>
      <ul className="flex flex-col gap-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2.5 text-[14px] text-muted-foreground before:shrink-0 before:text-muted-foreground before:content-['→']">{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default function PneustorePage() {
  return (
    <div className="mx-auto max-w-[760px] px-6">
      <CaseHeader
        eyebrow="Cantu Inc. · B2C E-commerce"
        title="Three Research Workstreams That Diagnosed Why a Tire Platform Was Losing Customers"
        subtitle="Led UX research across three interconnected failures in PneuStore 360° — from behavioral data and NPS analysis to strategic design direction — covering O2O installation, vehicle-context search, and wrong-size purchases."
        tags={[
          { label: "PneuStore 360°", accent: true },
          { label: "UX Research" },
          { label: "Behavioral Data Analysis" },
          { label: "O2O / Omnichannel" },
          { label: "B2C" },
        ]}
      />

      <CaseSection title="Context">
        <P>PneuStore 360° is Cantu Inc.&apos;s direct-to-consumer e-commerce channel for automotive tires — part of the same distribution network that powers 6,000+ auto centers across Brazil. The platform allows customers to browse, purchase, and schedule tire installation at partner shops nationwide.</P>
        <P>Despite significant commercial investment, three structural UX failures were driving abandonment, wrong purchases, and customer churn. I was brought in to investigate each one from discovery — using behavioral data, NPS qualitative analysis, and stakeholder walkthroughs — and define the design direction before solutions were built.</P>
        <P>The three workstreams were independent in origin but shared a common root: the platform was designed around products, not around the complete tire-buying journey.</P>
      </CaseSection>

      <CaseSection title="My Role">
        <PainList items={[
          { icon: "○", content: "Led end-to-end UX research for all three workstreams — behavioral data analysis (Microsoft Clarity), NPS/qualitative synthesis (SoluCX), stakeholder mapping, and benchmarking" },
          { icon: "○", content: "Produced structured research artifacts: root cause analysis, JTBD mapping, customer journey maps, prioritization matrices, and sprint roadmaps" },
          { icon: "○", content: "Defined the conceptual model for the \"Compra e Instale\" O2O flow and the vehicle-context fitment UX direction" },
          { icon: "○", content: "Identified that the wrong-size purchase failure was systemic — driven by 6 compounding root causes — and prioritized a sprint roadmap covering immediate, structural, and transformational interventions" },
        ]} />
      </CaseSection>

      <CaseSection title="Problem">
        <P>Three failures, one underlying pattern: the platform treated the tire as the end goal. The customer&apos;s actual goal — getting the right tire installed on their car — was left for them to figure out.</P>
        <div className="flex flex-col gap-4 my-7">
          {[
            { num: "Problem 01 — Compra e Instale", title: "Buying a tire doesn't include getting it installed", desc: "The purchase flow ended at delivery. Installation — mandatory, complex, and anxiety-inducing — was left entirely to the customer post-checkout. The platform had partner shops, scheduling infrastructure, and installation capabilities. None of it was surfaced in the purchase experience." },
            { num: "Problem 02 — Página de Carros", title: "Vehicle search returned results the user couldn't trust", desc: "Users searching by vehicle expected to see only compatible tires. The catalog returned a generic product list with no vehicle context. The fitment engine already validated compatibility in the backend. The front-end never confirmed it, silently breaking trust at the most critical decision point." },
            { num: "Problem 03 — Erro de Medida", title: "Users were buying the wrong tire size — and couldn't fix it", desc: "Customers were purchasing incompatible tire sizes at a frequency high enough to generate measurable NPS impact, operational cost, and churn. The interface offered no guided entry point by vehicle, no compatibility validation on the product page, and no friction before checkout." },
          ].map((p) => (
            <div key={p.num} className="rounded-xl border border-border bg-card p-6">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--accent-dim)]">{p.num}</p>
              <h3 className="mb-2.5 text-base font-semibold text-foreground">{p.title}</h3>
              <p className="text-[14px] text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </CaseSection>

      <CaseSection title="Research">
        <h3 className="mb-3 text-lg font-semibold tracking-[-0.01em]">Workstream 03 — Diagnosing the wrong-size purchase failure</h3>
        <P>I crossed behavioral data from Microsoft Clarity (30 days, 2.47M sessions) with qualitative NPS data from SoluCX (2,524 respondents, April–May 2026) to establish where the failure was happening, who it was affecting, and why the interface was enabling it.</P>

        <StatRow items={[
          { value: "2.47M", label: "Sessions analyzed over 30 days" },
          { value: "0.72%", warn: true, label: "Conversion rate — 17,864 purchases" },
          { value: "309K", warn: true, label: "Sessions that started checkout but didn't finish" },
          { value: "82%", warn: true, label: "Mobile traffic — with 64% bounce rate" },
        ]} />

        <Callout warn>
          <strong className="text-[var(--note-warn-accent)]">The mobile gap:</strong> 82% of traffic was mobile, but mobile bounce rate was 62% higher than desktop. Users on mobile had significantly more difficulty navigating, filtering, and confirming sizes — yet that&apos;s where most purchase decisions were being made.
        </Callout>

        <h3 className="mb-3 mt-10 text-lg font-semibold tracking-[-0.01em]">Where frustration was concentrated</h3>
        <P>Rage click analysis revealed a clear signal: the /search page had 23,661 rage clicks — 4.5× more than any other page on the site.</P>
        <DataTable />

        <h3 className="mb-3 mt-10 text-lg font-semibold tracking-[-0.01em]">The NPS signal</h3>
        <P>Of 312 detractor comments with written feedback, 21 were direct reports of purchasing the wrong tire size — 6.7% of all detractors. An additional 99 comments contained keywords related to size, exchange, error, or return.</P>

        <Verbatim cite="Detractor, NPS 7">
          &quot;The site induces error. I searched for a tire size, brand and model. In the same brand, the searched size appeared alongside other sizes. I bought the wrong one. The return after cancellation takes too long. No exchanges, only cancellations.&quot;
        </Verbatim>
        <Verbatim cite="Promoter, NPS 10 — missing a feature that had been removed">
          &quot;Before, there was a vehicle compatibility list on each product listing.&quot;
        </Verbatim>
        <Verbatim cite="Detractor, NPS 0 — trying to correct a wrong-size purchase">
          &quot;I was on the phone for an hour and a half. When the agent finally answered, the call dropped.&quot;
        </Verbatim>

        <Callout>
          <strong className="text-[var(--accent-dim)]">The amplification pattern:</strong> Support was the largest category of detractor complaints (43%), above delayed delivery (33%). When users bought the wrong size, they tried to correct it — and couldn&apos;t reach anyone. The UX failure became a support failure, which became an NPS failure.
        </Callout>

        <h3 className="mb-3 mt-10 text-lg font-semibold tracking-[-0.01em]">Six root causes — not a single fixable issue</h3>
        <PainList items={[
          { icon: "1", content: <><strong className="text-foreground">The site guides by size, not by vehicle.</strong> No vehicle-first entry point on homepage or search. Users who don&apos;t know their size have no guided path — they estimate, compare similar sizes, and error.</> },
          { icon: "2", content: <><strong className="text-foreground">Search is the highest-friction page on the site.</strong> 23,661 rage clicks on /search indicate filters don&apos;t work as expected and similar sizes appear without clear hierarchy.</> },
          { icon: "3", content: <><strong className="text-foreground">The PDP offers no compatibility validation.</strong> The vehicle compatibility list that previously existed on product pages was removed. No signal tells the user whether this specific tire fits their specific car.</> },
          { icon: "4", content: <><strong className="text-foreground">Mobile concentrates maximum risk.</strong> 82% of sessions happen on mobile — where sizes are harder to read, comparison requires excessive scroll, and the search field is prone to input error.</> },
          { icon: "5", content: <><strong className="text-foreground">The purchase flow has zero positive friction.</strong> No confirmation moment between PDP and checkout. The user can complete a purchase without a single validation of the selected size.</> },
          { icon: "6", content: <><strong className="text-foreground">Post-purchase has no exit.</strong> Once the error is discovered, self-service cancellation before shipping is impossible via the site. Users are forced to wait for delivery, then navigate a broken returns flow.</> },
        ]} />

        <h3 className="mb-3 mt-10 text-lg font-semibold tracking-[-0.01em]">The wrong-size customer journey</h3>
        <Flow steps={[
          { label: "Entry via paid search" },
          { label: "Search fails", danger: true },
          { label: "Listing — picks similar size" },
          { label: "PDP — no validation", danger: true },
          { label: "Cart — zero friction", danger: true },
          { label: "Checkout completed" },
          { label: "Delivery — wrong size", danger: true },
          { label: "Support — unreachable", danger: true },
          { label: "Brand abandonment", danger: true },
        ]} />

        <h3 className="mb-3 mt-10 text-lg font-semibold tracking-[-0.01em]">Workstreams 01 & 02 — Research summary</h3>
        <P>Research included: stakeholder mapping across three tiers, process walkthroughs, benchmark analysis (Leroy Merlin, Magazine Luiza, Best Buy, Tire Rack, Fitment Group, WillTheyFit), and persona synthesis across 7 user profiles.</P>
        <PersonaGrid />

        <Callout>
          <strong className="text-[var(--accent-dim)]">Fitment root cause:</strong> The backend engine already validated vehicle compatibility. This wasn&apos;t a missing feature — it was a broken connection. The front-end simply never surfaced the validation that was already running invisibly.
        </Callout>
      </CaseSection>

      <CaseSection title="Solution Direction">
        <h3 className="mb-3 text-lg font-semibold tracking-[-0.01em] first:mt-0">01 — Compra e Instale: Installation as the default, not an afterthought</h3>
        <P>The central design decision: installation should be the pre-selected choice at checkout, not a secondary option the user has to discover.</P>
        <Flow steps={[
          { label: "PDP" },
          { label: "Logistics choice (Install default)", highlight: true },
          { label: "Select partner shop" },
          { label: "Schedule appointment" },
          { label: "Checkout" },
          { label: "Dual confirmation", highlight: true },
        ]} />

        <IterationCard number="Trust Signal" title='"Instalação Garantida" seal'>
          <p>Products eligible for the partner shop installation network carry a visible trust seal on the product card and detail page. It pre-answers the user&apos;s question before they have to ask: this tire is compatible with the installation service, a certified shop is available, and the appointment is confirmed at checkout.</p>
          <p>The seal functions as a persistent anchor across the funnel — reducing the cognitive load of evaluating whether installation is possible for a given product.</p>
        </IterationCard>

        <h3 className="mb-3 mt-10 text-lg font-semibold tracking-[-0.01em]">02 — Página de Carros: vehicle context stays visible throughout</h3>
        <P>Once a user enters their vehicle, that context persists as a visible filter banner across the entire shopping session. Every product card shows a compatibility confirmation drawn from the backend validation that was already running.</P>

        <div className="my-6 grid grid-cols-2 gap-3 max-sm:grid-cols-1">
          <div className="rounded-[10px] border border-[var(--before-border)] bg-[var(--before-bg)] p-[18px]">
            <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--before-label)]">Before</p>
            <p className="text-[13px] text-muted-foreground">Search &quot;pneus para Onix&quot; → generic catalog → no vehicle context → user can&apos;t trust results → abandons or buys wrong</p>
          </div>
          <div className="rounded-[10px] border border-[var(--after-border)] bg-[var(--after-bg)] p-[18px]">
            <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--after-label)]">Direction</p>
            <p className="text-[13px] text-muted-foreground">Vehicle selected once → persists across entire session → every result shows &quot;Compatible with your Chevrolet Onix 2021&quot; → incompatible products marked</p>
          </div>
        </div>

        <h3 className="mb-3 mt-10 text-lg font-semibold tracking-[-0.01em]">03 — Erro de Medida: a 3-sprint intervention roadmap</h3>
        <P>The wrong-size problem had 6 root causes and couldn&apos;t be solved with a single fix. The research produced a prioritized roadmap sequenced by impact versus effort.</P>

        <SprintBlock
          label="Sprint 1 — Quick wins: high impact, low effort"
          items={[
            "Confirmation modal before cart: \"You're buying 205/55R16 — for which vehicle?\" — positive friction that doesn't block experienced users",
            "Visual hierarchy of tire size on PDP and listing — size becomes the most visible element, not the discount",
            "Self-service cancellation before shipping — eliminates the post-error trap that currently destroys NPS",
          ]}
        />
        <SprintBlock
          label="Sprint 2 — Structural: medium effort, high return"
          items={[
            "Compatibility checker on PDP — reintroduces a feature users explicitly noted as missing; confirms fit before add-to-cart",
            "Search page overhaul — address the 23,661 rage clicks: autocomplete by size, filters that work, size-exact prioritization",
            "Size education inline — tooltip explaining what 205/55R16 means, at the moment the user is choosing",
          ]}
        />
        <SprintBlock
          label="Sprint 3 — Transformational: vehicle-first entry"
          items={[
            "Vehicle-guided entry as the primary search pattern — plate, model/year, or \"My Cars\" for returning users — eliminates the root cause for users who don't know their size",
            "Mobile-first redesign of the full purchase flow — addresses the 82% mobile traffic + 64% bounce gap",
          ]}
        />
      </CaseSection>

      <CaseSection title="Impact">
        <p className="mb-6 text-[13px] italic text-muted-foreground">Research-phase project. Metrics below are behavioral baselines from the diagnosis period.</p>
        <MetricsGrid items={[
          { value: "6", label: "Root causes mapped for wrong-size purchases — each with a distinct intervention point in the funnel" },
          { value: "21", label: "Direct NPS verbatims on wrong-size purchases — quantified a problem previously invisible in funnel data" },
          { value: "3", label: "Interconnected research workstreams synthesized into a unified design direction" },
          { value: "0", label: "New backend features required for vehicle-context fitment — the engine existed; the front-end connection was the gap" },
        ]} />
      </CaseSection>

      <CaseSection title="What I'd Do Differently">
        <P><strong>Cross-reference returns data from operations earlier.</strong> The NPS analysis surfaced the wrong-size problem quantitatively — but the NPS data only captured customers who responded to the survey. A returns-data audit from the operations team would have sharpened the business case and accelerated prioritization.</P>
        <P><strong>Test the confirmation modal assumption before locking the sprint sequence.</strong> The modal is a strong hypothesis but positive friction can also reduce conversion. I&apos;d validate this with an A/B test before positioning it as Sprint 1.</P>
        <P><strong>Treat the three workstreams as one connected story earlier.</strong> The shared root — platform organized around products, not around the complete tire-buying journey — became clear only after all three were mapped. Framing that unifying insight at the start would have sharpened research questions.</P>
      </CaseSection>

      <footer className="mt-12 border-t border-border py-8 flex flex-col gap-8">
        <CaseNav current="/cases/pneustore" />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[12px] text-muted-foreground">PneuStore 360° is a production system. Research data and metrics have been sanitized to protect confidential business information.</p>
          <a href="mailto:keytherueckert93@gmail.com" className="text-[13px] text-muted-foreground transition-colors hover:text-foreground">keytherueckert93@gmail.com</a>
        </div>
      </footer>
    </div>
  )
}
