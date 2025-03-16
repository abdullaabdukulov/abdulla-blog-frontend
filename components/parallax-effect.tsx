"use client"

import { useEffect, useState, type ReactNode } from "react"
import { useMotionValue, useSpring } from "framer-motion"

interface ParallaxEffectProps {
  children: ReactNode
}

export function ParallaxEffect({ children }: ParallaxEffectProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const springConfig = { damping: 25, stiffness: 100 }

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to the center of the screen
      const x = (e.clientX - window.innerWidth / 2) / 20
      const y = (e.clientY - window.innerHeight / 2) / 20

      setMousePosition({ x, y })
      mouseX.set(x)
      mouseY.set(y)

      // Add parallax effect to elements with data-parallax attribute
      const parallaxElements = document.querySelectorAll("[data-parallax]")

      parallaxElements.forEach((element) => {
        const depth = Number.parseFloat(element.getAttribute("data-parallax") || "0.1")
        const moveX = x * depth
        const moveY = y * depth

        // @ts-ignore
        element.style.transform = `translate(${moveX}px, ${moveY}px)`
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [mouseX, mouseY])

  return <div className="parallax-container">{children}</div>
}

