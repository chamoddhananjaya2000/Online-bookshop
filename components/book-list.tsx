import type { Book } from "@/lib/types"
import BookCard from "@/components/book-card"
import Pagination from "@/components/pagination"

interface BookListProps {
  books: {
    items: Book[]
    totalItems: number
    itemsPerPage: number
  }
  currentPage: number
}

export default function BookList({ books, currentPage }: BookListProps) {
  const { items, totalItems, itemsPerPage } = books
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">No books found</h3>
        <p className="text-gray-500 dark:text-gray-400">
          Try adjusting your search or filter to find what you&apos;re looking for.
        </p>
      </div>
    )
  }

  return (
    <div>
      <p className="mb-4 text-gray-500 dark:text-gray-400">
        Showing {items.length} of {totalItems} results
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {items.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} />}
    </div>
  )
}
