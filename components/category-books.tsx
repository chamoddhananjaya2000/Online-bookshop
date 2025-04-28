import { getBooks } from "@/lib/books"
import BookCard from "@/components/book-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CategoryBooksProps {
  category: string
  limit?: number
}

export default async function CategoryBooks({ category, limit = 4 }: CategoryBooksProps) {
  const books = await getBooks({ category, limit })

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        {books.items.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      <div className="flex justify-center">
        <Button asChild>
          <Link href={`/books?category=${encodeURIComponent(category)}`}>View All {category} Books</Link>
        </Button>
      </div>
    </div>
  )
}
