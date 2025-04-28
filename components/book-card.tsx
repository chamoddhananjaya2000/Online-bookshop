import Link from "next/link"
import Image from "next/image"
import type { Book } from "@/lib/types"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import AddToCartButton from "@/components/add-to-cart-button"

export default function BookCard({ book }: { book: Book }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col h-full">
      <div className="relative aspect-[2/3] w-full">
        <Image
          src={book.coverImage || "/placeholder.svg?height=300&width=200"}
          alt={book.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{book.title}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-2 line-clamp-1">{book.authors.join(", ")}</p>
        <p className="font-bold text-lg mb-4">{formatPrice(book.price)}</p>
        <div className="mt-auto flex flex-col gap-2">
          <AddToCartButton book={book} />
          <Button asChild variant="outline" size="sm">
            <Link href={`/books/${book.id}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
