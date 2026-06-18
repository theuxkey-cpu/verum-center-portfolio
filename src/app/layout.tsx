import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"
import { Analytics } from "@vercel/analytics/next"
import { ThemeToggle } from "@/components/theme-toggle"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Keythe Rueckert — Product Designer",
  description: "Portfolio of Keythe Rueckert — Product Designer transitioning to Design Engineer.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){if(localStorage.getItem('theme')==='dark'){document.documentElement.classList.add('dark')}})()`,
          }}
        />
      </head>
      <body>
        {children}
        <ThemeToggle />
        <Toaster theme="light" position="bottom-right" />
        <Analytics />
      </body>
    </html>
  )
}
