import { Product } from "./Product";

export interface DashboardData {
  summary: {
    totalItems: number;
    totalSales: number;
    totalRevenue: number;
    averageRevenue: number;
    monthlyRevenue: number;
    growthPercentage: number;
  };
  products: Product[];
}
