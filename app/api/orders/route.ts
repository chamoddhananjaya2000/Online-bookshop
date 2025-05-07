import { NextResponse } from "next/server"
import { verifyToken } from "@/lib/jwt"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

// POST method to create a new order
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

    const { db } = await connectToDatabase()

    const order = await db.collection("orders").insertOne({
      userId: new ObjectId(payload.id),
      status: "pending",
      shippingAddress: JSON.stringify(shippingAddress),
      paymentMethod,
      subtotal,
      tax,
      shipping,
      total,
      orderItems: items.map((item: any) => ({
        bookId: new ObjectId(item.id),
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        coverImage: item.coverImage,
      })),
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const createdOrder = await db.collection("orders").findOne({ _id: order.insertedId })

    return NextResponse.json(createdOrder, { status: 201 })
  } catch (error) {
    console.error("Order creation error:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}

// GET method to fetch orders
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

    const { db } = await connectToDatabase()

    const user = await db.collection("users").findOne(
      { _id: new ObjectId(payload.id) },
      { projection: { isAdmin: 1 } }
    )

    if (userId !== payload.id && !user?.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const orders = await db.collection("orders").find({
      userId: new ObjectId(userId),
    })
    .sort({ createdAt: -1 }) // Order by most recent
    .toArray()

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}
