"use server";

import { cookies } from "next/headers";
import { verifikasiToken } from "./token";
import prisma from "@/lib/prisma";

export type DataUserInToken = {
  id: number;
  iat: number;
  exp: number;
};
export const cekLogin = async () => {
  try {
    const cookieStore = await cookies();
    const tokensp = cookieStore.get("token");
    if (!tokensp) {
      return false;
    } else {
      const tokenvalue = tokensp.value;
      if (!tokenvalue || !tokenvalue.length) {
        return false;
      } else {
        const validasitoken = await verifikasiToken(tokenvalue);

        const datauser = validasitoken.data as DataUserInToken;
        if (validasitoken.error) {
          return false;
        } else {
          const cekindatabase = await prisma.user.findUnique({
            where: {
              id: datauser.id,
              token: tokenvalue,
            },
          });
          if (!cekindatabase) {
            return false;
          } else {
            return true;
          }
        }
      }
    }
  } catch {
    return false;
  }
};
