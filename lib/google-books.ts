import type { Book } from "@/lib/types"

interface GoogleBooksParams {
  query?: string
  category?: string
  sort?: string
  page?: number
  limit?: number
}

export async function getGoogleBooks(params: GoogleBooksParams = {}) {
  const { query = "", category = "", sort = "relevance", page = 1, limit = 12 } = params

  // Calculate start index for pagination
  const startIndex = (page - 1) * limit

  // Build search query
  let searchQuery = query
  if (category && category !== "All Categories") {
    searchQuery = searchQuery ? `${searchQuery}+subject:${category}` : `subject:${category}`
  }

  // If no search query or category, use a default query to get popular books
  if (!searchQuery) {
    searchQuery = "subject:fiction"
  }

  // Map sort options to Google Books API parameters
  const sortMapping: Record<string, string> = {
    relevance: "relevance",
    newest: "newest",
    // Google Books API doesn't support price sorting, we'll handle it after fetching
  }

  const orderBy = sortMapping[sort] || "relevance"

  try {
    // Fetch books from Google Books API
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&startIndex=${startIndex}&maxResults=${limit}&orderBy=${orderBy}&key=${process.env.GOOGLE_BOOKS_API_KEY || ""}`,
    )

    if (!response.ok) {
      throw new Error(`Google Books API error: ${response.status}`)
    }

    const data = await response.json()

    // Transform Google Books API response to our Book type
    const items: Book[] = (data.items || []).map((item: any) => {
      const volumeInfo = item.volumeInfo || {}
      const saleInfo = item.saleInfo || {}

      // Generate a random price if not available
      const price = saleInfo.retailPrice?.amount || (Math.floor(Math.random() * 30) + 5 + Math.random()).toFixed(2)

      return {
        id: item.id,
        title: volumeInfo.title || "Unknown Title",
        authors: volumeInfo.authors || ["Unknown Author"],
        description: volumeInfo.description || "No description available.",
        categories: volumeInfo.categories || ["Uncategorized"],
        publisher: volumeInfo.publisher,
        publishedDate: volumeInfo.publishedDate,
        language: volumeInfo.language,
        pageCount: volumeInfo.pageCount,
        printType: volumeInfo.printType,
        maturityRating: volumeInfo.maturityRating,
        isbn: volumeInfo.industryIdentifiers?.[0]?.identifier,
        price: Number.parseFloat(price),
        coverImage: volumeInfo.imageLinks?.thumbnail || "/placeholder.svg?height=200&width=150",
      }
    })

    // Handle price sorting if needed
    if (sort === "price_low") {
      items.sort((a, b) => a.price - b.price)
    } else if (sort === "price_high") {
      items.sort((a, b) => b.price - a.price)
    }

    return {
      items,
      totalItems: data.totalItems || items.length,
      itemsPerPage: limit,
    }
  } catch (error) {
    console.error("Error fetching from Google Books API:", error)
    return {
      items: [],
      totalItems: 0,
      itemsPerPage: limit,
    }
  }
}

export async function getGoogleBookById(id: string): Promise<Book | null> {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${id}?key=${process.env.GOOGLE_BOOKS_API_KEY || ""}`,
    )

    if (!response.ok) {
      throw new Error(`Google Books API error: ${response.status}`)
    }

    const item = await response.json()

    if (!item) {
      return null
    }

    const volumeInfo = item.volumeInfo || {}
    const saleInfo = item.saleInfo || {}

    // Generate a random price if not available
    const price = saleInfo.retailPrice?.amount || (Math.floor(Math.random() * 30) + 5 + Math.random()).toFixed(2)

    return {
      id: item.id,
      title: volumeInfo.title || "Unknown Title",
      authors: volumeInfo.authors || ["Unknown Author"],
      description: volumeInfo.description || "No description available.",
      categories: volumeInfo.categories || ["Uncategorized"],
      publisher: volumeInfo.publisher,
      publishedDate: volumeInfo.publishedDate,
      language: volumeInfo.language,
      pageCount: volumeInfo.pageCount,
      printType: volumeInfo.printType,
      maturityRating: volumeInfo.maturityRating,
      isbn: volumeInfo.industryIdentifiers?.[0]?.identifier,
      price: Number.parseFloat(price),
      coverImage: volumeInfo.imageLinks?.thumbnail || "/placeholder.svg?height=200&width=150",
    }
  } catch (error) {
    console.error(`Error fetching book with ID ${id}:`, error)
    return null
  }
}
