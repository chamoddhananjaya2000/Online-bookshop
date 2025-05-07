"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice, formatDate } from "@/lib/utils"
import { getOrderById } from "@/lib/orders"
import type { Order } from "@/lib/types"

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login?redirect=/orders")
      return
    }

    const fetchOrder = async () => {
      try {
        setIsLoading(true)
        const orderData = await getOrderById(params.id)
        setOrder(orderData)
      } catch (error) {
        console.error("Error fetching order:", error)
        toast({
          title: "Error",
          description: "Failed to load order details. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrder()
  }, [params.id, user, router, toast])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4">Loading order details...</p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
        <p className="mb-8">
          The order you are looking for does not exist or you don&apos;t have permission to view it.
        </p>
        <Button asChild>
          <Link href="/orders">Back to Orders</Link>
        </Button>
      </div>
    )
  }

  // Parse shipping address from JSON string
  const shippingAddress = JSON.parse(order.shippingAddress)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/orders" className="text-primary hover:underline flex items-center">
          ← Back to Orders
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Order #{order.id}</h1>
          <p className="text-gray-500 dark:text-gray-400">Placed on {formatDate(order.createdAt)}</p>
        </div>
        <Badge className="mt-2 md:mt-0" variant={getOrderStatusVariant(order.status)}>
          {formatOrderStatus(order.status)}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Order Items</h2>
            <div className="divide-y">
              {order.orderItems.map((item) => (
                <div key={item.id} className="py-4 flex items-center">
                  <div className="flex-shrink-0 mr-4">
                    <Image
                      src={item.coverImage || "/placeholder.svg?height=80&width=60"}
                      alt={item.title}
                      width={60}
                      height={80}
                      className="rounded"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatPrice(item.price)} × {item.quantity}
                    </p>
                  </div>
                  <div className="flex-shrink-0 font-medium">{formatPrice(item.price * item.quantity)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Shipping Address</h3>
                <address className="not-italic text-gray-600 dark:text-gray-400">
                  <p>{shippingAddress.fullName}</p>
                  <p>{shippingAddress.address}</p>
                  <p>
                    {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
                  </p>
                </address>
              </div>
              <div>
                <h3 className="font-medium mb-2">Payment Method</h3>
                <p className="text-gray-600 dark:text-gray-400">{formatPaymentMethod(order.paymentMethod)}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>{formatPrice(order.tax)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{formatPrice(order.shipping)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function formatOrderStatus(status: string): string {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

function getOrderStatusVariant(status: string): "default" | "secondary" | "destructive" | "outline" {
  switch (status.toLowerCase()) {
    case "pending":
      return "secondary"
    case "processing":
      return "default"
    case "shipped":
    case "delivered":
      return "outline"
    case "cancelled":
      return "destructive"
    default:
      return "default"
  }
}

function formatPaymentMethod(method: string): string {
  switch (method) {
    case "credit-card":
      return "Credit Card"
    case "paypal":
      return "PayPal"
    case "bank-transfer":
      return "Bank Transfer"
    default:
      return method
  }
}
