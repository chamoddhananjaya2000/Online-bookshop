import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { clientPromise } from "@/lib/mongodb"
import { generateToken } from "@/lib/jwt"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db() // or specify db name like client.db("your-db-name")
    const users = db.collection("users")

    // Check if user already exists
    const existingUser = await users.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const newUser = {
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    }

    const result = await users.insertOne(newUser)
    const insertedUser = {
      id: result.insertedId,
      name,
      email,
      createdAt: newUser.createdAt,
    }

    // Generate JWT token
    const token = generateToken({
      id: insertedUser.id.toString(),
      name: insertedUser.name,
      email: insertedUser.email,
    })

    // Return user data and token
    return NextResponse.json({
      user: insertedUser,
      token,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

