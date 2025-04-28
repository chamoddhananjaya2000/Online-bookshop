import { getBooks } from "@/lib/books"
import BookCard from "@/components/book-card"

export default async function FeaturedBooks() {
  const books = await getBooks({ limit: 8 })

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.items.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}
