"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

export function CustomCursor() {
  const cursorOuterRef = useRef<HTMLDivElement>(null)
  const cursorInnerRef = useRef<HTMLDivElement>(null)
  const [cursorVariant, setCursorVariant] = useState("default")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // More efficient mouse tracking
    const mouseMove = (e: MouseEvent) => {
      // Direct DOM manipulation for better performance
      if (cursorOuterRef.current && cursorInnerRef.current) {
        // Outer cursor follows with slight delay
        cursorOuterRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`

        // Inner cursor follows immediately
        cursorInnerRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`
      }
    }

    const handleMouseDown = () => setCursorVariant("click")
    const handleMouseUp = () => setCursorVariant("default")

    // Add event listeners once
    window.addEventListener("mousemove", mouseMove, { passive: true })
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    // Handle link hover states
    const handleLinkEnter = () => setCursorVariant("hover")
    const handleLinkLeave = () => setCursorVariant("default")

    // Specifically target links and buttons
    const links = document.querySelectorAll("a, button, .hover-effect")
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleLinkEnter)
      link.addEventListener("mouseleave", handleLinkLeave)
    })

    return () => {
      window.removeEventListener("mousemove", mouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)

      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleLinkEnter)
        link.removeEventListener("mouseleave", handleLinkLeave)
      })
    }
  }, [cursorVariant])

  // Only show custom cursor on desktop and after client-side mount
  if (!isMounted || (typeof window !== "undefined" && window.innerWidth < 768)) {
    return null
  }

  return (
    <>
      <style jsx global>{`
        body {
          cursor: none !important;
        }
        a, button, .hover-effect {
          cursor: none !important;
        }
        /* Fix for URL hover issues */
        a:hover, button:hover, .hover-effect:hover {
          cursor: none !important;
        }
      `}</style>

      {/* Outer cursor - follows with slight delay */}
      <motion.div
        ref={cursorOuterRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference"
        initial="default"
        animate={cursorVariant}
        variants={{
          default: {
            height: 40,
            width: 40,
            backgroundColor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.8)",
            transition: {
              type: "spring",
              mass: 0.5,
              damping: 20,
              stiffness: 300,
            },
          },
          hover: {
            height: 64,
            width: 64,
            backgroundColor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.4)",
            transition: {
              type: "spring",
              mass: 0.5,
              damping: 20,
              stiffness: 300,
            },
          },
          click: {
            height: 36,
            width: 36,
            backgroundColor: "transparent",
            border: "1px solid rgba(255, 255, 255, 1)",
            transition: {
              type: "spring",
              mass: 0.5,
              damping: 20,
              stiffness: 300,
            },
          },
        }}
      />

      {/* Inner cursor - follows immediately */}
      <motion.div
        ref={cursorInnerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference"
        initial="default"
        animate={cursorVariant}
        variants={{
          default: {
            height: 8,
            width: 8,
            backgroundColor: "rgba(255, 255, 255, 1)",
            transition: {
              type: "spring",
              mass: 0.3,
              damping: 20,
              stiffness: 400,
            },
          },
          hover: {
            height: 12,
            width: 12,
            backgroundColor: "rgba(255, 255, 255, 1)",
            transition: {
              type: "spring",
              mass: 0.3,
              damping: 20,
              stiffness: 400,
            },
          },
          click: {
            height: 6,
            width: 6,
            backgroundColor: "rgba(255, 255, 255, 1)",
            transition: {
              type: "spring",
              mass: 0.3,
              damping: 20,
              stiffness: 400,
            },
          },
        }}
      />

      {/* Cursor trail effect */}
      <style jsx global>{`
        @keyframes cursorTrailFade {
          0% { opacity: 0.7; transform: scale(0.4); }
          100% { opacity: 0; transform: scale(0.2); }
        }
        
        .cursor-trail {
          position: fixed;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.5);
          mix-blend-mode: difference;
          pointer-events: none;
          z-index: 9998;
          animation: cursorTrailFade 0.8s forwards;
        }
      `}</style>

      {/* Script for cursor trail effect */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
          document.addEventListener('mousemove', function(e) {
            if (window.innerWidth >= 768) {
              const trail = document.createElement('div');
              trail.className = 'cursor-trail';
              trail.style.left = e.clientX + 'px';
              trail.style.top = e.clientY + 'px';
              document.body.appendChild(trail);
              
              setTimeout(() => {
                document.body.removeChild(trail);
              }, 800);
            }
          });
        `,
        }}
      />
    </>
  )
}

