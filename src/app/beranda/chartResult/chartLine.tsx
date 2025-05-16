"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Product } from "@/types/Product";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
export default function ChartLine({
  products,
  name,
  colors,
  id,
}: {
  products: Product[];
  name: string;
  colors: string;
  id: string;
}) {
  const [state, setState] = useState<{
    series: ApexOptions["series"];
    options: ApexOptions;
  }>({
    series: [
      {
        name: name,
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
      colors: [colors],
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
        width: [1],
      },
      xaxis: {
        categories: products.map((product) => product.name),
      },
      yaxis: [
        {
          title: {
            text: name,
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

  useEffect(() => {
    if (products.length) {
      const dataseries: { name: string; type: string; data: number[] } = {
        name: name,
        type: "column",
        data: [],
      };
      if (id === "total-sales") {
        dataseries.data = products.map((product) => product.orders.total);
      } else if (id === "total-omset") {
        dataseries.data = products.map(
          (product) => product.orders.total * product.price
        );
      } else {
        dataseries.data = products.map((product) => product.sales.last30Days);
      }
      setState((prev) => ({
        ...prev,
        options: {
          ...prev,
          xaxis: { categories: products.map((product) => product.name) },
        },
        series: [dataseries],
      }));
    }
  }, [products]);
  return (
    <div className="overflow-hidden">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="line"
        height={350}
      />
    </div>
  );
}
