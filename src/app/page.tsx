import { cekLogin } from "@/utils/cekLogin";
import Beranda from "./beranda";

export default async function Page() {
  const result:boolean = await cekLogin()
  return (
    <>
    <Beranda login={result} />
    </>
  );
}
