import { getBooks } from "@/lib/books"
import CategoryBooks from "@/components/category-books"

interface CategoryBooksServerProps {
  category: string
  limit?: number
}

export default async function CategoryBooksServer({ category, limit = 4 }: CategoryBooksServerProps) {
  const books = await getBooks({ category, limit })

  return <CategoryBooks category={category} limit={limit} books={books} />
}
