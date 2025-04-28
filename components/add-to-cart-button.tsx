"use client"

import { useState } from "react"
import { useCart } from "@/context/cart-context"
import type { Book } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function AddToCartButton({ book }: { book: Book }) {
  const [isAdding, setIsAdding] = useState(false)
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    setIsAdding(true)

    // Simulate a small delay for better UX
    setTimeout(() => {
      addToCart(book)

      toast({
        title: "Added to cart",
        description: `${book.title} has been added to your cart.`,
      })

      setIsAdding(false)
    }, 500)
  }

  return (
    <Button onClick={handleAddToCart} disabled={isAdding} className="w-full">
      {isAdding ? <Check className="mr-2 h-4 w-4" /> : <ShoppingCart className="mr-2 h-4 w-4" />}
      {isAdding ? "Added" : "Add to Cart"}
    </Button>
  )
}
