import { typeRegister } from "@/app/register/components/registerBar";
import prisma from "@/lib/prisma";
import { comparePassword, hashPassword } from "@/utils/hashPassword";
import jwt from "jsonwebtoken";
import validasiLogin from "@/utils/validasiLogin";
import validasiRegister from "@/utils/validasiRegister";
import { NextRequest } from "next/server";
import config from "@/config/config";
import { cookies } from "next/headers";
export async function GET() {
  try {
  } catch (error) {}
}
export async function POST(request: NextRequest) {
  try {
    // const emailDomainRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|co|id)$/;
    // const userSchema = z.object({
    //   name: z
    //     .string()
    //     .min(1, { message: "Name is required" })
    //     .max(50, { message: "Name must be less than 50 characters" }),
    //   email: z
    //     .string()
    //     .email({ message: "Invalid email address" })
    //     .regex(emailDomainRegex, {
    //       message: "Email domain must be .com, .co, or .id",
    //     }),
    //   password: z
    //     .string()
    //     .min(6, { message: "Password must be at least 6 characters long" })
    //     .max(100, { message: "Password must be less than 100 characters" }),
    // });
    const data: typeRegister = await request.json();

    if (data.action === "create") {
      const validasi = validasiRegister({name:data.name,email:data.email,password:data.password});
      if(validasi.error) {
        return new Response(
          JSON.stringify(validasi),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      const datauser:any = validasi.data;
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


    } else if(data.action==="login"){
      const validasi = validasiLogin({email:data.email,password:data.password});
      if(validasi.error) {
        return new Response(
          JSON.stringify(validasi),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      const datauser:any = validasi.data;
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
      const isPasswordValid = await comparePassword(datauser.password, user.password);
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
      // console.log(token);
      // Set token in cookies or return it in the response
      await prisma.user.update({
        where: {id:user.id},
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


      return new Response(
        JSON.stringify({ message: "Login successful" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }else {
      return new Response(
        JSON.stringify({ message: "Please provide a product name keyword." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error:any) {
    console.log(error.errors);
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
