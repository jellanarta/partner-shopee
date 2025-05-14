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

export default function Dashboard({
  resultProduct,
  children,
}: {
  children: React.ReactNode;
  resultProduct: ResultProductState;
}) {
  const [dataProduct, setDataProduct] =
    useState<ResultProductState>(resultProduct);
  useEffect(() => {
    setDataProduct(resultProduct);
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
      title: "Total Penjualan",
      value: "0",
      icon: <ShoppingCart className="h-5 w-5 text-purple-500" />,
      bgColor: "bg-purple-50",
      textColor: "text-purple-500",
    },
    {
      id: "total-pendapatan", // id unik
      title: "Total Pendapatan",
      value: "Rp 0",
      icon: <DollarSign className="h-5 w-5 text-yellow-500" />,
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-500",
    },
    {
      id: "rata-rata-omset", // id unik
      title: "Rata-rata Omset/Bulan",
      value: "Rp 0",
      icon: <DollarSign className="h-5 w-5 text-red-500" />,
      bgColor: "bg-red-50",
      textColor: "text-red-500",
    },
    {
      id: "pendapatan-30-hari", // id unik
      title: "Pendapatan 30 hari",
      value: "Rp 0",
      icon: <DollarSign className="h-5 w-5 text-green-500" />,
      bgColor: "bg-green-50",
      textColor: "text-green-500",
    },
    {
      id: "tren", // id unik
      title: "Tren",
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
  return (
    <div className="p-5">
      {children}
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

      <div className="my-7 flex justify-between items-center">
        <div className="text-sm ring-1 ring-gray-200 p-2 rounded-sm">
          filter
        </div>
        <div>
          <Navigation
            handleNavigations={handleNavigations}
            dataProduct={dataProduct}
          />
        </div>
      </div>

      <div>
        {dataProduct.loading ? (
          <div className="flex justify-center mt-5">
            <MoonLoader color="blue" size={50}/>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
            {dataProduct.data.products.slice(-12).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
