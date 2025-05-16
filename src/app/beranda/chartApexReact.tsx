"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Product } from "@/types/Product";

// Importing ApexCharts
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// // Typing for Product and Sales
// export type Sales = {
//   total: number;
//   last30Days: number;
//   averagePerDay: number;
// };

// export type Orders = {
//   total: number;
//   last30Days: number;
//   averagePerDay: number;
// };

// export type Stock = {
//   current: number;
//   initial: number;
// };

// export type Product = {
//   id: number;
//   name: string;
//   location: string;
//   image: string;
//   price: number;
//   isMall: boolean;
//   isOriginal: boolean;
//   rating: number;
//   sales: Sales;
//   orders: Orders;
//   stock: Stock;
//   growth: number;
//   createdAt: string;
// };

export default function ChartApexReact({ products }: { products: Product[] }) {
  // Sample Data

  // Calculating details per product
  // const totalItems = products.length;

  // const productDetails = products.map((product) => ({
  //   name: product.name,
  //   totalPenjualan: product.sales.total,
  //   totalPendapatan: product.sales.total * product.price,
  //   rataOmsetBulan: product.sales.averagePerDay * 30, // assuming average per day * 30 days
  //   pendapatan30Hari: product.sales.last30Days * product.price,
  //   tren: product.growth > 10 ? "Good" : "Average", // Example of trend calculation based on growth
  // }));


  // Setting up chart data
  const [state, setState] = useState<{
    series: any;
    options: any;
  }>({
    series: [
      {
        name: "Total Penjualan",
        type: "column",
        data: products.map((product) => product.orders.total),
      },
      // {
      //   name: "Total Pendapatan",
      //   type: "column",
      //   data: products.map((product) => product.orders.total * product.price),
      // },
      // {
      //   name: "Pendapatan 30 Hari",
      //   type: "column",
      //   data: products.map((product) => product.sales.last30Days),
      // },

    ],
    options: {
      chart: {
        height: 350,

        animations: {
          enabled: true,
        },
        type: "line",
        stacked: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [1, 1, 3, 3],
      },
      title: {
        text: "Sales Data - Product Overview",
        align: "left",
      },
      xaxis: {
        categories: products.map((product) => product.name),
      },
      yaxis: [
        {
          title: {
            text: "Penjualan & Pendapatan",
          },
        },
      ],
      tooltip: {
        fixed: {
          enabled: true,
          position: "topLeft",
          offsetY: 30,
          offsetX: 60,
        },
      },
      legend: {
        horizontalAlign: "left",
        offsetX: 40,
      },
    },
  });

  return (
    <div className="overflow-hidden">
      <ReactApexChart
        options={{ ...state.options }}
        series={state.series}
        type="line"
        height={350}
      />
    </div>
  );
}
