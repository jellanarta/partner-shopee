import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"

// API route untuk seed database dengan data awal
export async function GET() {
  try {
    // Cek apakah sudah ada admin
    const adminExists = await prisma.user.findFirst({
      where: { role: "ADMIN" },
    })

    if (!adminExists) {
      // Buat user admin
      const hashedPassword = await bcrypt.hash("admin123", 10)
      await prisma.user.create({
        data: {
          name: "Admin",
          email: "admin@example.com",
          password: hashedPassword,
          role: "ADMIN",
        },
      })
    }

    // Cek apakah sudah ada user biasa
    const userExists = await prisma.user.findFirst({
      where: { email: "user@example.com" },
    })

    if (!userExists) {
      // Buat user biasa
      const hashedPassword = await bcrypt.hash("password123", 10)
      await prisma.user.create({
        data: {
          name: "User Test",
          email: "user@example.com",
          password: hashedPassword,
          role: "USER",
        },
      })
    }

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
      admin: { email: "admin@example.com", password: "admin123" },
      user: { email: "user@example.com", password: "password123" },
    })
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json({ success: false, message: "Failed to seed database" }, { status: 500 })
  }
}
