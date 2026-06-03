import Image from "next/image"
import { CaseHeader } from "@/components/case/case-header"
import { CaseSection } from "@/components/case/case-section"
import { PainList } from "@/components/case/pain-list"
import { MetricsGrid } from "@/components/case/metrics-grid"
import { IterationCard } from "@/components/case/iteration-card"

function P({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-[15px] leading-[1.75] text-[#c8c8c8]">{children}</p>
}

function Flow({ steps }: { steps: string[] }) {
  return (
    <div className="my-5 flex flex-wrap items-center gap-2">
      {steps.map((step, i) => (
        <span key={i} className="flex items-center gap-2">
          <span className="rounded-md border border-border bg-[var(--surface-2)] px-3 py-1.5 text-[12px] text-[#aaa]">{step}</span>
          {i < steps.length - 1 && <span className="text-[14px] text-[#444]">→</span>}
        </span>
      ))}
    </div>
  )
}

function ImgPlaceholder({ label }: { label: string }) {
  return (
    <div className="my-7 flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#2a2a2a] bg-[var(--surface-2)] text-[#444]">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
      </svg>
      <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#3a3a3a]">{label}</span>
    </div>
  )
}

export default function VerumSupplyPage() {
  return (
    <div className="mx-auto max-w-[760px] px-6">
      <CaseHeader
        eyebrow="Product Design · Cantu Inc."
        title="Designing the Intelligence Layer of an Enterprise Supply Chain Platform"
        subtitle="Built end-to-end UX for a supply chain management platform that replaced spreadsheets and isolated SAP tools across four departments — as the sole designer from discovery through production."
        tags={[
          { label: "Verum Supply", accent: true },
          { label: "B2B · Enterprise" },
          { label: "Supply Chain" },
          { label: "End-to-End Design" },
          { label: "Governance" },
        ]}
      />

      <CaseSection title="Context">
        <P>Cantu Inc. runs one of the largest automotive parts distribution networks in Brazil. Behind the commercial front sits a complex supply chain: Logistics, Supply Planning (S&amp;OP), Importing, and International Purchasing — four departments that each manage critical, interdependent operations.</P>
        <P>Before Verum Supply, these departments operated in silos. Planning happened in spreadsheets. Purchasing data lived in an isolated SAP configuration that didn&apos;t talk to logistics. Backorder status required manual follow-up. There was no shared view of what was in stock, what was on order, or what was on its way.</P>
        <P>I was the sole UX designer on the project, involved from discovery through production across every module.</P>
      </CaseSection>

      <CaseSection title="My Role">
        <PainList items={[
          { icon: "◎", content: "Sole UX designer across all modules: Supply Planning, Backorder (National and International), SAP Integration, and Access Management" },
          { icon: "◎", content: "Ran discovery for the Supply module — defining the Push/Pull model architecture before any screen was designed" },
          { icon: "◎", content: "Created the Score de Suficiência: a 14-dimension governance framework adopted as the team's standard for feature readiness before entering development" },
          { icon: "◎", content: "Iterated weekly alongside a fast-shipping team — 4 major releases and 6 hotfixes in production over 2 months" },
        ]} />
      </CaseSection>

      <CaseSection title="Problem">
        <P><strong>Four departments. Four disconnected systems. No shared visibility.</strong></P>
        <PainList items={[
          { icon: "⚠", content: <><strong>Supply planners worked in spreadsheets.</strong> No automated calculation of min/max levels, safety stock, or lead times. Every proposal was manual.</> },
          { icon: "⚠", content: <><strong>Branch managers requested blind.</strong> No visibility into available stock before submitting a request. The supply team reviewed everything manually.</> },
          { icon: "⚠", content: <><strong>Backorder tracking was phone calls and email chains.</strong> No system showed which orders were stuck, at which stage, or why.</> },
          { icon: "⚠", content: <><strong>SAP data wasn&apos;t real-time.</strong> Teams made stocking decisions on stale information. Approval chains were informal — no audit trail, no SLAs.</> },
        ]} />
        <div className="my-6 grid grid-cols-2 gap-3 max-sm:grid-cols-1">
          <div className="rounded-[10px] border border-[#2a1515] bg-[#130d0d] p-[18px]">
            <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#8b3a3a]">Before</p>
            <p className="text-[13px] text-[#999]">Spreadsheets, isolated SAP, phone calls for backorder status, informal approvals with no audit trail, decisions made on stale data.</p>
          </div>
          <div className="rounded-[10px] border border-[#152a1d] bg-[#0d1310] p-[18px]">
            <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#3a8b5a]">After</p>
            <p className="text-[13px] text-[#999]">Single platform with real-time stock visibility, structured Push/Pull flows, approval chains with full audit trail, and consolidated backorder monitoring.</p>
          </div>
        </div>
      </CaseSection>

      <CaseSection title="Research">
        <P>Discovery ran before the first screen. The most important output was defining two fundamentally different replenishment models that had to coexist in the same platform:</P>
        <PainList items={[
          { icon: "→", content: <><strong>Push (Automatic):</strong> system-initiated, policy-driven — proactive replenishment based on consumption patterns and min/max rules</> },
          { icon: "→", content: <><strong>Pull (On-Demand):</strong> branch-initiated, with justification, automatic validation, and multi-level approval workflow</> },
        ]} />
        <P>Keeping these as architecturally separate pillars — with Shipment as a third independent pillar — became the design decision that shaped every subsequent interaction pattern. Conflating them in early stakeholder sessions was the main source of scope confusion.</P>
      </CaseSection>

      <CaseSection title="Solution">
        <IterationCard number="Module 01" title="Supply Planning — Push & Pull">
          <p>Two modes, one coherent interface. The Push flow is system-driven; the Pull flow is branch-initiated with full governance.</p>
          <p className="mt-3 mb-1 font-medium text-[#ccc]">Push:</p>
        </IterationCard>
        <Flow steps={["Load data", "Engine calculates", "Under review", "Adjust / simulate", "Approve", "Publish", "Orders generated"]} />
        <p className="mb-1 mt-2 text-[14px] font-medium text-[#ccc]">Pull:</p>
        <Flow steps={["Branch request", "Auto-validate", "Triage", "Approval chain", "Shipment"]} />

        <IterationCard number="Key Design Decision" title="Color-Segmented Column Groups">
          <p>The supply planning table spans dozens of columns — organizational context, product identity, strategic segmentation, status, stock levels, and demand data — all simultaneously necessary. Scrolling through unlabeled columns created constant disorientation.</p>
          <p>The solution: color-coded group headers acting as visual landmarks across the full table width. Six segments, each with a distinct hue spanning its columns — so analysts scan directly to the segment they need without reading individual headers.</p>
        </IterationCard>

        <Image
          src="/supply-table.png"
          alt="Supply planning table with color-segmented column groups"
          width={760}
          height={428}
          className="mb-2 mt-6 w-full rounded-[10px] border border-border"
        />
        <p className="mb-8 text-[12px] leading-[1.5] text-[#555]">
          Plano de abastecimento — color-coded segments: Organizational Context (gray), Product Identity (blue), Strategic Segmentation (amber), Status (red), Supply (blue), Local Demand (purple)
        </p>

        <div className="my-5 overflow-hidden rounded-lg border border-border">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr>
                <th className="border-b border-border py-2.5 pl-3.5 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">Segment</th>
                <th className="border-b border-border py-2.5 pl-3.5 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">Columns</th>
              </tr>
            </thead>
            <tbody>
              {[
                { color: "#9ca3af", label: "Organizational Context", cols: "Branch, Company, Region" },
                { color: "#93c5fd", label: "Product Identity", cols: "SKU, Category, Product, Brand, Model, Size" },
                { color: "#fbbf24", label: "Strategic Segmentation", cols: "Branch drive, Brand drive, Proposal, Assortment" },
                { color: "#f87171", label: "Status", cols: "Blocked" },
                { color: "#60a5fa", label: "Supply", cols: "Distribution center, stock levels by location" },
                { color: "#a78bfa", label: "Local Demand", cols: "VMM, Min stock, Optimal stock" },
              ].map((row) => (
                <tr key={row.label}>
                  <td className="border-b border-[#181818] py-2.5 pl-3.5 text-[#b0b0b0] last:border-0">
                    <span className="mr-2 inline-block size-2.5 rounded-[3px]" style={{ background: row.color }} />
                    {row.label}
                  </td>
                  <td className="border-b border-[#181818] py-2.5 pl-3.5 text-[#b0b0b0] last:border-0">{row.cols}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <P>Additional table decisions: <strong>fixed + user-configurable columns</strong> (critical columns always visible, secondary columns toggled), <strong>auto-save</strong> (removing the explicit save button eliminated a recurring data loss pattern), and <strong>session-persistent smart filters</strong>.</P>

        <IterationCard number="Module 02" title="National Backorder Monitoring">
          <p>Before this module, backorder status required phone calls and email chains across systems. The monitoring screen gave the supply team a consolidated operational view: which orders were stuck, at which stage, and why.</p>
          <p>Key features: SAP integration for real-time order sync, material detail modal consolidating full item data in a single view, divergence management for discrepancies identified during SAP sync, and individual order detail screens with full operational context.</p>
        </IterationCard>

        <ImgPlaceholder label="INSERT: Backorder monitoring screen" />

        <IterationCard number="Module 03" title="Access Management by Profile">
          <p>A supply chain platform serving multiple departments requires precise access control. I designed the system around three operational roles: Supply Analyst (full planning and approval access), Branch Manager (pull requests scoped to their assigned units only), and ADM Master (user management).</p>
          <p>Profile-to-unit linking allows the same person to hold different roles at different locations — a common pattern in a distributed distribution network.</p>
        </IterationCard>

        <IterationCard number="Module 04 — Governance" title="Score de Suficiência v5">
          <p>Features entering development underspecified was a recurring problem: bugs, rework, misaligned outcomes. I created the Score de Suficiência — a 14-dimension framework scored out of 100, with a 95-point threshold required before any feature enters the development queue.</p>
          <p>The 14 dimensions span Critical (data &amp; integrations, risks), Important (user journey, states &amp; transitions, acceptance criteria), and Context (feature framing, UI behavior, access &amp; permissions). The framework gave the team a shared language and turned the &quot;is this ready?&quot; debate into a number.</p>
        </IterationCard>
      </CaseSection>

      <CaseSection title="Impact">
        <p className="mb-6 text-[13px] text-muted-foreground">Metrics are directional and NDA-compliant.</p>
        <MetricsGrid items={[
          { value: "4", label: "Departments unified under a single supply chain platform" },
          { value: "10+", label: "Production releases in 2 months (deploys + hotfixes)" },
          { value: "Real-time", label: "Stock visibility via OMS integration — replacing stale SAP data" },
          { value: "95pts", label: "Score de Suficiência threshold — adopted as team standard" },
        ]} />
      </CaseSection>

      <CaseSection title="What I'd Do Differently">
        <P><strong>Clarify the Push/Pull/Shipment boundary earlier in stakeholder communication.</strong> The three pillars are architecturally separate — Push doesn&apos;t auto-generate shipments, Pull requires a separate approval chain, Shipment is its own pillar. Stakeholders conflated them in the first two sprints. Making this explicit sooner would have saved scope confusion.</P>
        <P><strong>Design the column configuration system in the first version.</strong> The fixed/configurable column pattern was introduced as a post-launch improvement. Supply analysts had already adapted by exporting to Excel to manage column selection. Mapping their specific scanning workflows during discovery would have surfaced this in time to ship it from day one.</P>
      </CaseSection>

      <footer className="mt-12 border-t border-border py-8">
        <p className="text-[12px] text-[#444]">VerumSupply is a production system. Screenshots and metrics have been sanitized to protect confidential business information.</p>
      </footer>
    </div>
  )
}
