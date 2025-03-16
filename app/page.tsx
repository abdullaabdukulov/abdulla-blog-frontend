"use client"

import { useEffect, useState } from "react"
import { LoadingSpinner } from "@/components/loading"
import { ErrorMessage } from "@/components/error"
import { Hero } from "@/components/sections/hero"
import { Skills } from "@/components/sections/skills"
import { Projects } from "@/components/sections/projects"
import { BlogSection } from "@/components/sections/blog"
import { ContactSection } from "@/components/sections/contact"
import { fetchProfile, fetchSkills, fetchProjects, fetchBlogPosts } from "@/lib/api"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const [profile, skills, projects, posts] = await Promise.all([
          fetchProfile(),
          fetchSkills(),
          fetchProjects(),
          fetchBlogPosts(),
        ])

        setData({ profile, skills, projects: projects.results, posts: posts.results })
      } catch (error) {
        console.error("Error loading data:", error)
        setError("Failed to load data")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <>
      <Hero profile={data.profile} />
      <Skills skills={data.skills} />
      <Projects projects={data.projects} />
      <BlogSection posts={data.posts} />
      <ContactSection />
    </>
  )
}

