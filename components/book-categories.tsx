import Link from "next/link"
import { BookOpen, Heart, Rocket, Briefcase, Lightbulb, History, Utensils, Globe } from "lucide-react"

const categories = [
  { name: "Fiction", icon: BookOpen, color: "bg-blue-100 text-blue-700" },
  { name: "Romance", icon: Heart, color: "bg-pink-100 text-pink-700" },
  { name: "Science Fiction", icon: Rocket, color: "bg-purple-100 text-purple-700" },
  { name: "Business", icon: Briefcase, color: "bg-amber-100 text-amber-700" },
  { name: "Self-Help", icon: Lightbulb, color: "bg-yellow-100 text-yellow-700" },
  { name: "History", icon: History, color: "bg-green-100 text-green-700" },
  { name: "Cooking", icon: Utensils, color: "bg-red-100 text-red-700" },
  { name: "Travel", icon: Globe, color: "bg-teal-100 text-teal-700" },
]

export default function BookCategories() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {categories.map((category) => {
        const Icon = category.icon
        return (
          <Link
            key={category.name}
            href={`/books?category=${encodeURIComponent(category.name)}`}
            className="flex flex-col items-center p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className={`p-3 rounded-full ${category.color} mb-3`}>
              <Icon className="h-6 w-6" />
            </div>
            <span className="font-medium">{category.name}</span>
          </Link>
        )
      })}
    </div>
  )
}
