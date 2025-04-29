"use client"

import Link from "next/link"
import {
  BookOpen,
  Heart,
  Rocket,
  Briefcase,
  Lightbulb,
  History,
  Utensils,
  Globe,
  Music,
  Film,
  Users,
  Gamepad2,
  Baby,
  Palette,
  Dumbbell,
  Microscope,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import FadeIn from "@/components/animations/fade-in"
import StaggerContainer from "@/components/animations/stagger-container"
import StaggerItem from "@/components/animations/stagger-item"
import HoverCard from "@/components/animations/hover-card"

// Extended categories list
const categories = [
  {
    name: "Fiction",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-700",
    description: "Novels, short stories, and other fictional works",
  },
  {
    name: "Romance",
    icon: Heart,
    color: "bg-pink-100 text-pink-700",
    description: "Love stories and romantic fiction",
  },
  {
    name: "Science Fiction",
    icon: Rocket,
    color: "bg-purple-100 text-purple-700",
    description: "Futuristic and speculative fiction",
  },
  {
    name: "Business",
    icon: Briefcase,
    color: "bg-amber-100 text-amber-700",
    description: "Business management and entrepreneurship",
  },
  {
    name: "Self-Help",
    icon: Lightbulb,
    color: "bg-yellow-100 text-yellow-700",
    description: "Personal development and motivation",
  },
  {
    name: "History",
    icon: History,
    color: "bg-green-100 text-green-700",
    description: "Historical events and figures",
  },
  {
    name: "Cooking",
    icon: Utensils,
    color: "bg-red-100 text-red-700",
    description: "Recipes, cooking techniques, and food culture",
  },
  {
    name: "Travel",
    icon: Globe,
    color: "bg-teal-100 text-teal-700",
    description: "Travel guides and adventure stories",
  },
  {
    name: "Music",
    icon: Music,
    color: "bg-indigo-100 text-indigo-700",
    description: "Music theory, biographies, and history",
  },
  {
    name: "Film & Media",
    icon: Film,
    color: "bg-gray-100 text-gray-700",
    description: "Cinema, television, and media studies",
  },
  { name: "Biography", icon: Users, color: "bg-orange-100 text-orange-700", description: "Life stories and memoirs" },
  {
    name: "Gaming",
    icon: Gamepad2,
    color: "bg-violet-100 text-violet-700",
    description: "Video games, board games, and strategy guides",
  },
  {
    name: "Children's",
    icon: Baby,
    color: "bg-cyan-100 text-cyan-700",
    description: "Books for children and young readers",
  },
  {
    name: "Art & Design",
    icon: Palette,
    color: "bg-fuchsia-100 text-fuchsia-700",
    description: "Art history, techniques, and design",
  },
  {
    name: "Health & Fitness",
    icon: Dumbbell,
    color: "bg-lime-100 text-lime-700",
    description: "Health, fitness, and wellness",
  },
  {
    name: "Science",
    icon: Microscope,
    color: "bg-emerald-100 text-emerald-700",
    description: "Scientific discoveries and concepts",
  },
]

export default function CategoriesContent() {
  return (
    <>
      <FadeIn>
        <h1 className="text-3xl font-bold mb-8 text-center">Book Categories</h1>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <StaggerItem key={category.name}>
              <Link href={`/books?category=${encodeURIComponent(category.name)}`} className="block h-full">
                <HoverCard className="h-full">
                  <Card className="h-full transition-all">
                    <CardContent className="flex flex-col items-center p-6">
                      <div className={`p-4 rounded-full ${category.color} mb-4`}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
                      <p className="text-center text-gray-500 dark:text-gray-400">{category.description}</p>
                    </CardContent>
                  </Card>
                </HoverCard>
              </Link>
            </StaggerItem>
          )
        })}
      </StaggerContainer>
    </>
  )
}
