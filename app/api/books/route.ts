import { NextResponse } from "next/server"
import { getGoogleBooks } from "@/lib/google-books"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("query") || ""
    const category = searchParams.get("category") || ""
    const sort = searchParams.get("sort") || "relevance"
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")

    const books = await getGoogleBooks({
      query,
      category,
      sort,
      page,
      limit,
    })

    return NextResponse.json(books)
  } catch (error) {
    console.error("Error fetching books:", error)
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 })
  }
}
