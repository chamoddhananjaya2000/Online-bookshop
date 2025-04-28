import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-options"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { items, shippingAddress, paymentMethod, subtotal, tax, shipping, total } = await request.json()

    // Validate input
    if (!items || !items.length || !shippingAddress || !paymentMethod) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create order
    const order = await db.order.create({
      data: {
        userId: session.user.id,
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

    return NextResponse.json(order)
  } catch (error) {
    console.error("Order creation error:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    // Only allow users to see their own orders (or admins can see all)
    if (userId && userId !== session.user.id && !session.user.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const orders = await db.order.findMany({
      where: {
        userId: userId || session.user.id,
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
