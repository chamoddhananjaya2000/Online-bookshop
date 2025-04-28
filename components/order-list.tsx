import Link from "next/link"
import { formatPrice, formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Order } from "@/lib/types"

export default function OrderList({ orders }: { orders: Order[] }) {
  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div key={order.id} className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Order #{order.id}</h3>
                <Badge variant={getOrderStatusVariant(order.status)}>{formatOrderStatus(order.status)}</Badge>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Placed on {formatDate(order.createdAt)}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{formatPrice(order.total)}</span>
              <Button asChild variant="outline" size="sm">
                <Link href={`/orders/${order.id}`}>View Details</Link>
              </Button>
            </div>
          </div>

          <div className="p-4">
            <div className="space-y-2">
              {order.orderItems.slice(0, 3).map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-medium line-clamp-1">{item.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Qty: {item.quantity} × {formatPrice(item.price)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}

              {order.orderItems.length > 3 && (
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                  +{order.orderItems.length - 3} more items
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function formatOrderStatus(status: string): string {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

function getOrderStatusVariant(status: string): "default" | "secondary" | "success" | "destructive" {
  switch (status.toLowerCase()) {
    case "pending":
      return "secondary"
    case "processing":
      return "default"
    case "shipped":
    case "delivered":
      return "success"
    case "cancelled":
      return "destructive"
    default:
      return "default"
  }
}
