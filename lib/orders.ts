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
  token: string // 👈 Pass token explicitly
}

export async function createOrder(params: CreateOrderParams): Promise<Order> {
  const { userId, items, shippingAddress, paymentMethod, subtotal, tax, shipping, total, token } = params

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
