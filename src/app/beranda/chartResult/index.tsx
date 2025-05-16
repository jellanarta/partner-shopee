import { Product } from "@/types/Product";
import React, { useEffect, useState } from "react";
import ChartLine from "./chartLine";

export default function ChartResult({
  id,
  products,
}: {
  id: number[];
  products: Product[];
}) {
  const [dataToChart, setDataToChart] = useState<{
    totalPenjualan: Product[];
    totalPendapatan: Product[];
    totalPenjualan30Hari: Product[];
  }>({
    totalPenjualan: [],
    totalPendapatan: [],
    totalPenjualan30Hari: [],
  });
  useEffect(() => {
    const toChart: Product[] = [];
    products.map((data, index) => {
      if (id.includes(index)) {
        toChart.push(data);
      }
    });
    setDataToChart({
      totalPendapatan: toChart,
      totalPenjualan: toChart,
      totalPenjualan30Hari: toChart,
    });
  }, [id, products]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div>
        <ChartLine id="total-sales" colors="#ad46ff" name="Total Sales" products={dataToChart.totalPendapatan} />
      </div>
      <div>
        <ChartLine id="total-omset" colors="#efb100" name="Total Omset" products={dataToChart.totalPendapatan} />
      </div>
      <div>
        <ChartLine id="total-sales-last-30-days" colors="#00c951" name="Sales Last 30 Days" products={dataToChart.totalPendapatan} />
      </div>
    </div>
  );
}
