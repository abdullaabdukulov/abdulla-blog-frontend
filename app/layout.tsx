import type React from "react"
import { Inter } from "next/font/google"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { LanguageProvider } from "@/contexts/language-context"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { CustomCursor } from "@/components/custom-cursor"
import { DisableCursor } from "@/components/disable-cursor"
import { ScrollAnimations } from "@/components/scroll-animations"
import { PageTransition } from "@/components/page-transition"
import { ParallaxEffect } from "@/components/parallax-effect"

import "@/app/globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <ParallaxEffect>
              <div className="relative flex min-h-screen flex-col">
                <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  <div className="container flex h-14 items-center">
                    <MainNav />
                  </div>
                </header>
                <main className="flex-1">
                  <PageTransition>{children}</PageTransition>
                </main>
                <Footer />
              </div>
              <Toaster />
              <CustomCursor />
              <DisableCursor />
              <ScrollAnimations />
            </ParallaxEffect>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

