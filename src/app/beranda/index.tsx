"use client";

import { useState } from "react";
import { BeatLoader, ScaleLoader } from "react-spinners";
import { Product } from "@/types/Product";
import Dashboard from "./dashboard";
import { getProduct } from "@/services/product";
import Pricing from "../components/pricing";
import Footer from "../components/footer";
import {
  daftarLabelFilter,
  LabelFilterProduk,
} from "@/types/LabelFilterProduk";
import Link from "next/link";

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

export default function Beranda({login}:{login:boolean}) {
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
  const [isLogin, setIsLogin] = useState(login);
  const submitSearchProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!login){
      setIsLogin(false)
      setShowAlert(true);
        setMessageError(
          "Please login first to search for products"
        );
        setTimeout(() => setShowAlert(false), 5000);
      return
    }
    setResultProduct((prev) => ({
      ...prev,
      loading: true,
    }));
    try {
      const resultApi:any = await getProduct(keyName, null);

      if (resultApi?.status && resultApi.status === 200) {
        setResultProduct((prev) => ({
          ...prev,
          loading: false,
          data: resultApi.data,
        }));
      } else if (resultApi?.status && resultApi.status === 400) {
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
      } else if (resultApi.status === 401) {
        setKeyName("")
        setResultProduct((prev) => ({
          ...prev,
          loading: false,
        }));
        setIsLogin(false);
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
    setKeyName("");
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

  // handle click rekomendasi
  const [loadingSeacrhCategories, setLoadingSeacrhCategories] = useState(false);
  const [textCategories, setTextCategories] = useState("");
  const clickCategories = async (dataFilter: LabelFilterProduk) => {
    if (!loadingSeacrhCategories) {
      setLoadingSeacrhCategories(true);
      setTextCategories(dataFilter);
      const resultApi:any = await getProduct(
        "",
        "/api/product?category=" + dataFilter
      );
      if (resultApi?.status && resultApi.status === 200) {
        setResultProduct((prev) => ({
          ...prev,
          loading: false,
          data: resultApi.data,
        }));
      } else if (resultApi?.status && resultApi.status === 400) {
        setResultProduct((prev) => ({
          ...prev,
          loading: false,
        }));
      } else {
        setResultProduct((prev) => ({
          ...prev,
          loading: false,
        }));
      }
      setLoadingSeacrhCategories(false);
    }
  };
  return (
    <>
      <div>
        {resultProduct.data.products.length ? (
          <div>
            <Dashboard resultProduct={resultProduct}>
              <div className="flex justify-between sticky top-0 p-5 shadow-md bg-white z-[10000]  w-full  gap-2 items-center mb-5">
                <div
                  onClick={handleBackSearch}
                  className="px-3 py-4 flex cursor-pointer justify-center items-center  text-sm  rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 gap-2"
                >
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
                  <div className="text-sm hidden sm:block capitalize">
                    Return to search
                  </div>
                </div>
                <div className="px-3 py-4 flex cursor-pointer justify-center items-center  text-sm  rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 gap-2">
                  <div className="text-sm capitalize line-clamp-1">
                    You were searching for {keyName ? "" : "category"} : "
                    <strong>{keyName.length ? keyName : textCategories}</strong>
                    "
                  </div>
                </div>
              </div>
            </Dashboard>
          </div>
        ) : (
          <div className=" ">
            {/* Subscribe */}

            {/* Hero */}
            {/* <ChartApexReact/> */}

            <div className="relative overflow-hidden">
              <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
                <div className="text-center">
                  <h1 className="text-4xl sm:text-6xl font-bold text-gray-800">
                    Partner
                  </h1>

                  <p className="mt-3 text-gray-600">
                    {/* Jelajahi produk populer di Shopee dan temukan yang sesuai
                    dengan kebutuhanmu. */}
                    Explore popular products on Shopee and find the ones that suit your needs.
                  </p>

                  <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">
                    {/* Form */}
                    <form onSubmit={submitSearchProduct}>
                      <div className="relative z-10 flex gap-x-3 p-3 bg-white border border-gray-200 rounded-lg shadow-lg shadow-gray-100">
                        <div className="w-full">
                          <label
                            htmlFor="hs-search-article-1"
                            className="block text-sm text-gray-700 font-medium"
                          >
                            <span className="sr-only">Search products</span>
                          </label>
                          <input
                            type="text"
                            onChange={changeKeyName}
                            autoComplete="off"
                            value={keyName}
                            name="hs-search-article-1"
                            id="hs-search-article-1"
                            className="py-2.5 px-4 block w-full border-transparent rounded-lg focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Search for products..."
                          />
                        </div>
                        <div>
                          <button className="size-11 cursor-pointer inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                            <svg
                              className="shrink-0 size-5"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="11" cy="11" r="8" />
                              <path d="m21 21-4.3-4.3" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </form>
                    {/* End Form */}

                    {showAlert ? (
                      <div
                        className="mt-5 relative z-50 bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500"
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

                    {isLogin ? null : (
                      <div className="mt-5 ">
                        <Link
                        href={'/register'}
                          className="py-3 mr-2 cursor-pointer px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                        >
                          Register
                        </Link>
                        <Link
                        href={'/login'}
                          className="py-3 px-4 cursor-pointer inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                        >
                          Login
                          <svg
                            className="shrink-0 size-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                          </svg>
                        </Link>
                      </div>
                    )}

                    {/* SVG Element */}
                    <div className="hidden md:block absolute top-0 end-0 -translate-y-12 translate-x-20">
                      <svg
                        className="w-16 h-auto text-orange-500"
                        width="121"
                        height="135"
                        viewBox="0 0 121 135"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
                          stroke="currentColor"
                          strokeWidth="10"
                          strokeLinecap="round"
                        />
                        <path
                          d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
                          stroke="currentColor"
                          strokeWidth="10"
                          strokeLinecap="round"
                        />
                        <path
                          d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
                          stroke="currentColor"
                          strokeWidth="10"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    {/* End SVG Element */}

                    {/* SVG Element */}
                    <div className="hidden md:block absolute bottom-0 start-0 translate-y-10 -translate-x-32">
                      <svg
                        className="w-40 h-auto text-cyan-500"
                        width="347"
                        height="188"
                        viewBox="0 0 347 188"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426"
                          stroke="currentColor"
                          strokeWidth="7"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    {/* End SVG Element */}
                  </div>

                  <div className="mt-10 sm:mt-20">
                    {daftarLabelFilter.map((data, index) => (
                      <button
                        onClick={() => clickCategories(data)}
                        key={index}
                        className={`m-1 py-3 ${
                          loadingSeacrhCategories
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                        } px-4 inline-flex items-center gap-x-2 text-sm  rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none`}
                      >
                        {data}
                      </button>
                    ))}
                    {loadingSeacrhCategories ? (
                      <div className="mt-5 flex justify-center">
                        <BeatLoader size={14} color="blue" />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <Pricing />
              <Footer />
            </div>
            {/* End Hero */}

            {/* End Subscribe */}
          </div>
        )}
      </div>
    </>
  );
}

{
  /* <div className="max-w-6xl py-10 px-4 sm:px-6 lg:px-8 lg:py-16 mx-auto">
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
</div> */
}
