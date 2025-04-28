import { NextResponse } from "next/server"
import { getGoogleBookById } from "@/lib/google-books"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const bookId = params.id

    if (!bookId) {
      return NextResponse.json({ error: "Book ID is required" }, { status: 400 })
    }

    const book = await getGoogleBookById(bookId)

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 })
    }

    return NextResponse.json(book)
  } catch (error) {
    console.error("Error fetching book:", error)
    return NextResponse.json({ error: "Failed to fetch book" }, { status: 500 })
  }
}
