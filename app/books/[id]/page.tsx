import { Suspense } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import { getBookById } from "@/lib/books"
import AddToCartButton from "@/components/add-to-cart-button"
import BookDetails from "@/components/book-details"
import LoadingBookDetails from "@/components/loading-book-details"

export default async function BookPage({ params }: { params: { id: string } }) {
  const book = await getBookById(params.id)

  if (!book) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center">
          <Image
            src={book.coverImage || "/placeholder.svg?height=500&width=350"}
            alt={book.title}
            width={350}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-xl mb-2">by {book.authors.join(", ")}</p>
          <div className="flex items-center mb-4">
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {book.categories[0]}
            </div>
          </div>
          <p className="text-2xl font-bold mb-4">${book.price.toFixed(2)}</p>
          <AddToCartButton book={book} />

          <Suspense fallback={<LoadingBookDetails />}>
            <BookDetails book={book} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
