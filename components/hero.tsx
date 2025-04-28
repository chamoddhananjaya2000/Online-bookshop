import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
      <div className="relative px-6 py-16 md:py-24 md:px-12 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Discover Your Next Favorite Book</h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8">
          Explore our vast collection of books across all genres. From bestsellers to rare finds, we have something for
          every reader.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
            <Link href="/books">Browse Collection</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            <Link href="/categories">Explore Categories</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
