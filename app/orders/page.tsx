"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import OrderList from "@/components/order-list"
import { getUserOrders } from "@/lib/orders"
import type { Order } from "@/lib/types"

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login?redirect=/orders")
      return
    }

    const fetchOrders = async () => {
      try {
        setIsLoading(true)
        const userOrders = await getUserOrders(user.id)
        setOrders(userOrders)
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [user, router])

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {isLoading ? (
        <div className="py-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">Loading your orders...</p>
        </div>
      ) : orders.length > 0 ? (
        <OrderList orders={orders} />
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">You haven&apos;t placed any orders yet</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Browse our collection and find your next favorite book!
          </p>
          <Button onClick={() => router.push("/books")}>Browse Books</Button>
        </div>
      )}
    </div>
  )
}
