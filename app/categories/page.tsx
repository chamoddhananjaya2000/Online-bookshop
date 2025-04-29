"use client"

import { Suspense } from "react"
import LoadingBooks from "@/components/loading-books"
import CategoryBooksServer from "@/components/category-books-server"
import CategoriesContent from "@/components/categories-content"

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <CategoriesContent />

      <h2 className="text-2xl font-bold mb-6">Featured in Fiction</h2>
      <Suspense fallback={<LoadingBooks />}>
        <CategoryBooksServer category="Fiction" limit={4} />
      </Suspense>

      <h2 className="text-2xl font-bold mt-12 mb-6">Popular in Self-Help</h2>
      <Suspense fallback={<LoadingBooks />}>
        <CategoryBooksServer category="Self-Help" limit={4} />
      </Suspense>
    </div>
  )
}
