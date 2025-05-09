import { DashboardData } from "@/types/DashboardData";

export const mockData: DashboardData = {
  summary: {
    totalItems: 60,
    totalSales: 90863,
    totalRevenue: 219823253744,
    averageRevenue: 7648375173,
    monthlyRevenue: 14867384308,
    growthPercentage: 94.39,
  },
  products: [
    {
      id: 1,
      name: "Skanky Story Honjo ukuran 35-45 - Sepatu Sneakers",
      location: "Kab. Bandung",
      image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
      price: 298800,
      isMall: true,
      isOriginal: true,
      rating: 4.8,
      sales: {
        total: 4420832200,
        last30Days: 866520000,
        averagePerDay: 321380280,
      },
      orders: {
        total: 16134,
        last30Days: 2900,
        averagePerDay: 1078,
      },
      stock: {
        current: 500,
        initial: 20000,
      },
      growth: 169.62,
      createdAt: "2023-07-07",
    },
    {
      id: 2,
      name: "Skanky Yuga Ikebana - Sepatu Sneakers Casual Sport",
      location: "Kab. Bandung",
      image: "https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg",
      price: 208800,
      isMall: true,
      isOriginal: true,
      rating: 4.9,
      sales: {
        total: 4856448800,
        last30Days: 366444000,
        averagePerDay: 205454296,
      },
      orders: {
        total: 22301,
        last30Days: 1753,
        averagePerDay: 970,
      },
      stock: {
        current: 300,
        initial: 25000,
      },
      growth: 81.0,
      createdAt: "2022-11-19",
    },
    {
      id: 3,
      name: "Skanky Yuga Makie - Sepatu Sneakers Casual Sport",
      location: "Kab. Bandung",
      image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg",
      price: 208800,
      isMall: true,
      isOriginal: true,
      rating: 4.7,
      sales: {
        total: 8305286400,
        last30Days: 1415098000,
        averagePerDay: 444514520,
      },
      orders: {
        total: 42205,
        last30Days: 7185,
        averagePerDay: 2129,
      },
      stock: {
        current: 800,
        initial: 50000,
      },
      growth: 203.33,
      createdAt: "2023-02-15",
    },
    {
      id: 4,
      name: "Skeds Sepatu Wanita - Jump Kick Duo Leather - WHSEKD01",
      location: "Tangerang",
      image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
      price: 549500,
      isMall: true,
      isOriginal: true,
      rating: 4.9,
      sales: {
        total: 151003500,
        last30Days: 26345500,
        averagePerDay: 6500150,
      },
      orders: {
        total: 293,
        last30Days: 45,
        averagePerDay: 9,
      },
      stock: {
        current: 100,
        initial: 1000,
      },
      growth: 405.12,
      createdAt: "2021-11-02",
    },
    {
      id: 5,
      name: "Casual Sneakers - Urban Style",
      location: "Jakarta",
      image: "https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg",
      price: 350000,
      isMall: false,
      isOriginal: true,
      rating: 4.5,
      sales: {
        total: 500000000,
        last30Days: 10000000,
        averagePerDay: 333333,
      },
      orders: {
        total: 5000,
        last30Days: 200,
        averagePerDay: 6,
      },
      stock: {
        current: 150,
        initial: 5000,
      },
      growth: 120.5,
      createdAt: "2023-01-10",
    },
    {
      id: 6,
      name: "Sporty Running Shoes",
      location: "Surabaya",
      image: "https://images.pexels.com/photos/2529149/pexels-photo-2529149.jpeg",
      price: 450000,
      isMall: false,
      isOriginal: false,
      rating: 4.2,
      sales: {
        total: 300000000,
        last30Days: 5000000,
        averagePerDay: 166666,
      },
      orders: {
        total: 3000,
        last30Days: 100,
        averagePerDay: 3,
      },
      stock: {
        current: 100,
        initial: 3000,
      },
      growth: 95.0,
      createdAt: "2022-12-05",
    },
  ],
}
