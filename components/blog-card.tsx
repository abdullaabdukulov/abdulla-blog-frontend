import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { BlogPost } from "@/lib/api"

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      {post.image && (
        <div className="relative h-48 w-full">
          <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
        </div>
      )}
      <CardContent className="flex-1 p-6">
        <div className="flex gap-2 mb-2 flex-wrap">
          {post.tags.map((tag) => (
            <Badge key={tag.id} variant="secondary">
              {tag.name}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">{format(new Date(post.created_at), "MMMM d, yyyy")}</p>
        <h3 className="mt-2 text-xl font-bold">{post.title}</h3>
        <p className="mt-2 text-muted-foreground line-clamp-3">{post.content.replace(/<[^>]*>?/gm, "")}</p>
        <Button className="mt-4" variant="link" asChild>
          <Link href={`/blog/${post.slug}`}>Read More</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

