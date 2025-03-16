"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/loading"
import { ErrorMessage } from "@/components/error"
import { fetchProfile } from "@/lib/api"
import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/lib/translations"

export default function AboutPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [profile, setProfile] = useState<any>(null)
  const { language } = useLanguage()
  const t = translations[language]

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const profileData = await fetchProfile()
        setProfile(profileData)
      } catch (error) {
        console.error("Error loading profile:", error)
        setError("Failed to load profile data")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className="container py-12 md:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">{t.nav.about}</h1>
          <p className="mt-4 text-muted-foreground md:text-xl">Learn more about my background and experience</p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 items-center mb-16">
          <div>
            <Image
              src={profile?.avatar || "/placeholder.svg"}
              alt={profile?.name}
              width={400}
              height={400}
              className="rounded-lg object-cover mx-auto"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">{profile?.name}</h2>
            <h3 className="text-xl text-muted-foreground mb-6">{profile?.title}</h3>
            <p className="text-muted-foreground">{profile?.description}</p>
          </div>
        </div>

        <div ref={ref} className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border-l-2 border-primary pl-4">
                    <h3 className="font-semibold text-lg">Senior Software Engineer</h3>
                    <p className="text-sm text-muted-foreground">2021 - Present</p>
                    <p className="mt-2">
                      Led development of microservices architecture and implemented CI/CD pipelines for automated
                      deployments.
                    </p>
                  </div>

                  <div className="border-l-2 border-primary pl-4">
                    <h3 className="font-semibold text-lg">Data Scientist</h3>
                    <p className="text-sm text-muted-foreground">2019 - 2021</p>
                    <p className="mt-2">
                      Developed machine learning models for predictive analytics and implemented data processing
                      pipelines.
                    </p>
                  </div>

                  <div className="border-l-2 border-primary pl-4">
                    <h3 className="font-semibold text-lg">Backend Developer</h3>
                    <p className="text-sm text-muted-foreground">2017 - 2019</p>
                    <p className="mt-2">Built RESTful APIs and database solutions for web applications.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border-l-2 border-primary pl-4">
                    <h3 className="font-semibold text-lg">Master's in Computer Science</h3>
                    <p className="text-sm text-muted-foreground">2015 - 2017</p>
                    <p className="mt-2">Specialized in Machine Learning and Artificial Intelligence.</p>
                  </div>

                  <div className="border-l-2 border-primary pl-4">
                    <h3 className="font-semibold text-lg">Bachelor's in Computer Engineering</h3>
                    <p className="text-sm text-muted-foreground">2011 - 2015</p>
                    <p className="mt-2">Focused on software development and algorithms.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-2 border-primary pl-4">
                    <h3 className="font-semibold text-lg">AWS Certified Solutions Architect</h3>
                    <p className="text-sm text-muted-foreground">2022</p>
                  </div>

                  <div className="border-l-2 border-primary pl-4">
                    <h3 className="font-semibold text-lg">Google Professional Data Engineer</h3>
                    <p className="text-sm text-muted-foreground">2021</p>
                  </div>

                  <div className="border-l-2 border-primary pl-4">
                    <h3 className="font-semibold text-lg">Deep Learning Specialization</h3>
                    <p className="text-sm text-muted-foreground">2020</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

