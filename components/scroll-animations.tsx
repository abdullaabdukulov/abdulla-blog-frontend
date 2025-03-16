"use client"

import { useEffect } from "react"
import { useAnimation, useScroll } from "framer-motion"

export function ScrollAnimations() {
  const { scrollY } = useScroll()
  const controls = useAnimation()

  useEffect(() => {
    const updateScrollAnimation = () => {
      // Add scroll-triggered animations to elements with data-animate attribute
      const animateElements = document.querySelectorAll("[data-animate]")

      animateElements.forEach((element) => {
        const rect = element.getBoundingClientRect()
        const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0

        if (isInView) {
          element.classList.add("animate-in")
        }
      })
    }

    // Initial check
    updateScrollAnimation()

    // Add scroll listener
    const unsubscribe = scrollY.onChange(updateScrollAnimation)

    return () => unsubscribe()
  }, [scrollY])

  return (
    <style jsx global>{`
      [data-animate] {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      }
      
      [data-animate].animate-in {
        opacity: 1;
        transform: translateY(0);
      }
      
      [data-animate="fade"] {
        transform: none;
      }
      
      [data-animate="slide-left"] {
        transform: translateX(50px);
      }
      
      [data-animate="slide-left"].animate-in {
        transform: translateX(0);
      }
      
      [data-animate="slide-right"] {
        transform: translateX(-50px);
      }
      
      [data-animate="slide-right"].animate-in {
        transform: translateX(0);
      }
      
      [data-animate="zoom"] {
        transform: scale(0.9);
      }
      
      [data-animate="zoom"].animate-in {
        transform: scale(1);
      }
      
      [data-animate-delay="1"] {
        transition-delay: 0.1s;
      }
      
      [data-animate-delay="2"] {
        transition-delay: 0.2s;
      }
      
      [data-animate-delay="3"] {
        transition-delay: 0.3s;
      }
      
      [data-animate-delay="4"] {
        transition-delay: 0.4s;
      }
      
      [data-animate-delay="5"] {
        transition-delay: 0.5s;
      }
    `}</style>
  )
}

