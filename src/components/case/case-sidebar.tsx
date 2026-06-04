"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export function CaseSidebar({ showBack = true }: { showBack?: boolean }) {
  const [sections, setSections] = useState<{ id: string; title: string }[]>([])
  const [active, setActive] = useState("")

  useEffect(() => {
    const els = Array.from(document.querySelectorAll("section[data-section]"))
    setSections(
      els.map((el) => ({
        id: el.id,
        title: el.getAttribute("data-section") ?? el.id,
      }))
    )

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (intersecting.length > 0) setActive(intersecting[0].target.id)
      },
      { rootMargin: "-10% 0px -60% 0px", threshold: 0 }
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  if (sections.length === 0) return null

  return (
    <aside
      className="fixed top-32 hidden max-h-[calc(100vh-10rem)] w-[176px] overflow-y-auto xl:flex xl:flex-col xl:gap-1"
      style={{ left: "max(16px, calc(50vw - 580px))" }}
    >
      {showBack && (
        <Link
          href="/"
          className="mb-6 flex items-center gap-1.5 text-[12px] text-[#777] transition-colors hover:text-foreground"
        >
          ← Back to home
        </Link>
      )}
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#555]">
        On this page
      </p>
      {sections.map(({ id, title }) => (
        <a
          key={id}
          href={`#${id}`}
          className={`flex items-center gap-2.5 py-[3px] text-[12px] leading-[1.4] transition-colors ${
            active === id
              ? "text-[var(--accent-dim)]"
              : "text-[#777] hover:text-[#999]"
          }`}
        >
          <span
            className={`block h-px shrink-0 transition-all duration-200 ${
              active === id ? "w-4 bg-[var(--accent-dim)]" : "w-3 bg-[#333]"
            }`}
          />
          {title}
        </a>
      ))}
    </aside>
  )
}
