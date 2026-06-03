# Rebuilding an Enterprise Operational Console to Scale

**Consolidating five fragmented internal tools into a single operational console used daily by support, finance, and operations teams.**

---

## Context

Cantu Inc. is one of the largest automotive parts distributors in Brazil, with over 6,000 partner auto centers. The company was undergoing a strategic platform convergence — merging two separate commercial systems (VerumSales Brasil and VerumSales Internacional) into a single unified global product: **VerumSales Global (VSG)**.

The operational layer of this platform — the tool that support agents, finance analysts, and operations managers use to run day-to-day work — was called **Conect**. It had been patched and extended for years without a coherent information architecture, and was reaching its limits as the company scaled internationally.

I led the design and strategy for **VerumCenter**: a new operational console built to replace Conect, designed to serve the full complexity of the global platform from day one.

---

## My Role

I worked as a hybrid UX + Product Strategy lead on this project. My responsibilities went beyond UI design:

- Led discovery sessions directly with the CEO and board to map platform requirements before a single screen was designed
- Translated platform-wide business rules into a structured knowledge system (ADR — Architecture Decision Records) that governed all design and engineering decisions
- Designed the information architecture, interaction patterns, and key interfaces across the console
- Created the governance framework that allowed cross-functional teams (legal, finance, operations, commercial) to align on over 1,183 business rules without deadlock

---

## Problem

Before VerumCenter, running a single customer operation required navigating five separate tools with no integration between them. A typical workflow looked like this:

**How work actually got done:**
- Sales reps and support agents coordinated via WhatsApp groups and shared spreadsheets to track orders, exceptions, and escalations
- Fiscal classification decisions (which tax regime applied to each sale) required phone calls to specialists — there was no centralized reference, and the rules changed per channel, per CNAE code, and per state
- A structural bug in the pricing engine — the **double-discount loop** — caused orders to be incorrectly priced when the "bill as" field was used as a workaround for missing fiscal logic. Agents had learned to work around the bug, but the workaround introduced new inconsistencies downstream

**Systemic impact:**
- Lead times on supply-constrained orders (CROSS/Backorder) stretched to 20–30 days, largely because no one had a clear view of order status across systems
- Economic groups (auto centers under shared ownership) had credit limits that weren't visible across the fragmented tools, creating both over-extension risk and missed sales opportunities
- When the platform expanded internationally, the rule differences between countries (tax regimes, channel permissions, customer personas) had no structured home — they lived in emails, Confluence pages, and institutional memory

---

## Research

Discovery ran in parallel with platform architecture design. Key inputs:

- **Stakeholder interviews** with support team leads, finance managers, commercial directors, and operations coordinators — mapping not just pain points but the informal workarounds that had become load-bearing habits
- **Process mapping** of the order lifecycle: from opportunity creation through fiscal classification, pricing, approval, fulfillment, and post-sale
- **Rule inventory**: catalogued the full set of business rules governing customer permissions, channel access, tax treatment, and supply behavior — resulting in a structured taxonomy of 1,183 rules across 5 domains
- **Seller feedback sessions**: direct input from field sales reps about the mobile experience, surfacing the horizontal-scroll problem that drove a key design pivot (detailed below)

---

## Solution

VerumCenter was designed around four principles: **single source of truth**, **role-appropriate access**, **rule transparency**, and **global-ready from day one**.

### 1. Unified Operational Console

Five tools became one. The console surfaces customer identity, order history, fiscal classification, credit status, and supply visibility in a single interface — with role-based views that show each team only what they need, without hiding context they occasionally require.

### 2. Identity & Permissiveness Dashboard

The most complex design challenge: making 1,183 business rules legible to humans.

Business rules in VSG are not flat — they're multi-dimensional. A customer's permissions depend on their **scope** (which product lines they can access), their **channel** (how they buy: direct, government tender, fleet rental, marketplace), and their **country**. Rules also differ by tax regime, CNAE classification, and economic group membership.

I designed a filterable dashboard where any stakeholder — from a support agent to a finance director — can select Scope × Channel and immediately see which rules apply, with expandable cards that show the rule rationale, dependencies, and known edge cases.

The dashboard replaced a situation where fiscal questions required a phone call. It made the rule set navigable without requiring institutional knowledge to interpret it.

`[INSERT: Screenshot of Identity & Permissiveness Dashboard — dynamic filter view]`

### 3. Dynamic Country + Channel Filter Layer

As the platform expanded globally, a new problem emerged: rules that work in Brazil don't always apply in Argentina or Chile. Tax treatment, channel availability, and customer classification differ by country — and the teams managing these rules had no shared tool to communicate what applied where.

I added a country dimension to the filter system. Business areas and stakeholders can now filter by **country + channel** to see a precise view of the rules that govern each market. This made the rule set usable by the international expansion team, legal, and country-specific commercial leads without requiring a separate documentation system per region.

`[INSERT: Dashboard filter interaction — country × channel selection]`

### 4. Mobile-First Card Layout (Seller Interface)

An early version of the seller-facing interface used data tables — the default pattern for dense operational data. Field testing with sales reps revealed a fundamental problem: **on mobile, horizontal scroll made the tables nearly unusable**. Reps reported skipping screens entirely because the effort to navigate the table wasn't worth the information payoff.

The pivot: I replaced tables with **card-based layouts** designed mobile-first. Each card surfaces the most critical data points in a glanceable format, with progressive disclosure for details. The card pattern also composed better with the opportunity and order status system — colored status badges (Phase Status + Order Status) became first-class elements of the card, visible without scrolling.

The change was validated through seller feedback before shipping. Post-implementation, the support team reported a measurable reduction in order-status check calls, as reps could self-serve the information they previously called in for.

`[INSERT: Mobile card view — Opportunities list with Phase/Order status badges]`

### 5. Governance System (ADR)

With 1,183 rules and multiple teams contributing requirements, alignment was the persistent bottleneck. I introduced an Architecture Decision Record (ADR) system — a structured format for logging decisions, the context behind them, the alternatives considered, and the consequences accepted.

ADRs served two functions: they gave teams a process for making decisions without escalating everything to leadership, and they created an audit trail that prevented rule regressions as the platform evolved.

---

## Impact

*Metrics are directional and NDA-compliant. Exact figures available upon request in the right context.*

- **Operational coverage**: VerumCenter became the primary operational interface for all daily workflows across support, finance, and operations — replacing five separate tools used by hundreds of internal users
- **Rule transparency**: 1,183 business rules made self-serve through the filter dashboard, eliminating a class of internal support requests that previously required specialist phone calls
- **Supply visibility**: Consolidated order tracking reduced the ambiguity that drove 20–30 day lead times; teams now have a single view of order status across fulfillment stages
- **Mobile adoption**: Card-based seller interface drove measurable reduction in order-status calls to support (reps self-serving via mobile instead of calling in)
- **International readiness**: Country + channel filter layer enabled the platform to absorb international market differences without a per-country documentation system

---

## What I'd Do Differently

**More seller testing earlier.** The horizontal-scroll table problem was caught during field testing — but could have been caught in research if I'd prioritized mobile walkthroughs with reps earlier in the process. The pivot was fast once we had the signal; getting the signal sooner would have been better.

**Separate the rule dashboard from the operational console sooner.** The Identity & Permissiveness Dashboard started as a feature inside VerumCenter and could have been its own standalone tool for business areas. We kept it integrated, which was the right call for support agents — but business stakeholders (legal, finance, commercial) would have benefited from a dedicated, embeddable view earlier.

---

## Artifacts

- [Interactive Business Rules Dashboard (English)](verum-center-en.html) — live filterable view of all 1,183 business rules by Scope × Channel × Country
- `[INSERT: Figma — Mobile card layout, seller interface]`
- `[INSERT: Figma — Identity & Permissiveness Dashboard, filter interaction]`

---

*VerumCenter is a production system. Screenshots and metrics have been sanitized to protect confidential business information.*
