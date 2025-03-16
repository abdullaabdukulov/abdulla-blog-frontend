"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LoadingSpinner } from "@/components/loading"
import { ErrorMessage } from "@/components/error"
import { BlogCard } from "@/components/blog-card"
import { fetchBlogPosts, fetchTags } from "@/lib/api"
import type { BlogPost, Tag } from "@/lib/api"
import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/lib/translations"
import { Badge } from "@/components/ui/badge"

export default function BlogPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const { language } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const [postsData, tagsData] = await Promise.all([fetchBlogPosts(), fetchTags()])
        setPosts(postsData.results)
        setTags(tagsData.results)
      } catch (error) {
        console.error("Error loading blog data:", error)
        setError("Failed to load blog posts")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const filteredPosts = selectedTag ? posts.filter((post) => post.tags.some((tag) => tag.slug === selectedTag)) : posts

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className="container py-12 md:py-20">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">{t.nav.blog}</h1>
        <p className="mt-4 text-muted-foreground md:text-xl">Thoughts, tutorials and insights</p>
      </div>

      {tags.length > 0 && (
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <Badge
            variant={selectedTag === null ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedTag(null)}
          >
            All
          </Badge>
          {tags.map((tag) => (
            <Badge
              key={tag.id}
              variant={selectedTag === tag.slug ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedTag(tag.slug)}
            >
              {tag.name}
            </Badge>
          ))}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <BlogCard post={post} />
          </motion.div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No posts found for this tag.</p>
        </div>
      )}
    </div>
  )
}

