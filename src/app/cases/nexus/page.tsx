import type { Metadata } from "next"
import { CaseHeader } from "@/components/case/case-header"
import { CaseSection } from "@/components/case/case-section"
import { PainList } from "@/components/case/pain-list"
import { MetricsGrid } from "@/components/case/metrics-grid"
import { IterationCard } from "@/components/case/iteration-card"
import { BeforeAfter } from "@/components/case/before-after"
import { AccountDetailExplorer, type AccountDetailTab } from "@/components/case/account-detail-explorer"
import { CaseNav } from "@/components/case/case-nav"

export const metadata: Metadata = {
  title: "Nexus — Platform Design | Keythe Rueckert",
  description: "How I evolved a single-country wholesale CRM into a global platform serving two business models, three countries, and multiple access profiles.",
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-[15px] leading-[1.75] text-muted-foreground">{children}</p>
}

const accountDetailTabs: AccountDetailTab[] = [
  {
    id: "registration",
    label: "Registration",
    description: (
      <>
        <P>The registration tab is the first thing anyone sees when they open an account. Before the redesign, every field on that screen rendered as an editable input, whether or not the user had permission to edit it, whether or not there was data in it, whether or not the data was current. A field that could not be edited still looked exactly like one that could — a small inconsistency with a real cost: it told the user they could change something they could not, and it filled the screen with visual noise for someone who only came to look something up.</P>
        <IterationCard number="Design Decision" title="Read-only isn't a smaller input, it's a different signal">
          <p>The fix was not a permission rule buried in the backend, it was a visual one. Fields a given profile cannot edit no longer look like inputs at all. They render as plain text, no border, no cursor affordance. A salesperson opening an account sees information laid out clearly. Someone with edit rights sees the same field with the visual cues that say it is actionable. The interface stopped promising an action that was not available.</p>
        </IterationCard>
        <IterationCard number="Design Decision" title="Actions became role-aware, not just screens">
          <p>Before the redesign, a credit analyst opening an account saw the exact same action bar as a salesperson, including Create Opportunity, an action that has nothing to do with a credit analyst&apos;s job. Nobody had audited which actions belonged to which profile. The screen simply showed everything to everyone.</p>
          <p>The fix: every action on the account screen is now scoped to what that specific profile is actually responsible for. A salesperson sees Create Opportunity. A credit analyst sees Block Account, the one action that is actually theirs. This was not a visual cleanup — it was the role-appropriate access principle behind Nexus made visible on one screen.</p>
        </IterationCard>
        <P>The most consequential change on this tab was not inside any field, it was above all of them. Before, whether an account could buy — current, defaulting, or blocked — was information you had to dig for, discovered only after a salesperson had already invested time building out a sale. Now it is a status badge in the account header, visible the moment the screen loads: Eligible to Purchase, Defaulting Account, or Blocked. Three states, shown to every profile — a salesperson sees the badge and cannot act on it, a credit analyst sees the same badge with the authority to change it.</P>
        <P>Two smaller fixes rounded out the tab. Fiscal benefits, previously tracked with a plain checkbox, became status cards with a visible badge such as Approved or Expired. Account ownership existed, on paper, as a field in another module, but that wasn&apos;t how it actually worked — changing who owned an account meant opening a ticket in a separate platform and waiting for someone else to make the change. That workaround moved into the tab itself: commercial planning can now transfer, edit, or remove ownership directly from the account record, without leaving the screen or opening a ticket anywhere else.</P>
      </>
    ),
    slider: {
      before: {
        desktop: { src: "/nexus-cadastro-before.png", alt: "Original account registration screen — identical for every role", width: 1184, height: 2978 },
        mobile: { src: "/nexus-cadastro-before.png", alt: "Original account registration screen — identical for every role, mobile", width: 375, height: 812 },
      },
      profiles: [
        {
          id: "salesperson",
          label: "Salesperson",
          permission: "View-only — sees account data in clear, labeled fields instead of disabled-looking inputs. Cannot edit anything on this tab.",
          after: {
            desktop: { src: "/nexus-cadastro-after-vendedor.png", alt: "Redesigned account screen — salesperson view", width: 1184, height: 2978 },
            mobile: { src: "/nexus-cadastro-after-vendedor.png", alt: "Redesigned account screen — salesperson view, mobile", width: 375, height: 812 },
          },
        },
        {
          id: "commercial-planning",
          label: "Commercial Planning",
          permission: "Can edit contact and address details, and manage which rep is assigned to the account directly on this tab.",
          after: {
            desktop: { src: "/nexus-cadastro-after-planejamento-comercial.png", alt: "Redesigned account screen — commercial planning view", width: 1184, height: 2978 },
            mobile: { src: "/nexus-cadastro-after-planejamento-comercial.png", alt: "Redesigned account screen — commercial planning view, mobile", width: 375, height: 812 },
          },
        },
        {
          id: "credit-analyst",
          label: "Credit Analyst",
          permission: "Can edit fiscal and compliance fields, and is the only profile that can block the account.",
          after: {
            desktop: { src: "/nexus-cadastro-after-analista-credito.png", alt: "Redesigned account screen — credit analyst view", width: 1184, height: 2978 },
            mobile: { src: "/nexus-cadastro-after-analista-credito.png", alt: "Redesigned account screen — credit analyst view, mobile", width: 375, height: 812 },
          },
        },
      ],
      caption: "Screens from the redesign mockups, desktop view.",
    },
  },
  {
    id: "qualifications",
    label: "Qualifications",
    description: (
      <>
        <P>Registration has a second sub-tab, Qualifications, sitting next to General Data. Before the redesign it was a form like any other — a grid of dropdowns for cluster, business sector, purchase format, mostly empty, with a small vehicle table at the bottom that had nothing to do with the rest of the fields around it.</P>
        <P>The redesigned version treats Qualifications as what it actually is: a profile of how the account behaves, not a form to fill in. Sector and category data is now populated and read-only, a 12-month purchase frequency chart shows volume and billing on hover, and primary contact, references, and fleet size sit alongside it as context — the same tab that used to ask &quot;what type of client is this&quot; now answers &quot;how does this client actually buy.&quot;</P>
      </>
    ),
    slider: {
      before: {
        desktop: { src: "/nexus-qualifications-before.png", alt: "Original Qualifications sub-tab — empty dropdowns and an unrelated vehicle table", width: 1184, height: 1976 },
        mobile: { src: "/nexus-qualifications-before.png", alt: "Original Qualifications sub-tab — empty dropdowns and an unrelated vehicle table, mobile", width: 375, height: 812 },
      },
      profiles: [
        {
          id: "qualifications",
          label: "Qualifications",
          after: {
            desktop: { src: "/nexus-qualifications-after.png", alt: "Redesigned Qualifications sub-tab — purchase frequency chart, contact, and references", width: 1184, height: 1976 },
            mobile: { src: "/nexus-qualifications-after.png", alt: "Redesigned Qualifications sub-tab — purchase frequency chart, contact, and references, mobile", width: 375, height: 812 },
          },
        },
      ],
      caption: "Screens from the redesign mockups, desktop view.",
    },
  },
  {
    id: "orders",
    label: "Orders",
    description: (
      <>
        <P>The Opportunities tab only ever showed wholesale activity. Retail orders lived somewhere else entirely — in the acquired retail company&apos;s own system, separate from Nexus, with no shared view between the two. Orders replaces both: a single view for every sale, regardless of business model, with a Channel column doing the work that used to require two separate systems and no way to see them together. Account-level stats — first purchase, days without activity, order frequency — didn&apos;t exist on this tab before either.</P>
        <IterationCard number="Design Decision" title="A channel column instead of two tabs">
          <p>Rather than keep wholesale and retail orders in separate views, both now live in one table with a Channel column marking each row Wholesale or Retail. Anyone reviewing an account&apos;s order history sees the full picture in one place, sorted and filtered the same way regardless of which business model placed the order.</p>
        </IterationCard>
      </>
    ),
    slider: {
      before: {
        desktop: { src: "/nexus-orders-before.png", alt: "Original Opportunities tab — wholesale-only table", width: 1184, height: 1323 },
        mobile: { src: "/nexus-orders-before.png", alt: "Original Opportunities tab — wholesale-only table, mobile", width: 375, height: 812 },
      },
      profiles: [
        {
          id: "orders",
          label: "Orders",
          after: {
            desktop: { src: "/nexus-orders-after.png", alt: "Redesigned Orders tab — wholesale and retail merged", width: 1184, height: 1323 },
            mobile: { src: "/nexus-orders-after.png", alt: "Redesigned Orders tab — wholesale and retail merged, mobile", width: 375, height: 812 },
          },
        },
      ],
      caption: "Screens from the redesign mockups, desktop view.",
    },
  },
  {
    id: "financial",
    label: "Financial",
    description: (
      <>
        <P>The header badge tells anyone in one glance that an account is defaulting. The Financial tab is where that status is explained and acted on. When an account is overdue, a banner now sits directly under the account header — <strong>Defaulting account, 21 days overdue. Installment purchases are blocked</strong> — with a direct action to request temporary approval, instead of leaving the salesperson to guess why Create Order is unavailable.</P>
        <P>Below the banner, credit is broken down by modality — each one showing granted, used, and available balance with a progress bar, plus a Financial Entries table listing every installment with its own status: Paid, Open, Awaiting, Overdue. The account&apos;s financial standing stopped being a single opaque flag and became a breakdown anyone can audit without asking finance directly.</P>
      </>
    ),
    slider: {
      before: {
        desktop: { src: "/nexus-financial-before.png", alt: "Original Financial tab — plain checkboxes, no alert banner", width: 1184, height: 1702 },
        mobile: { src: "/nexus-financial-before.png", alt: "Original Financial tab — plain checkboxes, no alert banner, mobile", width: 375, height: 812 },
      },
      profiles: [
        {
          id: "financial",
          label: "Financial",
          after: {
            desktop: { src: "/nexus-financial-after.png", alt: "Redesigned Financial tab — defaulting account banner and credit breakdown", width: 1184, height: 1702 },
            mobile: { src: "/nexus-financial-after.png", alt: "Redesigned Financial tab — defaulting account banner and credit breakdown, mobile", width: 375, height: 812 },
          },
        },
      ],
      caption: "Screens from the redesign mockups, desktop view, showing a defaulting account.",
    },
  },
  {
    id: "contacts-references",
    label: "Contacts & References",
    description: (
      <>
        <P>Contacts and reference accounts lived in two separate tables on this tab, each with its own scroll area and column layout, with no visual relationship between them despite being reviewed together constantly. The redesign merged them into a single card-based view, designed mobile-first, so the same information reads clearly whether it&apos;s opened on a laptop at a desk or a phone in the field.</P>
        <IterationCard number="Design Decision" title="One view instead of two tables">
          <p>Merging contacts and references into a single card layout removed the need to mentally reconcile two separate structures showing related information. Each card surfaces the fields that matter for that relationship at a glance, without requiring anyone to scroll two tables side by side to piece the picture together.</p>
        </IterationCard>
      </>
    ),
    slider: {
      before: {
        desktop: { src: "/nexus-contacts-before.png", alt: "Original Contacts tab — plain data table", width: 1184, height: 954 },
        mobile: { src: "/nexus-contacts-before.png", alt: "Original Contacts tab — plain data table, mobile", width: 375, height: 812 },
      },
      profiles: [
        {
          id: "merged",
          label: "Contacts & References",
          after: {
            desktop: { src: "/nexus-contacts-after.png", alt: "Redesigned Contacts & References — merged card layout", width: 1184, height: 954 },
            mobile: { src: "/nexus-contacts-after.png", alt: "Redesigned Contacts & References — merged card layout, mobile", width: 375, height: 812 },
          },
        },
      ],
      caption: "Screens from the redesign mockups, desktop view.",
    },
  },
  {
    id: "tickets",
    label: "Tickets",
    description: (
      <>
        <P>Support tickets used to live in their own module entirely separate from the account, shown as a flat table. Opening one meant leaving the account, finding the ticket in a different list, and opening it in a modal that showed metadata but not the actual back-and-forth.</P>
        <P>Tickets now live as a tab on the account itself. The list sits on the left with urgency and status at a glance; clicking a ticket opens its full conversation thread inline on the right, with a reply box right there. No modal, no separate module — the ticket and the account it belongs to are the same screen.</P>
        <IterationCard number="Design Decision" title="A ticket is a conversation, not a record">
          <p>The old ticket modal was designed like a form: fields, statuses, metadata. It technically contained the conversation, but reading it required scrolling through a layout that wasn&apos;t built to present a thread. The new view treats the ticket for what it actually is to the person handling it: a conversation, replied to in the same view.</p>
        </IterationCard>
      </>
    ),
    slider: {
      before: {
        desktop: { src: "/nexus-tickets-before.png", alt: "Original Tickets module — separate table, no conversation view", width: 1184, height: 1054 },
        mobile: { src: "/nexus-tickets-before.png", alt: "Original Tickets module — separate table, no conversation view, mobile", width: 375, height: 812 },
      },
      profiles: [
        {
          id: "tickets",
          label: "Tickets",
          after: {
            desktop: { src: "/nexus-tickets-after.png", alt: "Redesigned Tickets tab — inline conversation thread", width: 1184, height: 1054 },
            mobile: { src: "/nexus-tickets-after.png", alt: "Redesigned Tickets tab — inline conversation thread, mobile", width: 375, height: 812 },
          },
        },
      ],
      caption: "Screens from the redesign mockups, desktop view.",
    },
  },
  {
    id: "registration-health",
    label: "Registration Health",
    description: (
      <>
        <P>Registration Health checks an account&apos;s data against an external verification bureau and returns a fraud score. Before the redesign, the results were shown inside the same editable form used for regular data entry — fields carried inline states like Valid or Inconsistent, and a suggested correction appeared as a small note. It read like a form waiting to be fixed, not a verdict to be reviewed.</P>
        <P>The redesigned version separates the two. Every field is read-only, marked with a check icon once verified, and the score sits in its own panel with a decision reason listed below it — a summary you review, not a form you edit.</P>
      </>
    ),
    slider: {
      before: {
        desktop: { src: "/nexus-health-before.png", alt: "Original Registration Health tab — editable form with inline field states", width: 1184, height: 1012 },
        mobile: { src: "/nexus-health-before.png", alt: "Original Registration Health tab — editable form with inline field states, mobile", width: 375, height: 812 },
      },
      profiles: [
        {
          id: "health",
          label: "Registration Health",
          after: {
            desktop: { src: "/nexus-health-after.png", alt: "Redesigned Registration Health tab — read-only verification summary", width: 1184, height: 976 },
            mobile: { src: "/nexus-health-after.png", alt: "Redesigned Registration Health tab — read-only verification summary, mobile", width: 375, height: 812 },
          },
        },
      ],
      caption: "Screens from the redesign mockups, desktop view.",
    },
  },
  {
    id: "garage",
    label: "Garage",
    description: (
      <>
        <P>Vehicle data used to live buried inside the Qualifications sub-tab, as a single fleet table — a wholesale concept, with no place for the individual vehicles that matter to a retail relationship. Retail and wholesale don&apos;t track the same thing here: a distributor cares about a registered fleet; a retail customer is tied to one or two vehicles.</P>
        <P>Garage is now its own tab, split into two columns that reflect that difference: Customer Vehicles for retail, and Fleet for wholesale, each with its own search and its own add action.</P>
      </>
    ),
    slider: {
      before: {
        desktop: { src: "/nexus-garage-before.png", alt: "Original fleet table — buried inside the Qualifications sub-tab", width: 1184, height: 1852 },
        mobile: { src: "/nexus-garage-before.png", alt: "Original fleet table — buried inside the Qualifications sub-tab, mobile", width: 375, height: 812 },
      },
      profiles: [
        {
          id: "garage",
          label: "Garage",
          after: {
            desktop: { src: "/nexus-garage-after.png", alt: "Redesigned Garage tab — Customer Vehicles and Fleet side by side", width: 1184, height: 1852 },
            mobile: { src: "/nexus-garage-after.png", alt: "Redesigned Garage tab — Customer Vehicles and Fleet side by side, mobile", width: 375, height: 812 },
          },
        },
      ],
      caption: "Screens from the redesign mockups, desktop view.",
    },
  },
]

export default function NexusPage() {
  return (
    <div className="mx-auto max-w-[760px] px-6">
      <CaseHeader
        eyebrow="Product Design & Strategy · Enterprise Client"
        title="Redesigning Nexus: Evolving a Single-Country System into a Global, Multi-Model Platform"
        subtitle="Nexus started as a wholesale-only platform built for a single country. This case is about redesigning it into a system that serves two business models, three countries, and multiple access profiles — without the comfort of a blank page."
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
        <P>Nexus began as a platform built for one purpose: managing wholesale distributor accounts in Brazil. That was the entire scope of the original system — one business model, one country, one shared set of assumptions about who the user was and what they needed to see.</P>
        <P>Two changes broke that scope. The company acquired a retail business that had never been part of it before, one that ran on its own separate system, and set out to consolidate wholesale and retail into a single product. That meant absorbing a business model the original system had never been designed to support: different channels, different tax treatment, different day-to-day workflows for a store employee versus a distributor account manager. Then the company expanded operations into the USA and Mexico, introducing fiscal rules, channel eligibility, and customer classification that didn&apos;t exist in the Brazil-only original.</P>
        <P>By the time I took on the redesign, every screen needed to answer three questions at once that the original product had never been built to ask: which business model is this user operating in, which country&apos;s rules apply, and what should this access profile be allowed to see and do. Redesigning Nexus meant redesigning across all three axes simultaneously, not adding features to an existing shape, and doing it without disrupting the customers already running on the legacy systems. Migration happened gradually, module by module, only after each piece of the new product was ready to take over. Nexus is now in production.</P>
      </CaseSection>

      <CaseSection title="My Role">
        <P>I worked as a <strong>UX + Product Strategy lead</strong> across the full lifecycle of the product — from the first discovery session to engineering handoff.</P>
        <PainList items={[
          { icon: "◎", content: <><strong>Discovery with the squad.</strong> Led discovery sessions to map what the unified platform needed to do before any screens were designed — translating operational requirements and cross-team constraints into product decisions.</> },
          { icon: "◎", content: <><strong>Flow definition.</strong> Mapped the full operational workflows for both retail and wholesale models — opportunity creation, fiscal classification, pricing, approval, fulfillment, and post-sale — identifying where the two models diverged and where they could share the same flow.</> },
          { icon: "◎", content: <><strong>Cross-tab pattern mapping.</strong> Traced how access, status, and business model needed to behave consistently across every tab in Account Detail, so a rule established in one place (like who can block an account) held everywhere it mattered.</> },
          { icon: "◎", content: <><strong>UI component standardization.</strong> Defined consistent UI patterns across modules and countries, ensuring that the same design language worked for a Brazil-only support agent and a multi-country commercial director.</> },
          { icon: "◎", content: <><strong>Prototype validation on Vercel.</strong> Built and deployed navigable prototypes independently to validate solutions with real users before engineering sprints — compressing the design-to-feedback cycle.</> },
          { icon: "◎", content: <><strong>GitHub handoff.</strong> Organized the technical validation and handoff flow using GitHub, ensuring developers had the context and specs needed to build accurately.</> },
        ]} />
      </CaseSection>

      <CaseSection title="Problem">
        <P>Nexus wasn&apos;t broken by one bug. It was strained by growth along three axes at once: a business model that expanded from wholesale to include retail, a footprint that expanded from Brazil to the USA and Mexico, and a user base that expanded from one kind of specialist to several, each needing different access to the same data.</P>
        <PainList items={[
          { icon: "⚠", content: <><strong>One screen, every profile.</strong> A salesperson, a credit analyst, and someone in commercial planning opened the same account record and saw the exact same fields and the exact same buttons, regardless of what they were actually there to do.</> },
          { icon: "⚠", content: <><strong>Critical status stayed invisible until it was too late.</strong> Whether an account could buy, current, delinquent, or blocked, wasn&apos;t something you saw. It was something you discovered, usually after a salesperson had already invested time selecting products and negotiating terms.</> },
          { icon: "⚠", content: <><strong>Business model, bolted on, not designed in.</strong> Retail didn&apos;t have a place to live inside a system built around wholesale distributor accounts. Every retail requirement was an exception to a shape designed for something else.</> },
          { icon: "⚠", content: <><strong>Country rules had nowhere consistent to attach.</strong> Fiscal treatment, channel eligibility, and customer classification differed across Brazil, the USA, and Mexico, and the original system had never been asked to hold more than one country&apos;s assumptions at a time.</> },
        ]} />
        <BeforeAfter
          before="One screen for every profile, one set of assumptions for one country and one business model, and no visible signal for whether an account could actually buy."
          after="Access, screens, and status scoped to who's asking, which business model they're operating in, and which country's rules apply, with blocking conditions visible before any work is invested."
        />
      </CaseSection>

      <CaseSection title="Research & Discovery">
        <P>Discovery ran in parallel with product architecture design. There was no phase boundary between understanding the problem and beginning to define the product.</P>
        <PainList items={[
          { icon: "→", content: "Stakeholder interviews with support leads, finance managers, commercial directors, and operations coordinators, mapping informal workarounds that had become load-bearing habits across both business models" },
          { icon: "→", content: "Full order lifecycle mapping across retail and wholesale: opportunity creation, fiscal classification, pricing, approval, fulfillment, and post-sale, identifying divergence points and shared flow segments" },
          { icon: "→", content: "Profile-by-profile walkthroughs of Account Detail: watching a salesperson, a credit analyst, and someone in commercial planning use the exact same screen surfaced how much of the interface simply wasn't built with the distinction between them in mind" },
          { icon: "→", content: "Tracing how a blocking condition actually got discovered in practice: not from the interface, but from a salesperson already deep into building a sale before finding out the account couldn't buy" },
        ]} />
      </CaseSection>

      <CaseSection title="Solution">
        <P>Nexus was designed around four principles: <strong>single source of truth</strong>, <strong>role-appropriate access</strong>, <strong>rule transparency</strong>, and <strong>global-ready from day one</strong>.</P>

        <P>Account Detail became the clearest place to prove those principles, because the same customer record has to answer different questions for different people. A salesperson checking if they can sell. A credit analyst deciding if an account should be blocked. Someone in commercial planning managing who owns that relationship. Before the redesign, all three saw the same screen, the same fields, the same buttons, regardless of what they came to do.</P>

        <P>Three tabs make the platform&apos;s bets easiest to see: <strong>Registration</strong> proves role-appropriate access, and turns a blocking condition that used to surface late into a status badge visible the moment the screen loads. <strong>Orders</strong> proves the two business models sharing a single view. <strong>Financial</strong> proves that once that status is visible, the specific facts needed to act on it — how overdue an account is, which credit modality is affected — come with it.</P>

        <P>Every tab in Account Detail went through the same rigor, down to smaller ones like Tickets, where a disconnected modal became an inline conversation thread. Pick any of the eight below to see its full before and after.</P>

        <AccountDetailExplorer tabs={accountDetailTabs} />

        <h3 className="mb-3 mt-10 text-lg font-semibold tracking-[-0.01em]">Validation through deployed prototypes</h3>
        <P>Rather than relying on static Figma links for user feedback, I built functional prototypes using AI-assisted development and deployed them on Vercel for direct validation with real users. This approach eliminated the friction of scheduled design reviews and let field teams interact with a working interface on their own devices.</P>
        <P>Handoff to engineering was organized through GitHub, with specs and context structured to support accurate implementation — a deliberate decision to close the gap between design intent and built product.</P>
      </CaseSection>

      <CaseSection title="Impact">
        <p className="mb-6 text-[13px] text-muted-foreground">These are structural outcomes: what changed in the product&apos;s architecture and information design, not measured business results. Business metrics for this project remain under NDA.</p>
        <MetricsGrid items={[
          { value: "3 states, not 1", label: "Account status (Eligible to Purchase, Delinquent, Blocked) moved from something discovered mid-flow to a badge visible before any navigation" },
          { value: "Zero shared actions", label: "Salesperson, credit analyst, and commercial planning profiles no longer see each other's actions; each sees only what their role is responsible for" },
          { value: "1 unified view", label: "Wholesale-only Opportunities and retail orders now live in a single Orders view, distinguished by a Channel column instead of separate systems" },
          { value: "Read-only means read-only", label: "Fields a profile can't edit stopped looking editable, removing visual noise and a misleading cue for anyone who only needed to look something up" },
        ]} />
      </CaseSection>

      <CaseSection title="What I'd Do Differently">
        <P><strong>Map the cross-cutting axes before working tab by tab.</strong> The throughline connecting Account Detail&apos;s redesign, that status needed to be visible immediately and access needed to be scoped by role, across every tab and both business models, only became clear after several tabs had already been reworked. If I could rerun this, I&apos;d map each tab against the platform&apos;s three axes (business model, country, profile) before starting redesign work, so the connecting argument was visible from the first tab instead of emerging in hindsight.</P>
        <P><strong>Keep a running decision log for platform-level facts, not just screen-level ones.</strong> Details like which parts of the system predate the current redesign, what&apos;s already shipped versus still in progress, and where certain workflows lived before they were consolidated are easy to lose track of once enough time passes. Writing those down as they&apos;re decided, rather than reconstructing them later, would have made explaining the platform&apos;s evolution far more precise.</P>
      </CaseSection>

      <footer className="mt-12 border-t border-border py-8 flex flex-col gap-8">
        <CaseNav current="/cases/nexus" />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[12px] text-muted-foreground">Nexus is a production system. Screenshots and metrics have been sanitized to protect confidential business information.</p>
          <a href="mailto:keytherueckert93@gmail.com" className="text-[13px] text-muted-foreground transition-colors hover:text-foreground">keytherueckert93@gmail.com</a>
        </div>
      </footer>
    </div>
  )
}
