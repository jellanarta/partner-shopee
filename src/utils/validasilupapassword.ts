
import { z } from "zod";


export default function validasilupapassword(data:{email:string}) {
    const response = {
        error:false,
        message:"",
        data:{},
        path:""
    }
  try {
    const emailDomainRegex = /^(?=.*\.com$|.*\.co$|.*\.id$)/;
  const userSchema = z.object({
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .regex(emailDomainRegex, {
        message: "Email domain must be .com, .co, or .id",
      }),
  });

  const result = userSchema.parse(data);
    response.data = result;
  return response
  } catch (error:any) {
    response.error = true;
    response.message = error.errors[0].message;
    response.path = error.errors[0].path[0];
    return response;
  }
}