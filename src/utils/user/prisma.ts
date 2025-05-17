import { PrismaClient } from "@prisma/client"

// PrismaClient adalah singleton untuk menghindari banyak koneksi
let prisma: PrismaClient

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  // Gunakan instance yang sama untuk development
  if (!(global as any).prisma) {
    ;(global as any).prisma = new PrismaClient()
  }
  prisma = (global as any).prisma
}

export default prisma
