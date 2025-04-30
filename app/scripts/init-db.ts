import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  try {
    // Create admin user
    const adminPassword = await bcrypt.hash("admin123", 10)

    const admin = await prisma.user.upsert({
      where: { email: "admin@bookhaven.com" },
      update: {},
      create: {
        name: "Admin User",
        email: "admin@bookhaven.com",
        password: adminPassword,
        isAdmin: true,
      },
    })

    console.log("Admin user created:", admin.email)

    // Create test user
    const userPassword = await bcrypt.hash("user123", 10)

    const user = await prisma.user.upsert({
      where: { email: "user@example.com" },
      update: {},
      create: {
        name: "Test User",
        email: "user@example.com",
        password: userPassword,
        isAdmin: false,
      },
    })

    console.log("Test user created:", user.email)

    console.log("Database initialization completed successfully")
  } catch (error) {
    console.error("Error initializing database:", error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
