import type { Metadata } from "next"
import { CaseHeader } from "@/components/case/case-header"
import { CaseSection } from "@/components/case/case-section"
import { PainList } from "@/components/case/pain-list"
import { MetricsGrid } from "@/components/case/metrics-grid"
import { IterationCard } from "@/components/case/iteration-card"
import { BeforeAfter } from "@/components/case/before-after"
import { CaseNav } from "@/components/case/case-nav"

export const metadata: Metadata = {
  title: "Nexus — Platform Design | Keythe Rueckert",
  description: "How I designed a unified B2B platform from scratch — consolidating retail and wholesale operations across three countries.",
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-[15px] leading-[1.75] text-muted-foreground">{children}</p>
}

function ScreenImg({ caption }: { src: string; alt: string; caption: string }) {
  return (
    <>
      <div className="mb-2 mt-5 flex h-[260px] w-full flex-col items-center justify-center gap-4 rounded-[10px] border border-dashed border-border bg-[var(--surface-2)]">
        <div className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-lg">🔒</div>
        <div className="text-center">
          <p className="text-[13px] font-semibold text-foreground">Available upon interview request</p>
          <p className="mt-1 text-[12px] text-muted-foreground">Confidential interface — NDA protected</p>
        </div>
      </div>
      <p className="mb-8 text-[12px] leading-[1.5] text-muted-foreground">{caption}</p>
    </>
  )
}



export default function NexusPage() {
  return (
    <div className="mx-auto max-w-[760px] px-6">
      <CaseHeader
        eyebrow="Product Design & Strategy · Enterprise Client"
        title="Designing Nexus: A New Product Built to Unify Two Business Models Across Three Countries"
        subtitle="Nexus didn't exist before this project. It emerged from the strategic consolidation of the retail operations platform and the wholesale platform into a single product designed to serve Brazil, USA, and Mexico from day one."
        tags={[
          { label: "Nexus", accent: true },
          { label: "Product Strategy" },
          { label: "Platform Design" },
          { label: "3 Countries" },
          { label: "Retail + Wholesale" },
          { label: "Enterprise · B2B" },
        ]}
      />

      <div className="mb-6 mt-2 rounded-lg border border-border bg-[var(--surface-2)] px-5 py-3.5 text-[13px] leading-[1.65] text-muted-foreground">
        <strong className="text-foreground">Legal notice —</strong> All platform and system names in this case study are fictional pseudonyms. Real product identifiers have been replaced for confidentiality compliance.
      </div>

      <CaseSection title="Context">
        <P>The client operates across Brazil, the USA, and Mexico — one of the largest automotive parts distribution networks in Latin America, serving over 6,000 partner auto centers. The commercial operation was split along two distinct business models: the <strong>retail platform</strong>, handling store operations, and the <strong>wholesale platform</strong>, built for distributor accounts.</P>
        <P>Each platform had its own rules, channels, tax logic, and user workflows. Each country had further adaptations. As the company moved toward international expansion and operational unification, the fragmentation became unsustainable: support agents needed to switch tools to handle a single customer, business rules existed only as institutional memory, and there was no shared operational layer that could serve both business models simultaneously.</P>
        <P><strong>Nexus was the answer to that problem — and it had to be designed from scratch.</strong> The challenge was to define what a unified operational console should even be: which modules it needed, how retail and wholesale workflows could coexist in the same interface, and what a rule system that worked across three countries would look like.</P>
      </CaseSection>

      <CaseSection title="My Role">
        <P>I worked as a <strong>UX + Product Strategy lead</strong> across the full lifecycle of the product — from the first discovery session to engineering handoff.</P>
        <PainList items={[
          { icon: "◎", content: <><strong>Discovery with the squad.</strong> Led discovery sessions to map what the unified platform needed to do before any screens were designed — translating operational requirements and cross-team constraints into product decisions.</> },
          { icon: "◎", content: <><strong>Flow definition.</strong> Mapped the full operational workflows for both retail and wholesale models — opportunity creation, fiscal classification, pricing, approval, fulfillment, and post-sale — identifying where the two models diverged and where they could share the same flow.</> },
          { icon: "◎", content: <><strong>Business rule structuring.</strong> Catalogued and organized platform-wide business rules across 5 domains for the first time. These rules had previously existed only in people&apos;s heads or scattered documents.</> },
          { icon: "◎", content: <><strong>UI component standardization.</strong> Defined consistent UI patterns across modules and countries, ensuring that the same design language worked for a Brazil-only support agent and a multi-country commercial director.</> },
          { icon: "◎", content: <><strong>Prototype validation on Vercel.</strong> Built and deployed navigable prototypes independently to validate solutions with real users before engineering sprints — compressing the design-to-feedback cycle.</> },
          { icon: "◎", content: <><strong>GitHub handoff.</strong> Organized the technical validation and handoff flow using GitHub, ensuring developers had the context and specs needed to build accurately.</> },
        ]} />
      </CaseSection>

      <CaseSection title="Problem">
        <P>The core problem wasn&apos;t a broken interface — it was a missing product. Two business models, three countries, and five tools that didn&apos;t talk to each other.</P>
        <PainList items={[
          { icon: "⚠", content: <><strong>No single operational layer.</strong> A support agent handling a retail customer used the retail platform. If that customer had a wholesale account, the agent switched to a different tool. There was no unified view of a customer, an order, or a rule.</> },
          { icon: "⚠", content: <><strong>Informal channels as ops infrastructure.</strong> Order exceptions, escalations, and cross-country rule clarifications happened through informal communication channels and unstructured documents. No system of record. No audit trail.</> },
          { icon: "⚠", content: <><strong>Business rules lived in people&apos;s heads.</strong> Tax classification, channel eligibility, and pricing logic differed by country, business model, and customer type — none of it documented in a way non-specialists could access.</> },
          { icon: "⚠", content: <><strong>International expansion exposed every gap.</strong> Rules that worked in Brazil broke in the USA. Workflows designed for wholesale didn&apos;t fit retail. Adding a third country meant duplicating problems, not solving them at the source.</> },
        ]} />
        <BeforeAfter
          before="Two separate products, each built for one business model. Three countries with divergent rules. Fiscal decisions requiring specialist calls. No shared module, no shared language."
          after="A single product with role-based access, shared modules, and an explicit rule layer — designed so that retail and wholesale workflows can coexist, and so that adding a new country means configuring the existing system, not building a new one."
        />
      </CaseSection>

      <CaseSection title="Research & Discovery">
        <P>Discovery ran in parallel with product architecture design — there was no phase boundary between understanding the problem and beginning to define the product.</P>
        <PainList items={[
          { icon: "→", content: "Stakeholder interviews with support leads, finance managers, commercial directors, and operations coordinators — mapping informal workarounds that had become load-bearing habits across both business models" },
          { icon: "→", content: "Full order lifecycle mapping across retail and wholesale: opportunity creation → fiscal classification → pricing → approval → fulfillment → post-sale — identifying divergence points and shared flow segments" },
          { icon: "→", content: "Rule inventory across 5 domains (identity, personas, calculation engines, gap rules, intelligence rules) — documented and structured for the first time, across Brazil, USA, and Mexico" },
          { icon: "→", content: "Seller sessions on mobile: field sales reps surfaced the horizontal-scroll problem in the data table pattern that drove a key design pivot in the interface" },
        ]} />
      </CaseSection>

      <CaseSection title="Solution">
        <P>Nexus was designed around four principles: <strong>single source of truth</strong>, <strong>role-appropriate access</strong>, <strong>rule transparency</strong>, and <strong>global-ready from day one</strong>.</P>

        <h3 className="mb-3 mt-10 text-lg font-semibold tracking-[-0.01em] first:mt-0">The product at a glance</h3>
        <P>Nexus is organized around two core objects: <strong>Accounts</strong> and <strong>Opportunities</strong>. Every workflow — from managing a customer&apos;s credit limit to closing a multi-branch sale — runs through these two modules.</P>
        <P>Account pages consolidate all customer information into four tabs: About/Registration, Finance, Opportunities, and Contacts.</P>

        <ScreenImg src="/vc-account-about.png" alt="Account — About & Registration tab" caption="Account — About / Registration: entity data, business type, sales rep, location, client information" />
        <ScreenImg src="/vc-account-finance.png" alt="Account — Finance tab" caption="Account — Finance: credit limit, outstanding balance, days past due, tax exemption, required documents" />

        <P>Opportunity Creation is a four-step flow designed to handle the full complexity of a B2B order.</P>

        <ScreenImg src="/vc-opportunity-header.png" alt="Opportunity Creation — Step 1" caption="Step 1 — Header: opportunity name, salesperson, contact, purchase order, product search with filters" />
        <ScreenImg src="/vc-opportunity-products.png" alt="Opportunity Creation — Step 2" caption="Step 2 — Add products: PIX price, promotional price, branch stock, quantity — with customer and branch promotion flags" />
        <ScreenImg src="/vc-opportunity-freight.png" alt="Opportunity Creation — Step 3" caption="Step 3 — Freight & logistics: CIF / FOB / Customer Pickup, branch origin, live opportunity summary sidebar" />
        <ScreenImg src="/vc-opportunity-pricing.png" alt="Opportunity Creation — Step 4" caption="Step 4 — Price editing: per-item discount, bulk discount apply, payment method and terms" />

        <IterationCard number="Design Challenge 01" title="Identity & Permissiveness Dashboard">
          <p>The most structurally complex problem: making a large, multi-dimensional ruleset legible to humans. Rules in the wholesale platform are layered — a customer&apos;s permissions depend on scope, channel, tax regime, and country simultaneously.</p>
          <p>I designed a filterable dashboard where any stakeholder can select <strong>Scope × Channel</strong> and immediately see which rules apply, with expandable cards showing rule rationale, dependencies, and known edge cases.</p>
        </IterationCard>

        <IterationCard number="Design Challenge 02" title="Dynamic Country × Channel Filter Layer">
          <p>Designing for three countries meant the rule system needed a country dimension — not a separate document per market, but a unified filter. Tax treatment, channel availability, and customer classification all differ across Brazil, USA, and Mexico.</p>
          <p>I extended the filter architecture with a country axis. A legal analyst in Brazil can now filter by <strong>Brazil + Wholesale</strong> and see exactly which rules govern that intersection — the same tool, the same interface, a different configuration.</p>
        </IterationCard>

        {/* Dashboard description */}
        <div className="my-7 rounded-xl border border-border bg-card px-6 py-5">
          <p className="mb-2 text-[13px] font-semibold text-foreground">Artifact — Business Rules Dashboard</p>
          <p className="text-[13px] leading-[1.65] text-muted-foreground">A filterable dashboard designed to make the platform&apos;s rule system legible to non-technical stakeholders. Rules are organized across five pillars — Identity &amp; Permissiveness, Personas &amp; Channels, Calculation Engines, Gaps &amp; Risks, and Intelligence &amp; Automation. A Scope × Channel filter layer lets any stakeholder isolate the rules relevant to their market without reading the full taxonomy. Expandable cards surface rule rationale, dependencies, and known edge cases.</p>
        </div>

        <IterationCard number="Design Challenge 03" title="Mobile-First Card Layout for the Seller Interface">
          <p>An early version of the seller-facing interface used data tables. Field testing with sales reps revealed a fundamental mismatch: on mobile, horizontal scroll made the tables unusable. Reps reported skipping screens entirely.</p>
          <p>The pivot: replaced tables with <strong>card-based layouts designed mobile-first</strong>. Each card surfaces Phase Status, Order Status, account name, and value in a glanceable format. The card pattern was then standardized across other modules as part of the shared component system.</p>
        </IterationCard>

        <h3 className="mb-3 mt-10 text-lg font-semibold tracking-[-0.01em]">Validation through deployed prototypes</h3>
        <P>Rather than relying on static Figma links for user feedback, I built functional prototypes using AI-assisted development and deployed them on Vercel for direct validation with real users. This approach eliminated the friction of scheduled design reviews and let field teams interact with a working interface on their own devices.</P>
        <P>Handoff to engineering was organized through GitHub, with specs and context structured to support accurate implementation — a deliberate decision to close the gap between design intent and built product.</P>
      </CaseSection>

      <CaseSection title="Impact">
        <p className="mb-6 text-[13px] text-muted-foreground">Metrics are directional and NDA-compliant.</p>
        <MetricsGrid items={[
          { value: "6,000+", label: "Partner auto centers served by the unified platform across Brazil, USA, and Mexico" },
          { value: "2 → 1", label: "Business models (retail + wholesale) unified into a single operational product for the first time" },
          { value: "Self-serve", label: "Business rules surfaced through a structured filter dashboard — no specialist calls required" },
          { value: "3 countries", label: "Brazil, USA, and Mexico served by a single configurable rule layer, not separate documentation systems" },
        ]} />
      </CaseSection>

      <CaseSection title="What I'd Do Differently">
        <P><strong>Define the module boundary earlier.</strong> The initial product scope expanded organically as discovery surfaced new requirements. A clearer module definition at the start would have prevented scope creep that slowed component standardization.</P>
        <P><strong>More seller testing on mobile earlier.</strong> The horizontal-scroll table problem was caught during field testing — but could have been caught sooner if mobile walkthroughs with sales reps had been prioritized in early research.</P>
        <P><strong>Separate the rule dashboard sooner.</strong> The Identity &amp; Permissiveness Dashboard started as a feature inside Nexus. Business stakeholders — legal, finance, commercial leads — would have benefited from a standalone, embeddable version earlier.</P>
      </CaseSection>

      <footer className="mt-12 border-t border-border py-8 flex flex-col gap-8">
        <CaseNav current="/cases/verum-center" />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[12px] text-muted-foreground">Nexus is a production system. Screenshots and metrics have been sanitized to protect confidential business information.</p>
          <a href="mailto:keytherueckert93@gmail.com" className="text-[13px] text-muted-foreground transition-colors hover:text-foreground">keytherueckert93@gmail.com</a>
        </div>
      </footer>
    </div>
  )
}
