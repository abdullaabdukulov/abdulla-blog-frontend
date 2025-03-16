"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/lib/translations"
import { LanguageSwitcher } from "./language-switcher"
import { ThemeToggle } from "./theme-toggle"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { fetchProfile } from "@/lib/api"
import type { Profile } from "@/lib/api"

export function MainNav() {
  const pathname = usePathname()
  const { language } = useLanguage()
  const t = translations[language]
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProfile() {
      try {
        const profileData = await fetchProfile()
        setProfile(profileData)
      } catch (error) {
        console.error("Error loading profile:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [])

  return (
    <div className="flex w-full items-center justify-between">
      <Link href="/" className="flex items-center space-x-2">
        <span className="text-xl font-bold">{loading ? "Loading..." : profile?.name || "Portfolio"}</span>
      </Link>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex">
          <nav className="flex items-center gap-6">
            <Link
              href="/about"
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground/80",
                pathname === "/about" ? "text-foreground" : "text-foreground/60",
              )}
            >
              {t.nav.about}
            </Link>
            <Link
              href="/projects"
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground/80",
                pathname === "/projects" ? "text-foreground" : "text-foreground/60",
              )}
            >
              {t.nav.projects}
            </Link>
            <Link
              href="/blog"
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground/80",
                pathname === "/blog" ? "text-foreground" : "text-foreground/60",
              )}
            >
              {t.nav.blog}
            </Link>
            <Link
              href="/contact"
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground/80",
                pathname === "/contact" ? "text-foreground" : "text-foreground/60",
              )}
            >
              {t.nav.contact}
            </Link>
          </nav>
        </div>

        <ThemeToggle />
        <LanguageSwitcher />

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4">
              <Link
                href="/about"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground/80",
                  pathname === "/about" ? "text-foreground" : "text-foreground/60",
                )}
              >
                {t.nav.about}
              </Link>
              <Link
                href="/projects"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground/80",
                  pathname === "/projects" ? "text-foreground" : "text-foreground/60",
                )}
              >
                {t.nav.projects}
              </Link>
              <Link
                href="/blog"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground/80",
                  pathname === "/blog" ? "text-foreground" : "text-foreground/60",
                )}
              >
                {t.nav.blog}
              </Link>
              <Link
                href="/contact"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground/80",
                  pathname === "/contact" ? "text-foreground" : "text-foreground/60",
                )}
              >
                {t.nav.contact}
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

