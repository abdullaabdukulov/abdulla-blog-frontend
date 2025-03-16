"use client"

import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/lib/translations"

export function Footer() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between md:py-12">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {t.footer.rights}
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              {t.footer.terms}
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              {t.footer.privacy}
            </Link>
          </div>
        </div>
        <div className="flex gap-4">
          <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Github className="h-5 w-5 text-muted-foreground hover:text-foreground" />
          </Link>
          <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground" />
          </Link>
          <Link href="mailto:example@mail.com">
            <Mail className="h-5 w-5 text-muted-foreground hover:text-foreground" />
          </Link>
        </div>
      </div>
    </footer>
  )
}

