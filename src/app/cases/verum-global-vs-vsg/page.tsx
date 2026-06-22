import type { Metadata } from "next"
import { CaseHeader } from "@/components/case/case-header"
import { CaseNav } from "@/components/case/case-nav"
import { CaseSection } from "@/components/case/case-section"
import { PainList } from "@/components/case/pain-list"
import { MetricsGrid } from "@/components/case/metrics-grid"
import { IterationCard } from "@/components/case/iteration-card"

export const metadata: Metadata = {
  title: 'From "Ship It" to "Scale It" — Design Engineering | Keythe Rueckert',
  description: "What building the same product twice taught me about system design vs. screen design. Before/after: first build → rebuilt system.",
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-[15px] leading-[1.75] text-muted-foreground">{children}</p>
}

function ShiftRow() {
  return (
    <div className="my-7 grid grid-cols-[1fr_auto_1fr] items-center gap-4 max-sm:grid-cols-1">
      <div className="rounded-[10px] border border-[var(--before-border)] bg-[var(--before-bg)] p-5">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--before-label)]">First Build</p>
        <p className="text-[13px] text-muted-foreground">Build components when needed. Conventions emerge implicitly. AI generates output.</p>
      </div>
      <span className="text-center text-xl text-muted-foreground max-sm:hidden">→</span>
      <div className="rounded-[10px] border border-[var(--after-border)] bg-[var(--after-bg)] p-5">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--after-label)]">Rebuilt System</p>
        <p className="text-[13px] text-muted-foreground">Build the system, then build the product inside it. AI critiques architecture before execution.</p>
      </div>
    </div>
  )
}

export default function VerumGlobalVsVsgPage() {
  return (
    <div className="mx-auto max-w-[760px] px-6">
      <CaseHeader
        eyebrow="Design Engineering · B2B Enterprise"
        title={'From "Ship It" to "Scale It"'}
        subtitle='What building the same product twice taught me about the difference between designing screens and designing systems.'
        tags={[
          { label: "First Build → Rebuilt", accent: true },
          { label: "Design Engineering" },
          { label: "System Design" },
          { label: "B2B · Enterprise" },
          { label: "Next.js · shadcn/ui" },
        ]}
      />

      <div className="mb-6 mt-2 rounded-lg border border-border bg-[var(--surface-2)] px-5 py-3.5 text-[13px] leading-[1.65] text-muted-foreground">
        <strong className="text-foreground">Legal notice —</strong> All platform and system names in this case study are fictional pseudonyms. Real product identifiers have been replaced for confidentiality compliance.
      </div>

      <CaseSection title="Context">
        <P>Two successive versions of the same platform were built for the same client ecosystem, solving adjacent problems in the same domain. On paper, the second project should have been easier — familiar context, established relationships, clearer scope.</P>
        <P>In practice, it forced me to confront something I had avoided in the first pass: the difference between building something that works and building something that scales.</P>
        <P>This case is not about a UX breakthrough or a conversion lift. It is about what happens when a designer starts writing production code, ships a product, watches it bend under its own weight, and gets a second chance to do it right.</P>
      </CaseSection>

      <CaseSection title="My Role">
        <PainList items={[
          { icon: "◎", content: "Sole designer and primary front-end contributor on both projects — from discovery through production" },
          { icon: "◎", content: "Built the full component system in the rebuilt system before writing the first product screen" },
          { icon: "◎", content: "Used AI as architectural reviewer, not just code generator — a deliberate shift from the first build" },
          { icon: "◎", content: "Stack: VS Code, Next.js, Tailwind CSS, shadcn/ui" },
        ]} />
      </CaseSection>

      <CaseSection title="Problem">
        <P>the first build delivered. The product worked. But when the client came back to expand it, the cracks were immediate.</P>
        <PainList items={[
          { icon: "⚠", content: <><strong>Component duplication.</strong> The same UI element — a status badge, a data row, a filter control — existed in 3–4 variations with no shared logic.</> },
          { icon: "⚠", content: <><strong>No global layout contract.</strong> Each screen made independent decisions about spacing, container width, and responsive behavior.</> },
          { icon: "⚠", content: <><strong>AI-generated inconsistency.</strong> Because I hadn&apos;t defined architectural constraints upfront, the AI produced structurally inconsistent outputs that I accepted and shipped.</> },
          { icon: "⚠", content: <><strong>Handoff friction.</strong> Explaining the system to another developer meant explaining the exceptions — because the exceptions were the rules.</> },
        ]} />
        <P>The core issue was not a lack of skill. It was a lack of architecture before execution. I had used AI as a code generator. I had not used it as a design partner.</P>
        <div className="my-7 flex h-[220px] w-full flex-col items-center justify-center gap-4 rounded-[10px] border border-dashed border-border bg-[var(--surface-2)]">
          <div className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-lg">🔒</div>
          <div className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-2">Before — First Build</p>
            <p className="text-[13px] font-semibold text-foreground">Available upon interview request</p>
            <p className="mt-1 text-[12px] text-muted-foreground">Confidential interface — NDA protected</p>
          </div>
        </div>
      </CaseSection>

      <CaseSection title="What Changed">
        <P>When the rebuilt system kicked off, I spent the first week building nothing visible.</P>
        <P>Instead, I defined the system:</P>
        <ShiftRow />
        <PainList items={[
          { icon: "→", content: <><strong>PageLayout</strong> component with explicit slot contracts: header, toolbar, content, footer — optional slots with documented behavior</> },
          { icon: "→", content: <><strong>DataTable</strong> with sorting, filtering, and empty states as first-class concerns, not afterthoughts</> },
          { icon: "→", content: <><strong>FormCard + FormGrid</strong> as the layout contract at the section level — replacing ad hoc inline class strings</> },
          { icon: "→", content: <><strong>Token system</strong> for spacing, typography, and color that both Tailwind utilities and component internals reference</> },
          { icon: "→", content: "Global behavioral rules written down: how modals dismiss, how forms validate, how loading states surface" },
        ]} />
        <P>Only after those foundational components existed did I build the first real screen. The AI&apos;s role changed too — instead of &quot;build me a table for this data,&quot; I was prompting with &quot;given this PageLayout contract and these token values, implement this screen — flag any deviation from the established pattern.&quot;</P>
      </CaseSection>

      <CaseSection title="Solution">
        <P>Three artifacts that did not exist in the first build:</P>
        <IterationCard number="Artifact 01" title="Component Registry Before the First Screen">
          <p>12 components defined with their props and behavioral rules before any product screen was assembled. When a new module was added mid-project, onboarding it to the existing system took hours, not days. Zero rework on new module integration.</p>
        </IterationCard>
        <IterationCard number="Artifact 02" title="A Global Layout Contract">
          <p>Every screen in the rebuilt system inherits from the same PageLayout. Responsive behavior, container constraints, and slot availability are defined once. When the client requested layout changes, the adjustments propagated from one source of truth rather than requiring per-screen edits.</p>
        </IterationCard>
        <IterationCard number="Artifact 03" title="AI at the Architectural Layer">
          <p>The most consequential change was asking AI to critique decisions, not just execute them. Before committing to a component structure, I described the intended behavior and asked where it would break at scale.</p>
          <p>Code review was also automated: each task went through a spec compliance pass and a quality pass — catching HTML invalidity, Radix prop mismatches, and accessibility failures before they reached production.</p>
        </IterationCard>

        <h3 className="mb-4 mt-12 text-lg font-semibold tracking-[-0.01em]">Process in Practice — Accounts Module</h3>
        <P>The Accounts module was built entirely inside the rebuilt system and shows the delta most clearly.</P>

        <div className="my-7 flex h-[220px] w-full flex-col items-center justify-center gap-4 rounded-[10px] border border-dashed border-border bg-[var(--surface-2)]">
          <div className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-lg">🔒</div>
          <div className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-2">Before — First Build: New Account Step 1</p>
            <p className="text-[13px] font-semibold text-foreground">Available upon interview request</p>
            <p className="mt-1 text-[12px] text-muted-foreground">Confidential interface — NDA protected</p>
          </div>
        </div>
        <div className="my-7 flex h-[220px] w-full flex-col items-center justify-center gap-4 rounded-[10px] border border-dashed border-border bg-[var(--surface-2)]">
          <div className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-lg">🔒</div>
          <div className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-2">After — Rebuilt System: New Account Step 1</p>
            <p className="text-[13px] font-semibold text-foreground">Available upon interview request</p>
            <p className="mt-1 text-[12px] text-muted-foreground">Confidential interface — NDA protected</p>
          </div>
        </div>
        <div className="my-7 flex h-[220px] w-full flex-col items-center justify-center gap-4 rounded-[10px] border border-dashed border-border bg-[var(--surface-2)]">
          <div className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-lg">🔒</div>
          <div className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-2">Before — First Build: New Account Step 2</p>
            <p className="text-[13px] font-semibold text-foreground">Available upon interview request</p>
            <p className="mt-1 text-[12px] text-muted-foreground">Confidential interface — NDA protected</p>
          </div>
        </div>
        <div className="my-7 flex h-[220px] w-full flex-col items-center justify-center gap-4 rounded-[10px] border border-dashed border-border bg-[var(--surface-2)]">
          <div className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-lg">🔒</div>
          <div className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-2">After — Rebuilt System: Accounts List</p>
            <p className="text-[13px] font-semibold text-foreground">Available upon interview request</p>
            <p className="mt-1 text-[12px] text-muted-foreground">Confidential interface — NDA protected</p>
          </div>
        </div>

        <IterationCard number="Key Decision — RadioGroup as Semantic Primitive" title="Replacing Custom Divs with a Real Accessibility Model">
          <p>The original PJ/PF cards used button elements with a radio visual — purely cosmetic. A review pass flagged the absence of a semantic primitive: no RadioGroup, no keyboard navigation, no screen reader signaling.</p>
          <p>In the rebuilt system, the type selection was rebuilt with Radix UI RadioGroup. The card container became a label, making the entire area clickable without JS. The fix added zero visual complexity and closed an accessibility gap that would have been invisible in a standard review.</p>
        </IterationCard>

        <IterationCard number="Key Decision — FormCard + FormGrid as Layout Contract" title="Turning an Inline Pattern into an Explicit API">
          <p>In the first build, every section card repeated the same string of classes inline — no abstraction, no shared contract, just copied and slightly wrong in each new place.</p>
          <p>In the rebuilt system, FormCard and FormGrid became global components. The rule &quot;when a row has 3+ fields of different semantic weight, the first field takes 50% and the rest divide the remaining half&quot; is now an API, not a convention you have to remember.</p>
        </IterationCard>
      </CaseSection>

      <CaseSection title="Impact">
        <p className="mb-6 text-[13px] text-muted-foreground">Metrics are process-level and NDA-compliant.</p>
        <MetricsGrid items={[
          { value: "12", label: "Components defined before the first product screen was built" },
          { value: "0", label: "Rework required when a new module was added mid-project" },
          { value: "40+", label: "Implementation gaps caught via structured spec review before any code shipped" },
          { value: "9", label: "Clean commits in a single session via spec + quality review pipeline" },
        ]} />
        <P>The less quantifiable but more significant outcome: cross-screen inconsistency was reduced from drift to deliberate exception. Any deviation from the rebuilt system was a choice — not an accident.</P>
      </CaseSection>

      <CaseSection title="What I'd Do Differently">
        <P><strong>Version decisions, not just components.</strong> The component registry captures what was built, not the reasoning behind it. The next project should include decision logs alongside component documentation — so a developer joining mid-stream understands not only the rule but why it exists.</P>
        <P><strong>Systematize the AI critique prompts.</strong> The architectural review prompts I used in the rebuilt system were informal — run when I remembered to. The next version should be a standard template that runs against every new component before it&apos;s merged.</P>
      </CaseSection>

      <CaseSection title="Why This Case Matters">
        <P>The transition from product designer to design engineer is not about learning to code. The transition is about changing what you consider a design deliverable.</P>
        <P>In the first build, my deliverable was screens. In the rebuilt system, my deliverable was a system that generates screens consistently, scales to new requirements without rework, and communicates its own rules to anyone who joins.</P>
        <P>That shift — from output to architecture, from execution to constraint design — is what I am bringing to the next team.</P>
      </CaseSection>

      <footer className="mt-12 border-t border-border py-8 flex flex-col gap-8">
        <CaseNav current="/cases/verum-global-vs-vsg" />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[12px] text-muted-foreground">This is a production system. Screenshots are available upon interview request.</p>
          <a href="mailto:keytherueckert93@gmail.com" className="text-[13px] text-muted-foreground transition-colors hover:text-foreground">keytherueckert93@gmail.com</a>
        </div>
      </footer>
    </div>
  )
}
