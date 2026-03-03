"use client"

import { useEffect, useRef } from "react"

export default function AnimationObserver() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("appear")
            // Once the animation has played, we can stop observing the element
            observerRef.current?.unobserve(entry.target)
          }
        })
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1, // Trigger when 10% of the element is visible
      },
    )

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll(
      ".fade-in-up, .fade-in, .scale-in, .slide-in-left, .slide-in-right",
    )

    animatedElements.forEach((element) => {
      observerRef.current?.observe(element)
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return null
}

