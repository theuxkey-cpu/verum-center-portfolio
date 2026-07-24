"use client"

import { useState } from "react"
import { BeforeAfterSlider } from "@/components/case/before-after-slider"

type Viewport = "desktop" | "mobile"
interface ImageSpec {
  src: string
  alt: string
  width: number
  height: number
}
interface ProfileAfter {
  id: string
  label: string
  permission?: string
  after: Record<Viewport, ImageSpec>
}

export interface AccountDetailTab {
  id: string
  label: string
  description: React.ReactNode
  slider: {
    before: Record<Viewport, ImageSpec>
    profiles: ProfileAfter[]
    caption?: string
  }
}

export function AccountDetailExplorer({ tabs }: { tabs: AccountDetailTab[] }) {
  const [activeTabId, setActiveTabId] = useState(tabs[0].id)
  const activeTab = tabs.find((t) => t.id === activeTabId) ?? tabs[0]

  return (
    <div className="my-8 rounded-xl border border-border bg-card p-6">
      <div className="mb-5 flex flex-wrap gap-1.5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTabId(tab.id)}
            className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium tracking-[0.01em] transition-colors ${
              tab.id === activeTabId
                ? "border-[var(--badge-warm-border)] bg-[var(--badge-warm-bg)] text-[var(--accent-dim)]"
                : "border-[var(--tag-border)] bg-[var(--tag-bg)] text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div key={activeTab.id}>
        <div className="text-[15px] leading-[1.75] text-muted-foreground [&>p:last-child]:mb-0">{activeTab.description}</div>
        <BeforeAfterSlider
          before={activeTab.slider.before}
          profiles={activeTab.slider.profiles}
          caption={activeTab.slider.caption}
        />
      </div>
    </div>
  )
}
