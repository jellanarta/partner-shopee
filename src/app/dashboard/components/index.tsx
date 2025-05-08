"use client";
import SideBar from "@/app/components/SideBar";
import { ShoppingCart, DollarSign, Heart, TrendingUp } from "lucide-react";

// Dummy data object
const dashboardData = {
  metrics: [
    {
      title: "Total Item",
      value: "21",
      icon: <ShoppingCart className="h-5 w-5 text-blue-500" />,
      bgColor: "bg-blue-50",
      textColor: "text-blue-500",
    },
    {
      title: "Total Penjualan",
      value: "256.387",
      icon: <ShoppingCart className="h-5 w-5 text-purple-500" />,
      bgColor: "bg-purple-50",
      textColor: "text-purple-500",
    },
    {
      title: "Total Pendapatan",
      value: "Rp 21.980.091.036",
      icon: <DollarSign className="h-5 w-5 text-yellow-500" />,
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-500",
    },
    {
      title: "Rata-rata Omset/Bulan",
      value: "Rp 1.224.372.235",
      icon: <DollarSign className="h-5 w-5 text-red-500" />,
      bgColor: "bg-red-50",
      textColor: "text-red-500",
    },
    {
      title: "Pendapatan 30 hari",
      value: "Rp 1.289.427.403",
      icon: <DollarSign className="h-5 w-5 text-green-500" />,
      bgColor: "bg-green-50",
      textColor: "text-green-500",
    },
    {
      title: "Tren",
      value: "5.31%",
      icon: <Heart className="h-5 w-5 text-red-400" />,
      trend: "up",
      bgColor: "bg-blue-50",
      textColor: "text-blue-500",
    },
  ],
};

export default function Dashboard() {
  return (
    <SideBar>
      <div className="p-5">
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-3">
          {dashboardData.metrics.map((metric, index) => (
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
      </div>
      <div>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima facere
        dolores quam harum in dolorum fugiat repellendus magni! Explicabo,
        fugiat?
      </div>
      </div>
    </SideBar>
  );
}
