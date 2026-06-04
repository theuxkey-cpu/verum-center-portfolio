import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "UI Scenarios — Accounts Module | Keythe Rueckert",
  description: "Live demo of every UI state in the VSG Accounts module — toasts, alerts, tooltips, confirmation modals, and inline errors from the VSG design system.",
}

export default function CenariosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
