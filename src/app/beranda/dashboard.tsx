"use client";

import { DollarSign, Heart, ShoppingCart, TrendingUp } from "lucide-react";
import { ResultProductState } from ".";
import { ProductCard } from "../dashboard/components/product-card";
import { useEffect, useState } from "react";
import Navigation from "./navigation";
import {
  DashboardSummary,
  generateDashboardSummary,
} from "@/utils/generateDashboardSummary";
import { getProduct } from "@/services/product";
import { MoonLoader } from "react-spinners";
import {  SortOptionData, sortOptionData } from "@/types/SortOption";
import TableProductDetails from "./tableProductDetails";

export default function Dashboard({
  resultProduct,
  children,
  showFilter,
}: {
  children: React.ReactNode;
  resultProduct: ResultProductState;
  showFilter: boolean;
}) {
  const [dataProduct, setDataProduct] =
    useState<ResultProductState>(resultProduct);
  const [urlFilterData, setUrlFilterData] = useState<string | null>("");
  useEffect(() => {
    setDataProduct(resultProduct);
    if (resultProduct.data.next) {
      setUrlFilterData(resultProduct.data.next.replace(/page=\d+/, `page=1`));
    }
  }, []);
  const [dashboardData, setDashboardData] = useState([
    {
      id: "total-item", // id unik
      title: "Total Item",
      value: "0",
      icon: <ShoppingCart className="h-5 w-5 text-blue-500" />,
      bgColor: "bg-blue-50",
      textColor: "text-blue-500",
    },
    {
      id: "total-penjualan", // id unik
      title: "Total Sales",
      value: "0",
      icon: <ShoppingCart className="h-5 w-5 text-purple-500" />,
      bgColor: "bg-purple-50",
      textColor: "text-purple-500",
    },
    {
      id: "total-pendapatan", // id unik
      title: "Total Revenue",
      value: "Rp 0",
      icon: <DollarSign className="h-5 w-5 text-yellow-500" />,
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-500",
    },
    {
      id: "rata-rata-omset", // id unik
      title: "Average Monthly Revenue",
      value: "Rp 0",
      icon: <DollarSign className="h-5 w-5 text-red-500" />,
      bgColor: "bg-red-50",
      textColor: "text-red-500",
    },
    {
      id: "pendapatan-30-hari", // id unik
      title: "30 Days Revenue",
      value: "Rp 0",
      icon: <DollarSign className="h-5 w-5 text-green-500" />,
      bgColor: "bg-green-50",
      textColor: "text-green-500",
    },
    {
      id: "tren", // id unik
      title: "Trend",
      value: "0%",
      icon: <Heart className="h-5 w-5 text-red-400" />,
      trend: "up",
      bgColor: "bg-blue-50",
      textColor: "text-blue-500",
    },
  ]);
  useEffect(() => {
    const summary: DashboardSummary = generateDashboardSummary(
      dataProduct.data.products
    );
    setDashboardData((prev) =>
      prev.map((item) => {
        switch (item.id) {
          case "total-item":
            return { ...item, value: summary.totalItem };
          case "total-penjualan":
            return { ...item, value: summary.totalOrders };
          case "total-pendapatan":
            return { ...item, value: summary.totalRevenue };
          case "rata-rata-omset":
            return { ...item, value: summary.averageMonthlyRevenue };
          case "pendapatan-30-hari":
            return { ...item, value: summary.last30DaysRevenue };
          case "tren":
            return { ...item, value: summary.averageGrowth };
          default:
            return item;
        }
      })
    );
  }, [dataProduct]);

  const handleNavigations = async (value: string) => {
    if (value === "next") {
      if (dataProduct.data.currentPage !== dataProduct.data.totalPages) {
        setDataProduct((prev) => ({
          ...prev,
          loading: true,
        }));
        const result = await getProduct("", dataProduct.data.next);
        if (result.status === 200) {
          const data = result.data;
          setDataProduct((prev) => ({
            loading: false,
            data: {
              currentPage: data.currentPage,
              next: data.next,
              products: prev.data.products.concat(data.products), // Menambahkan produk baru ke produk yang sudah ada
              totalPages: data.totalPages,
            },
          }));
        }
      }
    } else if (value === "prev") {
      if (dataProduct.data.currentPage !== 1) {
        setDataProduct((prev) => ({
          ...prev,
          loading: true,
        }));
        const nextURL = dataProduct.data.next?.replace(/page=\d+/, `page=2`);
        setDataProduct((prev) => ({
          loading: false,
          data: {
            currentPage: prev.data.currentPage - 1,
            next: `${nextURL}`,
            products: prev.data.products.slice(
              0,
              prev.data.products.length - 12
            ), // Menghapus 12 produk terakhir
            totalPages: prev.data.totalPages,
          },
        }));
      }
    }
  };

  // handle filter products
  type FilterState = {
    default: boolean;
    cheap: boolean;
    expensive: boolean;
    popular: boolean;
    ["best selling"]: boolean;
  };

  const [checkedFilter, setCheckedFilter] = useState<FilterState>({
    default: true,
    cheap: false,
    expensive: false,
    popular: false,
    ["best selling"]: false,
  });

  const checkIncheckedFilter = (data: string): boolean|undefined => {
    const datakey = data as SortOptionData
    return checkedFilter[datakey]
  };

  const [searchFilter, setSearchFilter] = useState(false);
  const changeCheckedFilter = (keyName: string) => {
    const keyname = keyName as SortOptionData

    setCheckedFilter((prev)=>{
      const isAlreadyChecked = prev[keyname]
      if(isAlreadyChecked){
        return {
          default:true,
          cheap:false,
          expensive:false,
          popular:false,
          "best selling":false
        }
      }
      return {
        default : keyname === "default",
        cheap : keyname === "cheap",
        expensive : keyname === "expensive",
        popular : keyname === "popular",
        "best selling" : keyname === "best selling",
      }
    })
    setSearchFilter(true);
    if (urlFilterData) {
      setUrlFilterData(urlFilterData.replace(/page=\d+/, `page=1`));
    }
  };
  useEffect(() => {
    const getWithFilter = async () => {
      if (searchFilter) {
        setDataProduct((prev) => ({
          ...prev,
          loading: true,
        }));
        let filterdata = "";
        Object.entries(checkedFilter).map(([key, value]) => {
          if (value) {
            filterdata += `filter=${key}`;
          }
        });
        const result = await getProduct("", urlFilterData + "&" + filterdata);
        if (result.status === 200) {
          // Handle product data here
          setDataProduct((prev) => ({
            ...prev,
            loading: false,
            data: result.data,
          }));
        } else {
          setDataProduct((prev) => ({
            ...prev,
            loading: false,
          }));
        }
      }
    };
    getWithFilter();
  }, [checkedFilter]);
  // handle detail product
  const [openDetailProducts, setOpenDetailProducts] = useState(false);
  const handleDetailsProducts = (isOpen: boolean) => {
    setOpenDetailProducts(isOpen);
  };

  return (
    <div>
      {children}
      <div className="px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-3">
          {dashboardData.map((metric, index) => (
            <div
              key={index}
              className={`${metric.bgColor} rounded-lg p-4 shadow-sm flex flex-col justify-between h-24`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  {metric.icon}
                  {metric.trend && (
                    <div className="ml-2 text-green-500 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <p className={`text-xl font-semibold ${metric.textColor}`}>
                  {metric.value}
                </p>
                <p className="text-gray-500 text-xs">{metric.title}</p>
              </div>
            </div>
          ))}
        </div>

        {openDetailProducts ? null : (
          <>
            <div className="mt-10">
              <div className="flex flex-wrap justify-center sm:justify-start  gap-2">
                {sortOptionData.map((data: string, index) => (
                  <label
                    key={index}
                    htmlFor={`hs-checkbox-in-form-${index + data}`}
                    className="flex p-3  bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <input
                      type="checkbox"
                      checked={checkIncheckedFilter(data) ? true : false}
                      onChange={() => changeCheckedFilter(data)}
                      className="shrink-0 mt-0.5 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      id={`hs-checkbox-in-form-${index + data}`}
                    />
                    <span className="text-sm text-gray-500 ms-3 pr-5 capitalize">
                      {data}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div className="my-7 grid gap-7 sm:flex justify-center sm:justify-between flex-wrap items-center">
              <div>
                <button
                  onClick={() => handleDetailsProducts(true)}
                  type="button"
                  className="py-3 cursor-pointer px-4 inline-flex items-center gap-x-2 text-sm  rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Show full data
                  <svg
                    className="shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
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
                </button>
              </div>
              <div className="mt-0 ">
                <Navigation
                  handleNavigations={handleNavigations}
                  dataProduct={dataProduct}
                />
              </div>
            </div>
          </>
        )}

        <div>
          {dataProduct.loading ? (
            <div className="flex justify-center mt-5 mb-10">
              <MoonLoader color="blue" size={50} />
            </div>
          ) : openDetailProducts ? (
            <div>
              <div className="text-sm mt-7">
                <div>
                  <button
                    onClick={() => setOpenDetailProducts(false)}
                    type="button"
                    className="py-3 cursor-pointer px-4 inline-flex items-center gap-x-2 text-sm  rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <svg
                      className="shrink-0 size-4 rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
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
                    Back to search results
                  </button>
                </div>
              </div>

              <TableProductDetails products={dataProduct.data.products} />
            </div>
          ) : (
            <div className="grid grid-cols-1 mb-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
              {dataProduct.data.products.slice(-12).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
