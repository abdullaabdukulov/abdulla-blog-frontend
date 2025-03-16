"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ExternalLink, Github, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/loading"
import { ErrorMessage } from "@/components/error"
import { fetchProject } from "@/lib/api"
import type { Project } from "@/lib/api"

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    async function loadProject() {
      try {
        setLoading(true)
        const data = await fetchProject(params.slug)
        setProject(data)
      } catch (error) {
        console.error("Error loading project:", error)
        setError("Failed to load project")
      } finally {
        setLoading(false)
      }
    }

    loadProject()
  }, [params.slug])

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />
  if (!project) return <ErrorMessage message="Project not found" />

  return (
    <div className="container py-12 md:py-20">
      <Button variant="ghost" className="mb-8" asChild>
        <Link href="/projects">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>
      </Button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
            <p className="text-muted-foreground mb-6">{project.description}</p>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech.id} variant="secondary">
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              {project.demo_url && (
                <Button asChild>
                  <Link href={project.demo_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Demo
                  </Link>
                </Button>
              )}
              {project.github_url && (
                <Button variant="outline" asChild>
                  <Link href={project.github_url} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </Link>
                </Button>
              )}
            </div>
          </div>

          <div>
            {project.image && (
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={800}
                height={400}
                className="rounded-lg object-cover"
              />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

