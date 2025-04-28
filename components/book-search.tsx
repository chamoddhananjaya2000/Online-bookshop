"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

const categories = [
  "All Categories",
  "Fiction",
  "Romance",
  "Science Fiction",
  "Business",
  "Self-Help",
  "History",
  "Cooking",
  "Travel",
]

const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "newest", label: "Newest" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
]

interface BookSearchProps {
  initialQuery?: string
  initialCategory?: string
  initialSort?: string
}

export default function BookSearch({
  initialQuery = "",
  initialCategory = "",
  initialSort = "relevance",
}: BookSearchProps) {
  const [query, setQuery] = useState(initialQuery)
  const [category, setCategory] = useState(initialCategory || "All Categories")
  const [sort, setSort] = useState(initialSort)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    setQuery(initialQuery)
    setCategory(initialCategory || "All Categories")
    setSort(initialSort)
  }, [initialQuery, initialCategory, initialSort])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams(searchParams)

    if (query) {
      params.set("query", query)
    } else {
      params.delete("query")
    }

    if (category && category !== "All Categories") {
      params.set("category", category)
    } else {
      params.delete("category")
    }

    if (sort && sort !== "relevance") {
      params.set("sort", sort)
    } else {
      params.delete("sort")
    }

    // Reset to page 1 when search criteria changes
    params.delete("page")

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search books..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4">
          <Button type="submit" className="w-full md:w-auto">
            Search
          </Button>
        </div>
      </div>
    </form>
  )
}
