"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserService } from "@/services/user";
import {  PulseLoader } from "react-spinners";
export type ResetPassword = {
  password: string;
  confirmPassword: string;
  token?: string | null;
};
export default function PageResetPassword({searchParams}:{searchParams:string|undefined}) {

  const [formData, setFormData] = useState<ResetPassword>({
    password: "",
    confirmPassword: "",
    token: "",
  });
  const [error, setError] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const [loadingResetPassword, setLoadingResetPassword] = useState({
    loading: false,
    success: false,
  });

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Password confirmation validation
    if (formData.password !== formData.confirmPassword) {
      setError((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }

    formData.token = searchParams;

    setLoadingResetPassword({
      loading: true,
      success: false,
    });
    const result: any = await UserService.resetPassword(formData);
    if (result.status === 200) {
      setLoadingResetPassword((prev) => ({
        ...prev,
        loading: false,
        success: true,
      }));
      router.push("/login");
    } else if (result.status === 400) {
      setError((prev) => ({
        ...prev,
        password: result.response.data.message,
      }));
      setLoadingResetPassword((prev) => ({
        ...prev,
        loading: false,
        success: false,
      }));
    } else {
      setLoadingResetPassword((prev) => ({
        ...prev,
        loading: false,
        success: false,
      }));

      setError((prev) => ({
        ...prev,
        password: "An error occurred, please try again",
      }));
    }
  };

  return (
    <div className="mx-5">
      <div className="mt-7 mx-auto max-w-[400px] bg-white border border-gray-200 rounded-xl shadow-2xs">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800">
              Reset Password
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Remember your password?
              <Link
                className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium"
                href="/login"
              >
                Sign in here
              </Link>
            </p>
          </div>

          {loadingResetPassword.success && (
            <div className="bg-green-50 border mt-5 border-green-200 text-sm text-green-600 rounded-lg p-4 mb-4">
              <p>
                Password successfully changed! You will be redirected to the login page
                in 3 seconds...
              </p>
            </div>
          )}

          <div className="mt-5">
            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
                {/* Form Group Password */}
                <div>
                  <label htmlFor="password" className="block text-sm mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter new password"
                      className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      required
                    />
                  </div>
                  {error.password && (
                    <p className="text-xs text-red-600 mt-2">
                      {error.password}
                    </p>
                  )}
                </div>

                {/* Form Group Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm mb-2"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm new password"
                      className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      required
                    />
                  </div>
                  {error.confirmPassword && (
                    <p className="text-xs text-red-600 mt-2">
                      {error.confirmPassword}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loadingResetPassword.loading ? true : false}
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {loadingResetPassword.loading ? (
                    <PulseLoader size={15} color="white" />
                  ) : (
                    <span>Reset password</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
