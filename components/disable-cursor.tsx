"use client"

import { useEffect } from "react"

export function DisableCursor() {
  useEffect(() => {
    // Add a class to the body to disable default cursor
    document.body.classList.add("custom-cursor")

    // Create a style element
    const style = document.createElement("style")
    style.innerHTML = `
      .custom-cursor, 
      .custom-cursor * {
        cursor: none !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.body.classList.remove("custom-cursor")
      document.head.removeChild(style)
    }
  }, [])

  return null
}

