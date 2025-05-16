"use server"

import { cookies } from "next/headers"
import { query, hashPassword, verifyPassword } from "./db"
import { redirect } from "next/navigation"

// Fungsi untuk login
export async function loginUser(email: string, password: string) {
  try {
    // Cari user berdasarkan email
    const result = await query("SELECT * FROM users WHERE email = $1", [email])
    const user = result.rows[0]

    // Jika user tidak ditemukan
    if (!user) {
      return { success: false, message: "Email atau password salah" }
    }

    // Verifikasi password
    const isPasswordValid = await verifyPassword(password, user.password)
    if (!isPasswordValid) {
      return { success: false, message: "Email atau password salah" }
    }

    // Set cookie untuk session (dalam aplikasi nyata, gunakan JWT atau session yang lebih aman)
    const oneDay = 24 * 60 * 60 * 1000
    ;(await cookies()).set(
      "user_session",
      JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
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
    const checkEmail = await query("SELECT * FROM users WHERE email = $1", [email])
    if (checkEmail.rows.length > 0) {
      return { success: false, message: "Email sudah terdaftar" }
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Simpan user baru ke database
    const result = await query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashedPassword],
    )

    const newUser = result.rows[0]

    return {
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    }
  } catch (error) {
    console.error("Registration error:", error)
    return { success: false, message: "Terjadi kesalahan saat registrasi" }
  }
}

// Fungsi untuk reset password
export async function requestPasswordReset(email: string) {
  try {
    // Cek apakah email terdaftar
    const result = await query("SELECT * FROM users WHERE email = $1", [email])
    if (result.rows.length === 0) {
      // Untuk keamanan, jangan beritahu user bahwa email tidak terdaftar
      return { success: true, message: "Jika email terdaftar, link reset password akan dikirim" }
    }

    const crypto = await import("crypto")
    const resetToken = crypto.randomBytes(32).toString("hex")

    const resetTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()

await sendResetEmail(email, resetToken);

return { success: true, message: "Link reset password telah dikirim ke email Anda" }


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
  (await cookies()).delete("user_session")
  redirect("Login")
}


export async function getCurrentUser() {
  const session = (await cookies()).get("user_session")

  if (!session || !session.value) {
    return null
  }

  try {
    return JSON.parse(session.value)
  } catch (error) {
    return null
  }
}


export async function requireAuth() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/Login");
    }

    return user;
}

async function sendResetEmail(email: string, resetToken: string) {
    const resetUrl = `${process.env.APP_URL}/reset-password?token=${resetToken}`;

    const emailContent = `
        <p>Hi,</p>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>If you did not request this, please ignore this email.</p>
    `;

    try {
        // Assuming you have a mailer utility or service
        const mailer = await import("./mailer");
        await mailer.sendEmail({
            to: email,
            subject: "Password Reset Request",
            html: emailContent,
        });
    } catch (error) {
        console.error("Failed to send reset email:", error);
        throw new Error("Failed to send reset email");
    }
}
// Removed duplicate function implementation

