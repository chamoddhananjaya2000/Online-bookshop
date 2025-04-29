"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"

const backgroundImages = [
  "/bg3.jpg",
  "/bg4.jpg",
  "/bg1.jpg",
  "/bg2.jpg",
]

export default function Hero() {
  return (
    <div className="relative overflow-hidden rounded-lg text-white">
      
      {/* Animated Background Images */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((src, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: index }}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: [0, 1, 0], scale: [1, 1.1, 1] }}
            transition={{
              duration: 20,
              delay: index * 10,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            <Image
              src={src}
              alt={`Background ${index + 1}`}
              fill
              className="object-cover opacity-100 blur-0m"
              priority
            />
          </motion.div>
        ))}
      </div>

      {/* Hero Content with translucent background behind text */}
      <div className="relative z-10 px-6 py-16 md:py-24 md:px-12 flex flex-col items-center text-center">
        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 md:p-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Discover Your Next Favorite Book
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8">
            Explore our vast collection of books across all genres. From bestsellers to rare finds, we have something for every reader.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
              <Link href="/books">Browse Collection</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/categories">Explore Categories</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
