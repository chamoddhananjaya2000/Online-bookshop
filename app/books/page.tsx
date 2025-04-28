import { Suspense } from "react"
import BookSearch from "@/components/book-search"
import BookList from "@/components/book-list"
import LoadingBooks from "@/components/loading-books"
import { getBooks } from "@/lib/books"

export default async function BooksPage({
  searchParams,
}: {
  searchParams: { query?: string; category?: string; sort?: string; page?: string }
}) {
  const query = searchParams.query || ""
  const category = searchParams.category || ""
  const sort = searchParams.sort || "relevance"
  const page = Number.parseInt(searchParams.page || "1")

  const books = await getBooks({ query, category, sort, page })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Book Collection</h1>
      <BookSearch initialQuery={query} initialCategory={category} initialSort={sort} />
      <Suspense fallback={<LoadingBooks />}>
        <BookList books={books} currentPage={page} />
      </Suspense>
    </div>
  )
}
