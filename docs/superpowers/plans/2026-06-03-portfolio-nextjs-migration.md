# Portfolio Next.js Migration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the static HTML portfolio to Next.js (App Router) to support interactive lab demos alongside editorial case studies.

**Architecture:** Single Next.js app replacing the current static HTML files. Case study pages are Server Components (static, editorial). Lab pages are Client Components (interactive demos). All deployed to Vercel under the same project.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui (dark theme), Sonner (toasts), Radix UI Tooltip, lucide-react.

---

## File Map

```
D:\Meus Projetos\verum-center-portfolio\
├── _archive/                               ← existing HTML + PNG files moved here
├── public/
│   └── *.png                               ← all images moved from root
├── src/
│   ├── app/
│   │   ├── layout.tsx                      ← root layout: html, body, Inter, dark class
│   │   ├── globals.css                     ← CSS tokens + Tailwind base
│   │   ├── page.tsx                        ← home (from index.html)
│   │   ├── cases/
│   │   │   ├── verum-center/page.tsx       ← from verum-center-portfolio.html
│   │   │   ├── verum-supply/page.tsx       ← from verum-supply.html
│   │   │   ├── pneustore/page.tsx          ← from pneustore.html
│   │   │   └── verum-global-vs-vsg/page.tsx ← from verum-global-vs-vsg.html
│   │   └── lab/
│   │       ├── page.tsx                    ← lab index
│   │       └── cenarios/page.tsx           ← interactive scenarios demo
│   ├── components/
│   │   ├── case/
│   │   │   ├── case-header.tsx             ← eyebrow + h1 + subtitle + tags
│   │   │   ├── case-section.tsx            ← h2 + border + children
│   │   │   ├── pain-list.tsx               ← icon + text list
│   │   │   ├── metrics-grid.tsx            ← grid of value+label cards
│   │   │   ├── comparison-block.tsx        ← before/after image with label
│   │   │   └── iteration-card.tsx          ← iteration / design decision card
│   │   └── ui/                             ← shadcn + custom from VSG
│   │       ├── button.tsx                  ← shadcn (auto-generated)
│   │       ├── input.tsx                   ← shadcn (auto-generated)
│   │       ├── dialog.tsx                  ← shadcn (auto-generated)
│   │       ├── account-alert.tsx           ← copied from VSG
│   │       ├── info-tooltip.tsx            ← copied from VSG
│   │       ├── confirm-dialog.tsx          ← copied from VSG
│   │       └── form-field.tsx              ← copied from VSG
│   └── lib/
│       ├── utils.ts                        ← shadcn cn() util
│       └── scenarios.ts                    ← SCENARIOS data copied from VSG
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## Task 1: Archive existing files and initialize Next.js

**Files:**
- Create: `_archive/` (move existing files here)
- Create: full Next.js project structure in root

- [ ] **Step 1: Archive existing HTML and image files**

```powershell
cd "D:\Meus Projetos\verum-center-portfolio"
New-Item -ItemType Directory -Path "_archive" -Force
Move-Item *.html _archive\
Move-Item *.png _archive\
```

- [ ] **Step 2: Initialize Next.js**

```powershell
npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*" --no-git --yes
```

Expected output: Next.js project created with `src/`, `public/`, `tailwind.config.ts`, `next.config.ts`.

- [ ] **Step 3: Install additional dependencies**

```powershell
npm install sonner lucide-react
npm install @radix-ui/react-tooltip
```

- [ ] **Step 4: Initialize shadcn/ui**

```powershell
npx shadcn@latest init --defaults
```

When prompted: choose **Dark** theme.

- [ ] **Step 5: Add shadcn components**

```powershell
npx shadcn@latest add button input dialog
```

- [ ] **Step 6: Copy images to public/**

```powershell
Copy-Item _archive\*.png public\
```

- [ ] **Step 7: Verify dev server starts**

```powershell
npm run dev
```

Open `http://localhost:3000` — should show the default Next.js welcome page.

- [ ] **Step 8: Commit**

```powershell
git add .
git commit -m "feat: initialize Next.js portfolio (App Router + shadcn/ui)"
```

---

## Task 2: Design tokens, globals, and root layout

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace globals.css**

`src/app/globals.css`:
```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  --background: 0 0% 4%;
  --foreground: 0 0% 94%;
  --card: 0 0% 7%;
  --card-foreground: 0 0% 94%;
  --popover: 0 0% 7%;
  --popover-foreground: 0 0% 94%;
  --primary: 33 27% 87%;
  --primary-foreground: 0 0% 4%;
  --secondary: 0 0% 11%;
  --secondary-foreground: 0 0% 94%;
  --muted: 0 0% 11%;
  --muted-foreground: 0 0% 53%;
  --accent: 0 0% 11%;
  --accent-foreground: 0 0% 94%;
  --destructive: 0 72% 51%;
  --border: 0 0% 13%;
  --input: 0 0% 13%;
  --ring: 33 27% 87%;
  --radius: 0.5rem;

  /* Portfolio custom tokens */
  --surface-2: #1a1a1a;
  --accent-warm: #e8e0d4;
  --accent-dim: #c4b89a;
  --tag-bg: #1e1e1e;
  --tag-border: #2e2e2e;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border-color: hsl(var(--border));
}

html {
  scroll-behavior: smooth;
  color-scheme: dark;
}

body {
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  font-family: var(--font-inter), system-ui, sans-serif;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
```

- [ ] **Step 2: Replace layout.tsx**

`src/app/layout.tsx`:
```tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Keythe Rueckert — Product Designer",
  description: "Portfolio of Keythe Rueckert — Product Designer transitioning to Design Engineer.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 3: Verify fonts and tokens render**

```powershell
npm run dev
```

Open `http://localhost:3000` — background should be `#0a0a0a`, text `#f0f0f0`, Inter font loaded.

- [ ] **Step 4: Commit**

```powershell
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat: apply portfolio design tokens and Inter font"
```

---

## Task 3: Home page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Write the home page**

`src/app/page.tsx`:
```tsx
import Link from "next/link"

function CaseCard({
  href, company, type, title, description, tags,
}: {
  href: string; company: string; type: string; title: string
  description: string; tags: string[]
}) {
  return (
    <Link href={href} className="group relative block rounded-[14px] border border-[var(--tag-border)] bg-[hsl(var(--card))] p-7 transition-colors hover:border-[#333] hover:bg-[#161616] sm:p-8">
      <span className="absolute right-7 top-7 text-lg text-[hsl(var(--muted-foreground))] transition-transform group-hover:translate-x-[3px] group-hover:translate-y-[-3px]">↗</span>
      <div className="mb-4 flex flex-wrap items-center gap-2.5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[hsl(var(--muted-foreground))]">{company}</span>
        <span className="size-[3px] rounded-full bg-[var(--tag-border)]" />
        <span className="text-[11px] text-[hsl(var(--muted-foreground))]">{type}</span>
      </div>
      <h2 className="mb-2.5 text-xl font-semibold leading-[1.3] tracking-[-0.015em] text-[hsl(var(--foreground))]">{title}</h2>
      <p className="mb-5 text-sm leading-[1.6] text-[hsl(var(--muted-foreground))]">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <span key={t} className="rounded-full border border-[var(--tag-border)] bg-[var(--tag-bg)] px-2.5 py-1 text-[11px] font-medium text-[hsl(var(--muted-foreground))]">{t}</span>
        ))}
      </div>
    </Link>
  )
}

function ExpItem({ date, role, company }: { date: string; role: string; company?: string }) {
  return (
    <div className="grid grid-cols-[140px_1fr] gap-6 border-b border-[hsl(var(--border))] py-6 last:border-b-0 last:pb-0 max-sm:grid-cols-1 max-sm:gap-1">
      <span className="pt-[3px] text-xs leading-[1.4] text-[hsl(var(--muted-foreground))]">{date}</span>
      <div>
        <p className="text-[15px] font-medium text-[hsl(var(--foreground))]">{role}</p>
        {company && <p className="text-[13px] text-[hsl(var(--muted-foreground))]">{company}</p>}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="mx-auto max-w-[760px] px-6">
      {/* Hero */}
      <div className="border-b border-[hsl(var(--border))] pb-20 pt-24 max-sm:pb-14 max-sm:pt-16">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.08em] text-[hsl(var(--muted-foreground))]">Product Designer</p>
        <h1 className="mb-6 text-[clamp(32px,6vw,52px)] font-semibold leading-[1.1] tracking-[-0.025em]">
          Hi, I'm <span className="text-[var(--accent-dim)]">Keythe</span>.
        </h1>
        <p className="mb-9 max-w-[560px] text-base leading-[1.75] text-[#b0b0b0]">
          3+ years designing B2B and B2C digital products — specializing in UX research, scalable design systems, and operational interfaces for SaaS and CRM platforms. Continuously refining my process through AI — using Claude, VS Code, and GitHub to build and ship prototypes independently, deploying via Vercel.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="mailto:keytherueckert93@gmail.com" className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent-warm)] px-5 py-2.5 text-sm font-medium text-[#0a0a0a] transition-opacity hover:opacity-80">Get in touch</a>
          <a href="https://www.behance.net/keytheruec167d" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-[hsl(var(--border))] px-5 py-2.5 text-sm font-medium text-[hsl(var(--muted-foreground))] transition-opacity hover:opacity-80">Previous work ↗</a>
        </div>
      </div>

      {/* Featured Work */}
      <section className="border-b border-[hsl(var(--border))] py-[72px] max-sm:py-14">
        <p className="mb-10 text-[11px] font-semibold uppercase tracking-[0.1em] text-[hsl(var(--muted-foreground))]">Featured Work</p>
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
      <section className="border-b border-[hsl(var(--border))] py-[72px] max-sm:py-14">
        <p className="mb-10 text-[11px] font-semibold uppercase tracking-[0.1em] text-[hsl(var(--muted-foreground))]">Lab</p>
        <div className="flex flex-col gap-4">
          <Link href="/lab/cenarios" className="group relative block rounded-[14px] border border-[var(--tag-border)] bg-[hsl(var(--card))] p-7 transition-colors hover:border-[#333] hover:bg-[#161616] sm:p-8">
            <span className="absolute right-7 top-7 text-lg text-[hsl(var(--muted-foreground))] transition-transform group-hover:translate-x-[3px] group-hover:translate-y-[-3px]">↗</span>
            <div className="mb-4 flex flex-wrap items-center gap-2.5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[hsl(var(--muted-foreground))]">Verum Sales Global</span>
              <span className="size-[3px] rounded-full bg-[var(--tag-border)]" />
              <span className="text-[11px] text-[hsl(var(--muted-foreground))]">Interactive Demo</span>
            </div>
            <h2 className="mb-2.5 text-xl font-semibold leading-[1.3] tracking-[-0.015em]">UI Scenarios — Accounts Module</h2>
            <p className="mb-5 text-sm leading-[1.6] text-[hsl(var(--muted-foreground))]">Live demo of every UI state in the Accounts module: toasts, alerts, tooltips, confirmation modals, and inline errors — generated with the Scenario Generator tool and implemented in production.</p>
            <div className="flex flex-wrap gap-2">
              {["Interactive", "Sonner Toasts", "Radix Dialogs", "VSG Design System"].map((t) => (
                <span key={t} className="rounded-full border border-[var(--tag-border)] bg-[var(--tag-bg)] px-2.5 py-1 text-[11px] font-medium text-[hsl(var(--muted-foreground))]">{t}</span>
              ))}
            </div>
          </Link>
        </div>
      </section>

      {/* Experience */}
      <section className="border-b border-[hsl(var(--border))] py-[72px] max-sm:py-14">
        <p className="mb-10 text-[11px] font-semibold uppercase tracking-[0.1em] text-[hsl(var(--muted-foreground))]">Experience</p>
        <ExpItem date="Nov 2024 – Present" role="Product Designer" company="Cantu Inc." />
        <ExpItem date="Aug 2023 – Nov 2024" role="UX/UI Designer" company="Focusmonk" />
        <ExpItem date="Jan 2023 – Aug 2023" role="UX/UI Designer" company="Lize" />
      </section>

      {/* Education */}
      <section className="py-[72px] max-sm:py-14">
        <p className="mb-10 text-[11px] font-semibold uppercase tracking-[0.1em] text-[hsl(var(--muted-foreground))]">Education</p>
        <ExpItem date="2026 – Present" role="AI — ongoing focus" />
        <ExpItem date="2023 – 2024" role="MBA — UX Research, Research Ops & Design Leadership" company="Unifast & Toronto School of Management" />
        <ExpItem date="2015 – 2018" role="Bachelor — Advertising & Marketing" />
      </section>

      {/* Footer */}
      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-[hsl(var(--border))] py-12">
        <p className="text-[13px] text-[#444]">Keythe Rueckert · Product Designer</p>
        <div className="flex gap-5">
          <a href="mailto:keytherueckert93@gmail.com" className="text-[13px] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">Email</a>
          <a href="https://www.behance.net/keytheruec167d" target="_blank" rel="noopener noreferrer" className="text-[13px] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">Behance</a>
          <a href="https://linkedin.com/in/keytherueckert" target="_blank" rel="noopener noreferrer" className="text-[13px] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">LinkedIn</a>
        </div>
      </footer>
    </div>
  )
}
```

- [ ] **Step 2: Verify home page renders**

```powershell
npm run dev
```

Open `http://localhost:3000`. Check: dark background, Inter font, case cards with hover states, footer links.

- [ ] **Step 3: Commit**

```powershell
git add src/app/page.tsx
git commit -m "feat: home page with case cards and lab section"
```

---

## Task 4: Shared case components

**Files:**
- Create: `src/components/case/case-header.tsx`
- Create: `src/components/case/case-section.tsx`
- Create: `src/components/case/pain-list.tsx`
- Create: `src/components/case/metrics-grid.tsx`
- Create: `src/components/case/comparison-block.tsx`
- Create: `src/components/case/iteration-card.tsx`

- [ ] **Step 1: Create case-header.tsx**

`src/components/case/case-header.tsx`:
```tsx
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
      <nav className="border-b border-[hsl(var(--border))] py-5">
        <Link href="/" className="inline-flex items-center gap-1.5 text-[13px] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
          ← Back
        </Link>
      </nav>
      <header className="border-b border-[hsl(var(--border))] pb-14 pt-12 mb-[72px]">
        <p className="mb-6 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.08em] text-[hsl(var(--muted-foreground))] before:block before:h-px before:w-5 before:bg-[hsl(var(--muted-foreground))]">
          {eyebrow}
        </p>
        <h1 className="mb-5 text-[clamp(28px,5vw,44px)] font-semibold leading-[1.15] tracking-[-0.02em]">{title}</h1>
        <p className="mb-9 max-w-[560px] text-[17px] leading-[1.6] text-[hsl(var(--muted-foreground))]">{subtitle}</p>
        <div className="flex flex-wrap gap-2.5">
          {tags.map((t) => (
            <span
              key={t.label}
              className={`rounded-full border px-3 py-[5px] text-[12px] font-medium tracking-[0.02em] ${
                t.accent
                  ? "border-[#3a3420] bg-[#1a1710] text-[var(--accent-dim)]"
                  : "border-[var(--tag-border)] bg-[var(--tag-bg)] text-[hsl(var(--muted-foreground))]"
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
```

- [ ] **Step 2: Create case-section.tsx**

`src/components/case/case-section.tsx`:
```tsx
export function CaseSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-[72px]">
      <h2 className="mb-8 border-b border-[hsl(var(--border))] pb-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-[hsl(var(--muted-foreground))]">
        {title}
      </h2>
      {children}
    </section>
  )
}
```

- [ ] **Step 3: Create pain-list.tsx**

`src/components/case/pain-list.tsx`:
```tsx
export function PainList({ items }: { items: { icon: string; content: React.ReactNode }[] }) {
  return (
    <ul className="my-6 flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3.5 rounded-[10px] border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-[18px] py-4 text-[14px] leading-[1.6] text-[#b0b0b0]">
          <span className="mt-px shrink-0 text-base">{item.icon}</span>
          <span>{item.content}</span>
        </li>
      ))}
    </ul>
  )
}
```

- [ ] **Step 4: Create metrics-grid.tsx**

`src/components/case/metrics-grid.tsx`:
```tsx
export function MetricsGrid({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="my-7 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
      {items.map((item) => (
        <div key={item.label} className="rounded-[10px] border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-[22px] py-5">
          <div className="mb-1.5 text-[28px] font-bold leading-none tracking-[-0.02em] text-[var(--accent-warm)]">
            {item.value}
          </div>
          <div className="text-[12px] leading-[1.4] text-[hsl(var(--muted-foreground))]">{item.label}</div>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 5: Create comparison-block.tsx**

`src/components/case/comparison-block.tsx`:
```tsx
import Image from "next/image"

interface ComparisonBlockProps {
  variant: "before" | "after"
  label: string
  src: string
  alt: string
  caption?: string
}

export function ComparisonBlock({ variant, label, src, alt, caption }: ComparisonBlockProps) {
  return (
    <div className="my-8">
      <p className={`mb-2.5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] before:block before:size-1.5 before:rounded-full before:bg-current ${variant === "before" ? "text-[#8b3a3a]" : "text-[#3a7a5a]"}`}>
        {label}
      </p>
      <Image src={src} alt={alt} width={760} height={428} className="w-full rounded-[10px] border border-[hsl(var(--border))]" />
      {caption && <p className="mt-2.5 text-[12px] leading-[1.5] text-[#444]">{caption}</p>}
    </div>
  )
}
```

- [ ] **Step 6: Create iteration-card.tsx**

`src/components/case/iteration-card.tsx`:
```tsx
export function IterationCard({
  number, title, children,
}: {
  number: string; title: string; children: React.ReactNode
}) {
  return (
    <div className="mb-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
      <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--accent-dim)]">{number}</p>
      <h3 className="mb-3 text-base font-semibold tracking-[-0.01em]">{title}</h3>
      <div className="text-[14px] leading-[1.6] text-[#b0b0b0] [&>p+p]:mt-2.5">{children}</div>
    </div>
  )
}
```

- [ ] **Step 7: Commit**

```powershell
git add src/components/
git commit -m "feat: shared case components (header, section, pain-list, metrics, comparison, iteration-card)"
```

---

## Task 5: Case pages

**Files:**
- Create: `src/app/cases/verum-center/page.tsx`
- Create: `src/app/cases/verum-supply/page.tsx`
- Create: `src/app/cases/pneustore/page.tsx`
- Create: `src/app/cases/verum-global-vs-vsg/page.tsx`

Each case page follows this pattern. The content comes from the existing HTML files in `_archive/`.

**Pattern for every case page:**

```tsx
import { CaseHeader } from "@/components/case/case-header"
import { CaseSection } from "@/components/case/case-section"
import { PainList } from "@/components/case/pain-list"
import { MetricsGrid } from "@/components/case/metrics-grid"
import { ComparisonBlock } from "@/components/case/comparison-block"
import { IterationCard } from "@/components/case/iteration-card"

export default function CasePage() {
  return (
    <div className="mx-auto max-w-[760px] px-6">
      <CaseHeader
        eyebrow="..."
        title="..."
        subtitle="..."
        tags={[{ label: "...", accent: true }, { label: "..." }]}
      />
      <CaseSection title="Context">
        <p className="mb-4 text-[15px] leading-[1.75] text-[#c8c8c8]">...</p>
      </CaseSection>
      {/* ... remaining sections */}
    </div>
  )
}
```

**Note on images:** Replace `<img src="filename.png">` with `<Image src="/filename.png" alt="..." width={760} height={428} className="w-full rounded-[10px] border border-[hsl(var(--border))] my-6" />` and add `import Image from "next/image"`.

- [ ] **Step 1: Create verum-center case page**

Source: `_archive/verum-center-portfolio.html`. Translate all sections to JSX using the shared components.

Add to `src/app/cases/verum-center/page.tsx` following the pattern above with all content from the HTML file.

- [ ] **Step 2: Create verum-supply case page**

Source: `_archive/verum-supply.html`. Note: `supply-table.png` is referenced — ensure it's in `public/`.

Add to `src/app/cases/verum-supply/page.tsx`.

- [ ] **Step 3: Create pneustore case page**

Source: `_archive/pneustore.html`.

Add to `src/app/cases/pneustore/page.tsx`.

- [ ] **Step 4: Create verum-global-vs-vsg case page**

Source: `_archive/verum-global-vs-vsg.html`. Images: `vg-accounts-list.png`, `vg-new-account-step1.png`, `vg-new-account-step2.png`, `vsg-new-account-step1.png`, `vsg-accounts-list.png`.

Add to `src/app/cases/verum-global-vs-vsg/page.tsx`.

- [ ] **Step 5: Verify all case pages load**

```powershell
npm run dev
```

Visit: `http://localhost:3000/cases/verum-center`, `/cases/verum-supply`, `/cases/pneustore`, `/cases/verum-global-vs-vsg`. Check: images load, Back link works, layout matches original.

- [ ] **Step 6: Commit**

```powershell
git add src/app/cases/
git commit -m "feat: migrate all 4 case study pages to Next.js"
```

---

## Task 6: VSG components and scenarios data

**Files:**
- Create: `src/components/ui/account-alert.tsx`
- Create: `src/components/ui/info-tooltip.tsx`
- Create: `src/components/ui/confirm-dialog.tsx`
- Create: `src/components/ui/form-field.tsx`
- Create: `src/lib/scenarios.ts`

- [ ] **Step 1: Create account-alert.tsx**

`src/components/ui/account-alert.tsx`:
```tsx
"use client"

import { Info, AlertTriangle, XCircle } from "lucide-react"

type AlertVariant = "info" | "warning" | "error"

interface AccountAlertProps {
  variant: AlertVariant
  title: string
  description: string
}

const styles: Record<AlertVariant, { container: string; icon: string; Icon: typeof Info }> = {
  info: {
    container: "border-blue-800 bg-blue-950 text-blue-300",
    icon: "text-blue-400",
    Icon: Info,
  },
  warning: {
    container: "border-amber-800 bg-amber-950 text-amber-300",
    icon: "text-amber-400",
    Icon: AlertTriangle,
  },
  error: {
    container: "border-destructive/30 bg-destructive/5 text-destructive",
    icon: "text-destructive",
    Icon: XCircle,
  },
}

export function AccountAlert({ variant, title, description }: AccountAlertProps) {
  const { container, icon, Icon } = styles[variant]
  return (
    <div className={`flex items-start gap-3 rounded-md border px-4 py-3 text-sm ${container}`}>
      <Icon className={`mt-0.5 size-4 shrink-0 ${icon}`} />
      <div className="flex flex-col gap-0.5">
        <span className="font-medium">{title}</span>
        <span className="opacity-80">{description}</span>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create info-tooltip.tsx**

`src/components/ui/info-tooltip.tsx`:
```tsx
"use client"

import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { Info } from "lucide-react"
import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"

interface InfoTooltipProps {
  title: string
  description: string
  children?: ReactNode
}

export function InfoTooltip({ title, description, children }: InfoTooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={200}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          {children ?? (
            <Button
              type="button"
              variant="ghost"
              className="h-auto p-0 text-muted-foreground hover:bg-transparent hover:text-foreground"
              aria-label="More information"
            >
              <Info className="size-3.5" />
            </Button>
          )}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side="top"
            sideOffset={6}
            className="z-50 max-w-[220px] rounded-md border border-border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
          >
            <p className="font-medium">{title}</p>
            <p className="mt-0.5 text-muted-foreground">{description}</p>
            <TooltipPrimitive.Arrow className="fill-border" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}
```

- [ ] **Step 3: Create confirm-dialog.tsx**

`src/components/ui/confirm-dialog.tsx`:
```tsx
"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: "default" | "destructive"
  onConfirm: () => void
}

export function ConfirmDialog({
  open, onOpenChange, title, description,
  confirmLabel = "Confirm", cancelLabel = "Cancel",
  variant = "destructive", onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[400px] min-h-[160px] p-5">
        <div className="flex flex-col gap-1 pr-6">
          <span className="text-base font-semibold text-foreground">{title}</span>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-center justify-end gap-4 pt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>{cancelLabel}</Button>
          <Button variant={variant} onClick={() => { onConfirm(); onOpenChange(false) }}>{confirmLabel}</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
```

- [ ] **Step 4: Create form-field.tsx**

`src/components/ui/form-field.tsx`:
```tsx
"use client"

import { useId } from "react"
import { AlertTriangle } from "lucide-react"
import type { ReactNode } from "react"

interface FormFieldProps {
  label: string
  required?: boolean
  children: ReactNode
  hint?: ReactNode
  error?: string
  labelSuffix?: ReactNode
}

export function FormField({ label, required, children, hint, error, labelSuffix }: FormFieldProps) {
  const msgId = useId()
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1">
        <label className="text-sm font-normal text-foreground">
          {label.replace(/\s*\(.*?\)/, "")}
          {/\(.*?\)/.test(label) && (
            <span className="ml-1 text-muted-foreground">{label.match(/\(.*?\)/)?.[0]}</span>
          )}
          {required && <span className="ml-0.5 text-destructive">*</span>}
        </label>
        {labelSuffix}
      </div>
      {children}
      {error ? (
        <div id={msgId} role="alert" className="flex items-center gap-1 text-xs text-destructive">
          <AlertTriangle className="size-3 shrink-0" />{error}
        </div>
      ) : hint ? (
        <div id={msgId} className="text-xs text-muted-foreground">{hint}</div>
      ) : null}
    </div>
  )
}
```

- [ ] **Step 5: Create scenarios.ts**

`src/lib/scenarios.ts`:
```ts
export const SCENARIOS = {
  toast: {
    contaCadastrada: { title: "Conta cadastrada com sucesso", description: "Sua conta foi cadastrada com sucesso" },
    beneficioFiscalAdicionado: { title: "Benefício fiscal adicionado", description: "Benefício fiscal adicionado com sucesso" },
    contatoAdicionado: { title: "Contato adicionado", description: "Contato adicionado com sucesso" },
    anexoEnviado: { title: "Anexo enviado", description: "Anexo enviado com sucesso" },
    erroCpfCnpjJaCadastrado: { title: "Erro ao cadastrar conta", description: "CPF/CNPJ já cadastrado" },
    erroSalvarConta: { title: "Erro ao salvar conta", description: "Falha ao salvar conta" },
    erroEnviarSap: { title: "Erro ao enviar para SAP", description: "Falha ao enviar dados para SAP" },
    erroAnexarArquivo: { title: "Erro ao anexar arquivo", description: "Falha ao anexar arquivo" },
  },
  alert: {
    contaAguardandoValidacao: { variant: "info" as const, title: "Conta aguardando validação", description: "Conta aguardando validação" },
    integracaoSapFalhou: { variant: "error" as const, title: "Integração SAP falhou", description: "Integração SAP falhou" },
    beneficioFiscalExpirado: { variant: "warning" as const, title: "Benefício fiscal expirado", description: "Benefício fiscal expirado" },
    contaRejeitadaSap: { variant: "error" as const, title: "Conta rejeitada pelo SAP", description: "Conta rejeitada pelo SAP" },
  },
  tooltip: {
    clienteInternacional: { title: "Cliente internacional", description: "CPF/CNPJ deixa de ser obrigatório" },
    tipoRelacao: { title: "Tipo de relação", description: "Definido automaticamente pelo CNAE" },
    grupoEconomico: { title: "Grupo econômico", description: "Contas vinculadas passam por validação do Crédito" },
    beneficioFiscal: { title: "Benefício fiscal", description: "Necessita aprovação do Cadastro/Admin" },
    contatoPrincipal: { title: "Contato principal", description: "Apenas um contato principal por conta" },
    multiplasIEs: { title: "Múltiplas IEs", description: "Cada IE deve possuir um endereço exclusivo" },
  },
  modal: {
    cancelarCadastro: { title: "Cancelar cadastro", description: "Você perderá as alterações não salvas.", confirmLabel: "Sim, cancelar", variant: "destructive" as const },
    removerContato: { title: "Remover contato", description: "Tem certeza que deseja remover este contato?", confirmLabel: "Sim, remover contato", variant: "destructive" as const },
    removerIE: { title: "Remover IE", description: "Tem certeza que deseja remover esta inscrição estadual?", confirmLabel: "Sim, remover IE", variant: "destructive" as const },
    selecionarEnderecoNF: { title: "Selecionar endereço para NF", description: "Selecione o endereço para nota fiscal", confirmLabel: "Selecionar", variant: "default" as const },
  },
  inlineError: {
    cpfCnpjInvalido: "CPF/CNPJ inválido",
    cpfCnpjDuplicado: "CPF/CNPJ duplicado",
    cepInvalido: "CEP inválido",
    paisNaoSelecionado: "País não selecionado",
    grupoEconomicoSemMatriz: "Grupo econômico sem matriz",
    grupoEconomicoNaoEncontrado: "Grupo econômico não encontrado",
    anexoObrigatorioFaltando: "Anexo obrigatório faltando",
    contatoObrigatorioFaltando: "Contato obrigatório faltando",
  },
} as const
```

- [ ] **Step 6: Commit**

```powershell
git add src/components/ui/account-alert.tsx src/components/ui/info-tooltip.tsx src/components/ui/confirm-dialog.tsx src/components/ui/form-field.tsx src/lib/scenarios.ts
git commit -m "feat: add VSG components and scenarios data for lab"
```

---

## Task 7: Lab/cenarios interactive page

**Files:**
- Modify: `src/app/layout.tsx` (add Sonner Toaster)
- Create: `src/app/lab/cenarios/page.tsx`

- [ ] **Step 1: Add Toaster to layout**

`src/app/layout.tsx` — add Sonner Toaster:
```tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Keythe Rueckert — Product Designer",
  description: "Portfolio of Keythe Rueckert — Product Designer transitioning to Design Engineer.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body>
        {children}
        <Toaster theme="dark" position="bottom-right" />
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Create lab/cenarios/page.tsx**

`src/app/lab/cenarios/page.tsx`:
```tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AccountAlert } from "@/components/ui/account-alert"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { FormField } from "@/components/ui/form-field"
import { SCENARIOS } from "@/lib/scenarios"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{title}</h2>
      {children}
    </section>
  )
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-lg border border-border bg-card p-6">{children}</div>
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-2">{children}</div>
}

export default function CenariosPage() {
  const [modal, setModal] = useState<keyof typeof SCENARIOS.modal | null>(null)

  return (
    <div className="mx-auto max-w-[760px] px-6">
      <nav className="border-b border-[hsl(var(--border))] py-5">
        <Link href="/" className="inline-flex items-center gap-1.5 text-[13px] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
          ← Back
        </Link>
      </nav>

      <header className="border-b border-[hsl(var(--border))] pb-14 pt-12 mb-[72px]">
        <p className="mb-6 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.08em] text-muted-foreground before:block before:h-px before:w-5 before:bg-muted-foreground">
          Interactive Demo · Verum Sales Global
        </p>
        <h1 className="mb-5 text-[clamp(28px,5vw,44px)] font-semibold leading-[1.15] tracking-[-0.02em]">
          UI Scenarios — Accounts Module
        </h1>
        <p className="max-w-[560px] text-[17px] leading-[1.6] text-muted-foreground">
          Every UI state in the Accounts module, live. Generated with the Scenario Generator tool, implemented in production with the VSG design system.
        </p>
      </header>

      <div className="flex flex-col gap-10 pb-24">
        <Section title="Toast · Success">
          <Card>
            <Row>
              {(["contaCadastrada", "beneficioFiscalAdicionado", "contatoAdicionado", "anexoEnviado"] as const).map((key) => (
                <Button key={key} variant="outline" onClick={() => toast.success(SCENARIOS.toast[key].title, { description: SCENARIOS.toast[key].description })}>
                  {SCENARIOS.toast[key].title}
                </Button>
              ))}
            </Row>
          </Card>
        </Section>

        <Section title="Toast · Error">
          <Card>
            <Row>
              {(["erroCpfCnpjJaCadastrado", "erroSalvarConta", "erroEnviarSap", "erroAnexarArquivo"] as const).map((key) => (
                <Button key={key} variant="outline" onClick={() => toast.error(SCENARIOS.toast[key].title, { description: SCENARIOS.toast[key].description })}>
                  {SCENARIOS.toast[key].title}
                </Button>
              ))}
            </Row>
          </Card>
        </Section>

        <Section title="Alert · Info / Warning / Error">
          <div className="flex flex-col gap-3">
            {(["contaAguardandoValidacao", "integracaoSapFalhou", "beneficioFiscalExpirado", "contaRejeitadaSap"] as const).map((key) => (
              <AccountAlert key={key} {...SCENARIOS.alert[key]} />
            ))}
          </div>
        </Section>

        <Section title="Tooltip · Info">
          <Card>
            <div className="grid grid-cols-2 gap-4">
              {(["clienteInternacional", "tipoRelacao", "grupoEconomico", "beneficioFiscal", "contatoPrincipal", "multiplasIEs"] as const).map((key) => (
                <FormField key={key} label={SCENARIOS.tooltip[key].title} labelSuffix={<InfoTooltip {...SCENARIOS.tooltip[key]} />}>
                  <Input placeholder="Example field" disabled />
                </FormField>
              ))}
            </div>
          </Card>
        </Section>

        <Section title="Modal · Confirmation / Info">
          <Card>
            <Row>
              {(["cancelarCadastro", "removerContato", "removerIE", "selecionarEnderecoNF"] as const).map((key) => (
                <Button key={key} variant="outline" onClick={() => setModal(key)}>
                  {SCENARIOS.modal[key].title}
                </Button>
              ))}
            </Row>
          </Card>
          {modal && (
            <ConfirmDialog
              open={!!modal}
              onOpenChange={(open) => !open && setModal(null)}
              title={SCENARIOS.modal[modal].title}
              description={SCENARIOS.modal[modal].description}
              variant={SCENARIOS.modal[modal].variant}
              confirmLabel={SCENARIOS.modal[modal].confirmLabel}
              onConfirm={() => setModal(null)}
            />
          )}
        </Section>

        <Section title="Inline Error">
          <Card>
            <div className="grid grid-cols-2 gap-4">
              {(["cpfCnpjInvalido", "cpfCnpjDuplicado", "cepInvalido", "paisNaoSelecionado", "grupoEconomicoSemMatriz", "grupoEconomicoNaoEncontrado", "anexoObrigatorioFaltando", "contatoObrigatorioFaltando"] as const).map((key) => (
                <FormField key={key} label={SCENARIOS.inlineError[key]} error={SCENARIOS.inlineError[key]}>
                  <Input aria-invalid placeholder="Field with error" />
                </FormField>
              ))}
            </div>
          </Card>
        </Section>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verify lab/cenarios page**

```powershell
npm run dev
```

Visit `http://localhost:3000/lab/cenarios`. Test:
- Click a success toast button → Sonner toast appears bottom-right
- Click an error toast button → red toast appears
- Click a modal button → ConfirmDialog opens, Cancel and Confirm work
- Hover tooltip icons on form fields → tooltip appears

- [ ] **Step 4: Commit**

```powershell
git add src/app/layout.tsx src/app/lab/
git commit -m "feat: lab/cenarios interactive demo with toasts, modals, tooltips, alerts, inline errors"
```

---

## Task 8: Deploy to Vercel

**Files:** No code changes — Vercel configuration only.

- [ ] **Step 1: Verify production build passes**

```powershell
npm run build
```

Expected: no TypeScript errors, no missing image errors. Fix any errors before proceeding.

- [ ] **Step 2: Update Vercel project settings**

The current Vercel project (`verum-center-portfolio`) was set up for a static site. It needs to detect Next.js now.

Go to Vercel dashboard → `verum-center-portfolio` project → Settings → General:
- Framework Preset: **Next.js** (Vercel usually auto-detects, but verify)
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

- [ ] **Step 3: Deploy**

```powershell
vercel deploy --prod
```

- [ ] **Step 4: Verify all routes in production**

Visit each route on the live URL:
- `/` — home page loads
- `/cases/verum-center` — case page loads
- `/cases/verum-supply` — case page loads
- `/cases/pneustore` — case page loads
- `/cases/verum-global-vs-vsg` — case page loads
- `/lab/cenarios` — interactive demo loads and all interactions work

- [ ] **Step 5: Final commit**

```powershell
git add .
git commit -m "chore: production-ready Next.js portfolio"
```

---

## Self-Review

**Spec coverage:**
- ✓ Next.js migration with App Router
- ✓ All 4 existing cases migrated
- ✓ Lab section with `/lab/cenarios` interactive demo
- ✓ Sonner toasts, Radix dialogs, tooltips, alerts, inline errors all working
- ✓ Design tokens matching original dark aesthetic
- ✓ Deployed to Vercel

**Potential gaps:**
- The `verum-center-en.html` (dashboard embed with iframe) was not migrated — add as `/cases/verum-center/dashboard` if needed
- The `scenario-generator-tool.html` was added to the static portfolio — after migration, add as `/lab/scenario-generator` with its own page
- The `_archive/` folder contains sensitive content; do not commit it with actual client screenshots if the repo is public
