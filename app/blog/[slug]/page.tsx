"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { format } from "date-fns"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/loading"
import { ErrorMessage } from "@/components/error"
import { fetchBlogPost } from "@/lib/api"
import type { BlogPost } from "@/lib/api"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [post, setPost] = useState<BlogPost | null>(null)

  useEffect(() => {
    async function loadPost() {
      try {
        setLoading(true)
        const data = await fetchBlogPost(params.slug)
        setPost(data)
      } catch (error) {
        console.error("Error loading post:", error)
        setError("Failed to load blog post")
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [params.slug])

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />
  if (!post) return <ErrorMessage message="Post not found" />

  return (
    <div className="container py-12 md:py-20">
      <Button variant="ghost" className="mb-8" asChild>
        <Link href="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
      </Button>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center justify-center gap-4 text-muted-foreground">
            <time dateTime={post.created_at}>{format(new Date(post.created_at), "MMMM d, yyyy")}</time>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag.id}>{tag.name}</Badge>
            ))}
          </div>
        </div>

        {post.image && (
          <div className="mb-8">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              width={800}
              height={400}
              className="rounded-lg object-cover"
            />
          </div>
        )}

        <div
          className="prose prose-gray max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </motion.article>
    </div>
  )
}

