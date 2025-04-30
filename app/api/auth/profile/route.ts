import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma-setup"
import { verifyToken } from "@/lib/jwt"

export async function PUT(request: Request) {
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

    const { userId, name, email, currentPassword, newPassword } = await request.json()

    // Verify that the user is updating their own profile
    if (userId !== payload.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Check if email is already taken by another user
    if (email) {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      })

      if (existingUser && existingUser.id !== userId) {
        return NextResponse.json({ error: "Email is already in use" }, { status: 409 })
      }
    }

    // Prepare update data
    const updateData: any = {}
    if (name) updateData.name = name
    if (email) updateData.email = email

    // If changing password, verify current password
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json({ error: "Current password is required" }, { status: 400 })
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
      })

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
      }

      const isPasswordValid = await bcrypt.compare(currentPassword, user.password)

      if (!isPasswordValid) {
        return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 })
      }

      // Hash new password
      updateData.password = await bcrypt.hash(newPassword, 10)
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    })

    return NextResponse.json({ user: updatedUser })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
