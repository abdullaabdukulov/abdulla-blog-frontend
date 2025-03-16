"use client"

import { Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/contexts/language-context"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Languages className="h-4 w-4" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("uz")}>🇺🇿 O'zbekcha {language === "uz" && "✓"}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("ru")}>🇷🇺 Русский {language === "ru" && "✓"}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("en")}>🇬🇧 English {language === "en" && "✓"}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

