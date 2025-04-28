import type { Book } from "@/lib/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BookDetails({ book }: { book: Book }) {
  return (
    <div className="mt-8">
      <Tabs defaultValue="description">
        <TabsList className="w-full">
          <TabsTrigger value="description" className="flex-1">
            Description
          </TabsTrigger>
          <TabsTrigger value="details" className="flex-1">
            Details
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex-1">
            Reviews
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-4">
          <div className="prose dark:prose-invert max-w-none">
            <p>{book.description || "No description available."}</p>
          </div>
        </TabsContent>

        <TabsContent value="details" className="mt-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Book Details</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Title:</span>
                    <span>{book.title}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Author:</span>
                    <span>{book.authors.join(", ")}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Publisher:</span>
                    <span>{book.publisher || "Unknown"}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Publication Date:</span>
                    <span>{book.publishedDate || "Unknown"}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Language:</span>
                    <span>{book.language || "English"}</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Additional Information</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">ISBN:</span>
                    <span>{book.isbn || "N/A"}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Pages:</span>
                    <span>{book.pageCount || "Unknown"}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Categories:</span>
                    <span>{book.categories.join(", ") || "Uncategorized"}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Format:</span>
                    <span>{book.printType || "Paperback"}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Maturity Rating:</span>
                    <span>{book.maturityRating || "Not rated"}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-4">
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No reviews yet. Be the first to review this book!</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
