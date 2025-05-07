"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import jsPDF from "jspdf"

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("id")
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        // Handle case where orderId is not provided in the URL
        console.error("Order ID is missing")
        setLoading(false)
        return
      }

      try {
        const res = await fetch(`/api/orders/${orderId}`)
        if (!res.ok) {
          throw new Error("Failed to fetch order data")
        }
        const data = await res.json()
        setOrder(data)
      } catch (error) {
        console.error("Error fetching order:", error)
        setLoading(false)
      }
    }

    fetchOrder()
  }, [orderId])

  const generateInvoice = () => {
    if (!order) return

    const doc = new jsPDF()
    doc.setFontSize(18)
    doc.text("Invoice", 14, 22)
    doc.setFontSize(12)
    doc.text(`Order ID: ${order.id}`, 14, 32)
    doc.text(`Customer: ${order.shippingAddress.fullName}`, 14, 40)
    doc.text(`Email: ${order.email}`, 14, 48)
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 14, 56)

    let y = 70
    order.items.forEach((item: any, index: number) => {
      doc.text(`${index + 1}. ${item.title} - Qty: ${item.quantity} - ${formatPrice(item.price * item.quantity)}`, 14, y)
      y += 10
    })

    y += 10
    doc.text(`Subtotal: ${formatPrice(order.subtotal)}`, 14, y)
    doc.text(`Tax: ${formatPrice(order.tax)}`, 14, y + 10)
    doc.text(`Shipping: ${formatPrice(order.shipping)}`, 14, y + 20)
    doc.text(`Total: ${formatPrice(order.total)}`, 14, y + 30)

    doc.save(`invoice_${order.id}.pdf`)
  }

  if (loading) {
    return <div className="p-6">Loading order details...</div>
  }

  if (!order) {
    return (
      <div className="p-6">
        <p>Error: Order not found or there was an issue fetching the order details.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Thank you for your order!</h1>
      <p className="mb-2">Your order has been placed successfully.</p>
      <p className="mb-4">Order ID: <strong>{order.id}</strong></p>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        <ul className="space-y-2">
          {order.items.map((item: any) => (
            <li key={item.id} className="flex justify-between">
              <span>{item.title} x {item.quantity}</span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 border-t pt-4 space-y-2">
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
          <div className="flex justify-between font-bold text-lg mt-2">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      <Button onClick={generateInvoice}>Download Invoice</Button>
    </div>
  )
}
