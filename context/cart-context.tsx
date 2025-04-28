"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Book } from "@/lib/types"

interface CartItem extends Book {
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (book: Book) => void
  removeFromCart: (bookId: string) => void
  updateQuantity: (bookId: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    // Load cart from localStorage on initial render
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart))
      } catch (error) {
        console.error("Error parsing stored cart:", error)
        localStorage.removeItem("cart")
      }
    }
  }, [])

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (book: Book) => {
    setCart((prevCart) => {
      // Check if the book is already in the cart
      const existingItemIndex = prevCart.findIndex((item) => item.id === book.id)

      if (existingItemIndex >= 0) {
        // If the book is already in the cart, increase its quantity
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1,
        }
        return updatedCart
      } else {
        // If the book is not in the cart, add it with quantity 1
        return [...prevCart, { ...book, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (bookId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== bookId))
  }

  const updateQuantity = (bookId: string, quantity: number) => {
    setCart((prevCart) => prevCart.map((item) => (item.id === bookId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
