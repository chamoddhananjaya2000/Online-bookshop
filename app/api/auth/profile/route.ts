import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb"; // you'll create this
import { verifyToken } from "@/lib/jwt";
import { ObjectId } from "mongodb";

export async function PUT(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);

    if (!payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userId, name, email, currentPassword, newPassword } = await request.json();

    if (userId !== payload.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const client = await connectToDatabase();
    const db = client.db;

    const usersCollection = db.collection("users");

    // Check if email is taken
    if (email) {
      const existingUser = await usersCollection.findOne({ email });
      if (existingUser && existingUser._id.toString() !== userId) {
        return NextResponse.json({ error: "Email is already in use" }, { status: 409 });
      }
    }

    const updateData: any = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;

    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json({ error: "Current password is required" }, { status: 400 });
      }

      const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 });
      }

      updateData.password = await bcrypt.hash(newPassword, 10);
    }

    const result = await usersCollection.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $set: updateData },
      { returnDocument: "after", projection: { password: 0 } }
    );

    if (!result) {
      return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
    }

    return NextResponse.json({ user: result.value });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
