"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LoadingSpinner } from "@/components/loading"
import { ErrorMessage } from "@/components/error"
import { ProjectCard } from "@/components/project-card"
import { fetchProjects } from "@/lib/api"
import type { Project } from "@/lib/api"
import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/lib/translations"

export default function ProjectsPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const { language } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true)
        const data = await fetchProjects()
        setProjects(data.results)
      } catch (error) {
        console.error("Error loading projects:", error)
        setError("Failed to load projects")
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className="container py-12 md:py-20">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">{t.nav.projects}</h1>
        <p className="mt-4 text-muted-foreground md:text-xl">A showcase of my recent work and projects</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

