"use client"
import BookCard from "@/components/book-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import StaggerContainer from "@/components/animations/stagger-container"
import StaggerItem from "@/components/animations/stagger-item"

interface CategoryBooksProps {
  category: string
  limit?: number
  books: any // Pre-fetched books from server component
}

export default function CategoryBooks({ category, limit = 4, books }: CategoryBooksProps) {
  return (
    <div>
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        {books.items.map((book: any) => (
          <StaggerItem key={book.id}>
            <BookCard book={book} />
          </StaggerItem>
        ))}
      </StaggerContainer>

      <div className="flex justify-center">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button asChild>
            <Link href={`/books?category=${encodeURIComponent(category)}`}>View All {category} Books</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
