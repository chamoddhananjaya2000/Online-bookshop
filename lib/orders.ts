import type { Order } from "@/lib/types"

interface CreateOrderParams {
  userId: string
  items: any[]
  shippingAddress: {
    fullName: string
    address: string
    city: string
    state: string
    zipCode: string
  }
  paymentMethod: string
  subtotal: number
  tax: number
  shipping: number
  total: number
}

export async function createOrder(params: CreateOrderParams): Promise<Order> {
  const { userId, items, shippingAddress, paymentMethod, subtotal, tax, shipping, total } = params

  // Get token from storage
  const token = localStorage.getItem("token") || sessionStorage.getItem("token")

  if (!token) {
    throw new Error("Authentication required")
  }

  const response = await fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId,
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      tax,
      shipping,
      total,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Failed to create order")
  }

  const data = await response.json()
  return data
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  // Get token from storage
  const token = localStorage.getItem("token") || sessionStorage.getItem("token")

  if (!token) {
    throw new Error("Authentication required")
  }

  const response = await fetch(`/api/orders?userId=${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Failed to fetch orders")
  }

  const data = await response.json()
  return data
}

export async function getOrderById(orderId: string): Promise<Order> {
  // Get token from storage
  const token = localStorage.getItem("token") || sessionStorage.getItem("token")

  if (!token) {
    throw new Error("Authentication required")
  }

  const response = await fetch(`/api/orders/${orderId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Failed to fetch order")
  }

  const data = await response.json()
  return data
}
