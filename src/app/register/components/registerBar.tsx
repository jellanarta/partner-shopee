"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { registerUser } from "@/utils/user/auth"
import { User } from "@/generated/prisma"
import { UserService } from "@/services/user"
export type typeRegister = {name:string,email:string,password:string,confirmPassword?:string,action?:string}
export default function SignupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState<typeRegister>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const result:any = await UserService.createUser(formData)
    if(result.status === 400){
      // setError(result.data.response.message)
      // return
      console.log(result.response.data.message)
    }
    console.log(result)
    // setIsLoading(true)
    // setError("")

    // try {
    //   const result = await registerUser(formData.name, formData.email, formData.password, formData.confirmPassword)

    //   if (result.success) {
    //     // Tampilkan toast sukses dengan Preline
    //     const toastElement = document.createElement("div")
    //     toastElement.innerHTML = `
    //       <div id="dismiss-toast" class="hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300 max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700" role="alert">
    //         <div class="flex p-4">
    //           <div class="flex-shrink-0">
    //             <svg class="h-4 w-4 text-green-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    //               <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    //             </svg>
    //           </div>
    //           <div class="ms-3">
    //             <p class="text-sm text-gray-700 dark:text-gray-400">
    //               Pendaftaran berhasil! Silakan login.
    //             </p>
    //           </div>
    //           <div class="ms-auto">
    //             <button type="button" class="inline-flex flex-shrink-0 justify-center items-center h-5 w-5 rounded-lg text-gray-800 opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100 dark:text-white" data-hs-remove-element="#dismiss-toast">
    //               <span class="sr-only">Close</span>
    //               <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     `
    //     document.body.appendChild(toastElement)

    //     // Redirect ke login setelah pendaftaran berhasil
    //     setTimeout(() => {
    //       router.push("/Login")
    //     }, 1500)
    //   } else {
    //     setError(result.message || "Pendaftaran gagal")
    //   }
    // } catch (error) {
    //   setError("Terjadi kesalahan saat pendaftaran")
    // } finally {
    //   setIsLoading(false)
    // }
  }

  return (
    <div className="h-full">
      <div className="dark:bg-slate-900 bg-gray-100 flex h-full items-center py-16">
        <div className="w-full max-w-md mx-auto p-6">
          <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Buat Akun</h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Sudah punya akun?{" "}
                  <Link className="text-blue-600 decoration-2 hover:underline font-medium" href="/login">
                    Masuk di sini
                  </Link>
                </p>
              </div>

              <div className="mt-5">
                {/* Form */}
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-y-4">
                    {/* Error message */}
                    {error && (
                      <div
                        className="text-center bg-red-50 border border-red-200 text-sm text-red-600 rounded-md p-4"
                        role="alert"
                      >
                        {error}
                      </div>
                    )}

                    {/* Form Group */}
                    <div>
                      <label htmlFor="name" className="block text-sm mb-2 dark:text-white">
                        Nama Lengkap
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                          required
                          placeholder="Nama lengkap Anda"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Form Group */}
                    <div>
                      <label htmlFor="email" className="block text-sm mb-2 dark:text-white">
                        Email
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                          required
                          placeholder="nama@contoh.com"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Form Group */}
                    <div>
                      <label htmlFor="password" className="block text-sm mb-2 dark:text-white">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          id="password"
                          name="password"
                          className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                          required
                          placeholder="Password minimal 8 karakter"
                          value={formData.password}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Form Group */}
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm mb-2 dark:text-white">
                        Konfirmasi Password
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                          required
                          placeholder="Ulangi password Anda"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Checkbox */}
                    <div className="flex items-center">
                      <div className="flex">
                        <input
                          id="terms"
                          name="terms"
                          type="checkbox"
                          className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                          required
                        />
                      </div>
                      <div className="ml-3">
                        <label htmlFor="terms" className="text-sm dark:text-white">
                          Saya menyetujui{" "}
                          <Link className="text-blue-600 decoration-2 hover:underline font-medium" href="#">
                            Syarat dan Ketentuan
                          </Link>
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span
                            className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full"
                            role="status"
                            aria-label="loading"
                          ></span>
                          Memproses...
                        </>
                      ) : (
                        "Daftar"
                      )}
                    </button>
                  </div>
                </form>
                {/* End Form */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
