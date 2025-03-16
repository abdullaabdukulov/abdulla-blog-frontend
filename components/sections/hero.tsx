"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/animations/fade-in"
import { SlideIn } from "@/components/animations/slide-in"
import type { Profile } from "@/lib/api"
import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/lib/translations"

interface HeroProps {
  profile: Profile
}

export function Hero({ profile }: HeroProps) {
  const [mounted, setMounted] = useState(false)
  const { language } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center">
      {/* Background Animation */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background" />
        <motion.div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="relative"
          >
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-primary/30 shadow-xl shadow-primary/20 relative">
              <Image
                src={profile?.avatar || "/placeholder.svg?height=256&width=256"}
                alt={profile?.name || "Profile"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 192px, 256px"
                priority
              />
            </div>
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(139, 92, 246, 0)",
                  "0 0 0 10px rgba(139, 92, 246, 0)",
                  "0 0 0 20px rgba(139, 92, 246, 0)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            />
          </motion.div>

          <div className="space-y-4">
            <SlideIn delay={0.4}>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                {profile?.title || t.home.title}
              </h1>
            </SlideIn>
            <FadeIn delay={0.6}>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl lg:text-2xl">
                {profile?.description || t.home.description}
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.8} className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/contact">
                <Mail className="mr-2 h-5 w-5" />
                {t.home.contactMe}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            {profile?.github && (
              <Button variant="outline" size="lg" asChild>
                <Link href={profile.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5" />
                  GitHub
                </Link>
              </Button>
            )}
            {profile?.linkedin && (
              <Button variant="outline" size="lg" asChild>
                <Link href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-5 w-5" />
                  LinkedIn
                </Link>
              </Button>
            )}
          </FadeIn>
        </div>
      </div>
    </div>
  )
}

