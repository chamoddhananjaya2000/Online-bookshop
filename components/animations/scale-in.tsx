"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface ScaleInProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
  once?: boolean
}

export default function ScaleIn({ children, delay = 0, duration = 0.5, className = "", once = true }: ScaleInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
