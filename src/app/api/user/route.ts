import { typeRegister } from "@/app/register/components/registerBar";
import prisma from "@/lib/prisma";
import { comparePassword, hashPassword } from "@/utils/hashPassword";
import jwt from "jsonwebtoken";
import validasiLogin from "@/utils/validasiLogin";
import validasiRegister from "@/utils/validasiRegister";
import { NextRequest } from "next/server";
import config from "@/config/config";
import { cookies } from "next/headers";
import { z } from "zod";
import validasiLupaPasswordUser from "@/utils/validasiLupaPasswordUser";
import { sendToken } from "@/utils/sendToken";
import { ResetPassword } from "@/app/reset-password/components/pageResetPassword";
import { verifikasiToken } from "@/utils/token";
export async function GET() {
  try {
  } catch (error) {}
}
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (data.action === "create") {
      const validasi = validasiRegister({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      if (validasi.error) {
        return new Response(JSON.stringify(validasi), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
      const datauser: any = validasi.data;
      const user = await prisma.user.findUnique({
        where: {
          email: datauser.email,
        },
      });
      if (user) {
        return new Response(
          JSON.stringify({ message: "Email already exists", path: "email" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      const hashedPassword = await hashPassword(datauser.password);
      datauser.password = hashedPassword;
      const newUser = await prisma.user.create({
        data: {
          name: datauser.name,
          email: datauser.email,
          password: datauser.password,
        },
      });
      if (newUser) {
        return new Response(
          JSON.stringify({ message: "User created successfully" }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    } else if (data.action === "login") {
      const validasi = validasiLogin({
        email: data.email,
        password: data.password,
      });
      if (validasi.error) {
        return new Response(JSON.stringify(validasi), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
      const datauser: any = validasi.data;
      const user = await prisma.user.findUnique({
        where: {
          email: datauser.email,
        },
      });
      if (!user) {
        return new Response(
          JSON.stringify({ message: "Email not found", path: "email" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      const isPasswordValid = await comparePassword(
        datauser.password,
        user.password
      );
      if (!isPasswordValid) {
        return new Response(
          JSON.stringify({ message: "Invalid password", path: "password" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      // Generate JWT token here if needed
      const token = jwt.sign({ id: user.id }, config.JWT_SECRET, {
        expiresIn: "1d",
      });
      // Set token in cookies or return it in the response
      await prisma.user.update({
        where: { id: user.id },
        data: {
          token: token,
        },
      });
      const cookieStore = await cookies();
      cookieStore.set({
        name: "token",
        secure: false,
        httpOnly: true,
        path: "/",
        expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
        value: token,
      });

      return new Response(JSON.stringify({ message: "Login successful" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else if (data.action === "checkEmail") {
      const validasienail = await validasiLupaPasswordUser({
        email: data.email,
      });
      if (validasienail.error) {
        return new Response(JSON.stringify(validasienail), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      // cek email ke dtabase
      const user = await prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });
      if (!user) {
        return new Response(
          JSON.stringify({ message: "Email not found", path: "email" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // buatkn token
      const token = jwt.sign({ id: user.id }, config.JWT_SECRET, {
        expiresIn: "1h",
      });
      sendToken(user.email, token);
      // kirim token ke email
      return new Response(
        JSON.stringify({ message: "Please provide a product name keyword." }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else if (data.action === "reset-password") {
      const dataPassword = data as ResetPassword;
      if (!dataPassword.token || !dataPassword.token?.length) {
        return new Response(
          JSON.stringify({
            message: "Token tidak ditemukan",
            path: "password",
          }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
      // verifikasi token
      const resultVerifikasiToken: any = await verifikasiToken(
        dataPassword.token
      );
      if (resultVerifikasiToken.error) {
        return new Response(
          JSON.stringify({ message: "Token tidak valid", path: "password" }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      // hash password
      const iduser: any = resultVerifikasiToken.data?.id;
      const password = await hashPassword(dataPassword.password);

      // update password user
      const updateUser = await prisma.user.update({
        where: {
          id: iduser,
        },
        data: {
          password: password,
        },
      });

      if (!updateUser) {
        return new Response(
          JSON.stringify({
            message: "Gagal mengupdate password",
            path: "password",
          }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      return new Response(
        JSON.stringify({ message: "Password berhasil diupdate" }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Please provide a product name keyword." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error: any) {
    return new Response(
      JSON.stringify({ message: "Please provide a product name keyword." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
export async function PUT() {
  try {
  } catch (error) {}
}
export async function DELETE(request: NextRequest) {
  try {
  } catch (error) {}
}
