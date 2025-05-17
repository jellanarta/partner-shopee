"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"
import { sendEmail } from "./mailer"

const jwt = require("jsonwebtoken");

// Fungsi untuk login
export async function loginUser(email: string, password: string) {
  try {
    // Cari user berdasarkan email
    const user = await prisma.user.findUnique({
      where: { email },
    })

    // Jika user tidak ditemukan
    if (!user) {
      return { success: false, message: "Email atau password salah" }
    }

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return { success: false, message: "Email atau password salah" }
    }

    // Generate token untuk session (dalam aplikasi nyata, gunakan JWT yang lebih aman)
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1d" }
    );

    // Update token di database
    await prisma.user.update({
      where: { id: user.id },
      data: { token },
    })

    // Set cookie untuk session
    const oneDay = 24 * 60 * 60 * 1000
    ;(await cookies()).set(
      "user_session",
      JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      }),
      {
        expires: Date.now() + oneDay,
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      },
    )

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, message: "Terjadi kesalahan saat login" }
  }
}

// Fungsi untuk registrasi
export async function registerUser(name: string, email: string, password: string, confirmPassword: string) {
  try {
    // Validasi dasar
    if (!name || !email || !password) {
      return { success: false, message: "Semua field harus diisi" }
    }

    if (password !== confirmPassword) {
      return { success: false, message: "Password dan konfirmasi password tidak cocok" }
    }

    // Cek apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return { success: false, message: "Email sudah terdaftar" }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    // Simpan user baru ke database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER",
      },
    })

    return {
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    }
  } catch (error) {
    console.error("Registration error:", error)
    return { success: false, message: "Terjadi kesalahan saat registrasi" }
  }
}

export async function requestPasswordReset(email: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (!user) {
            return { success: true, message: "Jika email terdaftar, link reset password akan dikirim" }
        }

        const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

        await prisma.user.update({
            where: { id: user.id },
            data: { token: resetToken },
        })

        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`
        await sendEmail({
          to: email,
          subject: "Reset Password Request",
          html: `<p>Click the link below to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
        })

        return {
            success: true,
            message: "Link reset password telah dikirim ke email Anda",
        }
    } catch (error) {
        console.error("Password reset request error:", error)
        return { success: false, message: "Terjadi kesalahan saat memproses permintaan" }
    }
}

export async function logoutUser() {
  const session = (await cookies()).get("user_session")

  if (session && session.value) {
    try {
      const userData = JSON.parse(session.value)

      if (userData.id) {
        await prisma.user.update({
          where: { id: userData.id },
          data: { token: null },
        })
      }
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  (await cookies()).delete("user_session")
  redirect("/Login")
}

export async function getCurrentUser() {
  const session = (await cookies()).get("user_session")

  if (!session || !session.value) {
    return null
  }

  try {
    const userData = JSON.parse(session.value)

    // Verifikasi token di database
    const user = await prisma.user.findUnique({
      where: { id: userData.id },
    })

    if (!user || user.token !== userData.token) {
      // Token tidak valid atau tidak cocok
      return null
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

// Middleware untuk memeriksa apakah user sudah login
export async function requireAuth() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/Login")
  }

  return user
}

// Middleware untuk memeriksa apakah user adalah admin
// export async function requireAdmin() {
//   const user = await getCurrentUser()

//   if (!user) {
//     redirect("/Login")
//   }

//   if (user.role !== "ADMIN") {
//     redirect("/dashboard") // Redirect ke dashboard jika bukan admin
//   }

//   return user
// }
