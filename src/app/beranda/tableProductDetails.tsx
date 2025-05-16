"use client";

import { Product } from "@/types/Product";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatNumber } from "@/utils/formatNumber";
import { useState } from "react";
import ChartResult from "./chartResult";

export default function TableProductDetails({
  products,
}: {
  products: Product[];
}) {
  const [idcheck, setIdcheck] = useState<number[]>([]);
  const compareCheck = (id: number) => {
    setIdcheck((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  return (
    <>
      <div className="mt-7">
        <ChartResult id={idcheck} products={products}/>
      </div>
      <div className="flex flex-col my-7">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3 ps-4"></th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs text-center font-medium text-gray-500 uppercase"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                    >
                      Rating
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-center text-xs font-medium text-gray-500 uppercase"
                    >
                      Total Sales
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                    >
                      Sales Last 30 Days
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                    >
                      Stock
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                    >
                      Growth
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((data, index) => (
                    <tr key={index}>
                      <td className="py-3 ps-4">
                        <div className="flex items-center h-5">
                          <input
                            id="hs-table-checkbox-1"
                            type="checkbox"
                            checked={idcheck.includes(index)}
                            onChange={() => compareCheck(index)}
                            className="border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500"
                          />
                          <label
                            htmlFor="hs-table-checkbox-1"
                            className="sr-only"
                          >
                            Checkbox
                          </label>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {data.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {formatCurrency(data.price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {data.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                        {data.rating}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                        {formatCurrency(data.sales.total)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                        {formatCurrency(data.sales.last30Days)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                        {formatNumber(data.stock.current)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                        {`${data.growth.toFixed(2)}%`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
