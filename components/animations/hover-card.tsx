"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface HoverCardProps {
  children: ReactNode
  className?: string
}

export default function HoverCard({ children, className = "" }: HoverCardProps) {
  return (
    <motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.3 }} className={className}>
      {children}
    </motion.div>
  )
}
