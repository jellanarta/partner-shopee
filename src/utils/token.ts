import config from "@/config/config";
import jwt from "jsonwebtoken";

export async function verifikasiToken(token: string) {
  const response = {
    error: false,
    data: {},
  };

  try {
    const result = jwt.verify(token, config.JWT_SECRET); // tanpa callback
    response.data = result;
    return response;
  } catch {
    response.error = true;
    return response;
  }
}
