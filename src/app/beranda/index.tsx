"use client";

import { useState } from "react";
import { ScaleLoader } from "react-spinners";
import { Product } from "@/types/Product";
import Dashboard from "./dashboard";
import { getProduct } from "@/services/product";

interface ProductPaginationResult {
  currentPage: number;
  next: string | null;
  products: Product[];
  totalPages: number;
}
export interface ResultProductState {
  loading: boolean;
  data: ProductPaginationResult;
}

export default function Beranda() {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [messageError, setMessageError] = useState("");
  const [keyName, setKeyName] = useState("");
  const [resultProduct, setResultProduct] = useState<ResultProductState>({
    loading: false,
    data: {
      currentPage: 0,
      next: "",
      products: [],
      totalPages: 0,
    },
  });
  const changeKeyName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyName(value);
  };
  const submitSearchProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResultProduct((prev) => ({
      ...prev,
      loading: true,
    }));
    try {
      const resultApi = await getProduct(keyName,null);

      if (resultApi.status === 200) {
        console.log(resultApi.data); // Handle product data here
        setResultProduct((prev) => ({
          ...prev,
          loading: false,
          data: resultApi.data,
        }));
      } else if (resultApi.status === 400) {
        setResultProduct((prev) => ({
          ...prev,
          loading: false,
        }));
        setShowAlert(true);
        setMessageError(
          resultApi.response?.data?.message ||
            "Please provide a valid search keyword."
        );
        setTimeout(() => setShowAlert(false), 5000);
      } else {
        setResultProduct((prev) => ({
          ...prev,
          loading: false,
        }));
        setShowAlert(true);
        setMessageError("A server error occurred. Please try again later.");
        setTimeout(() => setShowAlert(false), 5000);
      }
    } catch (error) {
      setResultProduct((prev) => ({
        ...prev,
        loading: false,
      }));
      setShowAlert(true);
      setMessageError("An unexpected error occurred. Please try again.");
      setTimeout(() => setShowAlert(false), 5000);
    }
  };

  const handleBackSearch = () => {
    setKeyName("")
    setResultProduct({
      loading: false,
      data: {
        currentPage: 0,
        next: "",
        products: [],
        totalPages: 0,
      },
    });
  };
  return (
    <>
      <div>
        {resultProduct.data.products.length ? (
          <div>
            <Dashboard resultProduct={resultProduct}>
              <div className="flex mb-5" onClick={handleBackSearch}>
                <div className="px-3 py-4 flex cursor-pointer justify-center items-center  text-sm  rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 gap-2">
                  <button type="button" className="">
                    <svg
                      className="shrink-0 size-5"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </button>
                  <div className="text-sm capitalize">Return to search</div>
                </div>
              </div>
            </Dashboard>
          </div>
        ) : (
          <div className="ring-1 ring-gray-200  ">
            {/* Subscribe */}
            <div className="max-w-6xl py-10 px-4 sm:px-6 lg:px-8 lg:py-16 mx-auto">
              <div className="max-w-xl text-center mx-auto">
                <div className="mb-5">
                  <h2 className="text-2xl font-bold md:text-3xl md:leading-tight">
                    Search for a Product
                  </h2>
                </div>

                <form onSubmit={submitSearchProduct}>
                  <div className="mt-5 lg:mt-8 flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
                    <div className="w-full">
                      <label htmlFor="hero-input" className="sr-only">
                        Product Search
                      </label>
                      <input
                        onChange={changeKeyName}
                        value={keyName}
                        type="text"
                        id="hero-input"
                        name="hero-input"
                        className="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                        placeholder="Enter product name or category"
                      />
                    </div>
                    <button className="w-full sm:w-auto whitespace-nowrap py-3 px-4 inline-flex cursor-pointer justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                      Search
                    </button>
                  </div>
                  {showAlert ? (
                    <div
                      className="mt-5 bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500"
                      role="alert"
                      tabIndex={-1}
                      aria-labelledby="hs-soft-color-danger-label"
                    >
                      <span id="hs-soft-color-danger-label" className="">
                        {messageError}
                      </span>
                    </div>
                  ) : null}
                  {resultProduct.loading ? (
                    <div className="mt-5 flex justify-center">
                      <ScaleLoader color="blue" />
                    </div>
                  ) : null}
                </form>
              </div>
            </div>

            {/* End Subscribe */}
          </div>
        )}
      </div>
    </>
  );
}
