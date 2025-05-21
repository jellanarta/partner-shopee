import { typeRegister } from "@/app/register/components/registerBar";
import { z } from "zod";

export default function validasiRegister(data: typeRegister) {
  const response = {
    error: false,
    message: "",
    data: {},
    path: "",
  };

  try {
    const emailDomainRegex = /^(?=.*\.com$|.*\.co$|.*\.id$)/;

    const userSchema = z.object({
      name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
      email: z
        .string()
        .email({ message: "Invalid email address" })
        .regex(emailDomainRegex, {
          message: "Email domain must be .com, .co, or .id",
        }),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .max(100, { message: "Password must be less than 100 characters" }),
    });

    const result = userSchema.parse(data);
    response.data = result;
    return response;
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      response.error = true;
      response.message = error.errors[0].message;
      response.path = String(error.errors[0].path[0]);
    } else {
      response.error = true;
      response.message = "Unexpected error occurred";
      response.path = "";
    }
    return response;
  }
}
