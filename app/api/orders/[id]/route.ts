import { NextResponse } from "next/server"
import { verifyToken } from "@/lib/jwt"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]
    const payload = verifyToken(token)

    if (!payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const orderId = params.id
    const { db } = await connectToDatabase()

    const order = await db.collection("orders").findOne({ _id: new ObjectId(orderId) })

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    const user = await db.collection("users").findOne(
      { _id: new ObjectId(payload.id) },
      { projection: { isAdmin: 1 } }
    )

    // Restrict access unless the user is the owner or an admin
    if (order.userId?.toString() !== payload.id && !user?.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // You can strip or transform the order object here if needed
    return NextResponse.json({
      ...order,
      id: order._id.toString(),
      _id: undefined,
    })
  } catch (error) {
    console.error("Error fetching order:", error)
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 })
  }
}
