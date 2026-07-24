import Image from "next/image"

interface ComparisonBlockProps {
  variant: "before" | "after"
  label: string
  src: string
  alt: string
  width: number
  height: number
  caption?: string
}

export function ComparisonBlock({ variant, label, src, alt, width, height, caption }: ComparisonBlockProps) {
  return (
    <div className="my-8">
      <p
        className={`mb-2.5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] before:block before:size-1.5 before:rounded-full before:bg-current ${
          variant === "before" ? "text-[var(--before-label)]" : "text-[var(--after-label)]"
        }`}
      >
        {label}
      </p>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-auto w-full rounded-[10px] border border-border"
      />
      {caption && <p className="mt-2.5 text-[12px] leading-[1.5] text-muted-foreground">{caption}</p>}
    </div>
  )
}
