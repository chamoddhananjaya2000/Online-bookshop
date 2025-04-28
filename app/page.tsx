import { Suspense } from "react"
import Hero from "@/components/hero"
import FeaturedBooks from "@/components/featured-books"
import BookCategories from "@/components/book-categories"
import LoadingBooks from "@/components/loading-books"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Hero />
      <h2 className="text-3xl font-bold mt-12 mb-6">Featured Books</h2>
      <Suspense fallback={<LoadingBooks />}>
        <FeaturedBooks />
      </Suspense>
      <h2 className="text-3xl font-bold mt-12 mb-6">Browse Categories</h2>
      <BookCategories />
    </div>
  )
}
