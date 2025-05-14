import Head from 'next/head';
import Link from 'next/link';

export default function Register() {
  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="Halaman Pendaftaran" />
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Daftar Akun Baru</h1>
          <form>
            {/* Input Nama */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Masukkan nama lengkap Anda"
              />
            </div>

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

            {/* Input Password */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Masukkan password Anda"
              />
            </div>

            {/* Tombol Daftar */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Daftar Sekarang
            </button>

            {/* Link ke Halaman Login */}
            <div className="mt-4 text-center">
              <span className="text-sm text-gray-600">Sudah punya akun? </span>
              <Link href="/Login" className="text-blue-600 hover:text-blue-800 text-sm">
                Masuk di sini
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}