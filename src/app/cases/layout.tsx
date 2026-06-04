import { ReadingProgress } from "@/components/ui/reading-progress"
import { CaseSidebar } from "@/components/case/case-sidebar"

export default function CasesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ReadingProgress />
      <CaseSidebar />
      {children}
    </>
  )
}
