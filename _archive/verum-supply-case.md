# Designing the Intelligence Layer of an Enterprise Supply Chain Platform

**Built the end-to-end UX for a supply chain management platform that replaced spreadsheets and isolated SAP tools across four departments — as the sole designer from discovery through production.**

---

## Context

Cantu Inc. runs one of the largest automotive parts distribution networks in Brazil. Behind the commercial front sits a complex supply chain: Logistics, Supply Planning (S&OP), Importing, and International Purchasing — four departments that each manage critical, interdependent operations.

Before Verum Supply, these departments operated in silos. Planning happened in spreadsheets. Purchasing data lived in an isolated SAP configuration that didn't talk to logistics. Backorder status required manual follow-up. There was no shared view of what was in stock, what was on order, or what was on its way.

The company commissioned **Verum Supply**: a unified supply chain management platform designed to give every stakeholder — from branch managers to supply chain directors — a single source of truth.

I was the sole UX designer on the project, involved from discovery through production across every module.

---

## My Role

- **Sole UX designer** across all modules: Supply Planning, Backorder (National and International), SAP Integration, and Access Management
- Ran the discovery phase for the Supply module — defining the Push/Pull model before any screen was designed
- Created the **Score de Suficiência** (Documentation Sufficiency Score): a 14-dimension governance framework that became the team's standard for feature readiness before entering development
- Designed interaction patterns for complex operational workflows: approval chains, smart filtering, data tables with progressive configuration, real-time stock views
- Iterated weekly alongside a fast-shipping team (weekly production deploys throughout the project)

---

## Problem

**Four departments. Four disconnected systems. No shared visibility.**

The supply chain teams were operating with a structural disadvantage:

- **Supply planners** built replenishment proposals in spreadsheets, with no automated calculation of min/max levels, safety stock, or lead times
- **Branch managers** couldn't see what was available before requesting stock — they requested blind, and the supply team reviewed manually
- **Backorder tracking** required phone calls and email chains — there was no system showing which orders were stuck, at which stage, and why
- **Stock data** from SAP wasn't visible in real time — teams made decisions on stale information
- **Approval chains** were informal — no audit trail, no SLAs, no delegation rules

The gap wasn't just operational friction. It was a visibility and governance problem: the people responsible for keeping 6,000+ auto centers stocked had no shared intelligence layer.

---

## Research — Discovery de Abastecimento

Discovery ran before the first screen. Key methods:

- Stakeholder mapping across three tiers: leadership (CEO, Supply Chain Director, IT Director), business areas (Supply, Logistics, Importing, International Purchasing), and the product/tech team
- Process walkthroughs with supply analysts and branch managers to map the actual replenishment workflow — what triggered a request, who approved it, where it got stuck
- Identification of two fundamentally different replenishment models that had to coexist in the same platform:
  - **Push (Automatic)**: system-initiated, policy-driven, eventually AI-assisted — for proactive replenishment based on consumption patterns
  - **Pull (On-Demand)**: branch-initiated, with justification, validation, and approval workflow — for demand-driven requests

Defining the Push vs. Pull distinction early was the critical design decision that shaped every subsequent interaction pattern on the platform.

---

## Solution

### 1. Supply Planning Module (Push & Pull)

The core of the platform. Two modes, one coherent interface.

**Push flow**: system loads data → engine calculates recommendations → plan enters "under review" state → supply analyst adjusts/simulates → approves → publishes → internal replenishment orders generated.

**Pull flow**: branch manager submits request with SKUs, quantities, and justification → system auto-validates against policy (within/outside threshold, cutoff window, origin availability) → supply team triages → approval workflow by authority level → shipment generation.

Key interaction decisions:
- **"Suggested vs. Requested"**: system shows the gap between current stock and max level, anchoring the branch manager's request to a calculated reference rather than guesswork
- **Fixed + configurable columns**: supply analysts need to see dozens of SKU attributes simultaneously. I designed a fixed/variable column system — critical columns always visible, secondary columns user-toggled — replacing the previous habit of managing this in Excel
- **Auto-save**: removed the explicit save button. Every confirmed change persists immediately, eliminating a class of data loss incidents that had been causing rework
- **Smart filters**: "Show only proposals with numbers" (hides zero-quantity SKUs), "Show only available" (hides SKUs already with DIST generated) — both session-persistent, designed for the specific scanning patterns of supply analysts

**Color-segmented column groups.** The supply planning table contains dozens of columns spanning organizational context, product identity, strategic segmentation, status, stock levels, and local demand — all necessary, all visible simultaneously. Horizontal scrolling through unlabeled columns created constant disorientation: analysts couldn't tell at a glance whether a column belonged to stock data or demand data.

The solution: color-coded column group headers acting as visual landmarks across the full table width. Six segments, each with a distinct hue and a group label spanning its columns:

| Segment | Color | Columns |
|---|---|---|
| Organizational Context | Gray | Branch, Company, Region |
| Product Identity | Light blue | SKU, Category, Product, Brand, Model, Size |
| Strategic Segmentation | Amber | Branch drive, Brand drive, Proposal, Assortment |
| Status | Red | Blocked |
| Supply | Blue | Distribution center, stock levels by location |
| Local Demand | Purple | VMM, Min stock, Optimal stock |

Analysts can now scan directly to the segment they need — stock levels are always the blue block, demand parameters are always the purple block — without reading individual column headers to orient themselves.

![Supply planning table with color-segmented column groups](https://www.figma.com/api/mcp/asset/7f899892-adae-4256-a26d-dc9c79f4d95b)

### 2. National Backorder Monitoring

Before this module, backorder status required manual follow-up across systems. The Backorder screen gave the supply team a consolidated operational view: which orders were stuck, at which stage, and why.

Key features:
- SAP integration for real-time order sync
- Material detail modal: full item data consolidated in a single view without navigating to another system
- Divergence management: tracking and resolution of discrepancies identified during SAP integration
- Individual order detail screen with full operational context

`[INSERT: Backorder monitoring screen — order list with status and divergence indicators]`

### 3. Access Management by Profile

A supply chain platform with multiple departments requires precise access control. I designed the access management system around operational roles:

- **Supply Analyst**: full access to planning and approval queues
- **Branch Manager**: limited to pull requests for their assigned units — can see "suggested vs. requested" but not other branches' data
- **ADM Master**: user management across the platform

Profile-to-unit linking allows the same person to hold different roles at different locations — a common pattern in a distributed distribution network.

### 4. Governance — Score de Suficiência v5

One of the recurring problems in product development at this scale is features entering development before they're adequately specified — leading to bugs, rework, and misaligned outcomes.

I created the **Score de Suficiência** (Documentation Sufficiency Score): a 14-dimension framework, scored out of 100, with a 95-point threshold required before any feature enters the development queue.

The 14 dimensions cover:
- **Critical (40pts)**: Data & integrations, Risks & blockers
- **Important (52pts)**: Problem vs. objective, User journey, States & transitions, Persistence & auditability, Required fields, Non-functional expectations, Acceptance criteria
- **Context (8pts)**: Feature framing, UI behavior & signals, Access & permissions

The framework established a shared language between the BA, designer, and engineering team — reducing the "is this ready?" debate to a score. Features at 95+ go to Jira. Features below get a gap list.

---

## Impact

*Metrics are directional and NDA-compliant.*

- **Weekly production deploys** sustained throughout the project — 4 major releases and 6 hotfixes between April–May 2026 alone
- **Real-time stock visibility** introduced across all supply planning screens via OMS integration — replacing decisions made on stale SAP data
- **Auto-save pattern** eliminated manual save failures that had been causing data loss in supply proposals
- **National Backorder module** shipped with SAP integration, giving the supply team their first consolidated view of stuck orders
- **Score de Suficiência** adopted as the team's documentation standard — reduced ambiguous feature entries into the dev queue
- **Excel export with filter awareness** delivered for supply and review screens — replacing the habit of copy-pasting filtered views manually

---

## What I'd Do Differently

**Start with the Push/Pull distinction earlier in stakeholder communication.** The two models are architecturally separate — Push doesn't generate shipments automatically, Pull requires an approval chain, and Shipment is a third independent pillar. Early in the project, stakeholders conflated them. Clarifying the boundary sooner would have prevented scope confusion in the first two sprints.

**Design the column configuration system earlier.** The fixed/configurable column pattern was introduced as an improvement after launch. Supply analysts had been managing column selection themselves by exporting to Excel. Had I mapped their specific scanning workflows during discovery, this would have been in the first version.

---

## Artifacts

- `[INSERT: Figma — Supply planning screen, Push mode]`
- `[INSERT: Figma — Pull request flow, branch manager view]`
- `[INSERT: Figma — Backorder monitoring screen]`
- `[INSERT: Figma — Access management by profile]`
- Score de Suficiência v5 — documentation governance framework `[INSERT LINK]`
