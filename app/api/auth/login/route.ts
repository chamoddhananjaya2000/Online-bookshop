import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import clientPromise from "@/lib/mongodb"
import { generateToken } from "@/lib/jwt"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db() // or specify like db("your-db-name")
    const usersCollection = db.collection("users")

    // Find user by email
    const user = await usersCollection.findOne({ email })

    // Check if user exists
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Generate JWT token
    const token = generateToken({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    })

    // Return user data and token
    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
      token,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
