import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma-setup"
import { verifyToken } from "@/lib/jwt"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // Get authorization header
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Extract token
    const token = authHeader.split(" ")[1]
    const payload = verifyToken(token)

    if (!payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const orderId = params.id

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: true,
      },
    })

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { isAdmin: true },
    })

    // Only allow users to see their own orders (or admins can see all)
    if (order.userId !== payload.id && !user?.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error("Error fetching order:", error)
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 })
  }
}
