"use client"
import { UserService } from '@/services/user';
import Head from 'next/head';
import Link from 'next/link';


export type typePorgotPassword = {email:string,action?:string}

export default function ForgotPassword() {
  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const response = await UserService.checkEmail({email}) as { status: number };
    if (response.status === 200) {
      console.log("Lupa password berhasil");
    } else {
      console.log("Lupa password gagal");
    }
  }
  return (
    <>
      <Head>
        <title>Lupa Password</title>
        <meta name="description" content="Halaman Lupa Password" />
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Lupa Password</h1>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Masukkan email Anda.
          </p>

          {/* Formulir Lupa Password */}
          <form
            onSubmit={handlesubmit}>
            {/* Input Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Masukkan email Anda"
              />
            </div>

            {/* Tombol Kirim */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Reset Password
            </button>
          </form>

          {/* Link Kembali ke Login */}
          <div className="mt-4 text-center">
            <Link href="/login" className="text-blue-600 hover:text-blue-800 text-sm">
              Kembali ke Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}