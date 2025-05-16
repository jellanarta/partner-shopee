"use client";

import { Product } from "@/types/Product";
import ChartApexReact from "./chartApexReact";
export default function ProductDetail({products}:{products:Product[]}) {
  
  return (
    <div className="mt-10">
      <ChartApexReact products={products} />
    </div>
  );
}
