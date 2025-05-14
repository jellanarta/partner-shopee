import { Product } from "@/types/Product";

const formatNumber = (value: number) =>
  new Intl.NumberFormat("id-ID").format(value);

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
export interface DashboardSummary {
  totalItem: string;
  totalOrders: string;
  totalRevenue: string;
  averageMonthlyRevenue: string;
  last30DaysRevenue: string;
  averageGrowth: string;
}
export function generateDashboardSummary(
  products: Product[]
): DashboardSummary {
  const totalItem = products.length;
  const totalOrders = products.reduce((sum, p) => sum + p.orders.total, 0);
  const totalRevenue = products.reduce((sum, p) => sum + p.sales.total, 0);
  const revenueLast30Days = products.reduce(
    (sum, p) => sum + p.sales.last30Days,
    0
  );
  const avgMonthlyRevenue = revenueLast30Days / (totalItem || 1);
  const avgGrowth =
    products.reduce((sum, p) => sum + p.growth, 0) / (totalItem || 1);
  return {
    totalItem: formatNumber(totalItem),
    totalOrders: formatNumber(totalOrders),
    totalRevenue: formatCurrency(totalRevenue),
    averageMonthlyRevenue: formatCurrency(avgMonthlyRevenue),
    last30DaysRevenue: formatCurrency(revenueLast30Days),
    averageGrowth: `${avgGrowth.toFixed(2)}%`,
  };
}
