interface BeforeAfterProps {
  before: string
  after: string
  afterLabel?: string
}

export function BeforeAfter({ before, after, afterLabel = "Direction" }: BeforeAfterProps) {
  return (
    <div className="my-6 grid grid-cols-2 gap-3 max-sm:grid-cols-1">
      <div className="rounded-[10px] border border-[#2a1515] bg-[#130d0d] p-[18px]">
        <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#8b3a3a]">Before</p>
        <p className="text-[13px] text-[#999]">{before}</p>
      </div>
      <div className="rounded-[10px] border border-[#152a1d] bg-[#0d1310] p-[18px]">
        <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#3a8b5a]">{afterLabel}</p>
        <p className="text-[13px] text-[#999]">{after}</p>
      </div>
    </div>
  )
}
