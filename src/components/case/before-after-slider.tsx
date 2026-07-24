"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Monitor, Smartphone, MoveHorizontal, GripVertical } from "lucide-react"

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

interface BeforeAfterSliderProps {
  before: Record<Viewport, ImageSpec>
  profiles: ProfileAfter[]
  caption?: string
  beforeLabel?: string
  afterLabel?: string
}

const VIEWPORTS: { id: Viewport; label: string; icon: typeof Monitor }[] = [
  { id: "desktop", label: "Desktop", icon: Monitor },
  { id: "mobile", label: "Mobile", icon: Smartphone },
]

export function BeforeAfterSlider({
  before,
  profiles,
  caption,
  beforeLabel = "Before",
  afterLabel = "After",
}: BeforeAfterSliderProps) {
  const [activeProfileId, setActiveProfileId] = useState(profiles[0].id)
  const [activeViewport, setActiveViewport] = useState<Viewport>("desktop")
  const [percent, setPercent] = useState(50)
  const [hasInteracted, setHasInteracted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)

  const activeProfile = profiles.find((p) => p.id === activeProfileId) ?? profiles[0]
  const beforeImage = before[activeViewport]
  const afterImage = activeProfile.after[activeViewport]

  useEffect(() => {
    setPercent(50)
  }, [activeViewport])

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const next = ((clientX - rect.left) / rect.width) * 100
    setPercent(Math.min(100, Math.max(0, next)))
  }, [])

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true
    setHasInteracted(true)
    e.currentTarget.setPointerCapture(e.pointerId)
    updateFromClientX(e.clientX)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return
    updateFromClientX(e.clientX)
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false
    e.currentTarget.releasePointerCapture(e.pointerId)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      setPercent((p) => Math.max(0, p - 5))
    } else if (e.key === "ArrowRight") {
      e.preventDefault()
      setPercent((p) => Math.min(100, p + 5))
    }
  }

  return (
    <div className="my-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {profiles.length > 1 && profiles.map((profile) => (
            <button
              key={profile.id}
              type="button"
              onClick={() => setActiveProfileId(profile.id)}
              className={`rounded-full border px-3 py-1.5 text-[12px] font-medium tracking-[0.02em] transition-colors ${
                profile.id === activeProfileId
                  ? "border-[var(--badge-warm-border)] bg-[var(--badge-warm-bg)] text-[var(--accent-dim)]"
                  : "border-[var(--tag-border)] bg-[var(--tag-bg)] text-muted-foreground hover:text-foreground"
              }`}
            >
              {profile.label}
            </button>
          ))}
        </div>

        <div className="flex gap-1 rounded-full border border-[var(--tag-border)] bg-[var(--tag-bg)] p-1">
          {VIEWPORTS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveViewport(id)}
              aria-label={label}
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium transition-colors ${
                id === activeViewport
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon size={13} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {activeProfile.permission && (
        <p className="mb-2.5 text-[12px] leading-[1.5] text-muted-foreground">{activeProfile.permission}</p>
      )}

      <div
        ref={containerRef}
        className="relative w-full touch-none select-none overflow-hidden rounded-[10px] border border-border"
        style={{ aspectRatio: `${afterImage.width} / ${afterImage.height}` }}
        onPointerMove={handlePointerMove}
      >
        <Image
          src={afterImage.src}
          alt={afterImage.alt}
          fill
          sizes="(max-width: 760px) 100vw, 760px"
          className="object-cover"
        />

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}
        >
          <Image
            src={beforeImage.src}
            alt={beforeImage.alt}
            fill
            sizes="(max-width: 760px) 100vw, 760px"
            className="object-cover"
          />
        </div>

        {!hasInteracted && (
          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-center pt-3 transition-opacity">
            <span className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-[11px] font-medium text-foreground shadow-md">
              <MoveHorizontal size={13} className="text-[var(--accent-dim)]" />
              Drag to compare before and after
            </span>
          </div>
        )}

        <span className="pointer-events-none absolute left-2.5 bottom-2.5 flex items-center gap-1.5 rounded-full border border-[var(--before-border)] bg-[var(--before-bg)] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--before-label)] shadow-md">
          <span className="block size-1.5 rounded-full bg-current" />
          {beforeLabel}
        </span>
        <span className="pointer-events-none absolute right-2.5 bottom-2.5 flex items-center gap-1.5 rounded-full border border-[var(--after-border)] bg-[var(--after-bg)] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--after-label)] shadow-md">
          <span className="block size-1.5 rounded-full bg-current" />
          {afterLabel}
        </span>

        <div
          role="slider"
          tabIndex={0}
          aria-label="Reveal before/after"
          aria-valuenow={Math.round(percent)}
          aria-valuemin={0}
          aria-valuemax={100}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onKeyDown={handleKeyDown}
          className="absolute top-0 bottom-0 z-10 flex w-8 -translate-x-1/2 cursor-ew-resize items-center justify-center focus:outline-none"
          style={{ left: `${percent}%` }}
        >
          <span className="absolute top-0 bottom-0 w-0.5 bg-[var(--accent-warm)] shadow-[0_0_0_1px_rgba(0,0,0,0.25)]" />
          <span className="flex size-10 items-center justify-center rounded-full border-2 border-[var(--accent-warm)] bg-card shadow-lg">
            <GripVertical size={16} className="text-[var(--accent-warm)]" />
          </span>
        </div>
      </div>

      {caption && <p className="mt-2.5 text-[12px] leading-[1.5] text-muted-foreground">{caption}</p>}
    </div>
  )
}
