"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/lib/translations"

interface SkillsProps {
  skills: Record<string, Array<{ id: number; name: string; icon?: string }>>
}

export function Skills({ skills }: SkillsProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { language } = useLanguage()
  const t = translations[language]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section className="py-20" ref={ref} data-animate>
      <div className="container px-4 md:px-6">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-12"
        >
          <div className="text-center" data-animate="fade" data-animate-delay="1">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t.home.skills}</h2>
            <p className="mt-4 text-muted-foreground md:text-xl">Technologies and tools I work with</p>
          </div>

          <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(skills).map(([category, categorySkills], index) => (
              <motion.div
                key={category}
                variants={itemVariants}
                data-parallax={`0.${index + 1}`}
                className="hover-effect"
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.3 },
                }}
              >
                <Card className="h-full bg-secondary/50 backdrop-blur supports-[backdrop-filter]:bg-secondary/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-xl font-bold">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {categorySkills.map((skill) => (
                        <Badge
                          key={skill.id}
                          variant="outline"
                          className="bg-muted/50 hover:bg-muted transition-colors"
                        >
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

