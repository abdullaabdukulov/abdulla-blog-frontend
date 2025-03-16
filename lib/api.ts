const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

export type Profile = {
  id: number
  name: string
  title: string
  description: string
  avatar: string
  github: string
  linkedin: string
  email: string
  created_at: string
  updated_at: string
}

export type Category = {
  id: number
  name: string
  slug: string
  description: string
}

export type Tag = {
  id: number
  name: string
  slug: string
}

export type Skill = {
  id: number
  name: string
  category: number
  category_name: string
  description: string
  icon: string
}

export type Project = {
  id: number
  title: string
  slug: string
  description: string
  image: string
  technologies: Skill[]
  demo_url: string
  github_url: string
  created_at: string
  updated_at: string
}

export type BlogPost = {
  id: number
  title: string
  slug: string
  content: string
  image: string
  tags: Tag[]
  created_at: string
  updated_at: string
}

export async function fetchProfile() {
  const res = await fetch(`${API_URL}/profile/`)
  const data = await res.json()
  return data.results[0]
}

export async function fetchCategories() {
  const res = await fetch(`${API_URL}/categories/`)
  return res.json()
}

export async function fetchSkills() {
  const res = await fetch(`${API_URL}/skills/`)
  return res.json()
}

export async function fetchProjects() {
  const res = await fetch(`${API_URL}/projects/`)
  return res.json()
}

export async function fetchProject(slug: string) {
  const res = await fetch(`${API_URL}/projects/${slug}/`)
  return res.json()
}

export async function fetchBlogPosts() {
  const res = await fetch(`${API_URL}/blog/`)
  return res.json()
}

export async function fetchBlogPost(slug: string) {
  const res = await fetch(`${API_URL}/blog/${slug}/`)
  return res.json()
}

export async function fetchTags() {
  const res = await fetch(`${API_URL}/tags/`)
  return res.json()
}

export async function sendContactMessage(data: {
  name: string
  email: string
  message: string
}) {
  const res = await fetch(`${API_URL}/contact/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  return res.json()
}

