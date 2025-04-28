import type { Book } from "@/lib/types"
import { getGoogleBooks, getGoogleBookById } from "@/lib/google-books"

interface GetBooksParams {
  query?: string
  category?: string
  sort?: string
  page?: number
  limit?: number
}

export async function getBooks(params: GetBooksParams = {}) {
  try {
    const { query = "", category = "", sort = "relevance", page = 1, limit = 12 } = params

    // Fetch books from Google Books API
    const books = await getGoogleBooks({
      query,
      category,
      sort,
      page,
      limit,
    })

    return books
  } catch (error) {
    console.error("Error fetching books:", error)
    // Return empty results on error
    return {
      items: [],
      totalItems: 0,
      itemsPerPage: 12,
    }
  }
}

export async function getBookById(id: string): Promise<Book | null> {
  try {
    const book = await getGoogleBookById(id)
    return book
  } catch (error) {
    console.error(`Error fetching book with ID ${id}:`, error)
    return null
  }
}
