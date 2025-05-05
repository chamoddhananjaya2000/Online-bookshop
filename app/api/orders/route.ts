import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma-setup"
import { verifyToken } from "@/lib/jwt"

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization")

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]
    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { items, shippingAddress, paymentMethod, subtotal, tax, shipping, total } = await request.json()

    if (!items || items.length === 0 || !shippingAddress || !paymentMethod) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const order = await prisma.order.create({
      data: {
        userId: payload.id,
        status: "pending",
        shippingAddress: JSON.stringify(shippingAddress),
        paymentMethod,
        subtotal,
        tax,
        shipping,
        total,
        orderItems: {
          create: items.map((item: any) => ({
            bookId: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            coverImage: item.coverImage,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error("Order creation error:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization")

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]
    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId") || payload.id

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { isAdmin: true },
    })

    if (userId !== payload.id && !user?.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const orders = await prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        orderItems: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}
