export function PainList({ items }: { items: { icon: string; content: React.ReactNode }[] }) {
  return (
    <ul className="my-6 flex flex-col gap-3">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-3.5 rounded-[10px] border border-border bg-card px-[18px] py-4 text-[14px] leading-[1.6] text-[#b0b0b0]"
        >
          <span className="mt-px shrink-0 text-base">{item.icon}</span>
          <span>{item.content}</span>
        </li>
      ))}
    </ul>
  )
}
