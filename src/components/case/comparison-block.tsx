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
      <p
        className={`mb-2.5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] before:block before:size-1.5 before:rounded-full before:bg-current ${
          variant === "before" ? "text-[#8b3a3a]" : "text-[#3a7a5a]"
        }`}
      >
        {label}
      </p>
      <Image
        src={src}
        alt={alt}
        width={760}
        height={428}
        className="w-full rounded-[10px] border border-border"
      />
      {caption && <p className="mt-2.5 text-[12px] leading-[1.5] text-[#444]">{caption}</p>}
    </div>
  )
}
